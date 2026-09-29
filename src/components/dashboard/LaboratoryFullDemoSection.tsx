import React from 'react';
import { motion } from 'framer-motion';
import { Play, CheckCircle2, Loader2, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useGenoSenseDemo } from '../../hooks/useGenoSenseDemo';

export const LaboratoryFullDemoSection: React.FC = () => {
  const navigate = useNavigate();
  const {
    isRunningFullDemo,
    fullDemoStep,
    runFullDemo,
    predictionReady,
    riskScore,
    riskLevel,
    topFeatures,
    setReportModalOpen,
  } = useGenoSenseDemo();

  const demoSteps = [
    { num: 'STEP 01', label: 'Loading sample', sub: 'Mounting GS-DEMO-001 VCF file' },
    { num: 'STEP 02', label: 'Extracting markers', sub: 'Scanning GRCh38 candidate SNP loci' },
    { num: 'STEP 03', label: 'Generating features', sub: 'Additive genotype numerical vectors' },
    { num: 'STEP 04', label: 'Running Random Forest', sub: '200 trees bagging inference' },
    { num: 'STEP 05', label: 'Generating SHAP explanation', sub: 'TreeExplainer polynomial attribution' },
    { num: 'STEP 06', label: 'Calling API', sub: 'POST /predict & REST payload delivery' },
    { num: 'STEP 07', label: 'Updating dashboard', sub: 'Synchronizing reactive SPA state' },
    { num: 'STEP 08', label: 'Updating Raspberry Pi', sub: 'Transmitting edge telemetry over Wi-Fi' },
    { num: 'STEP 09', label: 'Updating OLED', sub: 'I2C buffer render: RISK HIGH | 73%' },
  ];

  return (
    <section className="space-y-6 pt-6">
      {/* Huge CTA Card */}
      <div className="lab-card p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[var(--border-color)] pb-5">
          <div>
            <span className="text-[11px] font-mono text-[var(--primary)] uppercase tracking-widest block">
              AUTONOMOUS SYSTEM WORKFLOW
            </span>
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-[var(--text-main)] mt-1">
              RUN FULL GENOSENSE DEMO
            </h2>
            <p className="text-xs sm:text-sm font-mono text-[var(--text-secondary)] mt-1">
              Executes the end-to-end multi-tier pipeline in sequential automated steps
            </p>
          </div>

          <button
            onClick={runFullDemo}
            disabled={isRunningFullDemo}
            className="btn-lab-primary text-sm flex items-center justify-center gap-2 py-3 px-6 shadow-none disabled:opacity-50"
          >
            {isRunningFullDemo ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-[var(--primary-text)]" />
                <span>EXECUTING STEP 0{fullDemoStep}/09...</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-current text-[var(--primary-text)]" />
                <span>START AUTONOMOUS PIPELINE</span>
              </>
            )}
          </button>
        </div>

        {/* 9 Sequential Steps Display */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 font-mono">
          {demoSteps.map((st, index) => {
            const stepNum = index + 1;
            const isDone = predictionReady || fullDemoStep > stepNum || (fullDemoStep === 9 && !isRunningFullDemo);
            const isCurrent = isRunningFullDemo && fullDemoStep === stepNum;

            return (
              <div
                key={st.num}
                className={`p-3.5 rounded-[3px] border transition-all text-xs flex items-start gap-3 ${
                  isDone
                    ? 'bg-[var(--bg-surface)] border-[var(--border-color)] text-[var(--text-main)]'
                    : isCurrent
                    ? 'bg-[var(--bg-surface)] border-[var(--primary)] text-[var(--primary)] shadow-sm'
                    : 'bg-[var(--bg-secondary)] border-[var(--border-color)]/60 text-[var(--text-secondary)]/70'
                }`}
              >
                <div className="flex-shrink-0 mt-0.5">
                  {isDone ? (
                    <CheckCircle2 className="w-4 h-4 text-[var(--primary)]" />
                  ) : isCurrent ? (
                    <Loader2 className="w-4 h-4 text-[var(--primary)] animate-spin" />
                  ) : (
                    <span className="w-4 h-4 rounded-full border border-[var(--border-color)] flex items-center justify-center text-[10px] text-[var(--text-secondary)]">
                      {stepNum}
                    </span>
                  )}
                </div>

                <div className="min-w-0">
                  <div className="flex items-center gap-1.5 font-bold">
                    <span className="text-[10px] text-[var(--text-secondary)]">{st.num}</span>
                    <span className="truncate">{st.label}</span>
                  </div>
                  <span className="text-[10px] text-[var(--text-secondary)] block truncate mt-0.5">{st.sub}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Completion Result Dossier */}
        {(predictionReady || (!isRunningFullDemo && fullDemoStep === 9)) && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 rounded-[3px] bg-[var(--bg-secondary)] border border-[var(--primary)] space-y-4 shadow-sm"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[var(--border-color)] pb-4">
              <div>
                <span className="text-xs font-mono font-bold text-[var(--primary)] uppercase tracking-widest block">
                  ✓ SYSTEM ANALYSIS COMPLETE
                </span>
                <div className="flex items-baseline gap-3 mt-1">
                  <span className="text-4xl font-display font-black text-[var(--text-main)]">
                    {riskScore}%
                  </span>
                  <span className="px-2 py-0.5 rounded-[2px] bg-[var(--bg-surface)] border border-[var(--danger)]/50 text-[var(--danger)] font-mono text-xs font-bold uppercase">
                    {riskLevel}
                  </span>
                  <span className="text-xs font-mono text-[var(--text-secondary)]">
                    (MODEL SCORE • NON-CLINICAL)
                  </span>
                </div>
              </div>

              {/* TOP FEATURES */}
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-mono text-[var(--text-secondary)]">TOP FEATURES:</span>
                {topFeatures.map((gene) => (
                  <span
                    key={gene}
                    className="px-2.5 py-1 rounded-[2px] bg-[var(--bg-surface)] border border-[var(--border-color)] text-[var(--primary)] text-xs font-mono font-bold"
                  >
                    {gene}
                  </span>
                ))}
              </div>
            </div>

            {/* Quick Action Navigation */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <button
                onClick={() => navigate('/explainability')}
                className="btn-lab-primary text-xs py-2 px-4 flex items-center gap-1.5"
              >
                <span>VIEW EXPLANATION</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => navigate('/hardware')}
                className="btn-lab-secondary text-xs py-2 px-4 flex items-center gap-1.5"
              >
                <span>VIEW HARDWARE</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => setReportModalOpen(true)}
                className="btn-lab-secondary text-xs py-2 px-4 flex items-center gap-1.5"
              >
                <span>VIEW REPORT</span>
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};
