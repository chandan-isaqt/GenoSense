import React, { useEffect, useRef } from 'react';
import { useTheme } from '../../context/ThemeContext';

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
  const { theme, colors } = useTheme();

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

    const isDark = theme === 'dark';
    const primaryHex = colors.primary;
    const secondaryHex = colors.secondary;
    const axisColor = isDark ? 'rgba(24, 37, 50, 0.45)' : 'rgba(215, 226, 231, 0.85)';

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      rotation += 0.012; // slow, elegant rotation
      pulsePhase = (pulsePhase + 0.02) % (Math.PI * 2);

      const centerX = width / 2;

      // Draw faint background vertical axis line
      ctx.beginPath();
      ctx.strokeStyle = axisColor;
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
        const lineAlpha = isDark 
          ? (0.15 + (avgZ + 1) * 0.12 + (pulseIntensity * 0.5))
          : (0.18 + (avgZ + 1) * 0.14 + (pulseIntensity * 0.4));
        
        ctx.beginPath();
        ctx.moveTo(x1, y);
        ctx.lineTo(x2, y);
        ctx.strokeStyle = isDark
          ? (pulseIntensity > 0 ? `rgba(53, 214, 199, ${lineAlpha})` : `rgba(77, 163, 255, ${lineAlpha * 0.6})`)
          : (pulseIntensity > 0 ? `rgba(8, 127, 122, ${lineAlpha})` : `rgba(23, 105, 170, ${lineAlpha * 0.65})`);
        ctx.lineWidth = pulseIntensity > 0 ? 1.5 : 1;
        ctx.stroke();

        // Strand 1 node (Primary: Cyan in dark, Deep Teal in light)
        const radius1 = 2.5 + (z1 + 1) * 1.5;
        const alpha1 = 0.35 + (z1 + 1) * 0.32;
        ctx.beginPath();
        ctx.arc(x1, y, radius1 + (pulseIntensity * 2), 0, Math.PI * 2);
        
        if (isDark) {
          ctx.fillStyle = pulseIntensity > 0.3 ? '#FFFFFF' : `rgba(53, 214, 199, ${alpha1})`;
          ctx.shadowColor = primaryHex;
          ctx.shadowBlur = pulseIntensity > 0 ? 12 : 5;
        } else {
          ctx.fillStyle = pulseIntensity > 0.3 ? primaryHex : `rgba(8, 127, 122, ${alpha1 * 0.95})`;
          ctx.shadowColor = primaryHex;
          ctx.shadowBlur = pulseIntensity > 0 ? 6 : 2;
        }
        ctx.fill();

        // Strand 2 node (Secondary: Blue)
        const radius2 = 2.5 + (z2 + 1) * 1.5;
        const alpha2 = 0.35 + (z2 + 1) * 0.32;
        ctx.beginPath();
        ctx.arc(x2, y, radius2 + (pulseIntensity * 1.5), 0, Math.PI * 2);
        
        if (isDark) {
          ctx.fillStyle = `rgba(77, 163, 255, ${alpha2})`;
          ctx.shadowColor = secondaryHex;
          ctx.shadowBlur = 4;
        } else {
          ctx.fillStyle = `rgba(23, 105, 170, ${alpha2 * 0.95})`;
          ctx.shadowColor = secondaryHex;
          ctx.shadowBlur = 2;
        }
        ctx.fill();

        ctx.shadowBlur = 0; // reset shadow
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [width, height, theme, colors]);

  return (
    <div className={`relative flex items-center justify-center select-none ${className}`}>
      <div className="absolute top-4 right-4 text-[10px] font-mono text-[var(--text-muted)] uppercase tracking-widest pointer-events-none">
        HEURISTIC ROTATION: 0.012 rad/s
      </div>
      <div className="absolute bottom-4 left-4 text-[10px] font-mono text-[var(--primary)] uppercase tracking-widest pointer-events-none flex items-center gap-1.5">
        <span className="w-1.5 h-1.5 rounded-full bg-[var(--primary)] animate-ping" />
        LIVE HELIX PROJECTION
      </div>

      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        className="max-w-full h-auto drop-shadow-sm"
      />
    </div>
  );
};
