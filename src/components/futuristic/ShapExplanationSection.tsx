import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, ChevronUp, AlertCircle, Sparkles } from 'lucide-react';
import { useGenoSenseDemo } from '../../hooks/useGenoSenseDemo';

export const ShapExplanationSection: React.FC = () => {
  const [showTechnical, setShowTechnical] = useState(false);
  const { selectGene } = useGenoSenseDemo();

  const shapContributions = [
    {
      gene: 'GENE-A',
      rsId: 'rs1800629',
      value: +0.31,
      direction: 'Increases risk estimate',
      featureValue: 2,
      pathway: 'Pro-inflammatory cytokine signaling pathway locus',
    },
    {
      gene: 'GENE-B',
      rsId: 'rs1800896',
      value: +0.19,
      direction: 'Increases risk estimate',
      featureValue: 1,
      pathway: 'IL-10 anti-inflammatory cytokine promoter region',
    },
    {
      gene: 'GENE-D',
      rsId: 'rs4986790',
      value: +0.08,
      direction: 'Moderate positive weight',
      featureValue: 1,
      pathway: 'Toll-like receptor 4 pathogen recognition receptor',
    },
    {
      gene: 'GENE-C',
      rsId: 'rs2430561',
      value: -0.07,
      direction: 'Decreases risk estimate',
      featureValue: 0,
      pathway: 'Interferon gamma innate viral defense locus',
    },
  ];

  return (
    <section id="shap" className="py-20 border-t border-[var(--border-color)]/70 space-y-12">
      {/* Section Header (Section 18) */}
      <div className="max-w-3xl space-y-3 text-left">
        <span className="text-xs font-mono text-[var(--primary)] uppercase tracking-widest block font-semibold">
          EXPLAINABLE AI (XAI)
        </span>
        <h2 className="text-4xl sm:text-5xl font-display font-bold text-[var(--text-main)] tracking-tight">
          Why did the model produce this output?
        </h2>
        <p className="text-base sm:text-lg text-[var(--text-secondary)] font-sans leading-relaxed">
          These features had the strongest influence on the model output for this demonstration sample.
        </p>
      </div>

      {/* Main Animated Contribution Experience */}
      <div className="product-card p-8 sm:p-12 space-y-8 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[var(--border-color)] pb-4 text-xs font-mono text-[var(--text-secondary)]">
          <span className="font-bold text-[var(--text-main)] uppercase tracking-wider flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[var(--primary)]" />
            MODEL OUTPUT DECOMPOSITION
          </span>
          <div className="flex items-center gap-4">
            <span className="text-[var(--primary)] font-bold">+ Positive Influence</span>
            <span className="text-[var(--secondary)] font-bold">- Negative Influence</span>
          </div>
        </div>

        {/* 4 Feature Contribution Bars */}
        <div className="space-y-4 max-w-3xl mx-auto font-mono">
          {shapContributions.map((item, index) => {
            const isPositive = item.value > 0;
            const barWidth = Math.min((Math.abs(item.value) / 0.35) * 100, 100);

            return (
              <motion.div
                key={item.gene}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.12 }}
                onClick={() => selectGene(item.gene)}
                className="p-5 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-color)] space-y-2 cursor-pointer hover:border-[var(--primary)] transition-all"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-display font-bold text-base text-[var(--text-main)]">
                      {item.gene}
                    </span>
                    <span className="text-xs text-[var(--text-secondary)] font-mono">({item.rsId})</span>
                  </div>

                  <span
                    className={`font-display font-bold text-lg ${
                      isPositive ? 'text-[var(--primary)]' : 'text-[var(--secondary)]'
                    }`}
                  >
                    {item.value > 0 ? `+${item.value.toFixed(2)}` : item.value.toFixed(2)}
                  </span>
                </div>

                {/* Animated Horizontal Bar */}
                <div className="w-full h-2.5 bg-[var(--bg-surface)] rounded-full overflow-hidden flex border border-[var(--border-color)]">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${barWidth}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 + index * 0.1 }}
                    className={`h-full rounded-full ${
                      isPositive ? 'bg-[var(--primary)]' : 'bg-[var(--secondary)]'
                    }`}
                  />
                </div>

                <div className="flex items-center justify-between text-[11px] text-[var(--text-secondary)]">
                  <span>{item.direction}</span>
                  <span>Feature Dosage: {item.featureValue}</span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Plain Language Summary */}
        <div className="max-w-2xl mx-auto text-center space-y-2 pt-2">
          <p className="text-sm font-sans text-[var(--text-main)] font-medium">
            “These features had the strongest influence on the model output for this demonstration sample.”
          </p>
        </div>

        {/* Expandable Technical Explanation Toggle */}
        <div className="text-center pt-2">
          <button
            onClick={() => setShowTechnical(!showTechnical)}
            className="btn-secondary-product text-xs inline-flex items-center gap-2 py-2 px-4 cursor-pointer"
          >
            <span>TECHNICAL EXPLANATION</span>
            {showTechnical ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>

        {/* Technical Detail Content */}
        {showTechnical && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="p-6 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-color)] space-y-4 text-xs font-mono text-left max-w-3xl mx-auto"
          >
            <div className="flex items-center justify-between border-b border-[var(--border-color)] pb-2 text-[var(--primary)] font-bold">
              <span>TREESHAP POLYNOMIAL COMPUTATION</span>
              <span>BASE VALUE: E[f(x)] = 0.22</span>
            </div>
            <p className="text-[var(--text-secondary)] font-sans leading-relaxed">
              TreeSHAP calculates exact additive feature attributions in polynomial time $O(TLD^2)$. Each value represents the log-odds deviation of the predicted phenotype relative to the population expected value.
            </p>
            <div className="p-3 rounded bg-[var(--bg-secondary)] border border-[var(--border-color)] flex items-center gap-2 text-[var(--warning)]">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>Attributions explain model behavior; they do not establish biological clinical causation.</span>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};
