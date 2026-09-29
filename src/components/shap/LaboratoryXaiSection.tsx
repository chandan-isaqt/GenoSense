import React from 'react';
import { AlertCircle, Info } from 'lucide-react';
import { useGenoSenseDemo } from '../../hooks/useGenoSenseDemo';

export const LaboratoryXaiSection: React.FC = () => {
  const { selectedGene, selectGene, shapAttributions } = useGenoSenseDemo();

  const selectedAttribution =
    shapAttributions.find((item) => item.gene === selectedGene) || shapAttributions[0];

  return (
    <section className="space-y-6 pt-6">
      {/* Section Header */}
      <div className="border-b border-[var(--border-color)] pb-4">
        <span className="text-[11px] font-mono text-[var(--primary)] uppercase tracking-widest block">
          SECTION 04 — EXPLAINABLE AI
        </span>
        <h2 className="text-2xl sm:text-3xl font-display font-bold text-[var(--text-main)] mt-1">
          Why did the model produce this output?
        </h2>
        <p className="text-xs sm:text-sm font-mono text-[var(--text-secondary)] mt-1">
          Local TreeSHAP attribution measuring feature influence on baseline probability
        </p>
      </div>

      {/* Main Grid: SHAP Horizontal Contribution Chart on Left, Feature Inspector on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Left: Clean Horizontal Contribution Graph */}
        <div className="lg:col-span-7 lab-card p-6 flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between border-b border-[var(--border-color)] pb-3 text-xs font-mono text-[var(--text-secondary)]">
            <span className="uppercase tracking-wider">SHAP ATTRIBUTION (LOG-ODDS)</span>
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1.5 text-[var(--primary)] font-semibold">
                <span className="w-2 h-2 rounded-[1px] bg-[var(--primary)]" /> + Positive
              </span>
              <span className="flex items-center gap-1.5 text-[var(--text-secondary)]">
                <span className="w-2 h-2 rounded-[1px] bg-[var(--text-secondary)]" /> - Negative
              </span>
            </div>
          </div>

          {/* Horizontal Contribution Bars */}
          <div className="space-y-3 font-mono text-xs">
            {shapAttributions.slice(0, 5).map((item) => {
              const isSelected = selectedGene === item.gene;
              const isPositive = item.value >= 0;
              const absVal = Math.abs(item.value);
              const percentage = Math.min((absVal / 0.35) * 100, 100);

              return (
                <div
                  key={item.gene}
                  onClick={() => selectGene(item.gene)}
                  className={`p-3 rounded-[3px] border cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-[var(--bg-secondary)] border-[var(--primary)] shadow-sm'
                      : 'bg-[var(--bg-secondary)]/50 border-[var(--border-color)] hover:border-[var(--primary)]/50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-[var(--text-main)]">{item.gene}</span>
                      <span className="text-[10px] text-[var(--text-secondary)]">({item.rsId})</span>
                    </div>
                    <span
                      className={`font-display font-bold text-sm ${
                        isPositive ? 'text-[var(--primary)]' : 'text-[var(--text-secondary)]'
                      }`}
                    >
                      {item.value > 0 ? `+${item.value.toFixed(2)}` : item.value.toFixed(2)}
                    </span>
                  </div>

                  {/* Horizontal Bar */}
                  <div className="w-full h-1.5 bg-[var(--bg-primary)] rounded-[1px] overflow-hidden flex border border-[var(--border-color)]/30">
                    <div
                      className={`h-full transition-all duration-300 ${
                        isPositive ? 'bg-[var(--primary)]' : 'bg-[var(--text-secondary)]'
                      }`}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="pt-2 border-t border-[var(--border-color)] text-[10px] font-mono text-[var(--text-secondary)] flex items-center justify-between">
            <span>Click any gene row to inspect low-level attribution profile</span>
            <span className="text-[var(--primary)] font-semibold">BASE VALUE: E[f(x)] = 0.22</span>
          </div>
        </div>

        {/* Right: FEATURE INSPECTOR */}
        <div className="lg:col-span-5 lab-card p-6 flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between border-b border-[var(--border-color)] pb-3 text-xs font-mono text-[var(--text-secondary)]">
            <span className="uppercase tracking-wider flex items-center gap-1.5 text-[var(--primary)] font-semibold">
              <Info className="w-3.5 h-3.5" />
              FEATURE INSPECTOR
            </span>
            <span className="text-[var(--text-main)] font-bold">{selectedAttribution.gene}</span>
          </div>

          {/* Gene Specifications */}
          <div className="space-y-3 font-mono text-xs">
            <div className="p-3 bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-[2px] flex items-center justify-between">
              <span className="text-[var(--text-secondary)] text-[11px] uppercase">FEATURE VALUE</span>
              <span className="font-display font-bold text-base text-[var(--text-main)]">
                {selectedAttribution.featureValue}
              </span>
            </div>

            <div className="p-3 bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-[2px] flex items-center justify-between">
              <span className="text-[var(--text-secondary)] text-[11px] uppercase">MODEL CONTRIBUTION</span>
              <span
                className={`font-display font-bold text-base ${
                  selectedAttribution.value >= 0 ? 'text-[var(--primary)]' : 'text-[var(--text-secondary)]'
                }`}
              >
                {selectedAttribution.value > 0
                  ? `+${selectedAttribution.value.toFixed(2)}`
                  : selectedAttribution.value.toFixed(2)}
              </span>
            </div>

            <div className="p-3 bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-[2px] flex items-center justify-between">
              <span className="text-[var(--text-secondary)] text-[11px] uppercase">DIRECTION</span>
              <span className="text-[var(--text-main)] font-bold text-xs uppercase">
                {selectedAttribution.direction}
              </span>
            </div>

            <div className="p-3 bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-[2px] flex items-center justify-between">
              <span className="text-[var(--text-secondary)] text-[11px] uppercase">DATA SOURCE</span>
              <span className="text-[var(--secondary)] font-bold text-xs">
                {selectedAttribution.dataset}
              </span>
            </div>
          </div>

          {/* Biological Context */}
          <div className="p-3 bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-[2px] space-y-1">
            <span className="text-[10px] font-mono text-[var(--text-secondary)] uppercase tracking-wider block">
              Observed Pathway Context:
            </span>
            <p className="text-xs text-[var(--text-main)] font-sans leading-relaxed">
              {selectedAttribution.biologicalContext}
            </p>
          </div>

          {/* Mandatory Interpretability Caveat */}
          <div className="p-3 rounded-[2px] bg-[var(--bg-secondary)] border border-[var(--border-color)] text-xs font-mono text-[var(--text-secondary)] flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-[var(--warning)] flex-shrink-0 mt-0.5" />
            <p className="leading-snug">
              “SHAP explains model behavior; it does not establish biological causation.”
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
