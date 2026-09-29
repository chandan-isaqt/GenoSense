import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Loader2, Dna, Play } from 'lucide-react';
import { useGenoSenseDemo } from '../../hooks/useGenoSenseDemo';

export const ExtractionPipelineProgress: React.FC = () => {
  const {
    sampleLoaded,
    markersExtracted,
    extractMarkers,
    extractionProgress,
    extractionStepName,
    loadDemoSample,
  } = useGenoSenseDemo();

  const isExtracting = extractionProgress > 0 && extractionProgress < 100;

  const steps = [
    { title: 'Reading VCF', threshold: 25, desc: 'Parsing headers & variant columns' },
    { title: 'Locating markers', threshold: 50, desc: 'Matching target SNP chromosome positions' },
    { title: 'Encoding genotypes', threshold: 75, desc: 'Converting 0/0, 0/1, 1/1 into numeric values' },
    { title: 'Building feature vector', threshold: 100, desc: 'Assembling 24-dimensional normalized array' },
  ];

  const handleStartExtraction = () => {
    if (!sampleLoaded) {
      loadDemoSample();
    }
    extractMarkers();
  };

  return (
    <div className="p-6 rounded-2xl bg-navy-950/80 border border-slate-800 space-y-6 glass-panel">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-4">
        <div>
          <h3 className="text-base font-bold font-mono text-white flex items-center gap-2">
            <Dna className="w-5 h-5 text-cyan-400" />
            Genetic Marker Extraction Pipeline
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Engineered bio-feature transformation for downstream Random Forest ensemble
          </p>
        </div>

        <button
          onClick={handleStartExtraction}
          disabled={isExtracting}
          className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-mono text-xs font-semibold bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-[0_0_15px_rgba(6,182,212,0.3)] transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
        >
          {isExtracting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin text-navy-950" />
              <span>Extracting Features...</span>
            </>
          ) : markersExtracted ? (
            <>
              <CheckCircle2 className="w-4 h-4 text-navy-950" />
              <span>Re-Extract Genetic Markers</span>
            </>
          ) : (
            <>
              <Play className="w-4 h-4 fill-current text-navy-950" />
              <span>Extract Genetic Markers</span>
            </>
          )}
        </button>
      </div>

      {/* Progress Bar */}
      <div className="space-y-2">
        <div className="flex justify-between text-xs font-mono">
          <span className="text-cyan-400">{extractionStepName}</span>
          <span className="text-slate-400 font-bold">{extractionProgress}%</span>
        </div>
        <div className="h-2 w-full bg-slate-900 rounded-full overflow-hidden border border-slate-800">
          <motion.div
            className="h-full bg-gradient-to-r from-cyan-500 via-blue-500 to-emerald-400 shadow-[0_0_12px_rgba(6,182,212,0.8)]"
            initial={{ width: 0 }}
            animate={{ width: `${extractionProgress}%` }}
            transition={{ ease: 'easeInOut', duration: 0.3 }}
          />
        </div>
      </div>

      {/* 4 Sequential Visual Steps */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {steps.map((st, i) => {
          const isComplete = extractionProgress >= st.threshold;
          const isCurrent =
            extractionProgress > (i === 0 ? 0 : steps[i - 1].threshold) &&
            extractionProgress < st.threshold;

          return (
            <div
              key={st.title}
              className={`p-3.5 rounded-xl border text-xs transition-all ${
                isComplete
                  ? 'bg-navy-900/80 border-emerald-500/40 text-slate-200'
                  : isCurrent
                  ? 'bg-cyan-950/40 border-cyan-500 shadow-[0_0_12px_rgba(6,182,212,0.2)] text-white'
                  : 'bg-navy-900/30 border-slate-800/60 text-slate-500'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-[10px] text-slate-400">Step 0{i + 1}</span>
                {isComplete ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                ) : isCurrent ? (
                  <Loader2 className="w-4 h-4 text-cyan-400 animate-spin" />
                ) : (
                  <span className="w-3.5 h-3.5 rounded-full border border-slate-700 block" />
                )}
              </div>
              <h4 className="font-mono font-bold">{st.title}</h4>
              <p className="text-[11px] text-slate-400 mt-1">{st.desc}</p>
            </div>
          );
        })}
      </div>

      {/* Completion Banner */}
      {markersExtracted && (
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-500/40 text-emerald-300 text-xs font-mono flex items-center justify-between gap-3 shadow-[0_0_15px_rgba(16,185,129,0.15)]"
        >
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
            <div>
              <span className="font-bold text-sm block">24 genomic features extracted.</span>
              <span className="text-[11px] text-emerald-400/80">
                Homogeneous numeric encoding completed. Ready for Random Forest classification.
              </span>
            </div>
          </div>
          <span className="px-2.5 py-1 rounded bg-emerald-900/50 border border-emerald-700/60 text-emerald-200 text-xs">
            Status: READY
          </span>
        </motion.div>
      )}
    </div>
  );
};
