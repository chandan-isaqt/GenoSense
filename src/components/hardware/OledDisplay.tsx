import React from 'react';
import { motion } from 'framer-motion';
import { useGenoSenseDemo } from '../../hooks/useGenoSenseDemo';

export const OledDisplay: React.FC = () => {
  const { oledStatus, riskScore, riskLevel } = useGenoSenseDemo();

  return (
    <div className="flex flex-col items-center">
      {/* Physical OLED Bezel & PCB Breakout Simulation */}
      <div className="w-full max-w-md p-4 sm:p-5 rounded-2xl bg-gradient-to-b from-[#181f33] via-[#0f1526] to-[#0a0e1c] border-2 border-[#2b3a5c] shadow-[0_15px_40px_rgba(0,0,0,0.8)] relative">
        {/* PCB Screws in corners */}
        <div className="absolute top-2 left-2 w-2.5 h-2.5 rounded-full bg-slate-500 border border-slate-700 shadow-inner flex items-center justify-center">
          <div className="w-1.5 h-0.5 bg-slate-400 rotate-45" />
        </div>
        <div className="absolute top-2 right-2 w-2.5 h-2.5 rounded-full bg-slate-500 border border-slate-700 shadow-inner flex items-center justify-center">
          <div className="w-1.5 h-0.5 bg-slate-400 rotate-45" />
        </div>
        <div className="absolute bottom-2 left-2 w-2.5 h-2.5 rounded-full bg-slate-500 border border-slate-700 shadow-inner flex items-center justify-center">
          <div className="w-1.5 h-0.5 bg-slate-400 rotate-45" />
        </div>
        <div className="absolute bottom-2 right-2 w-2.5 h-2.5 rounded-full bg-slate-500 border border-slate-700 shadow-inner flex items-center justify-center">
          <div className="w-1.5 h-0.5 bg-slate-400 rotate-45" />
        </div>

        {/* Pin header markings */}
        <div className="flex justify-between items-center text-[9px] font-mono text-cyan-400/60 uppercase tracking-widest px-6 mb-2">
          <span>GND</span>
          <span>VCC</span>
          <span>SCL</span>
          <span>SDA</span>
        </div>

        {/* OLED Screen (128x64 aspect ratio emulation) */}
        <div className="w-full h-48 sm:h-52 rounded-lg oled-screen p-4 flex flex-col justify-between select-none relative">
          {/* Top Status Bar on OLED */}
          <div className="flex items-center justify-between border-b border-cyan-500/30 pb-1 text-[11px] font-mono tracking-wider">
            <span className="flex items-center gap-1.5 text-cyan-300">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
              SSD1306 128x64
            </span>
            <span className="text-cyan-400 font-bold">I2C:0x3C</span>
          </div>

          {/* Dynamic Content on OLED */}
          <div className="flex-1 flex flex-col items-center justify-center text-center py-2">
            {oledStatus === 'READY' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-2"
              >
                <div className="text-2xl font-black font-mono tracking-widest text-cyan-300 oled-glow-text">
                  GENOSENSE
                </div>
                <div className="text-xs font-mono tracking-wider text-cyan-400/80">
                  READY
                </div>
                <div className="text-[10px] text-cyan-500/60 font-mono">
                  [ WAITING FOR GPIO TRIGGER ]
                </div>
              </motion.div>
            )}

            {oledStatus === 'ANALYZING...' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-3"
              >
                <div className="text-lg font-bold font-mono tracking-widest text-cyan-300 animate-pulse oled-glow-text">
                  ANALYZING...
                </div>
                <div className="flex items-center justify-center gap-1">
                  <span className="w-2 h-2 rounded bg-cyan-400 animate-ping"></span>
                  <span className="text-[11px] font-mono text-cyan-400">EXTRACTING SNPS</span>
                </div>
                <div className="text-[9px] font-mono text-cyan-400/70">
                  200 TREES PROCESSING
                </div>
              </motion.div>
            )}

            {oledStatus === 'CONNECTING API...' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-3"
              >
                <div className="text-sm font-bold font-mono tracking-widest text-cyan-300 animate-pulse oled-glow-text">
                  CONNECTING API...
                </div>
                <div className="text-[11px] font-mono text-cyan-400">
                  POST /predict (HTTP/1.1)
                </div>
                <div className="text-[9px] font-mono text-cyan-500/80">
                  SYNCING EDGE TELEMETRY
                </div>
              </motion.div>
            )}

            {oledStatus === 'RESULT READY' && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-1.5 w-full text-center"
              >
                <div className="text-xs font-black font-mono tracking-wider text-cyan-400 border-b border-cyan-500/20 pb-0.5">
                  GENOSENSE
                </div>
                <div className="text-xl font-black font-mono tracking-wider text-cyan-200 oled-glow-text mt-1">
                  RISK: {riskLevel}
                </div>
                <div className="text-2xl font-black font-mono tracking-widest text-cyan-300 oled-glow-text">
                  SCORE: {riskScore}%
                </div>
                <div className="text-[9px] font-mono text-cyan-400/70">
                  TOP: GENE-A, GENE-B, GENE-D
                </div>
              </motion.div>
            )}

            {oledStatus === 'ERROR' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-2 text-rose-400"
              >
                <div className="text-lg font-black font-mono tracking-widest text-rose-400">
                  API ERROR 503
                </div>
                <div className="text-xs font-mono text-rose-300">
                  GATEWAY TIMEOUT
                </div>
                <div className="text-[10px] font-mono text-rose-400/80">
                  RETRYING EDGE SYNC...
                </div>
              </motion.div>
            )}

            {oledStatus === 'STANDBY' && (
              <div className="space-y-1 text-cyan-500/60 font-mono text-xs">
                <div>GENOSENSE v1.2</div>
                <div>STANDBY MODE</div>
              </div>
            )}
          </div>

          {/* Bottom OLED Status Footer */}
          <div className="flex items-center justify-between border-t border-cyan-500/20 pt-1 text-[9px] font-mono text-cyan-400/70">
            <span>BAUD: 400kHz</span>
            <span className="animate-pulse">● 3.3V I2C</span>
          </div>
        </div>

        {/* Silk-screen Label on hardware PCB */}
        <div className="flex items-center justify-between mt-2.5 px-2 text-[10px] font-mono text-slate-400">
          <span>0.96&quot; MONO OLED (SSD1306)</span>
          <span className="text-cyan-400 font-semibold">I2C BUS #1</span>
        </div>
      </div>
    </div>
  );
};
