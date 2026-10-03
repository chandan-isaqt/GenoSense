import React, { useState } from 'react';
import { Dna, Binary, TreeDeciduous, Activity, Monitor } from 'lucide-react';

export const TheSimpleStorySequence: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);

  const chapters = [
    {
      step: '01',
      tag: 'GENOMIC DATA',
      statement: 'Selected genomic markers enter the system.',
      description: 'The user uploads a VCF file or loads sample GS-DEMO-001 containing 24 candidate disease-associated loci.',
      icon: Dna,
      accent: 'var(--primary)',
    },
    {
      step: '02',
      tag: 'FEATURES',
      statement: 'The markers are converted into machine-learning features.',
      description: 'Genotypes are numerically encoded into dosage signals: homozygous reference (0), heterozygous (1), or alternate (2).',
      icon: Binary,
      accent: 'var(--secondary)',
    },
    {
      step: '03',
      tag: 'AI',
      statement: 'The Random Forest model processes the features.',
      description: 'An ensemble of 200 bagging decision trees evaluates non-linear genetic interactions and votes on class probability.',
      icon: TreeDeciduous,
      accent: 'var(--primary)',
    },
    {
      step: '04',
      tag: 'EXPLANATION',
      statement: 'SHAP-style attribution shows which features influenced the model output.',
      description: 'TreeSHAP decomposes the score, mathematically revealing exactly which genes drove the estimate higher or lower.',
      icon: Activity,
      accent: 'var(--secondary)',
    },
    {
      step: '05',
      tag: 'RESULT',
      statement: 'The result appears on both interfaces.',
      description: 'The calibrated 73% prototype score renders concurrently on the web application and on the physical edge OLED screen.',
      icon: Monitor,
      accent: 'var(--primary)',
    },
  ];

  return (
    <section id="how-it-works" className="py-20 border-t border-[var(--border-color)]/70 space-y-12">
      {/* Section Header */}
      <div className="max-w-3xl space-y-3 text-left">
        <span className="text-xs font-mono text-[var(--primary)] uppercase tracking-widest block font-semibold">
          CINEMATIC JOURNEY
        </span>
        <h2 className="text-4xl sm:text-5xl font-display font-bold text-[var(--text-main)] tracking-tight">
          From sample to insight.
        </h2>
        <p className="text-base text-[var(--text-secondary)] font-sans leading-relaxed">
          Follow the exact progression of data as it travels through GenoSense.
        </p>
      </div>

      {/* Horizontal Story Sequence Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {chapters.map((ch, index) => {
          const Icon = ch.icon;
          const isSelected = activeStep === index;

          return (
            <div
              key={ch.step}
              onClick={() => setActiveStep(index)}
              className={`product-card p-6 flex flex-col justify-between space-y-5 cursor-pointer transition-all duration-300 text-left ${
                isSelected
                  ? 'border-[var(--primary)] ring-2 ring-[var(--primary)]/20 shadow-lg'
                  : 'hover:border-[var(--primary)]/50'
              }`}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-[var(--primary)]">
                    STEP {ch.step}
                  </span>
                  <div className="p-2.5 rounded-lg bg-[var(--bg-secondary)] text-[var(--primary)] border border-[var(--border-color)]">
                    <Icon className="w-5 h-5" />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="text-[10px] font-mono tracking-widest uppercase text-[var(--text-secondary)] font-bold">
                    {ch.tag}
                  </div>
                  <h3 className="font-display font-bold text-base text-[var(--text-main)] leading-snug">
                    “{ch.statement}”
                  </h3>
                </div>
              </div>

              <p className="text-xs text-[var(--text-secondary)] leading-relaxed pt-3 border-t border-[var(--border-color)]">
                {ch.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
};
