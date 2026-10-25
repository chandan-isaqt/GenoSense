import React, { Suspense, useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Html, ContactShadows, useFBX, Line } from '@react-three/drei';
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib';
import * as THREE from 'three';
import {
  RotateCcw,
  ZoomIn,
  ZoomOut,
  Eye,
  Play,
  X,
  Loader2,
} from 'lucide-react';
import { useGenoSenseDemo } from '../../hooks/useGenoSenseDemo';
import { DEVICE_HOTSPOTS, getOledScreenContent } from '../../services/deviceService';
import { DeviceHotspot } from '../../types/genomics';

interface DeviceMeshProps {
  activeHotspot: DeviceHotspot | null;
  onSelectHotspot: (h: DeviceHotspot) => void;
  showCutaway: boolean;
  oledLines: { line1: string; line2: string; line3: string; isBusy: boolean };
  onPressAnalyze: () => void;
  isAnalyzing: boolean;
}

const DEFAULT_CAMERA_POS: [number, number, number] = [1.8, 1.1, 3.1];

const HotspotConnectorLine: React.FC<{
  anchor: [number, number, number];
  target: [number, number, number];
  isSelected: boolean;
}> = ({ anchor, target, isSelected }) => {
  return (
    <Line
      points={[anchor, target]}
      color={isSelected ? '#35D6C7' : '#225B66'}
      transparent
      opacity={isSelected ? 0.95 : 0.45}
      lineWidth={1.2}
    />
  );
};

function drawOledToCanvas(
  canvas: HTMLCanvasElement,
  lines: { line1: string; line2: string; line3: string; isBusy: boolean }
) {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  canvas.width = 512;
  canvas.height = 256;

  // Screen background
  ctx.fillStyle = '#02070E';
  ctx.fillRect(0, 0, 512, 256);

  // Outer glowing cyan border
  ctx.strokeStyle = '#35D6C7';
  ctx.lineWidth = 6;
  ctx.strokeRect(6, 6, 500, 244);

  // Top header rule
  ctx.strokeStyle = '#182532';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(16, 52);
  ctx.lineTo(496, 52);
  ctx.stroke();

  // Header Title & Wi-Fi indicator
  ctx.fillStyle = '#35D6C7';
  ctx.font = 'bold 22px monospace';
  ctx.textAlign = 'left';
  ctx.fillText('◈ GENOSENSE', 24, 38);

  ctx.font = 'bold 16px monospace';
  ctx.textAlign = 'right';
  ctx.fillText('● Wi-Fi', 488, 38);

  // Main Status Text
  ctx.textAlign = 'center';
  ctx.font = lines.line2.includes('%') ? 'bold 52px monospace' : 'bold 44px monospace';
  ctx.fillStyle = lines.line2.includes('%') ? '#F4F7FA' : '#35D6C7';
  ctx.fillText(lines.line2, 256, 126);

  // Subtitle
  ctx.font = 'bold 20px monospace';
  ctx.fillStyle = '#35D6C7';
  ctx.fillText(lines.line3, 256, 168);

  // Bottom footer rule
  ctx.beginPath();
  ctx.moveTo(16, 204);
  ctx.lineTo(496, 204);
  ctx.stroke();

  // Footer Metadata
  ctx.textAlign = 'left';
  ctx.font = '16px monospace';
  ctx.fillStyle = '#8B9AAA';
  ctx.fillText('SSD1306 (I2C 0x3C)', 24, 234);

  ctx.textAlign = 'right';
  ctx.fillStyle = lines.isBusy ? '#F5B942' : '#35D6C7';
  ctx.fillText(lines.isBusy ? '● PROCESSING' : '● READY', 488, 234);
}

const GenoSenseFbxModel: React.FC<DeviceMeshProps> = ({
  activeHotspot,
  onSelectHotspot,
  showCutaway,
  oledLines,
  onPressAnalyze,
  isAnalyzing,
}) => {
  const fbx = useFBX('/models/Genosense.fbx');
  const groupRef = useRef<THREE.Group>(null);
  const buttonMeshRef = useRef<THREE.Mesh | null>(null);

  // Dynamic Canvas Texture for Native WebGL OLED Display
  const oledTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    drawOledToCanvas(canvas, oledLines);
    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = THREE.ClampToEdgeWrapping;
    tex.wrapT = THREE.ClampToEdgeWrapping;
    return tex;
  }, []);

  useEffect(() => {
    if (oledTexture.image) {
      drawOledToCanvas(oledTexture.image as HTMLCanvasElement, oledLines);
      oledTexture.needsUpdate = true;
    }
  }, [oledLines, oledTexture]);

  // Clone FBX, normalize UVs on screen mesh, and center strictly at origin
  const { fbxGroup, scale } = useMemo(() => {
    const cloned = fbx.clone(true);

    // Reset default FBX root transforms
    cloned.position.set(0, 0, 0);
    cloned.rotation.set(0, 0, 0);
    cloned.scale.set(1, 1, 1);
    cloned.updateMatrixWorld(true);

    // Normalize UV coordinates on the screen mesh so texture maps 1:1 without distortion
    const screenMesh = cloned.getObjectByName('screen') as THREE.Mesh | undefined;
    if (screenMesh && screenMesh.geometry) {
      screenMesh.geometry = screenMesh.geometry.clone();
      const uvAttr = screenMesh.geometry.attributes.uv;
      if (uvAttr) {
        let minU = Infinity,
          maxU = -Infinity,
          minV = Infinity,
          maxV = -Infinity;
        for (let i = 0; i < uvAttr.count; i++) {
          minU = Math.min(minU, uvAttr.getX(i));
          maxU = Math.max(maxU, uvAttr.getX(i));
          minV = Math.min(minV, uvAttr.getY(i));
          maxV = Math.max(maxV, uvAttr.getY(i));
        }
        const uSpan = maxU - minU || 1;
        const vSpan = maxV - minV || 1;
        for (let i = 0; i < uvAttr.count; i++) {
          uvAttr.setXY(
            i,
            (uvAttr.getX(i) - minU) / uSpan,
            (uvAttr.getY(i) - minV) / vSpan
          );
        }
        uvAttr.needsUpdate = true;
      }
    }

    // Compute raw untransformed bounding box
    const box = new THREE.Box3().setFromObject(cloned);
    const c = new THREE.Vector3();
    box.getCenter(c);
    const s = new THREE.Vector3();
    box.getSize(s);
    const maxDim = Math.max(s.x, s.y, s.z);
    const scaleFactor = 1.7 / maxDim; // Normalized to 1.7 units with generous framing

    // Offset position by negative center so model is strictly centered at (0, 0, 0)
    cloned.position.set(-c.x, -c.y, -c.z);

    return { fbxGroup: cloned, scale: scaleFactor };
  }, [fbx]);

  // Configure materials matching the true GenoSense hardware specs
  useEffect(() => {
    fbxGroup.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        mesh.castShadow = true;
        mesh.receiveShadow = true;

        if (mesh.name === 'body') {
          // Vibrant turquoise/teal enclosure
          mesh.material = new THREE.MeshStandardMaterial({
            color: '#14B8A6',
            roughness: 0.38,
            metalness: 0.22,
            transparent: showCutaway,
            opacity: showCutaway ? 0.22 : 1.0,
            depthWrite: !showCutaway,
          });
        } else if (mesh.name === 'pasted__pCube1') {
          // Front angled face plate (brushed natural aluminum)
          mesh.material = new THREE.MeshStandardMaterial({
            color: '#CBD5E1',
            roughness: 0.28,
            metalness: 0.72,
            transparent: showCutaway,
            opacity: showCutaway ? 0.32 : 1.0,
            depthWrite: !showCutaway,
          });
        } else if (mesh.name === 'screen') {
          // Live OLED Display rendered directly via dynamic CanvasTexture
          mesh.material = new THREE.MeshBasicMaterial({
            map: oledTexture,
          });
        } else if (mesh.name === 'button') {
          // Tactile Purple Analyze Button
          buttonMeshRef.current = mesh;
          mesh.material = new THREE.MeshStandardMaterial({
            color: '#8B5CF6',
            emissive: '#7C3AED',
            emissiveIntensity: isAnalyzing ? 1.0 : 0.45,
            metalness: 0.15,
            roughness: 0.35,
          });
        } else if (mesh.name === 'ready') {
          // Top Status LED (Emerald Green "Ready")
          mesh.material = new THREE.MeshStandardMaterial({
            color: '#10B981',
            emissive: '#10B981',
            emissiveIntensity: 1.0,
            roughness: 0.2,
          });
        } else if (mesh.name === 'prossesing') {
          // Middle Status LED (Blue / Amber "Processing")
          mesh.material = new THREE.MeshStandardMaterial({
            color: isAnalyzing ? '#F59E0B' : '#3B82F6',
            emissive: isAnalyzing ? '#F59E0B' : '#3B82F6',
            emissiveIntensity: isAnalyzing ? 1.0 : 0.65,
            roughness: 0.2,
          });
        } else if (mesh.name === 'error') {
          // Bottom Status LED (Red "Error")
          mesh.material = new THREE.MeshStandardMaterial({
            color: '#EF4444',
            emissive: '#DC2626',
            emissiveIntensity: 0.45,
            roughness: 0.2,
          });
        } else if (mesh.name === 'RaspberryPi_') {
          // Internal Raspberry Pi 4 Model B
          if (Array.isArray(mesh.material)) {
            mesh.material = mesh.material.map((mat) => {
              if (mat.name.includes('circuit')) {
                return new THREE.MeshStandardMaterial({
                  color: '#15803D',
                  roughness: 0.42,
                  metalness: 0.25,
                });
              }
              if (mat.name.includes('gold')) {
                return new THREE.MeshStandardMaterial({
                  color: '#F59E0B',
                  roughness: 0.2,
                  metalness: 0.9,
                });
              }
              if (mat.name.includes('metal') || mat.name.includes('Metallic')) {
                return new THREE.MeshStandardMaterial({
                  color: '#CBD5E1',
                  roughness: 0.25,
                  metalness: 0.85,
                });
              }
              if (mat.name.includes('Plastic') || mat.name.includes('black')) {
                return new THREE.MeshStandardMaterial({
                  color: '#111827',
                  roughness: 0.6,
                  metalness: 0.2,
                });
              }
              return mat;
            });
          }
        } else if (mesh.name.startsWith('empty_')) {
          // Matte black side panel & ventilation grille
          mesh.material = new THREE.MeshStandardMaterial({
            color: '#18202A',
            roughness: 0.45,
            metalness: 0.35,
          });
        }
      }
    });
  }, [fbxGroup, showCutaway, isAnalyzing]);

  // Gentle breathing floating motion and tactile button press animation
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 1.2) * 0.025;
    }
    if (buttonMeshRef.current) {
      const targetZ = isAnalyzing ? 8.18 : 8.32;
      buttonMeshRef.current.position.z = THREE.MathUtils.lerp(
        buttonMeshRef.current.position.z,
        targetZ,
        0.18
      );
    }
  });

  return (
    <group ref={groupRef}>
      {/* Centered & Normalized Genosense.fbx Model */}
      <group scale={scale}>
        <primitive object={fbxGroup} />
      </group>

      {/* Interactive Hit Area over the Screen for Hotspot Selection */}
      <mesh
        position={[-0.005, 0.222, 0.51]}
        rotation={[-0.526, 0, 0]}
        onClick={(e) => {
          e.stopPropagation();
          const oledSpot = DEVICE_HOTSPOTS.find((h) => h.id === 'oled');
          if (oledSpot) onSelectHotspot(oledSpot);
        }}
      >
        <planeGeometry args={[0.75, 0.44]} />
        <meshBasicMaterial transparent opacity={0} />
      </mesh>

      {/* Clickable 3D Tactile Trigger Area over the Physical Purple Analyze Button */}
      <mesh
        position={[-0.178, -0.134, 0.774]}
        rotation={[-0.526, 0, 0]}
        onClick={(e) => {
          e.stopPropagation();
          onPressAnalyze();
        }}
      >
        <cylinderGeometry args={[0.07, 0.07, 0.04, 32]} />
        <meshBasicMaterial transparent opacity={0} />
      </mesh>

      {/* Interactive 3D Hotspots with Non-overlapping Anchors & Subtle Leader Lines */}
      {DEVICE_HOTSPOTS.map((spot) => {
        const isSelected = activeHotspot?.id === spot.id;
        const anchor = spot.anchor || spot.position;

        return (
          <group key={spot.id}>
            {/* Surface Anchor Dot on the Physical Component */}
            <mesh position={anchor}>
              <sphereGeometry args={[0.012, 16, 16]} />
              <meshBasicMaterial
                color={isSelected ? '#35D6C7' : '#2DD4BF'}
              />
            </mesh>

            {/* Subtle Connector Leader Line from Component to Label */}
            <HotspotConnectorLine
              anchor={anchor}
              target={spot.position}
              isSelected={isSelected}
            />

            {/* Projected HTML Label Badge */}
            <Html position={spot.position} center>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectHotspot(spot);
                }}
                aria-label={`Inspect ${spot.label} hotspot`}
                className={`px-2.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer border shadow-lg whitespace-nowrap ${
                  isSelected
                    ? 'bg-[#35D6C7] text-[#05080D] border-[#F4F7FA] scale-105 shadow-[0_0_15px_rgba(53,214,199,0.5)]'
                    : 'bg-[#080D14]/90 text-[#35D6C7] border-[#35D6C7]/50 hover:bg-[#0E1A26] hover:border-[#35D6C7]'
                }`}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-current animate-ping" />
                <span>{spot.label}</span>
              </button>
            </Html>
          </group>
        );
      })}
    </group>
  );
};

const ModelLoadingFallback: React.FC = () => {
  return (
    <Html center>
      <div className="flex flex-col items-center gap-2 font-mono text-xs text-[#35D6C7] bg-[#080D14]/95 p-4 rounded-xl border border-[#182532] shadow-2xl">
        <Loader2 className="w-5 h-5 animate-spin" />
        <span>LOADING GENOSENSE 3D MODEL...</span>
      </div>
    </Html>
  );
};

interface GenoSense3DDeviceProps {
  compact?: boolean;
}

export const GenoSense3DDevice: React.FC<GenoSense3DDeviceProps> = ({
  compact = false,
}) => {
  const {
    oledStep,
    analysisResult,
    triggerDeviceAnalyze,
    isAnalyzing,
  } = useGenoSenseDemo();

  const [activeHotspot, setActiveHotspot] = useState<DeviceHotspot | null>(
    DEVICE_HOTSPOTS[0]
  );
  const [showCutaway, setShowCutaway] = useState<boolean>(false);
  const [webglSupported, setWebglSupported] = useState<boolean>(true);
  const controlsRef = useRef<OrbitControlsImpl | null>(null);

  useEffect(() => {
    try {
      const canvas = document.createElement('canvas');
      const gl =
        canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) setWebglSupported(false);
    } catch {
      setWebglSupported(false);
    }
  }, []);

  const oledLines = getOledScreenContent(oledStep, analysisResult);

  const handleResetCamera = () => {
    if (controlsRef.current) {
      controlsRef.current.reset();
      const camera = controlsRef.current.object as THREE.PerspectiveCamera;
      camera.position.set(...DEFAULT_CAMERA_POS);
      controlsRef.current.target.set(0, 0, 0);
      controlsRef.current.update();
    }
  };

  const handleZoom = (factor: number) => {
    if (controlsRef.current) {
      const camera = controlsRef.current.object as THREE.PerspectiveCamera;
      camera.position.multiplyScalar(factor);
      controlsRef.current.update();
    }
  };

  const handleHotspotSelect = (spot: DeviceHotspot) => {
    setActiveHotspot(spot);
    // If user clicks Raspberry Pi hotspot, automatically enable cutaway view to show the internal SBC
    if (spot.id === 'rpi') {
      setShowCutaway(true);
    }
  };

  const getHotspotReferenceImage = (id: DeviceHotspot['id']): string | null => {
    if (id === 'oled') return '/assets/hardware/oled.jpg';
    if (id === 'button') return '/assets/hardware/button.jpg';
    if (id === 'rpi') return '/assets/hardware/raspberry-pi.jpg';
    return null;
  };

  return (
    <div className="w-full space-y-4">
      {/* Main 3D Stage Container */}
      <div className="relative w-full rounded-2xl bg-[#071320] border border-[var(--border-color)] shadow-2xl overflow-hidden">
        {/* Top Hardware Bar */}
        <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-3 bg-[#06111D]/90 border-b border-[#1B3852] text-xs font-mono">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#35D6C7] animate-pulse" />
            <span className="text-[#F4F7FA] font-bold tracking-wider">
              GENOSENSE 3D PROTOTYPE
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded bg-[#102434] text-[#35D6C7] border border-[#1B3852]">
              {showCutaway ? 'INTERNAL CUTAWAY' : 'ENCLOSURE VIEW'}
            </span>
          </div>

          {/* Camera & View Controls */}
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => setShowCutaway((prev) => !prev)}
              className={`px-2.5 py-1 rounded text-[11px] font-mono flex items-center gap-1 border transition-colors cursor-pointer ${
                showCutaway
                  ? 'bg-[#35D6C7] text-[#05080D] border-[#35D6C7] font-bold'
                  : 'bg-[#102434] text-[#8B9AAA] hover:text-[#F4F7FA] border-[#1B3852]'
              }`}
              title="Toggle Internal Cutaway (See Raspberry Pi Inside)"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>{showCutaway ? 'Opaque Body' : 'See Inside'}</span>
            </button>

            <button
              type="button"
              onClick={() => handleZoom(0.85)}
              className="p-1.5 rounded bg-[#102434] text-[#8B9AAA] hover:text-[#F4F7FA] border border-[#1B3852] cursor-pointer"
              aria-label="Zoom in 3D model"
              title="Zoom In"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => handleZoom(1.15)}
              className="p-1.5 rounded bg-[#102434] text-[#8B9AAA] hover:text-[#F4F7FA] border border-[#1B3852] cursor-pointer"
              aria-label="Zoom out 3D model"
              title="Zoom Out"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={handleResetCamera}
              className="p-1.5 rounded bg-[#102434] text-[#8B9AAA] hover:text-[#F4F7FA] border border-[#1B3852] cursor-pointer"
              aria-label="Reset 3D camera"
              title="Reset Camera"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* 3D Canvas or Graceful Fallback */}
        <div className={compact ? 'h-[340px] sm:h-[380px]' : 'h-[390px] sm:h-[450px]'}>
          {webglSupported ? (
            <Canvas
              shadows
              camera={{ position: DEFAULT_CAMERA_POS, fov: 36 }}
              gl={{ antialias: true, alpha: true }}
            >
              {/* Studio Key Light, Fill Light, and Rim Lights */}
              <ambientLight intensity={1.2} color="#E2E8F0" />
              <directionalLight
                position={[4, 6, 5]}
                intensity={1.8}
                castShadow
                shadow-mapSize-width={1024}
                shadow-mapSize-height={1024}
              />
              <directionalLight
                position={[-4, 3, 2]}
                intensity={1.0}
                color="#35D6C7"
              />
              <directionalLight
                position={[0, 4, -5]}
                intensity={1.2}
                color="#4DA3FF"
              />
              <pointLight position={[0, -2, 2]} intensity={0.5} color="#35D6C7" />

              <Suspense fallback={<ModelLoadingFallback />}>
                <GenoSenseFbxModel
                  activeHotspot={activeHotspot}
                  onSelectHotspot={handleHotspotSelect}
                  showCutaway={showCutaway}
                  oledLines={oledLines}
                  onPressAnalyze={triggerDeviceAnalyze}
                  isAnalyzing={isAnalyzing}
                />
                <ContactShadows
                  position={[0, -0.72, 0]}
                  opacity={0.55}
                  scale={5.5}
                  blur={2.0}
                />
              </Suspense>

              <OrbitControls
                ref={controlsRef}
                target={[0, 0, 0]}
                enablePan={false}
                minDistance={2.4}
                maxDistance={5.8}
                maxPolarAngle={Math.PI / 1.7}
              />
            </Canvas>
          ) : (
            /* Graceful Fallback if 3D/WebGL is unavailable */
            <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center space-y-4">
              <img
                src="/assets/hardware/device-reference.jpg"
                alt="GenoSense Prototype Device"
                className="h-48 rounded-xl object-cover border border-[#1B3852]"
              />
              <div className="text-xs font-mono text-[#35D6C7]">
                {oledLines.line1} • {oledLines.line2} • {oledLines.line3}
              </div>
            </div>
          )}
        </div>

        {/* Bottom Interactive Bar Inside Device Frame */}
        <div className="px-4 py-3 bg-[#06111D]/90 border-t border-[#1B3852] flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-[10px] font-mono uppercase text-[#8B9AAA] mr-1">
              Hotspots:
            </span>
            {DEVICE_HOTSPOTS.map((spot) => {
              const isSelected = activeHotspot?.id === spot.id;
              return (
                <button
                  key={spot.id}
                  type="button"
                  onClick={() => handleHotspotSelect(spot)}
                  className={`px-2.5 py-1 rounded text-[11px] font-mono transition-colors cursor-pointer ${
                    isSelected
                      ? 'bg-[#35D6C7] text-[#05080D] font-bold'
                      : 'bg-[#102434] text-[#8B9AAA] hover:text-[#F4F7FA] border border-[#1B3852]'
                  }`}
                >
                  {spot.label}
                </button>
              );
            })}
          </div>

          <button
            type="button"
            onClick={triggerDeviceAnalyze}
            disabled={isAnalyzing}
            className="px-4 py-1.5 rounded-lg bg-[#35D6C7] hover:bg-[#4ae0d2] text-[#05080D] font-display font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 cursor-pointer disabled:opacity-50 shadow-md transition-colors"
          >
            {isAnalyzing ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span>ANALYZING...</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>PRESS ANALYZE</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Selected Hotspot Explanation Panel */}
      {activeHotspot && (
        <div className="product-card p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-left">
          <div className="flex items-start gap-3.5">
            {getHotspotReferenceImage(activeHotspot.id) && (
              <img
                src={getHotspotReferenceImage(activeHotspot.id)!}
                alt={activeHotspot.label}
                className="w-16 h-16 rounded-lg object-cover border border-[var(--border-color)] flex-shrink-0 hidden sm:block"
              />
            )}
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono uppercase tracking-widest px-2 py-0.5 rounded bg-[var(--bg-secondary)] text-[var(--primary)] font-bold border border-[var(--border-color)]">
                  HOTSPOT: {activeHotspot.label}
                </span>
                <span className="text-xs font-mono text-[var(--text-secondary)]">
                  {activeHotspot.shortTitle}
                </span>
              </div>
              <p className="text-sm font-display font-bold text-[var(--text-main)]">
                “{activeHotspot.description}”
              </p>
              <p className="text-xs text-[var(--text-secondary)] font-sans leading-relaxed">
                {activeHotspot.details}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setActiveHotspot(null)}
            className="p-1.5 rounded-lg text-[var(--text-secondary)] hover:text-[var(--text-main)] hover:bg-[var(--bg-secondary)] self-end sm:self-center cursor-pointer"
            aria-label="Close hotspot explanation"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};

// Preload FBX model for instant rendering
useFBX.preload('/models/Genosense.fbx');

export default GenoSense3DDevice;
