import React from 'react';
import { motion } from 'framer-motion';

export const DnaAnimation: React.FC<{ className?: string; compact?: boolean }> = ({
  className = '',
  compact = false,
}) => {
  const basePairs = compact ? 10 : 16;
  const nodes = Array.from({ length: basePairs }, (_, i) => i);

  return (
    <div className={`relative flex items-center justify-center overflow-hidden py-4 ${className}`}>
      <div className="flex items-center gap-3 sm:gap-4 h-28 relative">
        {nodes.map((index) => {
          const delay = index * 0.15;
          return (
            <div key={index} className="flex flex-col items-center justify-between h-full w-2 relative">
              {/* Top Base Node */}
              <motion.div
                animate={{
                  y: [0, 48, 0],
                  scale: [1, 0.7, 1],
                  opacity: [0.9, 0.4, 0.9],
                }}
                transition={{
                  duration: 2.4,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay,
                }}
                className="w-3.5 h-3.5 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.8)] z-10"
              />

              {/* Hydrogen Bond Connecting Line */}
              <motion.div
                animate={{
                  opacity: [0.8, 0.2, 0.8],
                  scaleY: [1, 0.1, 1],
                }}
                transition={{
                  duration: 2.4,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay,
                }}
                className="w-[1.5px] h-12 bg-gradient-to-b from-cyan-400/80 via-blue-500/40 to-emerald-400/80"
              />

              {/* Bottom Base Node */}
              <motion.div
                animate={{
                  y: [0, -48, 0],
                  scale: [0.7, 1, 0.7],
                  opacity: [0.4, 0.9, 0.4],
                }}
                transition={{
                  duration: 2.4,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay,
                }}
                className="w-3.5 h-3.5 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.8)] z-10"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};
