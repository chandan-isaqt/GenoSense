import React from 'react';
import { motion } from 'framer-motion';
import { TreeDeciduous } from 'lucide-react';
import { useGenoSenseDemo } from '../../hooks/useGenoSenseDemo';

export const InsideIntelligenceSection: React.FC = () => {
  const { predictionReady, riskScore, riskLevel } = useGenoSenseDemo();

  return (
    <section id="ai" className="py-20 border-t border-[var(--border-color)]/70 space-y-12">
      {/* Section Header */}
      <div className="max-w-3xl space-y-3 text-left">
        <span className="text-xs font-mono text-[var(--primary)] uppercase tracking-widest block font-semibold">
          MACHINE LEARNING CORE
        </span>
        <h2 className="text-4xl sm:text-5xl font-display font-bold text-[var(--text-main)] tracking-tight">
          Inside the intelligence.
        </h2>
        <p className="text-base text-[var(--text-secondary)] font-sans leading-relaxed">
          Behind the physical hardware lies an ensemble of 200 bagging decision trees that evaluate multi-locus genetic interactions.
        </p>
      </div>

      {/* Large Immersive Tree Convergence Visual */}
      <div className="product-card p-8 sm:p-14 relative overflow-hidden text-center space-y-10 shadow-xl">
        {/* Soft background radial pulse */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[350px] bg-[var(--primary)]/5 rounded-full blur-3xl pointer-events-none" />

        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--bg-secondary)] border border-[var(--border-color)] text-xs font-mono uppercase tracking-widest text-[var(--primary)]">
          <TreeDeciduous className="w-4 h-4" />
          <span>RANDOM FOREST ENSEMBLE • 200 TREES</span>
        </div>

        {/* Dynamic Tree Convergence Graphic */}
        <div className="relative max-w-2xl mx-auto py-6">
          {/* Subtle Converging Lines */}
          <div className="grid grid-cols-6 sm:grid-cols-10 gap-2 mb-6 opacity-60">
            {Array.from({ length: 30 }).map((_, i) => (
              <motion.div
                key={i}
                className="h-12 w-full rounded bg-[var(--border-color)] flex flex-col justify-end overflow-hidden"
              >
                <motion.div
                  className="w-full bg-[var(--primary)]"
                  initial={{ height: '20%' }}
                  animate={{ height: ['20%', '85%', '40%'] }}
                  transition={{
                    duration: 2 + (i % 5) * 0.4,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                />
              </motion.div>
            ))}
          </div>

          {/* Convergence Arrow / Funnel indicator */}
          <div className="text-xs font-mono text-[var(--text-secondary)] tracking-widest uppercase mb-4 flex items-center justify-center gap-2">
            <span>200 BAGGED ESTIMATORS</span>
            <span>&rarr;</span>
            <span className="text-[var(--primary)] font-bold">MAJORITY AGGREGATION</span>
            <span>&rarr;</span>
            <span>CONSENSUS</span>
          </div>

          {/* Large Result Reveal: 73% PROTOTYPE MODEL OUTPUT */}
          <div className="p-8 rounded-2xl bg-[var(--bg-secondary)] border-2 border-[var(--primary)] max-w-md mx-auto space-y-2 shadow-lg">
            <span className="text-xs font-mono text-[var(--primary)] tracking-widest uppercase font-semibold block">
              FINAL ENSEMBLE DECISION
            </span>
            <div className="text-7xl sm:text-8xl font-display font-black text-[var(--text-main)] tracking-tight">
              {predictionReady ? `${riskScore}%` : '73%'}
            </div>
            <div className="text-sm font-display font-bold uppercase tracking-wider text-[var(--text-secondary)]">
              PROTOTYPE MODEL OUTPUT
            </div>
            <div className="pt-2">
              <span className="inline-block px-3 py-1 rounded text-xs font-mono font-bold uppercase bg-[var(--bg-surface)] border border-[var(--danger)]/50 text-[var(--danger)]">
                {predictionReady ? riskLevel : 'HIGH'}
              </span>
            </div>
          </div>
        </div>

        {/* Reassurance Footer */}
        <p className="text-xs font-mono text-[var(--text-secondary)] max-w-xl mx-auto">
          Calculated across 24 normalized genetic features in 42ms. Output denotes model score, not a clinical diagnostic prediction.
        </p>
      </div>
    </section>
  );
};
