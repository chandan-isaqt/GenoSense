import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Loader2, Sparkles, Play, Award, ArrowRight } from 'lucide-react';
import { useGenoSenseDemo } from '../../hooks/useGenoSenseDemo';
import { useNavigate } from 'react-router-dom';

const PIPELINE_STEPS = [
  { step: 1, title: 'Load Demo Sample', desc: 'GS-DEMO-001 VCF data mounted' },
  { step: 2, title: 'Extract Markers', desc: 'Scan chromosomes & locate 24 SNPs' },
  { step: 3, title: 'Generate Features', desc: 'Encode genotypes (0, 1, 2) feature vector' },
  { step: 4, title: 'Run Random Forest', desc: '200 ensemble trees bagging inference' },
  { step: 5, title: 'Generate SHAP', desc: 'Compute TreeExplainer attribution scores' },
  { step: 6, title: 'Call Flask API', desc: 'POST /predict & sync payload' },
  { step: 7, title: 'Update Dashboard', desc: 'Reactivity triggered across SPA views' },
  { step: 8, title: 'Update Raspberry Pi', desc: 'Push I2C telemetry to edge device' },
  { step: 9, title: 'Update OLED', desc: 'Render 128x64 RISK: HIGH & SCORE: 73%' },
];

export const FullDemoProgressCard: React.FC = () => {
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

  return (
    <div className="p-6 rounded-2xl bg-navy-950/80 border border-slate-800 glass-panel space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1 rounded bg-cyan-500/10 text-cyan-400">
              <Sparkles className="w-4 h-4" />
            </span>
            <h2 className="text-base font-bold text-white font-mono tracking-wide">
              END-TO-END DEMO WORKFLOW
            </h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Execute the complete automated pipeline from genomic raw input to edge display
          </p>
        </div>

        <button
          onClick={runFullDemo}
          disabled={isRunningFullDemo}
          className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-mono text-xs font-semibold bg-gradient-to-r from-cyan-600 via-cyan-500 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-slate-950 shadow-[0_0_18px_rgba(6,182,212,0.35)] transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
        >
          {isRunningFullDemo ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin text-navy-950" />
              <span>Pipeline Running (Step {fullDemoStep}/9)...</span>
            </>
          ) : (
            <>
              <Play className="w-4 h-4 fill-current text-navy-950" />
              <span>RUN FULL GENOSENSE DEMO</span>
            </>
          )}
        </button>
      </div>

      {/* 9-Step Timeline Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {PIPELINE_STEPS.map((item) => {
          const isDone = predictionReady || fullDemoStep > item.step || (fullDemoStep === 9 && !isRunningFullDemo);
          const isCurrent = isRunningFullDemo && fullDemoStep === item.step;

          return (
            <div
              key={item.step}
              className={`p-3 rounded-xl border transition-all text-xs flex items-start gap-3 ${
                isDone
                  ? 'bg-navy-900/80 border-emerald-500/30 text-slate-200'
                  : isCurrent
                  ? 'bg-cyan-950/40 border-cyan-500/60 shadow-[0_0_12px_rgba(6,182,212,0.2)] text-white'
                  : 'bg-navy-900/30 border-slate-800/60 text-slate-500'
              }`}
            >
              <div className="flex-shrink-0 mt-0.5">
                {isDone ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                ) : isCurrent ? (
                  <Loader2 className="w-4 h-4 text-cyan-400 animate-spin" />
                ) : (
                  <div className="w-4 h-4 rounded-full border border-slate-700 flex items-center justify-center font-mono text-[9px] text-slate-500">
                    {item.step}
                  </div>
                )}
              </div>
              <div className="min-w-0">
                <span className="font-mono font-semibold block truncate">
                  {item.step}. {item.title}
                </span>
                <span className="text-[11px] text-slate-400 block truncate">{item.desc}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Completion Banner */}
      {(predictionReady || (!isRunningFullDemo && fullDemoStep === 9)) && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-5 rounded-2xl bg-gradient-to-r from-cyan-950/40 via-navy-900/80 to-emerald-950/30 border border-cyan-500/40 shadow-xl flex flex-col md:flex-row items-center justify-between gap-4"
        >
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/40">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-widest block">
                ✓ GENOSENSE DEMO COMPLETE
              </span>
              <div className="flex items-center gap-3 mt-1">
                <span className="text-sm text-slate-300 font-mono">
                  Prototype Score: <strong className="text-cyan-400 text-base">{riskScore}%</strong>
                </span>
                <span className="text-slate-600">•</span>
                <span className="text-sm text-slate-300 font-mono">
                  Risk Level:{' '}
                  <strong className="text-rose-400 px-1.5 py-0.5 rounded bg-rose-500/20 border border-rose-500/30 text-xs">
                    {riskLevel}
                  </strong>
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-mono text-slate-400 mr-1">Top Features:</span>
            {topFeatures.map((gene) => (
              <span
                key={gene}
                className="px-2 py-0.5 rounded bg-cyan-950 border border-cyan-700/60 text-cyan-300 text-xs font-mono font-medium"
              >
                {gene}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setReportModalOpen(true)}
              className="px-3.5 py-1.5 rounded-lg text-xs font-mono font-medium bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/40 transition-colors"
            >
              View Report
            </button>
            <button
              onClick={() => navigate('/explainability')}
              className="px-3.5 py-1.5 rounded-lg text-xs font-mono font-medium bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 flex items-center gap-1 transition-colors"
            >
              <span>Explain</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
};
