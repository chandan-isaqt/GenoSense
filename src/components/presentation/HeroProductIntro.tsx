import React from 'react';
import { motion } from 'framer-motion';
import { Play, ArrowRight, Dna, Cpu, Sparkles, Monitor } from 'lucide-react';
import { useGenoSenseDemo } from '../../hooks/useGenoSenseDemo';

interface HeroProductIntroProps {
  onExploreHowItWorks: () => void;
  onTryGenoSense: () => void;
}

export const HeroProductIntro: React.FC<HeroProductIntroProps> = ({
  onExploreHowItWorks,
  onTryGenoSense,
}) => {
  const { predictionReady, riskScore, riskLevel } = useGenoSenseDemo();

  return (
    <section className="relative min-h-[calc(100vh-100px)] flex flex-col justify-center py-10 lg:py-16 overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[var(--primary)]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* LEFT COLUMN: Cinematic Product Introduction */}
        <div className="lg:col-span-6 space-y-6 text-left z-10">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--bg-surface)] border border-[var(--border-color)] text-[var(--primary)] text-xs font-mono uppercase tracking-widest shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[var(--primary)] animate-pulse" />
            <span>BIOTECHNOLOGY × AI × EDGE COMPUTING</span>
          </div>

          {/* Main Heading */}
          <div className="space-y-4">
            <h1 className="text-5xl sm:text-7xl font-bold font-display tracking-tight text-[var(--text-main)] leading-[1.05]">
              GENOSENSE
            </h1>
            <p className="text-2xl sm:text-3xl font-display font-medium text-[var(--primary)] leading-tight">
              “Turning genomic data into an explainable AI risk estimate.”
            </p>
          </div>

          {/* Simple Explanation */}
          <p className="text-base sm:text-lg text-[var(--text-secondary)] font-sans leading-relaxed max-w-xl">
            GenoSense is a research prototype that processes selected DNA markers, runs a machine-learning model, explains the model output, and sends the result to both a web dashboard and a Raspberry Pi device.
          </p>

          {/* Primary Action Buttons: ONE Obvious Primary + One Secondary */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              onClick={onTryGenoSense}
              className="btn-lab-primary text-sm flex items-center gap-2.5 py-3.5 px-6 shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>TRY GENOSENSE</span>
            </button>

            <button
              onClick={onExploreHowItWorks}
              className="btn-lab-secondary text-sm flex items-center gap-2 py-3.5 px-6 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
            >
              <span>HOW IT WORKS</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* 3 Clear Proof-of-Concept Highlights */}
          <div className="flex flex-wrap items-center gap-6 pt-4 text-xs font-mono text-[var(--text-secondary)] border-t border-[var(--border-color)]/70">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--primary)]" />
              <span>Zero Clinical Knowledge Required</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--secondary)]" />
              <span>Live Edge Hardware Simulation</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--primary)]" />
              <span>30-Second Guided Demo</span>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Real Physical Product Concept Visual */}
        {/* DNA Sample ↓ GenoSense AI Core ↓ Raspberry Pi Device ↓ OLED Result */}
        <div className="lg:col-span-6 flex flex-col items-center justify-center relative">
          <div className="w-full max-w-lg relative lab-card p-6 sm:p-8 space-y-6 shadow-xl">
            {/* Top Badge */}
            <div className="flex items-center justify-between border-b border-[var(--border-color)] pb-3 font-mono text-xs text-[var(--text-secondary)]">
              <span className="uppercase tracking-widest text-[var(--primary)] font-semibold flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5" />
                PRODUCT SYSTEM ARCHITECTURE
              </span>
              <span className="text-[10px]">END-TO-END FLOW</span>
            </div>

            {/* Visual Concept Flow: DNA Sample -> AI Core -> Raspberry Pi -> OLED */}
            <div className="space-y-3 relative">
              {/* STAGE 1: DNA Sample */}
              <div className="p-3.5 rounded-[4px] bg-[var(--bg-secondary)] border border-[var(--border-color)] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded bg-[var(--bg-surface)] text-[var(--primary)] border border-[var(--border-color)]">
                    <Dna className="w-5 h-5 animate-pulse" />
                  </div>
                  <div>
                    <span className="text-xs font-mono text-[var(--text-secondary)] block">STAGE 1</span>
                    <span className="text-sm font-display font-bold text-[var(--text-main)]">DNA Genomic Sample</span>
                  </div>
                </div>
                <span className="text-[11px] font-mono text-[var(--primary)] px-2.5 py-1 rounded bg-[var(--bg-surface)] border border-[var(--border-color)]">
                  24 Target Markers
                </span>
              </div>

              {/* Animated Connecting Stream */}
              <div className="flex justify-center -my-1">
                <motion.div
                  className="w-1 h-6 bg-[var(--primary)] rounded-full"
                  animate={{ opacity: [0.4, 1, 0.4], scaleY: [0.8, 1.1, 0.8] }}
                  transition={{ duration: 1.8, repeat: Infinity }}
                />
              </div>

              {/* STAGE 2: GenoSense AI Core (Visually Central) */}
              <div className="p-4 rounded-[4px] bg-[var(--bg-surface)] border-2 border-[var(--primary)] shadow-md relative overflow-hidden">
                <div className="absolute top-0 right-0 px-2 py-0.5 bg-[var(--primary)] text-[var(--primary-text)] font-mono text-[9px] font-bold uppercase rounded-bl">
                  AI CORE
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded bg-[var(--primary)]/10 text-[var(--primary)] border border-[var(--primary)]/30">
                    <Cpu className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-xs font-mono text-[var(--text-secondary)] block">STAGE 2</span>
                    <h4 className="text-base font-display font-bold text-[var(--text-main)]">GenoSense AI Core</h4>
                    <p className="text-xs text-[var(--text-secondary)] font-mono mt-0.5">
                      Machine Learning + SHAP Feature Attribution
                    </p>
                  </div>
                </div>
              </div>

              {/* Animated Connecting Stream */}
              <div className="flex justify-center -my-1">
                <motion.div
                  className="w-1 h-6 bg-[var(--primary)] rounded-full"
                  animate={{ opacity: [0.4, 1, 0.4], scaleY: [0.8, 1.1, 0.8] }}
                  transition={{ duration: 1.8, repeat: Infinity, delay: 0.3 }}
                />
              </div>

              {/* STAGE 3: Raspberry Pi Device & STAGE 4: OLED Result (Realistic Physical Prototype Look) */}
              <div className="p-4 rounded-[4px] bg-[#070C12] border border-[#182532] text-left space-y-3 font-mono">
                <div className="flex items-center justify-between text-[11px] text-[#8B9AAA] border-b border-[#182532] pb-2">
                  <span className="flex items-center gap-1.5 text-[#35D6C7]">
                    <Monitor className="w-3.5 h-3.5" />
                    STAGE 3 &amp; 4: PHYSICAL PROTOTYPE
                  </span>
                  <span className="text-[10px] text-[#8B9AAA]">I2C BUS 1 • GPIO 17</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-center">
                  {/* Raspberry Pi SBC vector label */}
                  <div className="p-3 rounded bg-[#0B111A] border border-[#182532] flex flex-col justify-between h-24">
                    <div className="text-[10px] text-[#8B9AAA]">HARDWARE INTERFACE</div>
                    <div className="text-xs font-bold text-[#F4F7FA]">Raspberry Pi 4 (ARM64)</div>
                    <div className="text-[9px] text-[#35D6C7]">Wi-Fi + GPIO Interrupted</div>
                  </div>

                  {/* OLED Screen showing realistic output */}
                  <div className="oled-container rounded p-3 h-24 flex flex-col justify-between text-center select-none">
                    <div className="text-[9px] text-[#35D6C7]/80 flex justify-between">
                      <span>GENOSENSE</span>
                      <span>OLED 128x64</span>
                    </div>
                    <div className="py-1">
                      <div className="text-[10px] text-[#35D6C7]/90 font-mono tracking-wider">
                        RISK: {predictionReady ? riskLevel : 'HIGH'}
                      </div>
                      <div className="text-xl font-display font-black text-[#F4F7FA]">
                        {predictionReady ? `${riskScore}%` : '73%'}
                      </div>
                    </div>
                    <div className="text-[8px] text-[#35D6C7]/60">PROTOTYPE ESTIMATE</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Caption */}
            <div className="pt-2 text-center text-xs font-mono text-[var(--text-secondary)]">
              “From DNA sequence to physical point-of-care display in milliseconds.”
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
