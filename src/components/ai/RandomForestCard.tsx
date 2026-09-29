import React from 'react';
import { motion } from 'framer-motion';
import { TreeDeciduous, Loader2, Play, CheckCircle2, Cpu, Activity } from 'lucide-react';
import { useGenoSenseDemo } from '../../hooks/useGenoSenseDemo';

export const RandomForestCard: React.FC = () => {
  const {
    modelRunning,
    predictionReady,
    runAiPrediction,
    predictionProgress,
    predictionStepName,
    randomForestTrees,
    totalFeatures,
  } = useGenoSenseDemo();

  const steps = [
    { title: 'Preparing features', desc: 'Vectorizing 24 encoded alleles', threshold: 20 },
    { title: 'Loading model', desc: 'Pre-trained ensemble estimators', threshold: 45 },
    { title: 'Running trees', desc: 'Parallel bagging branch voting (200 trees)', threshold: 70 },
    { title: 'Aggregating output', desc: 'Majority consensus and probability calibration', threshold: 90 },
    { title: 'Calculating prototype score', desc: 'Normalizing output index to [0-100%]', threshold: 100 },
  ];

  return (
    <div className="p-6 sm:p-8 rounded-2xl bg-navy-950/80 border border-cyan-500/30 shadow-[0_10px_35px_rgba(0,0,0,0.5)] space-y-6 glass-panel relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.2)]">
            <TreeDeciduous className="w-7 h-7" />
          </div>
          <div>
            <h2 className="text-xl font-black text-white font-mono tracking-wide">
              RANDOM FOREST
            </h2>
            <div className="flex items-center gap-3 mt-1 text-xs font-mono text-slate-400">
              <span className="flex items-center gap-1 text-cyan-300">
                <Cpu className="w-3.5 h-3.5 text-cyan-400" />
                Model: {randomForestTrees || 200} Trees
              </span>
              <span>•</span>
              <span>Features: {totalFeatures || 24} Inputs</span>
              <span>•</span>
              <span className="text-emerald-400">Bagging Ensemble</span>
            </div>
          </div>
        </div>

        <button
          onClick={runAiPrediction}
          disabled={modelRunning}
          className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-mono text-xs sm:text-sm font-semibold bg-gradient-to-r from-cyan-500 via-cyan-400 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-navy-950 shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
        >
          {modelRunning ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin text-navy-950" />
              <span>Running AI Ensemble...</span>
            </>
          ) : (
            <>
              <Play className="w-4 h-4 fill-current text-navy-950" />
              <span>{predictionReady ? 'Re-Run AI Analysis' : 'Run AI Analysis'}</span>
            </>
          )}
        </button>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-xs font-mono">
          <span className="text-cyan-400 flex items-center gap-1.5">
            <Activity className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
            {predictionStepName}
          </span>
          <span className="text-slate-400 font-bold">{predictionProgress}%</span>
        </div>
        <div className="h-2 w-full bg-slate-900 rounded-full overflow-hidden border border-slate-800">
          <motion.div
            className="h-full bg-gradient-to-r from-cyan-400 via-blue-500 to-emerald-400 shadow-[0_0_12px_rgba(6,182,212,0.8)]"
            initial={{ width: 0 }}
            animate={{ width: `${predictionProgress}%` }}
            transition={{ ease: 'easeInOut', duration: 0.3 }}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
        {steps.map((st, i) => {
          const isComplete = predictionProgress >= st.threshold;
          const isCurrent =
            predictionProgress > (i === 0 ? 0 : steps[i - 1].threshold) &&
            predictionProgress < st.threshold;

          return (
            <div
              key={st.title}
              className={`p-3 rounded-xl border text-xs transition-all ${
                isComplete
                  ? 'bg-navy-900/80 border-emerald-500/40 text-slate-200'
                  : isCurrent
                  ? 'bg-cyan-950/40 border-cyan-500 shadow-[0_0_12px_rgba(6,182,212,0.2)] text-white'
                  : 'bg-navy-900/30 border-slate-800/60 text-slate-500'
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="font-mono text-[10px] text-slate-400">0{i + 1}</span>
                {isComplete ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                ) : isCurrent ? (
                  <Loader2 className="w-3.5 h-3.5 text-cyan-400 animate-spin" />
                ) : (
                  <span className="w-3 h-3 rounded-full border border-slate-700 block" />
                )}
              </div>
              <h4 className="font-mono font-bold leading-tight">{st.title}</h4>
              <p className="text-[10px] text-slate-400 mt-1 leading-snug">{st.desc}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
