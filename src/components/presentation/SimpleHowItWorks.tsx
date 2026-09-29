import React from 'react';
import { Dna, Binary, Brain, HelpCircle, Monitor } from 'lucide-react';

export const SimpleHowItWorks: React.FC = () => {
  const steps = [
    {
      num: '01',
      title: 'GENOMIC DATA',
      explanation: 'Selected DNA markers are provided to the system.',
      techDetail: '24 candidate SNP loci aligned with GRCh38.p13 assembly',
      icon: Dna,
    },
    {
      num: '02',
      title: 'FEATURE EXTRACTION',
      explanation: 'Relevant markers are converted into numerical features.',
      techDetail: 'Additive allele dosage encoding [0: Ref, 1: Het, 2: Alt]',
      icon: Binary,
    },
    {
      num: '03',
      title: 'AI ANALYSIS',
      explanation: 'A Random Forest model processes the features.',
      techDetail: '200 bagging decision trees aggregate probability consensus',
      icon: Brain,
    },
    {
      num: '04',
      title: 'EXPLANATION',
      explanation: 'SHAP-style attribution shows which features influenced the output.',
      techDetail: 'TreeSHAP polynomial local attribution measuring log-odds shift',
      icon: HelpCircle,
    },
    {
      num: '05',
      title: 'RESULT',
      explanation: 'The prototype result is displayed on the dashboard and edge device.',
      techDetail: 'Simultaneous delivery to React SPA & SSD1306 OLED via I2C bus',
      icon: Monitor,
    },
  ];

  return (
    <section id="how-it-works" className="space-y-8 py-12 border-t border-[var(--border-color)]">
      {/* Section Header */}
      <div className="max-w-3xl space-y-3">
        <span className="text-[11px] font-mono text-[var(--primary)] uppercase tracking-widest block">
          06 • SIMPLE PROCESS STORY
        </span>
        <h2 className="text-3xl sm:text-4xl font-display font-bold text-[var(--text-main)] tracking-tight">
          How It Works in 5 Simple Steps
        </h2>
        <p className="text-base text-[var(--text-secondary)] font-sans leading-relaxed">
          You don’t need a bioinformatics degree to understand the GenoSense pipeline. Here is the entire system workflow from raw sample to edge display.
        </p>
      </div>

      {/* 5-Step Visual Story Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {steps.map((st) => {
          const Icon = st.icon;
          return (
            <div
              key={st.num}
              className="lab-card p-5 flex flex-col justify-between space-y-4 hover:border-[var(--primary)]/60 transition-all shadow-sm"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-[var(--primary)]">
                    STEP {st.num}
                  </span>
                  <div className="p-2 rounded bg-[var(--bg-secondary)] text-[var(--primary)] border border-[var(--border-color)]">
                    <Icon className="w-4 h-4" />
                  </div>
                </div>

                <h3 className="font-display font-bold text-base text-[var(--text-main)] leading-snug">
                  {st.title}
                </h3>

                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                  {st.explanation}
                </p>
              </div>

              {/* Tiny Technical Detail Badge */}
              <div className="pt-3 border-t border-[var(--border-color)]">
                <div className="text-[10px] font-mono text-[var(--text-secondary)] bg-[var(--bg-secondary)] p-2 rounded border border-[var(--border-color)]/70">
                  <span className="text-[var(--primary)] font-semibold block mb-0.5">TECHNICAL NOTE:</span>
                  {st.techDetail}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
