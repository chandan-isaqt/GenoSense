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
      <div className="border-b border-[#182532] pb-4">
        <span className="text-[11px] font-mono text-[#35D6C7] uppercase tracking-widest block">
          SECTION 04 — EXPLAINABLE AI
        </span>
        <h2 className="text-2xl sm:text-3xl font-display font-bold text-[#F4F7FA] mt-1">
          Why did the model produce this output?
        </h2>
        <p className="text-xs sm:text-sm font-mono text-[#8B9AAA] mt-1">
          Local TreeSHAP attribution measuring feature influence on baseline probability
        </p>
      </div>

      {/* Main Grid: SHAP Horizontal Contribution Chart on Left, Feature Inspector on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Left: Clean Horizontal Contribution Graph */}
        <div className="lg:col-span-7 lab-card p-6 flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between border-b border-[#182532] pb-3 text-xs font-mono text-[#8B9AAA]">
            <span className="uppercase tracking-wider">SHAP ATTRIBUTION (LOG-ODDS)</span>
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1.5 text-[#35D6C7]">
                <span className="w-2 h-2 rounded-[1px] bg-[#35D6C7]" /> + Positive
              </span>
              <span className="flex items-center gap-1.5 text-[#8B9AAA]">
                <span className="w-2 h-2 rounded-[1px] bg-[#8B9AAA]" /> - Negative
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
                      ? 'bg-[#05080D] border-[#35D6C7]'
                      : 'bg-[#05080D]/60 border-[#182532] hover:border-[#35D6C7]/50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-[#F4F7FA]">{item.gene}</span>
                      <span className="text-[10px] text-[#8B9AAA]">({item.rsId})</span>
                    </div>
                    <span
                      className={`font-display font-bold text-sm ${
                        isPositive ? 'text-[#35D6C7]' : 'text-[#8B9AAA]'
                      }`}
                    >
                      {item.value > 0 ? `+${item.value.toFixed(2)}` : item.value.toFixed(2)}
                    </span>
                  </div>

                  {/* Horizontal Bar */}
                  <div className="w-full h-1.5 bg-[#080D14] rounded-[1px] overflow-hidden flex">
                    <div
                      className={`h-full transition-all duration-300 ${
                        isPositive ? 'bg-[#35D6C7]' : 'bg-[#8B9AAA]'
                      }`}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="pt-2 border-t border-[#182532] text-[10px] font-mono text-[#8B9AAA] flex items-center justify-between">
            <span>Click any gene row to inspect low-level attribution profile</span>
            <span className="text-[#35D6C7]">BASE VALUE: E[f(x)] = 0.22</span>
          </div>
        </div>

        {/* Right: FEATURE INSPECTOR */}
        <div className="lg:col-span-5 lab-card p-6 flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between border-b border-[#182532] pb-3 text-xs font-mono text-[#8B9AAA]">
            <span className="uppercase tracking-wider flex items-center gap-1.5 text-[#35D6C7]">
              <Info className="w-3.5 h-3.5" />
              FEATURE INSPECTOR
            </span>
            <span className="text-[#F4F7FA] font-bold">{selectedAttribution.gene}</span>
          </div>

          {/* Gene Specifications */}
          <div className="space-y-3 font-mono text-xs">
            <div className="p-3 bg-[#05080D] border border-[#182532] rounded-[2px] flex items-center justify-between">
              <span className="text-[#8B9AAA] text-[11px] uppercase">FEATURE VALUE</span>
              <span className="font-display font-bold text-base text-[#F4F7FA]">
                {selectedAttribution.featureValue}
              </span>
            </div>

            <div className="p-3 bg-[#05080D] border border-[#182532] rounded-[2px] flex items-center justify-between">
              <span className="text-[#8B9AAA] text-[11px] uppercase">MODEL CONTRIBUTION</span>
              <span
                className={`font-display font-bold text-base ${
                  selectedAttribution.value >= 0 ? 'text-[#35D6C7]' : 'text-[#8B9AAA]'
                }`}
              >
                {selectedAttribution.value > 0
                  ? `+${selectedAttribution.value.toFixed(2)}`
                  : selectedAttribution.value.toFixed(2)}
              </span>
            </div>

            <div className="p-3 bg-[#05080D] border border-[#182532] rounded-[2px] flex items-center justify-between">
              <span className="text-[#8B9AAA] text-[11px] uppercase">DIRECTION</span>
              <span className="text-[#F4F7FA] font-bold text-xs uppercase">
                {selectedAttribution.direction}
              </span>
            </div>

            <div className="p-3 bg-[#05080D] border border-[#182532] rounded-[2px] flex items-center justify-between">
              <span className="text-[#8B9AAA] text-[11px] uppercase">DATA SOURCE</span>
              <span className="text-[#4DA3FF] font-bold text-xs">
                {selectedAttribution.dataset}
              </span>
            </div>
          </div>

          {/* Biological Context */}
          <div className="p-3 bg-[#05080D] border border-[#182532] rounded-[2px] space-y-1">
            <span className="text-[10px] font-mono text-[#8B9AAA] uppercase tracking-wider block">
              Observed Pathway Context:
            </span>
            <p className="text-xs text-[#F4F7FA] font-sans leading-relaxed">
              {selectedAttribution.biologicalContext}
            </p>
          </div>

          {/* Mandatory Interpretability Caveat */}
          <div className="p-3 rounded-[2px] bg-[#05080D] border border-[#182532] text-xs font-mono text-[#8B9AAA] flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-[#F5B942] flex-shrink-0 mt-0.5" />
            <p className="leading-snug">
              “SHAP explains model behavior; it does not establish biological causation.”
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
