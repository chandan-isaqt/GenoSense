import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Play,
  ArrowRight,
  Dna,
  Database,
  Scale,
  Cpu,
  ShieldAlert,
  Presentation,
} from 'lucide-react';
import { GenoSense3DDevice } from '../components/device/GenoSense3DDevice';
import { WebDeviceSyncPanel } from '../components/device/WebDeviceSyncPanel';
import { SCIENTIFIC_SAFETY_DISCLAIMER } from '../data/demoVariants';

export const Home: React.FC = () => {
  const navigate = useNavigate();

  const coreSteps = [
    {
      step: '01',
      title: 'Load Variant Profile',
      desc: 'Start with deterministic sample GS-DEMO-001 (20 synthetic variants) or upload a valid CSV file.',
      icon: Dna,
    },
    {
      step: '02',
      title: 'Match Marker Catalog',
      desc: 'Compare normalized variants against 13 curated Synthetic Demo Markers across 3 research profiles.',
      icon: Database,
    },
    {
      step: '03',
      title: 'Calculate & Explain',
      desc: 'Compute normalized weighted marker-match scores and show transparent feature contributions.',
      icon: Scale,
    },
    {
      step: '04',
      title: 'Sync Web & Device',
      desc: 'Present the exact same result on the web interface, printable report, and simulated OLED device.',
      icon: Cpu,
    },
  ];

  return (
    <div className="space-y-16 pb-12 text-left">
      {/* Hero Section — Clean Product Introduction */}
      <section className="pt-4 lg:pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--bg-surface)] border border-[var(--border-color)] text-[var(--primary)] text-xs font-mono uppercase tracking-widest">
              <span className="w-2 h-2 rounded-full bg-[var(--primary)] animate-pulse" />
              <span>Genomic Variant Analysis Prototype</span>
            </div>

            <div className="space-y-3">
              <span className="text-sm font-mono uppercase tracking-[0.22em] text-[var(--text-secondary)] block font-bold">
                GENOSENSE
              </span>
              <h1 className="text-4xl sm:text-6xl font-display font-bold text-[var(--text-main)] tracking-tight leading-[1.08]">
                From genomic variants to an explainable result.
              </h1>
            </div>

            <p className="text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed">
              Explore a working research prototype that matches selected genomic variants against a demonstration marker catalog and produces an explainable prototype result.
            </p>

            <div className="p-4 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-color)] text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
              “GenoSense demonstrates how selected genomic variants can be processed, matched against a curated demonstration marker catalog, converted into weighted prototype scores, explained through feature contributions, and presented through a web interface and connected-device concept.”
            </div>

            {/* Primary & Secondary CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                type="button"
                onClick={() => navigate('/analyze')}
                className="btn-primary-product flex items-center gap-2.5 text-sm cursor-pointer shadow-lg"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>START DEMO</span>
              </button>

              <button
                type="button"
                onClick={() => navigate('/how-it-works')}
                className="btn-secondary-product flex items-center gap-2 text-sm cursor-pointer"
              >
                <span>HOW IT WORKS</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => navigate('/demo')}
                className="px-3.5 py-2.5 rounded-lg bg-[var(--bg-surface)] hover:bg-[var(--bg-elevated)] border border-[var(--border-color)] text-xs font-mono text-[var(--primary)] flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Presentation className="w-4 h-4" />
                <span>PPT Guided Mode</span>
              </button>
            </div>
          </div>

          {/* Right Column: Large Interactive 3D GenoSense Device */}
          <div className="lg:col-span-6">
            <GenoSense3DDevice />
          </div>
        </div>
      </section>

      {/* 4-Step Immediate Product Understanding */}
      <section className="pt-8 border-t border-[var(--border-color)] space-y-8">
        <div className="max-w-2xl space-y-2">
          <span className="text-xs font-mono uppercase tracking-widest text-[var(--primary)] font-semibold block">
            WORKING PROTOTYPE FLOW
          </span>
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-[var(--text-main)]">
            What GenoSense Does in Four Clear Steps
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {coreSteps.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.step}
                className="product-card p-6 flex flex-col justify-between space-y-4"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-[var(--primary)]">
                    STEP {item.step}
                  </span>
                  <div className="p-2.5 rounded-lg bg-[var(--bg-secondary)] text-[var(--primary)] border border-[var(--border-color)]">
                    <Icon className="w-5 h-5" />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <h3 className="text-lg font-display font-bold text-[var(--text-main)]">
                    {item.title}
                  </h3>
                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Synchronized Web + Device Section */}
      <div className="pt-8 border-t border-[var(--border-color)]">
        <WebDeviceSyncPanel />
      </div>

      {/* Scientific Safety Banner */}
      <section className="p-5 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-color)] flex items-start gap-3.5">
        <ShieldAlert className="w-5 h-5 text-[var(--warning)] flex-shrink-0 mt-0.5" />
        <div className="space-y-1 text-xs text-[var(--text-secondary)] font-mono leading-relaxed">
          <strong className="text-[var(--text-main)] uppercase block">
            Research & Educational Prototype Notice
          </strong>
          <p>{SCIENTIFIC_SAFETY_DISCLAIMER}</p>
        </div>
      </section>
    </div>
  );
};

export default Home;
