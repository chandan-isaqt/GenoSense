import React from 'react';
import {
  Play,
  RotateCcw,
  CheckCircle2,
  Loader2,
  Cpu,
  Monitor,
  Dna,
  Binary,
  TreeDeciduous,
  Activity,
  Sparkles,
  AlertCircle,
  FileText,
} from 'lucide-react';
import { useGenoSenseDemo } from '../hooks/useGenoSenseDemo';
import { SYNTHETIC_DISCLAIMER } from '../data/demoData';

export const LiveDemoPage: React.FC = () => {
  const {
    runFullDemo,
    resetDemo,
    isRunningFullDemo,
    fullDemoStep,
    predictionReady,
    riskScore,
    riskLevel,
    oledStatus,
    setReportModalOpen,
  } = useGenoSenseDemo();

  const demoFlowSteps = [
    { key: 'ready', label: 'DEVICE READY', desc: 'Hardware initialized and listening on I2C bus', icon: Cpu },
    { key: 'btn', label: 'PRESS ANALYZE', desc: 'Hardware interrupt signal dispatched from GPIO Pin 17', icon: Play },
    { key: 'vcf', label: 'GENOMIC DATA', desc: 'Synthetic sample GS-DEMO-001 read from VCF format', icon: Dna },
    { key: 'markers', label: 'MARKER EXTRACTION', desc: '24 candidate disease loci isolated by genomic coordinates', icon: Binary },
    { key: 'ai', label: 'AI (RANDOM FOREST)', desc: '200 decision trees evaluate feature vector consensus', icon: TreeDeciduous },
    { key: 'shap', label: 'SHAP ATTRIBUTION', desc: 'TreeSHAP calculates marginal feature influences', icon: Sparkles },
    { key: 'api', label: 'API DISPATCH', desc: 'Flask REST API formats JSON response in 238ms', icon: Activity },
    { key: 'oled', label: 'OLED UPDATE', desc: 'Hardware screen displays SCORE 73% HIGH', icon: Monitor },
    { key: 'dash', label: 'DASHBOARD SYNC', desc: 'Web telemetry synchronizes simultaneously with full metrics', icon: CheckCircle2 },
  ];

  return (
    <div className="py-8 space-y-10 animate-fadeIn text-left max-w-6xl mx-auto">
      {/* Top Banner */}
      <div className="p-6 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-color)] flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-sm">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-[var(--bg-surface)] text-[var(--primary)] text-xs font-mono uppercase tracking-widest font-semibold border border-[var(--border-color)]">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--primary)] animate-pulse" />
            <span>LIVE INTERACTIVE ENVIRONMENT</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-display font-bold text-[var(--text-main)]">
            GenoSense Live Demo
          </h1>
          <p className="text-sm text-[var(--text-secondary)] font-sans">
            Experience the complete end-to-end execution from hardware trigger to explainable AI output.
          </p>
        </div>

        {/* Primary Action Button */}
        <div className="flex items-center gap-3">
          <button
            onClick={runFullDemo}
            disabled={isRunningFullDemo}
            className="btn-primary-product flex items-center gap-2 py-3 px-6 text-sm cursor-pointer shadow-lg disabled:opacity-50"
          >
            {isRunningFullDemo ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>PROCESSING PIPELINE...</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-current" />
                <span>RUN GENOSENSE DEMO</span>
              </>
            )}
          </button>

          {predictionReady && (
            <button
              onClick={resetDemo}
              className="p-3 rounded-lg bg-[var(--bg-surface)] border border-[var(--border-color)] text-[var(--text-secondary)] hover:text-[var(--text-main)] hover:bg-[var(--bg-elevated)] transition-colors cursor-pointer"
              title="Reset Demo"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Main Dual Stage: Telemetry & Flow (Left) + Hardware Dual Display (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Synchronized 9-Step Progress Flow */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between text-xs font-mono text-[var(--text-secondary)] px-1">
            <span>PIPELINE EXECUTION SEQUENCE</span>
            <span>{isRunningFullDemo ? 'ACTIVE TRANSMISSION' : predictionReady ? 'COMPLETE' : 'AWAITING RUN'}</span>
          </div>

          <div className="space-y-2">
            {demoFlowSteps.map((step, idx) => {
              const isActive = isRunningFullDemo && fullDemoStep === idx;
              const isPast = predictionReady || (isRunningFullDemo && fullDemoStep > idx);
              const Icon = step.icon;

              return (
                <div
                  key={step.key}
                  className={`p-3.5 rounded-xl border transition-all flex items-center justify-between gap-4 ${
                    isActive
                      ? 'bg-[var(--bg-surface)] border-[var(--primary)] shadow-md ring-1 ring-[var(--primary)]/30'
                      : isPast
                        ? 'bg-[var(--bg-surface)]/80 border-[var(--border-color)]'
                        : 'bg-[var(--bg-secondary)]/40 border-[var(--border-color)]/50 opacity-60'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center font-mono text-xs font-bold ${
                        isActive
                          ? 'bg-[var(--primary)] text-[var(--primary-text)] animate-pulse'
                          : isPast
                            ? 'bg-[var(--primary)]/20 text-[var(--primary)]'
                            : 'bg-[var(--bg-surface)] text-[var(--text-secondary)]'
                      }`}
                    >
                      {isPast ? <CheckCircle2 className="w-4 h-4" /> : <Icon className="w-4 h-4" />}
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono text-[var(--primary)] font-bold">
                          0{idx + 1}
                        </span>
                        <h4 className="text-sm font-display font-bold text-[var(--text-main)]">
                          {step.label}
                        </h4>
                      </div>
                      <p className="text-xs text-[var(--text-secondary)] font-sans">
                        {step.desc}
                      </p>
                    </div>
                  </div>

                  <span className="text-[10px] font-mono font-bold text-[var(--text-secondary)]">
                    {isActive ? (
                      <span className="text-[var(--primary)] flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-[var(--primary)] animate-ping" />
                        RUNNING
                      </span>
                    ) : isPast ? (
                      <span className="text-[var(--primary)]">PASS</span>
                    ) : (
                      'READY'
                    )}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Hardware Dual Interface (OLED + Web Telemetry) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Hardware OLED Box (Always dark) */}
          <div className="p-6 rounded-2xl bg-[#07111D] border-2 border-[#1B3852] shadow-2xl space-y-4">
            <div className="flex items-center justify-between text-xs font-mono text-[#8EA2B3] border-b border-[#162C42] pb-3">
              <span className="text-[#F5FAFC] font-bold flex items-center gap-2">
                <Monitor className="w-4 h-4 text-[#43E6D1]" />
                HARDWARE OLED
              </span>
              <span className="text-[10px] text-[#43E6D1]">SSD1306 (128×64)</span>
            </div>

            {/* OLED Hardware Display */}
            <div className="oled-hardware-screen p-5 h-36 flex flex-col justify-between text-center border border-[#162C42] rounded-xl">
              <div className="flex items-center justify-between text-[9px] text-[#43E6D1]/80">
                <span>GENOSENSE</span>
                <span>STATUS: {oledStatus}</span>
              </div>

              <div className="flex-1 flex flex-col items-center justify-center py-1">
                {predictionReady ? (
                  <div className="space-y-0.5">
                    <div className="text-[10px] text-[#43E6D1]/80 font-mono tracking-widest">
                      GENOSENSE
                    </div>
                    <div className="text-3xl font-display font-black text-[#F5FAFC]">
                      SCORE {riskScore}%
                    </div>
                    <div className="text-xs font-bold text-[#43E6D1] tracking-wider">
                      {riskLevel}
                    </div>
                  </div>
                ) : (
                  <div className="space-y-1">
                    <div className="text-sm font-display font-bold tracking-widest text-[#43E6D1]">
                      {oledStatus}
                    </div>
                    <div className="text-[10px] text-[#43E6D1]/70">
                      {isRunningFullDemo ? 'INFERENCE ACTIVE' : 'PRESS RUN DEMO'}
                    </div>
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between text-[9px] text-[#43E6D1]/60 border-t border-[#162C42] pt-1">
                <span>I2C BUS: 400 kHz</span>
                <span>ARM64 LINKED</span>
              </div>
            </div>
          </div>

          {/* Web Dashboard Metric Card */}
          <div className="product-card p-6 space-y-4 shadow-xl">
            <div className="flex items-center justify-between text-xs font-mono text-[var(--text-secondary)] border-b border-[var(--border-color)] pb-3">
              <span className="text-[var(--text-main)] font-bold">SYNCHRONIZED WEB METRICS</span>
              <span className="text-[var(--primary)] font-bold">SAMPLE: GS-DEMO-001</span>
            </div>

            <div className="grid grid-cols-2 gap-3 text-center">
              <div className="p-3 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-color)]">
                <span className="text-[10px] font-mono text-[var(--text-secondary)] uppercase block">
                  PROTOTYPE SCORE
                </span>
                <span className="text-3xl font-display font-black text-[var(--text-main)]">
                  {predictionReady ? `${riskScore}%` : '73%'}
                </span>
              </div>

              <div className="p-3 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-color)]">
                <span className="text-[10px] font-mono text-[var(--text-secondary)] uppercase block">
                  PROTOTYPE LEVEL
                </span>
                <span className="text-3xl font-display font-black text-[var(--danger)]">
                  {predictionReady ? riskLevel : 'HIGH'}
                </span>
              </div>
            </div>

            {/* Disease Prototypes */}
            <div className="p-3 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-color)] text-xs font-mono space-y-1.5">
              <div className="text-[10px] text-[var(--text-secondary)] uppercase tracking-wider font-semibold">
                DISEASE PROTOTYPE OUTPUTS (SYNTHETIC)
              </div>
              <div className="flex items-center justify-between text-[var(--text-main)]">
                <span>Dengue Prototype:</span>
                <span className="font-bold text-[var(--primary)]">73% (High)</span>
              </div>
              <div className="flex items-center justify-between text-[var(--text-main)]">
                <span>Allergy Susceptibility:</span>
                <span className="font-bold">62% (Moderate)</span>
              </div>
              <div className="flex items-center justify-between text-[var(--text-main)]">
                <span>Typhoid Vulnerability:</span>
                <span className="font-bold">41% (Low)</span>
              </div>
            </div>

            {/* Action to View Report Dossier */}
            <button
              onClick={() => setReportModalOpen(true)}
              className="w-full py-2.5 px-4 rounded-lg bg-[var(--bg-surface)] hover:bg-[var(--bg-elevated)] border border-[var(--border-color)] text-xs font-mono text-[var(--primary)] font-bold flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>VIEW FULL SCIENTIFIC DOSSIER</span>
            </button>
          </div>
        </div>
      </div>

      {/* Prominent Scientific Disclaimer */}
      <div className="p-5 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-color)] flex items-start gap-3.5 text-xs text-[var(--text-secondary)] font-mono leading-relaxed">
        <AlertCircle className="w-4 h-4 text-[var(--warning)] flex-shrink-0 mt-0.5" />
        <div>
          <strong className="text-[var(--warning)] font-bold uppercase mr-1">Scientific Notice:</strong>
          {SYNTHETIC_DISCLAIMER}
        </div>
      </div>
    </div>
  );
};

export default LiveDemoPage;
