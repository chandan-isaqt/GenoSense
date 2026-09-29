import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CircleDot, Loader2 } from 'lucide-react';
import { useGenoSenseDemo } from '../../hooks/useGenoSenseDemo';

export const GpioButtonControl: React.FC = () => {
  const { triggerHardwareAnalyzeButton, oledStatus } = useGenoSenseDemo();
  const [isPressed, setIsPressed] = useState(false);

  const isBusy = oledStatus === 'ANALYZING...' || oledStatus === 'CONNECTING API...';

  const handlePress = async () => {
    if (isBusy) return;
    setIsPressed(true);
    setTimeout(() => setIsPressed(false), 200);
    await triggerHardwareAnalyzeButton();
  };

  return (
    <div className="p-6 rounded-2xl bg-navy-950/80 border border-slate-800 space-y-4 glass-panel text-center">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
          Hardware GPIO Trigger
        </span>
        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-cyan-400">
          GPIO Pin 17 (Pull-Up)
        </span>
      </div>

      <p className="text-xs text-slate-300 font-sans max-w-sm mx-auto">
        Simulates the physical push-button wired to Raspberry Pi GPIO pin 17 to initiate hardware-in-the-loop edge inference.
      </p>

      {/* 3D Tactile Push Button */}
      <div className="py-4 flex justify-center">
        <div className="p-3 rounded-3xl bg-gradient-to-b from-slate-800 to-slate-900 border-2 border-slate-700 shadow-2xl inline-block">
          <motion.button
            type="button"
            whileTap={{ scale: 0.94, y: 4 }}
            animate={{
              y: isPressed ? 4 : 0,
              boxShadow: isPressed
                ? '0 0px 0 #991b1b, inset 0 2px 8px rgba(0,0,0,0.8)'
                : '0 8px 0 #991b1b, 0 12px 20px rgba(239,68,68,0.4)',
            }}
            disabled={isBusy}
            onClick={handlePress}
            className="w-48 h-20 rounded-2xl bg-gradient-to-b from-rose-500 via-rose-600 to-rose-700 hover:from-rose-400 hover:to-rose-600 text-white font-mono font-black text-sm tracking-wider uppercase flex flex-col items-center justify-center gap-1 transition-all select-none disabled:opacity-60 cursor-pointer"
          >
            {isBusy ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span className="text-xs">PROCESSING...</span>
              </>
            ) : (
              <>
                <div className="flex items-center gap-1.5">
                  <CircleDot className="w-4 h-4 text-rose-200 animate-pulse" />
                  <span>PRESS ANALYZE</span>
                </div>
                <span className="text-[10px] tracking-normal font-sans font-normal text-rose-200">
                  GPIO INTERRUPT
                </span>
              </>
            )}
          </motion.button>
        </div>
      </div>

      <div className="flex items-center justify-center gap-4 text-[11px] font-mono text-slate-400">
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
          Interrupt: Falling Edge
        </span>
        <span>•</span>
        <span>Debounce: 50ms</span>
      </div>
    </div>
  );
};
