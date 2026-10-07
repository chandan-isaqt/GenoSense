import React, { Suspense, useEffect, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, RoundedBox, Html, ContactShadows } from '@react-three/drei';
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

const GenoSenseHardwareMesh: React.FC<DeviceMeshProps> = ({
  activeHotspot,
  onSelectHotspot,
  showCutaway,
  oledLines,
  onPressAnalyze,
  isAnalyzing,
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const buttonRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 1.4) * 0.035;
    }
    if (buttonRef.current) {
      const targetZ = isAnalyzing ? 0.88 : 0.92;
      buttonRef.current.position.z = THREE.MathUtils.lerp(
        buttonRef.current.position.z,
        targetZ,
        0.15
      );
    }
  });

  return (
    <group ref={groupRef} rotation={[0.12, -0.32, 0]}>
      {/* Main Matte Dark Enclosure Body */}
      <RoundedBox
        args={[2.5, 1.25, 1.75]}
        radius={0.12}
        smoothness={4}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial
          color="#0B1826"
          roughness={0.38}
          metalness={0.45}
          transparent={showCutaway}
          opacity={showCutaway ? 0.32 : 1}
        />
      </RoundedBox>

      {/* Top Anodized Bevel Plate */}
      <RoundedBox
        args={[2.38, 0.08, 1.62]}
        radius={0.04}
        position={[0, 0.63, 0]}
      >
        <meshStandardMaterial
          color="#12263A"
          roughness={0.3}
          metalness={0.6}
          transparent={showCutaway}
          opacity={showCutaway ? 0.25 : 1}
        />
      </RoundedBox>

      {/* Cyan Accent Rim Strip */}
      <mesh position={[0, 0.58, 0.88]}>
        <boxGeometry args={[2.2, 0.018, 0.02]} />
        <meshBasicMaterial color="#43E6D1" />
      </mesh>

      {/* Internal Raspberry Pi 4 Board (Visible clearly in cutaway mode) */}
      <group position={[0, -0.22, 0]}>
        {/* Green PCB */}
        <mesh>
          <boxGeometry args={[1.75, 0.06, 1.15]} />
          <meshStandardMaterial color="#115E3B" roughness={0.5} metalness={0.3} />
        </mesh>
        {/* ARM CPU Heat Spreader */}
        <mesh position={[-0.2, 0.05, 0]}>
          <boxGeometry args={[0.38, 0.05, 0.38]} />
          <meshStandardMaterial color="#94A3B8" roughness={0.2} metalness={0.85} />
        </mesh>
        {/* 40-Pin GPIO Header */}
        <mesh position={[0.1, 0.07, -0.45]}>
          <boxGeometry args={[1.1, 0.08, 0.1]} />
          <meshStandardMaterial color="#1E293B" roughness={0.6} />
        </mesh>
        {/* Wi-Fi Shield */}
        <mesh position={[-0.62, 0.05, -0.3]}>
          <boxGeometry args={[0.28, 0.04, 0.24]} />
          <meshStandardMaterial color="#CBD5E1" metalness={0.9} roughness={0.15} />
        </mesh>
        {/* Ethernet / USB Ports on side */}
        <mesh position={[0.78, 0.12, 0.25]}>
          <boxGeometry args={[0.26, 0.22, 0.32]} />
          <meshStandardMaterial color="#94A3B8" metalness={0.8} roughness={0.25} />
        </mesh>
      </group>

      {/* Front Recessed Bezel for OLED Screen */}
      <RoundedBox
        args={[1.18, 0.62, 0.06]}
        radius={0.04}
        position={[-0.42, 0.12, 0.87]}
      >
        <meshStandardMaterial color="#030810" roughness={0.15} metalness={0.2} />
      </RoundedBox>

      {/* Live Physical OLED Screen Overlay in 3D Space */}
      <Html
        transform
        occlude="blending"
        position={[-0.42, 0.12, 0.905]}
        scale={0.16}
      >
        <div
          onClick={() => {
            const oledSpot = DEVICE_HOTSPOTS.find((h) => h.id === 'oled');
            if (oledSpot) onSelectHotspot(oledSpot);
          }}
          className="w-[240px] h-[122px] rounded-md bg-[#030810] border-2 border-[#43E6D1]/50 px-3 py-2 flex flex-col justify-between font-mono select-none cursor-pointer shadow-[0_0_20px_rgba(67,230,209,0.25)]"
        >
          <div className="flex items-center justify-between text-[10px] text-[#43E6D1]/80 border-b border-[#162C42] pb-1">
            <span>{oledLines.line1}</span>
            <span>SSD1306</span>
          </div>
          <div className="text-center my-auto">
            <div
              className={`font-display font-bold tracking-wider ${
                oledLines.line2.includes('%')
                  ? 'text-2xl text-[#F5FAFC]'
                  : 'text-sm text-[#43E6D1]'
              } ${oledLines.isBusy ? 'animate-pulse' : ''}`}
            >
              {oledLines.line2}
            </div>
            <div className="text-[11px] font-bold text-[#43E6D1] tracking-widest uppercase mt-0.5">
              {oledLines.line3}
            </div>
          </div>
          <div className="flex items-center justify-between text-[8px] text-[#8EA2B3]">
            <span>I2C 0x3C</span>
            <span>{oledLines.isBusy ? 'BUSY' : 'SYNCED'}</span>
          </div>
        </div>
      </Html>

      {/* Tactile ANALYZE Button Housing */}
      <mesh
        position={[0.68, 0.05, 0.88]}
        rotation={[Math.PI / 2, 0, 0]}
      >
        <cylinderGeometry args={[0.24, 0.26, 0.06, 32]} />
        <meshStandardMaterial color="#162F44" metalness={0.7} roughness={0.25} />
      </mesh>

      {/* Glowing Cyan LED Ring around Analyze Button */}
      <mesh position={[0.68, 0.05, 0.905]}>
        <ringGeometry args={[0.18, 0.22, 32]} />
        <meshBasicMaterial color="#43E6D1" side={THREE.DoubleSide} />
      </mesh>

      {/* Tactile Push Cap */}
      <mesh
        ref={buttonRef}
        position={[0.68, 0.05, 0.92]}
        rotation={[Math.PI / 2, 0, 0]}
        onClick={(e) => {
          e.stopPropagation();
          onPressAnalyze();
        }}
      >
        <cylinderGeometry args={[0.16, 0.16, 0.08, 32]} />
        <meshStandardMaterial
          color={isAnalyzing ? '#43E6D1' : '#1E3A52'}
          metalness={0.5}
          roughness={0.3}
        />
      </mesh>

      {/* Status LED Indicator */}
      <mesh position={[0.68, 0.42, 0.88]}>
        <sphereGeometry args={[0.045, 16, 16]} />
        <meshBasicMaterial color={isAnalyzing ? '#FFB84D' : '#43E6D1'} />
      </mesh>

      {/* Interactive 3D Hotspot Markers */}
      {DEVICE_HOTSPOTS.map((spot) => {
        const isSelected = activeHotspot?.id === spot.id;
        return (
          <Html key={spot.id} position={spot.position} center>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onSelectHotspot(spot);
              }}
              aria-label={`Inspect ${spot.label} hotspot`}
              className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider transition-all flex items-center gap-1 cursor-pointer border shadow-md whitespace-nowrap ${
                isSelected
                  ? 'bg-[#43E6D1] text-[#06111D] border-[#F5FAFC] scale-110'
                  : 'bg-[#06111D]/90 text-[#43E6D1] border-[#43E6D1]/60 hover:bg-[#102434]'
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-current animate-ping" />
              <span>{spot.label}</span>
            </button>
          </Html>
        );
      })}
    </group>
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
    }
  };

  const handleZoom = (factor: number) => {
    if (controlsRef.current) {
      const camera = controlsRef.current.object as THREE.PerspectiveCamera;
      camera.position.multiplyScalar(factor);
      controlsRef.current.update();
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
            <span className="w-2 h-2 rounded-full bg-[#43E6D1] animate-pulse" />
            <span className="text-[#F5FAFC] font-bold">
              GENOSENSE 3D PROTOTYPE
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded bg-[#102434] text-[#43E6D1] border border-[#1B3852]">
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
                  ? 'bg-[#43E6D1] text-[#06111D] border-[#43E6D1] font-bold'
                  : 'bg-[#102434] text-[#8EA2B3] hover:text-[#F5FAFC] border-[#1B3852]'
              }`}
              title="Toggle Internal Cutaway (See Raspberry Pi Inside)"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>{showCutaway ? 'Opaque Body' : 'See Inside'}</span>
            </button>

            <button
              type="button"
              onClick={() => handleZoom(0.85)}
              className="p-1.5 rounded bg-[#102434] text-[#8EA2B3] hover:text-[#F5FAFC] border border-[#1B3852] cursor-pointer"
              aria-label="Zoom in 3D model"
              title="Zoom In"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => handleZoom(1.15)}
              className="p-1.5 rounded bg-[#102434] text-[#8EA2B3] hover:text-[#F5FAFC] border border-[#1B3852] cursor-pointer"
              aria-label="Zoom out 3D model"
              title="Zoom Out"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={handleResetCamera}
              className="p-1.5 rounded bg-[#102434] text-[#8EA2B3] hover:text-[#F5FAFC] border border-[#1B3852] cursor-pointer"
              aria-label="Reset 3D camera"
              title="Reset Camera"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* 3D Canvas or Graceful Fallback */}
        <div className={compact ? 'h-[340px] sm:h-[380px]' : 'h-[380px] sm:h-[440px]'}>
          {webglSupported ? (
            <Canvas
              shadows
              camera={{ position: [0, 0.65, 3.3], fov: 42 }}
              gl={{ antialias: true, alpha: true }}
            >
              <ambientLight intensity={0.85} />
              <directionalLight
                position={[4, 6, 4]}
                intensity={1.5}
                castShadow
              />
              <pointLight position={[-3, 2, 2]} intensity={0.7} color="#43E6D1" />
              <pointLight position={[2, -2, 2]} intensity={0.5} color="#5CA8FF" />

              <Suspense fallback={null}>
                <GenoSenseHardwareMesh
                  activeHotspot={activeHotspot}
                  onSelectHotspot={setActiveHotspot}
                  showCutaway={showCutaway}
                  oledLines={oledLines}
                  onPressAnalyze={triggerDeviceAnalyze}
                  isAnalyzing={isAnalyzing}
                />
                <ContactShadows
                  position={[0, -0.82, 0]}
                  opacity={0.45}
                  scale={6}
                  blur={2.2}
                />
              </Suspense>

              <OrbitControls
                ref={controlsRef}
                enablePan={false}
                minDistance={2.1}
                maxDistance={5.2}
                maxPolarAngle={Math.PI / 1.75}
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
              <div className="text-xs font-mono text-[#43E6D1]">
                {oledLines.line1} • {oledLines.line2} • {oledLines.line3}
              </div>
            </div>
          )}
        </div>

        {/* Bottom Interactive Bar Inside Device Frame */}
        <div className="px-4 py-3 bg-[#06111D]/90 border-t border-[#1B3852] flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-[10px] font-mono uppercase text-[#8EA2B3] mr-1">
              Hotspots:
            </span>
            {DEVICE_HOTSPOTS.map((spot) => {
              const isSelected = activeHotspot?.id === spot.id;
              return (
                <button
                  key={spot.id}
                  type="button"
                  onClick={() => setActiveHotspot(spot)}
                  className={`px-2.5 py-1 rounded text-[11px] font-mono transition-colors cursor-pointer ${
                    isSelected
                      ? 'bg-[#43E6D1] text-[#06111D] font-bold'
                      : 'bg-[#102434] text-[#8EA2B3] hover:text-[#F5FAFC] border border-[#1B3852]'
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
            className="px-4 py-1.5 rounded-lg bg-[#43E6D1] hover:bg-[#62ebd9] text-[#06111D] font-display font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 cursor-pointer disabled:opacity-50 shadow-md"
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
