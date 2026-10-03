import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, ArrowDown, CircleDot, Loader2 } from 'lucide-react';
import { useGenoSenseDemo } from '../../hooks/useGenoSenseDemo';

interface CinematicDeviceHeroProps {
  onExperienceDemo: () => void;
  onExploreHowItWorks: () => void;
}

export const CinematicDeviceHero: React.FC<CinematicDeviceHeroProps> = ({
  onExperienceDemo,
  onExploreHowItWorks,
}) => {
  const { oledStatus, triggerHardwareAnalyzeButton, riskScore, riskLevel } =
    useGenoSenseDemo();
  const [isButtonPressed, setIsButtonPressed] = useState(false);

  const isBusy =
    oledStatus === 'ANALYZING...' ||
    oledStatus === 'CONNECTING...' ||
    oledStatus === 'CONNECTING API...' ||
    oledStatus === 'AI PROCESSING...' ||
    oledStatus === 'EXPLAINING...';

  const handleDeviceButtonClick = async () => {
    if (isBusy) return;
    setIsButtonPressed(true);
    setTimeout(() => setIsButtonPressed(false), 220);
    await triggerHardwareAnalyzeButton();
  };

  return (
    <section id="hero" className="relative min-h-[calc(100vh-80px)] flex flex-col justify-center py-12 lg:py-20 overflow-hidden">
      {/* Cinematic Ambient Lighting (soft cyan glow & atmospheric depth) */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[550px] bg-[#42E8D1]/8 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-[450px] h-[350px] bg-[#5AA9FF]/6 rounded-full blur-[100px] pointer-events-none" />

      {/* Supporting Wide Laboratory Photo as Low-Opacity Environmental Visual (Section 8) */}
      <div
        className="absolute inset-0 bg-cover bg-center pointer-events-none opacity-[0.06] dark:opacity-[0.08] mix-blend-luminosity filter blur-[1px]"
        style={{ backgroundImage: `url('/assets/biology/laboratory.jpg')` }}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center relative z-10">
        {/* LEFT COLUMN: Cinematic Introduction */}
        <div className="lg:col-span-6 space-y-7 text-left">
          {/* Eyebrow Label */}
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[var(--bg-surface)] border border-[var(--border-color)] text-[var(--primary)] text-xs font-mono uppercase tracking-widest shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[var(--primary)] animate-pulse" />
            <span>BIOTECHNOLOGY × AI × EDGE COMPUTING</span>
          </div>

          {/* Heading */}
          <div className="space-y-3">
            <span className="text-sm font-mono uppercase tracking-[0.25em] text-[var(--text-secondary)] block font-semibold">
              GENOSENSE
            </span>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-display font-bold text-[var(--text-main)] tracking-tight leading-[1.05]">
              From genomic data to an explainable result.
            </h1>
          </div>

          {/* Short description */}
          <p className="text-base sm:text-lg text-[var(--text-secondary)] font-sans leading-relaxed max-w-xl">
            An interactive research prototype combining selected genomic markers, machine learning, explainable AI, and a connected edge device.
          </p>

          {/* Two Prominent Action Buttons */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              onClick={onExperienceDemo}
              className="btn-primary-product flex items-center gap-2.5 text-sm cursor-pointer shadow-lg"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>TRY THE LIVE DEMO</span>
            </button>

            <button
              onClick={onExploreHowItWorks}
              className="btn-secondary-product flex items-center gap-2 text-sm cursor-pointer"
            >
              <span>SEE HOW IT WORKS</span>
              <ArrowDown className="w-4 h-4" />
            </button>
          </div>

          {/* Status Badges */}
          <div className="flex items-center gap-5 pt-4 text-xs font-mono text-[var(--text-secondary)] border-t border-[var(--border-color)]/60">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[var(--primary)]" />
              <span className="text-[var(--text-main)] font-medium">SYSTEM ONLINE</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[var(--secondary)]" />
              <span>24 Loci Ingestion Ready</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[var(--primary)]" />
              <span>I2C Bus Linked</span>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: The Hero Device Showcase */}
        <div className="lg:col-span-6 flex flex-col items-center justify-center relative">
          {/* Subtle DNA Particle Stream entering device */}
          <div className="absolute -top-12 left-6 z-0 flex items-center gap-2 font-mono text-[11px] text-[var(--primary)]/70 uppercase tracking-widest pointer-events-none">
            <span className="w-2 h-2 rounded-full bg-[var(--primary)] animate-ping" />
            <span>DNA DATA STREAM &rarr;</span>
          </div>

          {/* Physical Device Enclosure (Always dark, matte, premium) */}
          <div className="w-full max-w-lg relative p-8 sm:p-10 rounded-2xl bg-[#091522] border border-[#1B3650] shadow-2xl space-y-6 select-none">
            {/* Edge Bevel Glow */}
            <div className="absolute inset-x-8 -top-px h-px bg-gradient-to-r from-transparent via-[#42E8D1]/40 to-transparent" />

            {/* Device Header Strip */}
            <div className="flex items-center justify-between font-mono text-xs text-[#8EA2B3] border-b border-[#162C42] pb-3">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#42E8D1] shadow-[0_0_8px_#42E8D1]" />
                <span className="text-[#F5FAFC] font-display font-bold tracking-wider">GENOSENSE</span>
                <span className="text-[10px] text-[#42E8D1] px-1.5 py-0.2 rounded bg-[#07111F] border border-[#1B3650]">
                  REV-4
                </span>
              </div>
              <div className="flex items-center gap-2 text-[10px]">
                <span>● ONLINE</span>
                <span>WI-FI 5G</span>
              </div>
            </div>

            {/* OLED Hardware Display (Always physically black OLED) */}
            <div className="oled-hardware-screen p-6 h-36 flex flex-col justify-between text-center border border-[#162C42]">
              <div className="flex items-center justify-between text-[10px] text-[#42E8D1]/80 border-b border-[#162C42] pb-1">
                <span>GENOSENSE EDGE v1.2</span>
                <span>SSD1306 (128x64)</span>
              </div>

              {/* Dynamic OLED Content Sequence */}
              <div className="flex-1 flex flex-col items-center justify-center py-1">
                {oledStatus === 'READY' && (
                  <div className="space-y-1">
                    <div className="text-xl font-display font-bold tracking-widest text-[#42E8D1]">
                      GENOSENSE
                    </div>
                    <div className="text-xs tracking-wider text-[#42E8D1]/80">
                      READY
                    </div>
                  </div>
                )}

                {oledStatus === 'ANALYZING...' && (
                  <div className="space-y-1 animate-pulse">
                    <div className="text-sm font-display font-bold tracking-widest text-[#42E8D1]">
                      SCANNING...
                    </div>
                    <div className="text-[10px] text-[#42E8D1]/80">READING DNA DATA...</div>
                  </div>
                )}

                {oledStatus === 'CONNECTING...' && (
                  <div className="space-y-1 animate-pulse">
                    <div className="text-sm font-display font-bold tracking-widest text-[#42E8D1]">
                      CONNECTING...
                    </div>
                    <div className="text-[10px] text-[#42E8D1]/80">API GATEWAY SYNC</div>
                  </div>
                )}

                {oledStatus === 'AI PROCESSING...' && (
                  <div className="space-y-1 animate-pulse">
                    <div className="text-sm font-display font-bold tracking-widest text-[#42E8D1]">
                      AI PROCESSING...
                    </div>
                    <div className="text-[10px] text-[#42E8D1]/80">200 RANDOM FOREST TREES</div>
                  </div>
                )}

                {oledStatus === 'EXPLAINING...' && (
                  <div className="space-y-1 animate-pulse">
                    <div className="text-sm font-display font-bold tracking-widest text-[#42E8D1]">
                      EXPLAINING...
                    </div>
                    <div className="text-[10px] text-[#42E8D1]/80">SHAP FEATURE ATTRIBUTION</div>
                  </div>
                )}

                {oledStatus === 'RESULT READY' && (
                  <div className="space-y-0.5">
                    <div className="text-[10px] text-[#42E8D1]/70 font-mono tracking-widest">
                      GENOSENSE
                    </div>
                    <div className="text-2xl font-display font-black text-[#F5FAFC]">
                      SCORE {riskScore}%
                    </div>
                    <div className="text-xs font-bold text-[#42E8D1] tracking-wider">
                      {riskLevel}
                    </div>
                  </div>
                )}

                {oledStatus === 'STANDBY' && (
                  <div className="text-xs text-[#42E8D1]/70">
                    STANDBY • AWAITING BUTTON
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between text-[9px] text-[#42E8D1]/60 border-t border-[#162C42] pt-1">
                <span>CLOCK: 400kHz</span>
                <span>BUFFER LIVE</span>
              </div>
            </div>

            {/* The Tactile Hardware Button */}
            <div className="pt-2 text-center space-y-2">
              <motion.button
                whileTap={{ scale: 0.96, y: 3 }}
                animate={{ y: isButtonPressed ? 3 : 0 }}
                disabled={isBusy}
                onClick={handleDeviceButtonClick}
                className="w-full py-4 px-6 rounded-lg bg-[#42E8D1] hover:bg-[#63edd9] text-[#07111F] font-display font-bold text-sm tracking-wider uppercase flex items-center justify-center gap-2.5 shadow-[0_4px_20px_rgba(66,232,209,0.35)] active:shadow-none transition-all cursor-pointer disabled:opacity-50"
              >
                {isBusy ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-[#07111F]" />
                    <span>PROCESSING...</span>
                  </>
                ) : (
                  <>
                    <CircleDot className="w-4 h-4 text-[#07111F]" />
                    <span>PRESS TO ANALYZE</span>
                  </>
                )}
              </motion.button>
              <span className="text-[11px] font-mono text-[#8EA2B3] block">
                Physical Tactile Switch • GPIO Pin 17 Interrupt
              </span>
            </div>

            {/* Subtle Ventilation Grille & Microcontroller Branding */}
            <div className="pt-3 border-t border-[#162C42] flex items-center justify-between text-[10px] font-mono text-[#8EA2B3]">
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#5AA9FF]" />
                <span>POWER: 5V 3A USB-C</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-12 h-1.5 rounded-full bg-[#132C44] overflow-hidden flex gap-1 px-1">
                  <div className="w-2 h-full bg-[#1B3650]" />
                  <div className="w-2 h-full bg-[#1B3650]" />
                  <div className="w-2 h-full bg-[#1B3650]" />
                </div>
                <span>VENT</span>
              </div>
              <span>ARM64 SBC INSIDE</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
