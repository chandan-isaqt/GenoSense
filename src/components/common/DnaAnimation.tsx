import React, { useEffect, useRef } from 'react';

interface DnaAnimationProps {
  className?: string;
  width?: number;
  height?: number;
}

export const DnaAnimation: React.FC<DnaAnimationProps> = ({
  className = '',
  width = 460,
  height = 540,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let rotation = 0;
    let pulsePhase = 0;

    // Number of base pairs along the vertical strand
    const numPairs = 30;
    const helixRadius = 85;
    const pairSpacing = height / (numPairs - 2);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      rotation += 0.012; // slow, elegant rotation
      pulsePhase = (pulsePhase + 0.02) % (Math.PI * 2);

      const centerX = width / 2;

      // Draw faint background vertical axis line
      ctx.beginPath();
      ctx.strokeStyle = 'rgba(24, 37, 50, 0.4)';
      ctx.setLineDash([4, 6]);
      ctx.lineWidth = 1;
      ctx.moveTo(centerX, 20);
      ctx.lineTo(centerX, height - 20);
      ctx.stroke();
      ctx.setLineDash([]);

      const dataPulseY = ((Math.sin(pulsePhase) + 1) / 2) * (height - 60) + 30;

      for (let i = 0; i < numPairs; i++) {
        const y = i * pairSpacing + 10;
        const angle = rotation + (i * 0.28);

        // 3D projection: calculate x and z depths
        const x1 = centerX + Math.cos(angle) * helixRadius;
        const z1 = Math.sin(angle); // depth -1 to 1

        const x2 = centerX + Math.cos(angle + Math.PI) * helixRadius;
        const z2 = Math.sin(angle + Math.PI);

        // Distance from current data pulse
        const distToPulse = Math.abs(y - dataPulseY);
        const isPulseActive = distToPulse < 45;
        const pulseIntensity = isPulseActive ? (1 - distToPulse / 45) : 0;

        // Render hydrogen bond connecting strand
        const avgZ = (z1 + z2) / 2;
        const lineAlpha = 0.15 + (avgZ + 1) * 0.12 + (pulseIntensity * 0.5);
        ctx.beginPath();
        ctx.moveTo(x1, y);
        ctx.lineTo(x2, y);
        ctx.strokeStyle = pulseIntensity > 0
          ? `rgba(53, 214, 199, ${lineAlpha})`
          : `rgba(77, 163, 255, ${lineAlpha * 0.6})`;
        ctx.lineWidth = pulseIntensity > 0 ? 1.5 : 1;
        ctx.stroke();

        // Strand 1 node (Primary Cyan #35D6C7)
        const radius1 = 2.5 + (z1 + 1) * 1.5;
        const alpha1 = 0.35 + (z1 + 1) * 0.32;
        ctx.beginPath();
        ctx.arc(x1, y, radius1 + (pulseIntensity * 2), 0, Math.PI * 2);
        ctx.fillStyle = pulseIntensity > 0.3
          ? '#FFFFFF'
          : `rgba(53, 214, 199, ${alpha1})`;
        ctx.shadowColor = '#35D6C7';
        ctx.shadowBlur = pulseIntensity > 0 ? 12 : 5;
        ctx.fill();

        // Strand 2 node (Secondary Blue #4DA3FF)
        const radius2 = 2.5 + (z2 + 1) * 1.5;
        const alpha2 = 0.35 + (z2 + 1) * 0.32;
        ctx.beginPath();
        ctx.arc(x2, y, radius2 + (pulseIntensity * 1.5), 0, Math.PI * 2);
        ctx.fillStyle = `rgba(77, 163, 255, ${alpha2})`;
        ctx.shadowColor = '#4DA3FF';
        ctx.shadowBlur = 4;
        ctx.fill();

        ctx.shadowBlur = 0; // reset shadow
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [width, height]);

  return (
    <div className={`relative flex items-center justify-center select-none ${className}`}>
      <div className="absolute top-4 right-4 text-[10px] font-mono text-[#8B9AAA]/60 uppercase tracking-widest pointer-events-none">
        HEURISTIC ROTATION: 0.012 rad/s
      </div>
      <div className="absolute bottom-4 left-4 text-[10px] font-mono text-[#35D6C7]/70 uppercase tracking-widest pointer-events-none flex items-center gap-1.5">
        <span className="w-1.5 h-1.5 rounded-full bg-[#35D6C7] animate-ping" />
        LIVE HELIX PROJECTION
      </div>

      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        className="max-w-full h-auto drop-shadow-[0_0_25px_rgba(53,214,199,0.12)]"
      />
    </div>
  );
};
