import React from 'react';
import { Laptop, Monitor, RefreshCw } from 'lucide-react';
import { useGenoSenseDemo } from '../../hooks/useGenoSenseDemo';
import { getOledScreenContent } from '../../services/deviceService';

export const WebDeviceSyncPanel: React.FC = () => {
  const { analysisResult, oledStep, isAnalyzing } = useGenoSenseDemo();
  const oledContent = getOledScreenContent(oledStep, analysisResult);

  const displayScore = analysisResult ? `${analysisResult.primaryScore}%` : '—';
  const displayCategory = analysisResult
    ? analysisResult.primaryCategory
    : isAnalyzing
      ? 'CALCULATING...'
      : 'WAITING FOR RUN';

  return (
    <section className="space-y-6 text-left">
      <div className="space-y-2">
        <span className="text-xs font-mono uppercase tracking-widest text-[var(--primary)] font-semibold block">
          SHARED STATE SYNCHRONIZATION
        </span>
        <h2 className="text-2xl sm:text-3xl font-display font-bold text-[var(--text-main)]">
          One Analysis. Two Interfaces.
        </h2>
        <p className="text-sm text-[var(--text-secondary)] max-w-2xl">
          Both the web application and the simulated OLED screen subscribe to the same analysis output state.
        </p>
      </div>

      <div className="product-card p-6 sm:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-11 gap-6 items-center">
          {/* Left: Web Result */}
          <div className="lg:col-span-5 p-6 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-color)] space-y-4">
            <div className="flex items-center justify-between text-xs font-mono border-b border-[var(--border-color)] pb-2.5">
              <span className="font-bold text-[var(--text-main)] flex items-center gap-2">
                <Laptop className="w-4 h-4 text-[var(--primary)]" />
                WEB RESULT
              </span>
              <span className="text-[var(--primary)]">
                {analysisResult ? analysisResult.sample.sampleId : 'READY'}
              </span>
            </div>

            <div className="py-4 text-center space-y-1">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[var(--text-secondary)] block">
                {analysisResult
                  ? analysisResult.primaryCondition.conditionTitle
                  : 'PRIMARY PROTOTYPE OUTPUT'}
              </span>
              <div className="text-5xl font-display font-bold text-[var(--text-main)]">
                {displayScore}
              </div>
              <div className="pt-1">
                <span className="inline-block px-3 py-1 rounded text-xs font-mono font-bold bg-[var(--bg-surface)] text-[var(--primary)] border border-[var(--border-color)]">
                  {displayCategory}
                </span>
              </div>
            </div>
          </div>

          {/* Center: SYNCED Badge */}
          <div className="lg:col-span-1 flex flex-col items-center justify-center">
            <div className="px-3 py-2 rounded-full bg-[var(--bg-surface)] border border-[var(--primary)] text-[var(--primary)] text-[11px] font-mono font-bold uppercase tracking-widest flex items-center gap-1.5 shadow-sm">
              <RefreshCw
                className={`w-3.5 h-3.5 ${isAnalyzing ? 'animate-spin' : ''}`}
              />
              <span>SYNCED</span>
            </div>
          </div>

          {/* Right: Physical OLED Screen */}
          <div className="lg:col-span-5 p-6 rounded-xl bg-[#06111D] border border-[#1B3852] space-y-4">
            <div className="flex items-center justify-between text-xs font-mono text-[#8EA2B3] border-b border-[#162C42] pb-2.5">
              <span className="font-bold text-[#43E6D1] flex items-center gap-2">
                <Monitor className="w-4 h-4" />
                OLED
              </span>
              <span className="text-[10px] text-[#43E6D1]">128×64 I2C</span>
            </div>

            <div className="oled-hardware-screen p-5 h-32 rounded-lg border border-[#162C42] flex flex-col justify-between text-center font-mono">
              <div className="text-[10px] text-[#43E6D1]/80 tracking-widest">
                {oledContent.line1}
              </div>
              <div className="text-3xl font-display font-bold text-[#F5FAFC]">
                {analysisResult ? `${analysisResult.primaryScore}%` : oledContent.line2}
              </div>
              <div className="text-xs font-bold text-[#43E6D1] tracking-wider">
                {analysisResult ? analysisResult.primaryCategory : oledContent.line3}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
