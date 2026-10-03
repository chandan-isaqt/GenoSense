import React from 'react';
import { Play, RotateCcw, HelpCircle, CheckCircle2, Loader2 } from 'lucide-react';
import { useGenoSenseDemo } from '../../hooks/useGenoSenseDemo';

interface FuturisticLiveDemoAreaProps {
  onSeeWhy?: () => void;
}

export const FuturisticLiveDemoArea: React.FC<FuturisticLiveDemoAreaProps> = ({ onSeeWhy }) => {
  const handleSeeWhy = () => {
    if (onSeeWhy) {
      onSeeWhy();
    } else {
      const el = document.getElementById('shap') || document.getElementById('ai');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };
  const {
    runFullDemo,
    resetDemo,
    isRunningFullDemo,
    fullDemoStep,
    predictionReady,
    riskScore,
    riskLevel,
    oledStatus,
  } = useGenoSenseDemo();

  const stages = [
    { name: 'DATA', step: 1, done: predictionReady || fullDemoStep > 1 },
    { name: 'FEATURES', step: 2, done: predictionReady || fullDemoStep > 2 },
    { name: 'AI', step: 4, done: predictionReady || fullDemoStep > 4 },
    { name: 'EXPLAIN', step: 5, done: predictionReady || fullDemoStep > 5 },
    { name: 'RESULT', step: 6, done: predictionReady || fullDemoStep >= 6 },
  ];

  return (
    <section id="demo" className="py-24 border-t border-[var(--border-color)]/70 space-y-12">
      {/* Section Header */}
      <div className="max-w-3xl space-y-3 text-left">
        <span className="text-xs font-mono text-[var(--primary)] uppercase tracking-widest block font-semibold">
          IMMERSIVE TEST BENCH
        </span>
        <h2 className="text-4xl sm:text-5xl font-display font-bold text-[var(--text-main)] tracking-tight">
          Now, try GenoSense yourself.
        </h2>
        <p className="text-base text-[var(--text-secondary)] font-sans leading-relaxed">
          Trigger the full end-to-end simulation. Watch the data move from raw sample extraction through AI and SHAP attribution, landing directly on the OLED hardware.
        </p>
      </div>

      {/* Main Demo Enclosure Stage */}
      <div className="product-card p-8 sm:p-14 relative overflow-hidden shadow-2xl space-y-10">
        {/* Progress Pipeline Strip */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 font-mono text-xs max-w-2xl mx-auto">
          {stages.map((st, i) => (
            <React.Fragment key={st.name}>
              <div
                className={`px-3 py-1.5 rounded-full border transition-all flex items-center gap-2 ${
                  st.done
                    ? 'bg-[var(--bg-surface)] border-[var(--primary)] text-[var(--primary)] font-bold shadow-sm'
                    : isRunningFullDemo && fullDemoStep === st.step
                    ? 'bg-[var(--bg-secondary)] border-[var(--primary)] text-[var(--primary)] animate-pulse'
                    : 'bg-[var(--bg-secondary)] border-[var(--border-color)] text-[var(--text-secondary)]/60'
                }`}
              >
                {st.done ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-[var(--primary)]" />
                ) : (
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--border-color)]" />
                )}
                <span>{st.name}</span>
              </div>
              {i < stages.length - 1 && (
                <span className="text-[var(--border-color)] hidden sm:inline">&rarr;</span>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Central Physical Device Display */}
        <div className="max-w-md mx-auto p-8 rounded-2xl bg-[#091522] border-2 border-[#1B3650] shadow-2xl space-y-5 text-center select-none">
          <div className="flex items-center justify-between text-xs font-mono text-[#8EA2B3] border-b border-[#162C42] pb-2">
            <span>GENOSENSE INSTRUMENT</span>
            <span className="text-[#42E8D1]">OLED 128×64</span>
          </div>

          {/* OLED Screen */}
          <div className="oled-hardware-screen p-5 h-36 flex flex-col justify-between text-center border border-[#162C42]">
            <div className="flex items-center justify-between text-[9px] text-[#42E8D1]/80 border-b border-[#162C42] pb-1">
              <span>STATUS: {oledStatus}</span>
              <span>I2C: 0x3C</span>
            </div>

            <div className="py-1">
              {predictionReady ? (
                <div className="space-y-0.5">
                  <div className="text-[10px] text-[#42E8D1]/80 font-mono">ANALYSIS COMPLETE</div>
                  <div className="text-3xl font-display font-black text-[#F5FAFC]">
                    {riskScore}%
                  </div>
                  <div className="text-xs font-bold text-[#42E8D1]">{riskLevel}</div>
                </div>
              ) : isRunningFullDemo ? (
                <div className="space-y-1 animate-pulse">
                  <div className="text-sm font-display font-bold text-[#42E8D1]">
                    PROCESSING PIPELINE...
                  </div>
                  <div className="text-[10px] text-[#42E8D1]/80">STEP 0{fullDemoStep} OF 09</div>
                </div>
              ) : (
                <div className="space-y-1">
                  <div className="text-lg font-display font-bold text-[#42E8D1]">READY</div>
                  <div className="text-[10px] text-[#42E8D1]/80">PRESS RUN LIVE DEMO</div>
                </div>
              )}
            </div>

            <div className="text-[8px] text-[#42E8D1]/60 border-t border-[#162C42] pt-1">
              <span>EDGE TELEMETRY BUFFER</span>
            </div>
          </div>

          {/* Status Message */}
          <div className="text-xs font-mono text-[#8EA2B3]">
            {isRunningFullDemo
              ? 'Device and Web synchronizing in real time...'
              : predictionReady
              ? '✓ Pipeline execution verified'
              : 'Standby mode awaiting execution'}
          </div>
        </div>

        {/* Action Buttons: [ RUN LIVE DEMO ] / [ SEE WHY ] / [ RUN AGAIN ] */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          {!predictionReady ? (
            <button
              onClick={runFullDemo}
              disabled={isRunningFullDemo}
              className="btn-primary-product flex items-center gap-2.5 text-sm py-4 px-8 cursor-pointer disabled:opacity-50"
            >
              {isRunningFullDemo ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>RUNNING DEMO...</span>
                </>
              ) : (
                <>
                  <Play className="w-5 h-5 fill-current" />
                  <span>RUN LIVE DEMO</span>
                </>
              )}
            </button>
          ) : (
            <>
              <button
                onClick={handleSeeWhy}
                className="btn-primary-product flex items-center gap-2 text-sm py-3.5 px-6 cursor-pointer"
              >
                <HelpCircle className="w-4 h-4" />
                <span>SEE WHY</span>
              </button>

              <button
                onClick={resetDemo}
                className="btn-secondary-product flex items-center gap-2 text-sm py-3.5 px-6 cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                <span>RUN AGAIN</span>
              </button>
            </>
          )}
        </div>
      </div>
    </section>
  );
};
