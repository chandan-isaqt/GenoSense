import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CircleDot, Loader2, Sparkles, RefreshCw, Dna } from 'lucide-react';
import { useGenoSenseDemo } from '../../hooks/useGenoSenseDemo';

export const LiveDeviceSimulation: React.FC = () => {
  const {
    oledStatus,
    triggerHardwareAnalyzeButton,
    resetDemo,
    riskScore,
    riskLevel,
    predictionReady,
    topFeatures,
    totalMarkers,
  } = useGenoSenseDemo();

  const [isPressed, setIsPressed] = useState(false);

  const isBusy =
    oledStatus === 'ANALYZING...' ||
    oledStatus === 'CONNECTING...' ||
    oledStatus === 'CONNECTING API...' ||
    oledStatus === 'AI PROCESSING...' ||
    oledStatus === 'EXPLAINING...';

  const handlePressAnalyze = async () => {
    if (isBusy) return;
    setIsPressed(true);
    setTimeout(() => setIsPressed(false), 200);
    await triggerHardwareAnalyzeButton();
  };

  return (
    <section id="device-sim" className="space-y-8 py-12 border-t border-[var(--border-color)]">
      {/* Section Header */}
      <div className="max-w-3xl space-y-3">
        <span className="text-[11px] font-mono text-[var(--primary)] uppercase tracking-widest block">
          05 • LIVE DEVICE SIMULATION
        </span>
        <h2 className="text-3xl sm:text-4xl font-display font-bold text-[var(--text-main)] tracking-tight">
          Try the Device
        </h2>
        <p className="text-base text-[var(--text-secondary)] font-sans leading-relaxed">
          Press the tactile hardware button below. Watch the OLED state machine cycle through the API request, and observe both the edge device and web dashboard update in real time.
        </p>
      </div>

      {/* Main Interactive Bench with Split-Screen Sync (Web + Hardware) */}
      <div className="lab-card p-6 sm:p-10 space-y-8 shadow-xl">
        {/* Device Controls Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[var(--border-color)] pb-4">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-[var(--primary)] animate-ping" />
            <span className="font-mono text-xs text-[var(--text-main)] font-bold tracking-wider">
              HARDWARE-IN-THE-LOOP SIMULATOR
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={resetDemo}
              disabled={isBusy}
              className="btn-lab-secondary text-xs flex items-center gap-1.5 py-1.5 px-3 disabled:opacity-50"
              title="Reset to Standby"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>RESET STANDBY</span>
            </button>
          </div>
        </div>

        {/* Center: THE PUSH BUTTON (Main Interactive Trigger) */}
        <div className="max-w-md mx-auto text-center space-y-3">
          <motion.button
            whileTap={{ scale: 0.95, y: 3 }}
            animate={{ y: isPressed ? 3 : 0 }}
            disabled={isBusy}
            onClick={handlePressAnalyze}
            className="w-full py-4 px-8 rounded-lg bg-[var(--primary)] text-[var(--primary-text)] font-display font-bold text-base tracking-widest uppercase flex items-center justify-center gap-3 shadow-lg hover:shadow-xl hover:opacity-95 active:opacity-90 transition-all cursor-pointer disabled:opacity-50"
          >
            {isBusy ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>PROCESSING SAMPLE...</span>
              </>
            ) : (
              <>
                <CircleDot className="w-5 h-5 animate-pulse" />
                <span>PRESS ANALYZE</span>
              </>
            )}
          </motion.button>
          <span className="text-[11px] font-mono text-[var(--text-secondary)] block">
            Clicking triggers the full 5-stage edge execution pipeline
          </span>
        </div>

        {/* Section 15 Split Screen: WEB DASHBOARD (Left) + OLED SCREEN (Right) with "SYNCED" between them */}
        <div className="grid grid-cols-1 lg:grid-cols-11 gap-6 items-center pt-4">
          {/* LEFT: WEB DASHBOARD VIEWPORT */}
          <div className="lg:col-span-5 lab-card p-6 space-y-4 text-left border-l-4 border-l-[var(--primary)] shadow-sm">
            <div className="flex items-center justify-between text-xs font-mono text-[var(--text-secondary)] border-b border-[var(--border-color)] pb-2.5">
              <span className="font-bold text-[var(--text-main)] flex items-center gap-1.5">
                <Dna className="w-4 h-4 text-[var(--primary)]" />
                WEB DASHBOARD VIEW
              </span>
              <span className="text-[10px] text-[var(--primary)]">SPA CLIENT</span>
            </div>

            <div className="space-y-3">
              <div className="p-4 rounded bg-[var(--bg-secondary)] border border-[var(--border-color)] text-center">
                <span className="text-[10px] font-mono uppercase text-[var(--text-secondary)] tracking-widest block">
                  PROTOTYPE RISK SCORE
                </span>
                <div className="text-5xl font-display font-black text-[var(--text-main)] tracking-tight my-1">
                  {predictionReady ? `${riskScore}%` : isBusy ? '...' : '73%'}
                </div>
                <span className="inline-block px-2.5 py-0.5 rounded text-[11px] font-mono font-bold uppercase bg-[var(--bg-surface)] border border-[var(--danger)]/50 text-[var(--danger)]">
                  {predictionReady ? riskLevel : isBusy ? 'COMPUTING' : 'HIGH'}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                <div className="p-2.5 rounded bg-[var(--bg-secondary)] border border-[var(--border-color)]">
                  <span className="text-[10px] text-[var(--text-secondary)] block">SAMPLE</span>
                  <span className="text-xs font-bold text-[var(--text-main)]">GS-DEMO-001</span>
                </div>
                <div className="p-2.5 rounded bg-[var(--bg-secondary)] border border-[var(--border-color)]">
                  <span className="text-[10px] text-[var(--text-secondary)] block">MARKERS</span>
                  <span className="text-xs font-bold text-[var(--primary)]">{totalMarkers || 24} Loci</span>
                </div>
              </div>

              <div className="p-2.5 rounded bg-[var(--bg-secondary)] border border-[var(--border-color)] flex items-center justify-between text-xs font-mono">
                <span className="text-[var(--text-secondary)]">TOP GENES:</span>
                <span className="text-[var(--primary)] font-bold">{topFeatures.join(' • ')}</span>
              </div>
            </div>
          </div>

          {/* MIDDLE: SYNCED BADGE */}
          <div className="lg:col-span-1 flex flex-col items-center justify-center my-2 lg:my-0">
            <div className="p-3 rounded-full bg-[var(--bg-secondary)] border-2 border-[var(--primary)] text-[var(--primary)] shadow-md flex flex-col items-center gap-1">
              <Sparkles className="w-5 h-5 animate-spin" />
              <span className="text-[9px] font-mono font-bold tracking-widest uppercase">
                SYNCED
              </span>
            </div>
            <div className="text-[10px] font-mono text-[var(--text-secondary)] mt-2 text-center hidden lg:block">
              WI-FI STREAM
            </div>
          </div>

          {/* RIGHT: OLED SCREEN (Always Physically Authentic) */}
          <div className="lg:col-span-5 p-6 rounded-xl bg-[#070C12] border-2 border-[#182532] text-left space-y-3 font-mono shadow-2xl">
            <div className="flex items-center justify-between text-xs text-[#8B9AAA] border-b border-[#182532] pb-2">
              <span className="font-bold text-[#35D6C7] flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#35D6C7] animate-pulse" />
                PHYSICAL OLED VIEW
              </span>
              <span className="text-[10px] text-[#8B9AAA]">SSD1306 (128×64)</span>
            </div>

            {/* OLED Monitor Shell */}
            <div className="oled-container rounded-lg p-5 h-44 flex flex-col justify-between text-center select-none shadow-inner border border-[#182532]">
              <div className="flex items-center justify-between text-[9px] text-[#35D6C7]/80 border-b border-[#182532] pb-1">
                <span>GENOSENSE EDGE v1.2</span>
                <span>I2C: 0x3C</span>
              </div>

              {/* Dynamic OLED Status Sequence */}
              <div className="flex-1 flex flex-col items-center justify-center py-2">
                {oledStatus === 'READY' && (
                  <div className="space-y-1">
                    <div className="text-xl font-display font-bold tracking-widest text-[#35D6C7]">
                      GENOSENSE
                    </div>
                    <div className="text-xs tracking-wider text-[#35D6C7]/80">
                      READY FOR SAMPLE
                    </div>
                  </div>
                )}

                {oledStatus === 'ANALYZING...' && (
                  <div className="space-y-1 animate-pulse">
                    <div className="text-sm font-display font-bold tracking-widest text-[#35D6C7]">
                      ANALYZING...
                    </div>
                    <div className="text-[10px] text-[#35D6C7]/80">
                      EXTRACTING 24 MARKERS
                    </div>
                  </div>
                )}

                {oledStatus === 'CONNECTING...' && (
                  <div className="space-y-1 animate-pulse">
                    <div className="text-sm font-display font-bold tracking-widest text-[#35D6C7]">
                      CONNECTING...
                    </div>
                    <div className="text-[10px] text-[#35D6C7]/80">
                      API GATEWAY WI-FI
                    </div>
                  </div>
                )}

                {oledStatus === 'AI PROCESSING...' && (
                  <div className="space-y-1 animate-pulse">
                    <div className="text-sm font-display font-bold tracking-widest text-[#35D6C7]">
                      AI PROCESSING...
                    </div>
                    <div className="text-[10px] text-[#35D6C7]/80">
                      200 RANDOM FOREST TREES
                    </div>
                  </div>
                )}

                {oledStatus === 'EXPLAINING...' && (
                  <div className="space-y-1 animate-pulse">
                    <div className="text-sm font-display font-bold tracking-widest text-[#35D6C7]">
                      EXPLAINING...
                    </div>
                    <div className="text-[10px] text-[#35D6C7]/80">
                      SHAP LOCAL ATTRIBUTION
                    </div>
                  </div>
                )}

                {oledStatus === 'RESULT READY' && (
                  <div className="space-y-0.5">
                    <div className="text-[10px] text-[#35D6C7]/70 font-mono tracking-widest">
                      GENOSENSE
                    </div>
                    <div className="text-xl font-display font-black text-[#F4F7FA]">
                      PROTOTYPE: {riskScore}%
                    </div>
                    <div className="text-xs font-bold text-[#35D6C7]">
                      LEVEL: {riskLevel}
                    </div>
                  </div>
                )}

                {oledStatus === 'STANDBY' && (
                  <div className="text-xs text-[#35D6C7]/70">
                    GENOSENSE • STANDBY
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between text-[8px] text-[#35D6C7]/60 border-t border-[#182532] pt-1">
                <span>BAUD: 400kHz</span>
                <span>SYNC: ACTIVE</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
