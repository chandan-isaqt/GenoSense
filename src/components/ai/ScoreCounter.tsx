import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Zap, Layers, Clock, AlertTriangle } from 'lucide-react';
import { useGenoSenseDemo } from '../../hooks/useGenoSenseDemo';

export const ScoreCounter: React.FC = () => {
  const { riskScore, riskLevel, predictionReady, processingTimeMs, randomForestTrees, totalFeatures } =
    useGenoSenseDemo();

  const [counterValue, setCounterValue] = useState(0);

  useEffect(() => {
    if (!predictionReady) {
      setCounterValue(0);
      return;
    }

    let start = 0;
    const target = riskScore;
    const duration = 1200; // ms
    const increment = target / (duration / 25);

    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCounterValue(target);
        clearInterval(timer);
      } else {
        setCounterValue(Math.floor(start));
      }
    }, 25);

    return () => clearInterval(timer);
  }, [predictionReady, riskScore]);

  return (
    <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-navy-950 via-navy-900 to-navy-950 border border-slate-800 glass-panel space-y-6">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div>
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
            PROTOTYPE MODEL OUTPUT
          </span>
          <p className="text-[11px] text-slate-500 font-mono">
            Calibrated Random Forest decision function (Synthetic Demo)
          </p>
        </div>
        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-cyan-400">
          Not Clinical Diagnosis
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        {/* Animated Big Score Display */}
        <div className="flex flex-col items-center justify-center p-6 rounded-2xl bg-navy-950/80 border border-cyan-500/20 shadow-inner text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-radial-gradient from-cyan-500/10 to-transparent pointer-events-none" />

          <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 mb-1">
            PROTOTYPE RISK SCORE
          </span>

          <div className="flex items-baseline justify-center gap-1 my-2">
            <motion.span
              key={counterValue}
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              className="text-6xl sm:text-7xl font-black font-mono text-white tracking-tight"
            >
              {predictionReady ? counterValue : 0}
            </motion.span>
            <span className="text-3xl sm:text-4xl font-mono text-cyan-400 font-bold">%</span>
          </div>

          <div className="mt-2 flex items-center gap-2">
            <span className="text-xs font-mono text-slate-400">RISK LEVEL:</span>
            <span
              className={`px-3 py-1 rounded-lg text-xs font-mono font-bold tracking-wider ${
                predictionReady
                  ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40 shadow-[0_0_12px_rgba(244,63,94,0.3)]'
                  : 'bg-slate-800 text-slate-400'
              }`}
            >
              {predictionReady ? riskLevel : 'STANDBY'}
            </span>
          </div>
        </div>

        {/* Secondary Metrics */}
        <div className="space-y-3">
          <div className="p-3.5 rounded-xl bg-navy-950/60 border border-slate-800/80 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400">
                <Layers className="w-4 h-4" />
              </div>
              <span className="text-xs font-mono text-slate-300">Features Used:</span>
            </div>
            <span className="text-sm font-bold font-mono text-white">
              {totalFeatures || 24}
            </span>
          </div>

          <div className="p-3.5 rounded-xl bg-navy-950/60 border border-slate-800/80 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
                <Zap className="w-4 h-4" />
              </div>
              <span className="text-xs font-mono text-slate-300">Trees:</span>
            </div>
            <span className="text-sm font-bold font-mono text-emerald-400">
              {randomForestTrees || 200}
            </span>
          </div>

          <div className="p-3.5 rounded-xl bg-navy-950/60 border border-slate-800/80 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400">
                <Clock className="w-4 h-4" />
              </div>
              <span className="text-xs font-mono text-slate-300">Processing Time:</span>
            </div>
            <span className="text-sm font-bold font-mono text-purple-300">
              {predictionReady ? `${processingTimeMs}ms` : '42ms (demo)'}
            </span>
          </div>
        </div>
      </div>

      {/* Caution Reminder */}
      <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center gap-2 text-[11px] text-slate-400 font-mono">
        <AlertTriangle className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
        <span>
          Label Compliance: Values represent prototype model output metrics, not clinical diagnostic probabilities.
        </span>
      </div>
    </div>
  );
};
