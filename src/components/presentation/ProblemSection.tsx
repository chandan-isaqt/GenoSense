import React from 'react';
import { Database, EyeOff, ServerOff, CheckCircle } from 'lucide-react';

export const ProblemSection: React.FC = () => {
  const challenges = [
    {
      icon: Database,
      title: 'Genomic Data is Vast & Inaccessible',
      description:
        'Human DNA contains over 3 billion base pairs. Raw genetic sequencing files are massive, cryptic text documents that ordinary practitioners and clinics cannot easily parse or interpret on standard computers.',
      stat: '3,000,000,000+ Base Pairs',
    },
    {
      icon: EyeOff,
      title: '“Black Box” AI Cannot Be Trusted',
      description:
        'Traditional machine learning can calculate disease risk scores, but without explaining which specific genes influenced the decision, doctors and researchers have no way to verify the biological rationale.',
      stat: 'Zero Transparency in Standard Models',
    },
    {
      icon: ServerOff,
      title: 'Point-of-Care Hardware is Missing',
      description:
        'Genetic analysis is typically trapped inside distant cloud data centers or million-dollar lab sequencers. Low-cost field clinics and remote medical centers lack immediate, edge-side visual feedback.',
      stat: 'Centralized & Cost-Prohibitive',
    },
  ];

  return (
    <section className="space-y-8 py-12 border-t border-[var(--border-color)]">
      {/* Section Header */}
      <div className="max-w-3xl space-y-3">
        <span className="text-[11px] font-mono text-[var(--primary)] uppercase tracking-widest block">
          02 • THE PROBLEM WE ADDRESS
        </span>
        <h2 className="text-3xl sm:text-4xl font-display font-bold text-[var(--text-main)] tracking-tight">
          Why is Genomic AI So Difficult in Practice?
        </h2>
        <p className="text-base text-[var(--text-secondary)] font-sans leading-relaxed">
          Unlocking the medical potential of genetic data requires solving three fundamental bottlenecks: data complexity, model opacity, and hardware centralization.
        </p>
      </div>

      {/* 3 Challenge Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {challenges.map((item, index) => {
          const Icon = item.icon;
          return (
            <div
              key={item.title}
              className="lab-card p-6 flex flex-col justify-between space-y-4 hover:border-[var(--primary)]/60 transition-all shadow-sm"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="p-2.5 rounded-[4px] bg-[var(--bg-secondary)] text-[var(--primary)] border border-[var(--border-color)]">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-mono text-[var(--text-secondary)]">0{index + 1}</span>
                </div>

                <h3 className="text-lg font-display font-bold text-[var(--text-main)] leading-snug">
                  {item.title}
                </h3>

                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="pt-3 border-t border-[var(--border-color)] text-xs font-mono text-[var(--primary)] font-semibold">
                {item.stat}
              </div>
            </div>
          );
        })}
      </div>

      {/* The GenoSense Solution Banner */}
      <div className="p-6 rounded-[4px] bg-[var(--bg-secondary)] border border-[var(--primary)]/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <span className="text-xs font-mono font-bold text-[var(--primary)] uppercase tracking-wider block">
            HOW GENOSENSE SOLVES THIS
          </span>
          <p className="text-sm text-[var(--text-main)] font-medium">
            We isolate targeted genetic markers, compute an explainable risk estimate with SHAP attribution, and display it instantly on an edge Raspberry Pi device.
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs font-mono text-[var(--primary)] flex-shrink-0">
          <CheckCircle className="w-4 h-4" />
          <span>Transparent &amp; Edge-Ready</span>
        </div>
      </div>
    </section>
  );
};
