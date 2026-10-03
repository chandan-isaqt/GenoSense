import React from 'react';
import { motion } from 'framer-motion';
import {
  RotateCcw,
  CircleDot,
  CheckCircle2,
  Loader2,
  Cpu,
  Dna,
  TreeDeciduous,
  Activity,
  Sparkles,
} from 'lucide-react';
import { useGenoSenseDemo } from '../../hooks/useGenoSenseDemo';

export const InteractiveButtonExperience: React.FC = () => {
  const {
    oledStatus,
    triggerHardwareAnalyzeButton,
    resetDemo,
    riskScore,
    riskLevel,
    predictionReady,
  } = useGenoSenseDemo();

  const stages = [
    {
      num: 1,
      title: 'BUTTON PRESSED',
      desc: 'Physical tactile button triggers GPIO Pin 17 interrupt.',
      icon: CircleDot,
    },
    {
      num: 2,
      title: 'DEVICE CONNECTING',
      desc: 'Raspberry Pi edge client opens authenticated API session.',
      icon: Cpu,
    },
    {
      num: 3,
      title: 'READING SAMPLE',
      desc: 'Isolates 24 candidate genomic markers from GS-DEMO-001.',
      icon: Dna,
    },
    {
      num: 4,
      title: 'AI PROCESSING',
      desc: '200 Random Forest trees compute prototype risk votes.',
      icon: TreeDeciduous,
    },
    {
      num: 5,
      title: 'GENERATING EXPLANATION',
      desc: 'TreeSHAP decomposes risk contributions (+0.31, +0.19, -0.07).',
      icon: Sparkles,
    },
    {
      num: 6,
      title: 'RESULT RETURNED',
      desc: 'REST API payload returned in 238ms to edge client.',
      icon: Activity,
    },
    {
      num: 7,
      title: 'OLED UPDATED',
      desc: 'Physical 128×64 matrix displays SCORE: 73% HIGH.',
      icon: CheckCircle2,
    },
  ];

  const isBusy =
    oledStatus === 'ANALYZING...' ||
    oledStatus === 'CONNECTING...' ||
    oledStatus === 'CONNECTING API...' ||
    oledStatus === 'AI PROCESSING...' ||
    oledStatus === 'EXPLAINING...';

  // Map oledStatus to active visual step
  const getCurrentStep = () => {
    if (oledStatus === 'ANALYZING...') return 2;
    if (oledStatus === 'CONNECTING...' || oledStatus === 'CONNECTING API...') return 1;
    if (oledStatus === 'AI PROCESSING...') return 3;
    if (oledStatus === 'EXPLAINING...') return 4;
    if (predictionReady || oledStatus === 'RESULT READY') return 6;
    return 0;
  };

  const currentStep = getCurrentStep();

  const handlePressAnalyze = async () => {
    if (isBusy) return;
    await triggerHardwareAnalyzeButton();
  };

  return (
    <section id="button-experience" className="py-20 border-t border-[var(--border-color)]/70 space-y-12">
      {/* Header */}
      <div className="max-w-3xl space-y-3 text-left">
        <span className="text-xs font-mono text-[var(--primary)] uppercase tracking-widest block font-semibold">
          REAL-TIME INTERACTION
        </span>
        <h2 className="text-4xl sm:text-5xl font-display font-bold text-[var(--text-main)] tracking-tight">
          Press Analyze. Watch what happens.
        </h2>
        <p className="text-base sm:text-lg text-[var(--text-secondary)] font-sans leading-relaxed">
          No complex configuration needed. When you click the tactile button, telemetry propagates through the full hardware and AI pipeline in real time.
        </p>
      </div>

      {/* Main Interactive Stage */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Column: Device & Interactive Button Vessel */}
        <div className="lg:col-span-5 space-y-6">
          <div className="product-card p-6 sm:p-8 bg-[#07111D] border border-[#1B3852] shadow-2xl rounded-2xl space-y-6 text-left">
            {/* Header */}
            <div className="flex items-center justify-between text-xs font-mono text-[#8EA2B3] border-b border-[#162C42] pb-3">
              <span className="text-[#F5FAFC] font-bold">GENOSENSE PROTOTYPE</span>
              <span className="text-[#43E6D1] font-semibold">
                {isBusy ? 'PROCESSING TELEMETRY' : predictionReady ? 'RESULT READY' : 'STANDBY READY'}
              </span>
            </div>

            {/* Simulated Live OLED Screen */}
            <div className="oled-hardware-screen p-5 h-36 flex flex-col justify-between text-center border border-[#162C42] rounded-xl">
              <div className="flex items-center justify-between text-[10px] text-[#43E6D1]/80 border-b border-[#162C42] pb-1">
                <span>SSD1306 OLED</span>
                <span>128×64 MONOCHROME</span>
              </div>

              <div className="flex-1 flex flex-col items-center justify-center py-1">
                {oledStatus === 'READY' && (
                  <div className="space-y-1">
                    <div className="text-xl font-display font-bold tracking-widest text-[#43E6D1]">
                      GENOSENSE
                    </div>
                    <div className="text-xs tracking-wider text-[#43E6D1]/80">READY</div>
                  </div>
                )}

                {isBusy && (
                  <div className="space-y-1 animate-pulse">
                    <div className="text-sm font-display font-bold tracking-widest text-[#43E6D1]">
                      {oledStatus}
                    </div>
                    <div className="text-[10px] text-[#43E6D1]/80">CALCULATING ATTRIBUTION</div>
                  </div>
                )}

                {(predictionReady || oledStatus === 'RESULT READY') && (
                  <div className="space-y-0.5">
                    <div className="text-[10px] text-[#43E6D1]/70 font-mono tracking-widest">
                      GENOSENSE
                    </div>
                    <div className="text-2xl font-display font-black text-[#F5FAFC]">
                      SCORE {riskScore}%
                    </div>
                    <div className="text-xs font-bold text-[#43E6D1] tracking-wider">
                      {riskLevel}
                    </div>
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between text-[9px] text-[#43E6D1]/60 border-t border-[#162C42] pt-1">
                <span>I2C BUS: 0x3C</span>
                <span>STATUS: {oledStatus}</span>
              </div>
            </div>

            {/* The Big Button */}
            <div className="space-y-3 pt-2">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.96 }}
                disabled={isBusy}
                onClick={handlePressAnalyze}
                className="w-full py-4 px-6 rounded-xl bg-[#43E6D1] hover:bg-[#62ebd9] text-[#06111D] font-display font-bold text-base tracking-wider uppercase flex items-center justify-center gap-3 shadow-[0_4px_24px_rgba(67,230,209,0.35)] transition-all cursor-pointer disabled:opacity-50"
              >
                {isBusy ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>ANALYZING SAMPLE...</span>
                  </>
                ) : (
                  <>
                    <CircleDot className="w-5 h-5" />
                    <span>PRESS ANALYZE</span>
                  </>
                )}
              </motion.button>

              {predictionReady && (
                <button
                  onClick={resetDemo}
                  className="w-full py-2.5 px-4 rounded-lg bg-[var(--bg-secondary)] hover:bg-[var(--bg-surface)] border border-[var(--border-color)] text-xs font-mono text-[var(--text-secondary)] hover:text-[var(--text-main)] flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>RESET HARDWARE STATE</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: 7-Stage Visual Data Flow Movement */}
        <div className="lg:col-span-7 space-y-3">
          <div className="text-xs font-mono text-[var(--text-secondary)] uppercase tracking-wider flex items-center justify-between px-1">
            <span>SEQUENCE TELEMETRY</span>
            <span>STAGE {currentStep + 1} OF 7</span>
          </div>

          <div className="space-y-2">
            {stages.map((stage, idx) => {
              const isActive = idx === currentStep;
              const isPast = idx < currentStep;
              const Icon = stage.icon;

              return (
                <div
                  key={stage.num}
                  className={`p-3.5 sm:p-4 rounded-xl border transition-all flex items-center justify-between gap-4 ${
                    isActive
                      ? 'bg-[var(--bg-surface)] border-[var(--primary)] shadow-md ring-1 ring-[var(--primary)]/20'
                      : isPast
                        ? 'bg-[var(--bg-surface)]/80 border-[var(--border-color)] opacity-85'
                        : 'bg-[var(--bg-secondary)]/50 border-[var(--border-color)]/60 opacity-50'
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    <div
                      className={`w-9 h-9 rounded-lg flex items-center justify-center font-mono text-xs font-bold ${
                        isActive
                          ? 'bg-[var(--primary)] text-[var(--primary-text)] animate-pulse'
                          : isPast
                            ? 'bg-[var(--primary)]/20 text-[var(--primary)]'
                            : 'bg-[var(--bg-surface)] text-[var(--text-secondary)]'
                      }`}
                    >
                      {isPast ? <CheckCircle2 className="w-4 h-4" /> : <Icon className="w-4 h-4" />}
                    </div>

                    <div className="text-left">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono text-[var(--primary)] font-bold">
                          0{stage.num}
                        </span>
                        <h4 className="text-sm font-display font-bold text-[var(--text-main)]">
                          {stage.title}
                        </h4>
                      </div>
                      <p className="text-xs text-[var(--text-secondary)] font-sans">
                        {stage.desc}
                      </p>
                    </div>
                  </div>

                  <div className="text-right text-[11px] font-mono">
                    {isActive ? (
                      <span className="text-[var(--primary)] font-bold flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-[var(--primary)] animate-ping" />
                        ACTIVE
                      </span>
                    ) : isPast ? (
                      <span className="text-[var(--text-secondary)]">DONE</span>
                    ) : (
                      <span className="text-[var(--text-secondary)]/60">QUEUED</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
