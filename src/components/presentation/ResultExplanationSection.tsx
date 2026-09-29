import React, { useState } from 'react';
import { ChevronDown, ChevronUp, AlertCircle, Info, Sparkles } from 'lucide-react';
import { useGenoSenseDemo } from '../../hooks/useGenoSenseDemo';

export const ResultExplanationSection: React.FC = () => {
  const [showTechnical, setShowTechnical] = useState(false);
  const { shapAttributions, selectedGene } = useGenoSenseDemo();

  const selectedAttribution =
    shapAttributions.find((item) => item.gene === selectedGene) || shapAttributions[0];

  return (
    <section className="space-y-6 py-12 border-t border-[var(--border-color)]">
      {/* Section Header */}
      <div className="max-w-3xl space-y-3">
        <span className="text-[11px] font-mono text-[var(--primary)] uppercase tracking-widest block">
          08 • PLAIN-LANGUAGE EXPLANATION
        </span>
        <h2 className="text-3xl sm:text-4xl font-display font-bold text-[var(--text-main)] tracking-tight">
          Why are these genes shown?
        </h2>
        <p className="text-base text-[var(--text-main)] font-medium leading-relaxed">
          “These are the features that had the strongest influence on the machine-learning model's output for this demonstration sample.”
        </p>
        <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
          Unlike ordinary AI systems that give you a number and keep the reasoning secret, GenoSense computes which specific genetic markers pushed the score higher or pulled it lower.
        </p>
      </div>

      {/* Progressive Disclosure Toggle Button */}
      <div className="pt-2">
        <button
          onClick={() => setShowTechnical(!showTechnical)}
          className="btn-lab-secondary text-xs flex items-center gap-2 py-2.5 px-4 shadow-sm"
        >
          <Info className="w-4 h-4 text-[var(--primary)]" />
          <span>{showTechnical ? 'HIDE TECHNICAL EXPLANATION' : 'SHOW TECHNICAL EXPLANATION'}</span>
          {showTechnical ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
      </div>

      {/* Expandable Technical Explanation Block */}
      {showTechnical && (
        <div className="lab-card p-6 sm:p-8 space-y-6 border-l-4 border-l-[var(--secondary)] animate-fadeIn">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[var(--border-color)] pb-3">
            <span className="text-xs font-mono font-bold text-[var(--secondary)] uppercase tracking-wider flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              TREESHAP MATHEMATICAL ATTRIBUTION FORMULATION
            </span>
            <span className="text-[11px] font-mono text-[var(--text-secondary)]">
              Additive Feature Attribution: g(z') = φ₀ + ∑ φᵢz'ᵢ
            </span>
          </div>

          <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
            TreeSHAP computes exact Shapley values from cooperative game theory in polynomial time. For each tree in the Random Forest ensemble, it computes the expected marginal contribution of a feature across all subset combinations of the 24 input loci.
          </p>

          {/* Interactive Feature Inspector */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3 font-mono text-xs">
            <div className="p-3 rounded bg-[var(--bg-secondary)] border border-[var(--border-color)]">
              <span className="text-[10px] text-[var(--text-secondary)] uppercase block">INSPECTED GENE</span>
              <span className="text-sm font-bold text-[var(--primary)] mt-1 block">
                {selectedAttribution.gene}
              </span>
              <span className="text-[10px] text-[var(--text-secondary)]">({selectedAttribution.rsId})</span>
            </div>

            <div className="p-3 rounded bg-[var(--bg-secondary)] border border-[var(--border-color)]">
              <span className="text-[10px] text-[var(--text-secondary)] uppercase block">SHAP VALUE (LOG-ODDS)</span>
              <span className="text-sm font-bold text-[var(--text-main)] mt-1 block">
                {selectedAttribution.value > 0
                  ? `+${selectedAttribution.value.toFixed(2)}`
                  : selectedAttribution.value.toFixed(2)}
              </span>
              <span className="text-[10px] text-[var(--text-secondary)]">Marginal deviation</span>
            </div>

            <div className="p-3 rounded bg-[var(--bg-secondary)] border border-[var(--border-color)]">
              <span className="text-[10px] text-[var(--text-secondary)] uppercase block">FEATURE VALUE</span>
              <span className="text-sm font-bold text-[var(--text-main)] mt-1 block">
                Dosage: {selectedAttribution.featureValue}
              </span>
              <span className="text-[10px] text-[var(--text-secondary)]">0=Ref, 1=Het, 2=Alt</span>
            </div>

            <div className="p-3 rounded bg-[var(--bg-secondary)] border border-[var(--border-color)]">
              <span className="text-[10px] text-[var(--text-secondary)] uppercase block">ATTRIBUTION DIRECTION</span>
              <span className="text-xs font-bold text-[var(--primary)] mt-1 block truncate">
                {selectedAttribution.direction}
              </span>
              <span className="text-[10px] text-[var(--text-secondary)]">Shifts score toward High</span>
            </div>
          </div>

          {/* Pathway Context & Caveat */}
          <div className="p-4 rounded bg-[var(--bg-secondary)] border border-[var(--border-color)] space-y-2 text-xs">
            <div className="font-mono text-[11px] text-[var(--text-secondary)] uppercase tracking-wider font-semibold">
              Observed Pathway Context:
            </div>
            <p className="text-[var(--text-main)] font-sans leading-relaxed">
              {selectedAttribution.biologicalContext}
            </p>
          </div>

          <div className="p-3 rounded bg-[var(--bg-secondary)] border border-[var(--border-color)] text-xs font-mono text-[var(--text-secondary)] flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-[var(--warning)] flex-shrink-0" />
            <span>
              <strong>Crucial Interpretability Note:</strong> SHAP explains model behavior; it does not establish biological causation.
            </span>
          </div>
        </div>
      )}
    </section>
  );
};
