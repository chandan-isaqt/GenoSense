import React from 'react';
import { Dna, Cpu, Brain, Monitor, Laptop, ArrowRight } from 'lucide-react';

export const WhatIsGenoSenseSection: React.FC = () => {
  const pipeline = [
    {
      step: '01',
      label: 'DNA',
      sub: 'Selected Genomic Markers',
      desc: 'Raw variant sequence data',
      icon: Dna,
      image: '/assets/biology/dna.jpg',
    },
    {
      step: '02',
      label: 'GENOSENSE',
      sub: 'Edge Ingestion & Extraction',
      desc: '24 candidate loci extracted',
      icon: Cpu,
      image: '/assets/hardware/device-reference.jpg',
    },
    {
      step: '03',
      label: 'AI',
      sub: 'Random Forest Inference',
      desc: '200 trees evaluate features',
      icon: Brain,
    },
    {
      step: '04',
      label: 'DEVICE',
      sub: 'Physical OLED Screen',
      desc: 'Instant benchtop feedback',
      icon: Monitor,
      image: '/assets/hardware/oled.jpg',
    },
    {
      step: '05',
      label: 'WEB',
      sub: 'Synchronized Dashboard',
      desc: 'Deep SHAP explanations',
      icon: Laptop,
    },
  ];

  return (
    <section id="what-is-genosense" className="py-20 border-t border-[var(--border-color)]/70 text-center space-y-12">
      {/* Title & Single Clear Sentence (Section 9) */}
      <div className="max-w-4xl mx-auto space-y-4">
        <span className="text-xs font-mono text-[var(--primary)] uppercase tracking-widest block font-semibold">
          SYSTEM OVERVIEW
        </span>
        <h2 className="text-4xl sm:text-5xl font-display font-bold text-[var(--text-main)] tracking-tight">
          What is GenoSense?
        </h2>
        <p className="text-lg sm:text-xl text-[var(--text-main)] font-sans leading-relaxed max-w-3xl mx-auto font-medium">
          “GenoSense is a research prototype that processes selected genomic markers with a machine-learning pipeline and delivers an explainable model output to both a web interface and a connected edge device.”
        </p>
      </div>

      {/* Visual Flow: DNA -> GENOSENSE -> AI -> DEVICE -> WEB */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 max-w-6xl mx-auto items-stretch">
        {pipeline.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={item.label}
              className="product-card p-6 flex flex-col justify-between text-left relative overflow-hidden group hover:border-[var(--primary)]"
            >
              {/* Optional Thumbnail if photographic asset exists */}
              {item.image && (
                <div className="w-full h-24 mb-4 rounded-lg overflow-hidden bg-[#050C16] border border-[var(--border-color)]">
                  <img
                    src={item.image}
                    alt={item.label}
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300"
                    loading="lazy"
                  />
                </div>
              )}

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-[var(--primary)]">
                    {item.step}
                  </span>
                  <div className="p-2 rounded-lg bg-[var(--bg-secondary)] text-[var(--primary)] border border-[var(--border-color)]">
                    <Icon className="w-5 h-5" />
                  </div>
                </div>

                <div className="space-y-1">
                  <h3 className="text-xl font-display font-bold text-[var(--text-main)] tracking-wider">
                    {item.label}
                  </h3>
                  <p className="text-xs font-mono text-[var(--primary)] font-medium">
                    {item.sub}
                  </p>
                </div>

                <p className="text-xs text-[var(--text-secondary)] font-sans">
                  {item.desc}
                </p>
              </div>

              {idx < pipeline.length - 1 && (
                <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 z-10 p-1 rounded-full bg-[var(--bg-primary)] border border-[var(--border-color)] text-[var(--primary)]">
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};
