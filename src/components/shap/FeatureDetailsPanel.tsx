import React from 'react';
import { AlertCircle, Info, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { useGenoSenseDemo } from '../../hooks/useGenoSenseDemo';

export const FeatureDetailsPanel: React.FC = () => {
  const { selectedGene, shapAttributions, selectGene } = useGenoSenseDemo();

  const selectedAttribution =
    shapAttributions.find((item) => item.gene === selectedGene) || shapAttributions[0];

  return (
    <div className="p-6 rounded-2xl bg-navy-950/80 border border-slate-800 space-y-5 glass-panel">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-cyan-500/10 text-cyan-400">
            <Info className="w-4 h-4" />
          </div>
          <h3 className="text-base font-bold font-mono text-white">
            Feature Details
          </h3>
        </div>
        <div className="flex items-center gap-1">
          {shapAttributions.slice(0, 5).map((item) => (
            <button
              key={item.gene}
              onClick={() => selectGene(item.gene)}
              className={`px-2 py-0.5 rounded text-[10px] font-mono transition-colors ${
                selectedAttribution.gene === item.gene
                  ? 'bg-cyan-500 text-slate-950 font-bold'
                  : 'bg-navy-900 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              {item.gene}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-3.5 rounded-xl bg-navy-900/70 border border-slate-800">
          <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block">
            Gene
          </span>
          <span className="text-base font-bold font-mono text-white mt-0.5 block">
            {selectedAttribution.gene}
          </span>
          <span className="text-[10px] text-slate-500 font-mono">({selectedAttribution.rsId})</span>
        </div>

        <div className="p-3.5 rounded-xl bg-navy-900/70 border border-slate-800">
          <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block">
            Feature Value
          </span>
          <span className="text-base font-bold font-mono text-cyan-300 mt-0.5 block">
            {selectedAttribution.featureValue}
          </span>
          <span className="text-[10px] text-slate-500 font-mono">Additive Genotype</span>
        </div>

        <div className="p-3.5 rounded-xl bg-navy-900/70 border border-slate-800">
          <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block">
            Contribution
          </span>
          <div className="flex items-center gap-1 mt-0.5">
            {selectedAttribution.value > 0 ? (
              <ArrowUpRight className="w-4 h-4 text-rose-400" />
            ) : (
              <ArrowDownRight className="w-4 h-4 text-emerald-400" />
            )}
            <span
              className={`text-base font-bold font-mono ${
                selectedAttribution.value > 0 ? 'text-rose-400' : 'text-emerald-400'
              }`}
            >
              {selectedAttribution.value > 0
                ? `+${selectedAttribution.value.toFixed(2)}`
                : selectedAttribution.value.toFixed(2)}
            </span>
          </div>
          <span className="text-[10px] text-slate-500 font-mono">SHAP Log-Odds</span>
        </div>

        <div className="p-3.5 rounded-xl bg-navy-900/70 border border-slate-800">
          <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block">
            Dataset
          </span>
          <span className="text-sm font-bold font-mono text-emerald-300 mt-0.5 block">
            {selectedAttribution.dataset}
          </span>
          <span className="text-[10px] text-slate-500 font-mono">Standard Cohort</span>
        </div>
      </div>

      <div className="p-4 rounded-xl bg-navy-900/60 border border-slate-800/80 space-y-3">
        <div className="flex items-center justify-between text-xs font-mono">
          <span className="text-slate-400">Direction:</span>
          <span
            className={`px-2 py-0.5 rounded font-bold ${
              selectedAttribution.value > 0
                ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
            }`}
          >
            {selectedAttribution.direction}
          </span>
        </div>

        <div className="text-xs space-y-1">
          <span className="text-slate-400 font-mono block">Biological Context:</span>
          <p className="text-slate-200 leading-relaxed">{selectedAttribution.biologicalContext}</p>
        </div>

        <div className="text-xs space-y-1">
          <span className="text-slate-400 font-mono block">Molecular Function:</span>
          <p className="text-cyan-300 font-mono text-[11px]">{selectedAttribution.molecularFunction}</p>
        </div>
      </div>

      <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/25 flex items-start gap-3 text-amber-300 text-xs">
        <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5 text-amber-400" />
        <p className="leading-relaxed">
          <strong className="font-semibold uppercase tracking-wider block font-mono">
            Model Interpretability Caveat:
          </strong>
          “SHAP-style attribution describes model behavior; it does not establish biological causation.”
        </p>
      </div>
    </div>
  );
};
