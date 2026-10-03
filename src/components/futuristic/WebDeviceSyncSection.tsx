import React from 'react';
import { motion } from 'framer-motion';
import { Laptop, Monitor, Sparkles } from 'lucide-react';
import { useGenoSenseDemo } from '../../hooks/useGenoSenseDemo';

export const WebDeviceSyncSection: React.FC = () => {
  const { riskScore, riskLevel, predictionReady } = useGenoSenseDemo();

  return (
    <section className="py-20 border-t border-[var(--border-color)]/70 space-y-12">
      {/* Section Header */}
      <div className="max-w-3xl space-y-3 text-left">
        <span className="text-xs font-mono text-[var(--primary)] uppercase tracking-widest block font-semibold">
          SYSTEM HARMONY
        </span>
        <h2 className="text-4xl sm:text-5xl font-display font-bold text-[var(--text-main)] tracking-tight">
          One result. Two interfaces.
        </h2>
        <p className="text-base text-[var(--text-secondary)] font-sans leading-relaxed">
          The physical GenoSense instrument and the web control dashboard stay synchronized in real time over Wi-Fi.
        </p>
      </div>

      {/* Synchronized Split Display */}
      <div className="product-card p-8 sm:p-12 shadow-xl">
        <div className="grid grid-cols-1 lg:grid-cols-11 gap-6 items-center">
          {/* LEFT: GENOSENSE WEB INTERFACE */}
          <div className="lg:col-span-5 p-8 rounded-2xl bg-[var(--bg-secondary)] border-2 border-[var(--primary)]/60 text-left space-y-4 shadow-md">
            <div className="flex items-center justify-between text-xs font-mono text-[var(--text-secondary)] border-b border-[var(--border-color)] pb-3">
              <span className="flex items-center gap-2 font-bold text-[var(--text-main)]">
                <Laptop className="w-4 h-4 text-[var(--primary)]" />
                GENOSENSE WEB
              </span>
              <span className="text-[10px] text-[var(--primary)] uppercase tracking-widest">
                SPA CONTROL
              </span>
            </div>

            <div className="text-center py-4 space-y-2">
              <span className="text-[11px] font-mono text-[var(--text-secondary)] uppercase tracking-widest block">
                PROTOTYPE RISK SCORE
              </span>
              <div className="text-6xl font-display font-black text-[var(--text-main)] tracking-tight">
                {predictionReady ? `${riskScore}%` : '73%'}
              </div>
              <div className="pt-2">
                <span className="inline-block px-3 py-1 rounded text-xs font-mono font-bold uppercase bg-[var(--bg-surface)] border border-[var(--danger)]/50 text-[var(--danger)]">
                  {predictionReady ? riskLevel : 'HIGH'}
                </span>
              </div>
            </div>

            <div className="p-3 rounded bg-[var(--bg-surface)] border border-[var(--border-color)] text-[11px] font-mono text-[var(--text-secondary)] flex items-center justify-between">
              <span>ACTIVE SESSION:</span>
              <span className="text-[var(--primary)] font-bold">CONNECTED (HTTP 200)</span>
            </div>
          </div>

          {/* CENTER: SYNCED INDICATOR */}
          <div className="lg:col-span-1 flex flex-col items-center justify-center my-4 lg:my-0">
            <motion.div
              animate={{ scale: [1, 1.08, 1] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
              className="p-4 rounded-full bg-[var(--bg-surface)] border-2 border-[var(--primary)] text-[var(--primary)] shadow-lg flex flex-col items-center gap-1.5"
            >
              <Sparkles className="w-6 h-6 animate-spin" />
              <span className="text-[9px] font-mono font-bold tracking-widest uppercase">
                SYNCED
              </span>
            </motion.div>
            <span className="text-[10px] font-mono text-[var(--text-secondary)] mt-2 hidden lg:block text-center">
              WI-FI TELEMETRY
            </span>
          </div>

          {/* RIGHT: PHYSICAL OLED DISPLAY (Always physically dark) */}
          <div className="lg:col-span-5 p-8 rounded-2xl bg-[#091522] border-2 border-[#1B3650] text-left space-y-4 shadow-2xl">
            <div className="flex items-center justify-between text-xs font-mono text-[#8EA2B3] border-b border-[#162C42] pb-3">
              <span className="flex items-center gap-2 font-bold text-[#42E8D1]">
                <Monitor className="w-4 h-4" />
                OLED HARDWARE
              </span>
              <span className="text-[10px] text-[#42E8D1] uppercase tracking-widest">
                I2C DISPLAY BUS
              </span>
            </div>

            {/* OLED Hardware Shell */}
            <div className="oled-hardware-screen p-5 h-36 flex flex-col justify-between text-center border border-[#162C42]">
              <div className="flex items-center justify-between text-[9px] text-[#42E8D1]/80">
                <span>GENOSENSE</span>
                <span>SSD1306 (128x64)</span>
              </div>

              <div className="py-1 space-y-0.5">
                <div className="text-[10px] text-[#42E8D1]/80 font-mono tracking-widest">
                  SCORE {predictionReady ? `${riskScore}%` : '73%'}
                </div>
                <div className="text-2xl font-display font-black text-[#F5FAFC]">
                  {predictionReady ? riskLevel : 'HIGH'}
                </div>
              </div>

              <div className="flex items-center justify-between text-[8px] text-[#42E8D1]/60">
                <span>I2C: 0x3C</span>
                <span>FRAME BUFFER OK</span>
              </div>
            </div>

            <div className="p-3 rounded bg-[#07111F] border border-[#1B3650] text-[11px] font-mono text-[#8EA2B3] flex items-center justify-between">
              <span>HARDWARE INTERFACE:</span>
              <span className="text-[#42E8D1] font-bold">RASPBERRY PI 4</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
