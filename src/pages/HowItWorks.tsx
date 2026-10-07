import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FileSpreadsheet,
  Filter,
  GitCompare,
  Calculator,
  BarChart3,
  MonitorSmartphone,
  ArrowRight,
  CheckCircle2,
  Code2,
  Play,
} from 'lucide-react';
import { WebDeviceSyncPanel } from '../components/device/WebDeviceSyncPanel';

const STEPS = [
  {
    number: '01',
    id: 'INPUT',
    title: 'INPUT',
    subtitle: 'Genomic sample data enters GenoSense',
    icon: FileSpreadsheet,
    summary:
      'GenoSense accepts a structured CSV or prototype VCF dataset containing sample_id, gene, variant (rsID), allele, and genotype.',
    codeExample: `sample_id,gene,variant,allele,genotype
GS-DEMO-001,IL4,rs2243250,T,1
GS-DEMO-001,HLA-DQB1,rs9273363,A,1
GS-DEMO-001,FCER1A,rs2427837,G,1`,
    detail:
      'The built-in demo dataset GS-DEMO-001 contains 20 synthetic variant rows across immune, cytokine, and susceptibility loci.',
  },
  {
    number: '02',
    id: 'PARSE',
    title: 'PARSE',
    subtitle: 'Variants are read and normalized',
    icon: Filter,
    summary:
      'Each incoming variant row is validated for required columns and normalized so case or whitespace differences never break matching.',
    codeExample: `gene = gene.trim().toUpperCase()       // "il4 " -> "IL4"
variant = variant.trim().toLowerCase() // "RS2243250" -> "rs2243250"
allele = allele.trim().toUpperCase()   // "t" -> "T"`,
    detail:
      'Invalid rows, missing required columns, or empty files are caught immediately with clear validation messages before analysis begins.',
  },
  {
    number: '03',
    id: 'MATCH',
    title: 'MATCH',
    subtitle: 'Variants are compared against the marker catalog',
    icon: GitCompare,
    summary:
      'Normalized variants are compared against the curated 13-record GenoSense synthetic marker catalog using gene + rsID + risk allele.',
    codeExample: `const isMatch =
  normalizedGene === marker.gene.toUpperCase() &&
  normalizedVariant === marker.variant.toLowerCase() &&
  normalizedAllele === marker.riskAllele.toUpperCase() &&
  variant.genotype > 0;`,
    detail:
      'For GS-DEMO-001, 6 of the 20 uploaded variants match catalog markers: 3 Allergy-Related, 2 Dengue Susceptibility, and 1 Typhoid-Related.',
  },
  {
    number: '04',
    id: 'SCORE',
    title: 'SCORE',
    subtitle: 'Matched marker weights generate a prototype score',
    icon: Calculator,
    summary:
      'Matched markers are grouped by condition profile. Their weights are summed, normalized by the profile total weight, and clamped to 0–100.',
    codeExample: `rawScore = (matchedWeightSum / totalApplicableWeightSum) * 100
score = Math.min(100, Math.max(0, Math.round(rawScore)))

// Example: Allergy-Related Profile
// (0.31 + 0.22 + 0.19) / 1.00 * 100 = 72 -> HIGHER MATCH`,
    detail:
      'Classification bands: 0–24 LOWER MATCH, 25–49 MODERATE MATCH, 50–74 HIGHER MATCH, 75–100 STRONGER MATCH.',
  },
  {
    number: '05',
    id: 'EXPLAIN',
    title: 'EXPLAIN',
    subtitle: 'Marker contributions are shown clearly',
    icon: BarChart3,
    summary:
      'Every matched marker displays its exact prototype feature contribution (+0.31, +0.22, +0.19, etc.) so no score is a black box.',
    codeExample: `Allergy-Related Profile (72 / 100):
  rs2243250 (IL4)      -> +0.31
  rs9273363 (HLA-DQB1) -> +0.22
  rs2427837 (FCER1A)   -> +0.19`,
    detail:
      'Phase 1 prototype contribution view. Real TreeSHAP integration will be connected in the ML phase alongside the Random Forest classifier.',
  },
  {
    number: '06',
    id: 'RESULT',
    title: 'RESULT',
    subtitle: 'Output appears on web and device',
    icon: MonitorSmartphone,
    summary:
      'The final structured JSON payload renders simultaneously on the web dashboard, printable report, and the 128×64 OLED screen on the device.',
    codeExample: `OLED 128x64 Output:
ALLERGY PROFILE
72%
HIGHER MATCH`,
    detail:
      'Whether triggered from the web Analyze page or the physical button on the 3D device, both interfaces stay synchronized.',
  },
];

export const HowItWorks: React.FC = () => {
  const [selectedStep, setSelectedStep] = useState<number>(0);

  const currentStep = STEPS[selectedStep];
  const StepIcon = currentStep.icon;

  return (
    <div className="max-w-6xl mx-auto space-y-12 pb-12 text-left">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 border-b border-[var(--border-color)] pb-6">
        <div className="space-y-1.5">
          <span className="text-xs font-mono uppercase tracking-widest text-[var(--primary)] font-bold block">
            END-TO-END DETERMINISTIC PIPELINE
          </span>
          <h1 className="text-3xl sm:text-4xl font-display font-bold text-[var(--text-main)]">
            How GenoSense Works
          </h1>
          <p className="text-sm text-[var(--text-secondary)] max-w-2xl">
            Six transparent steps transform raw genomic variant rows into weighted prototype profile scores, feature contributions, and synchronized OLED hardware output.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Link
            to="/analyze"
            className="btn-primary-product text-xs py-2.5 px-4 flex items-center gap-2"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>RUN INTERACTIVE PIPELINE</span>
          </Link>
          <Link
            to="/technical"
            className="btn-secondary-product text-xs py-2.5 px-4 flex items-center gap-1.5"
          >
            <span>VIEW MARKER CATALOG & ARCHITECTURE</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* 6 Step Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {STEPS.map((step, index) => {
          const Icon = step.icon;
          const isSelected = selectedStep === index;
          return (
            <button
              key={step.id}
              type="button"
              onClick={() => setSelectedStep(index)}
              className={`group flex flex-col justify-between rounded-2xl border p-6 text-left transition cursor-pointer ${
                isSelected
                  ? 'border-[var(--primary)] bg-[var(--bg-surface)] shadow-lg'
                  : 'border-[var(--border-color)] bg-[var(--bg-secondary)] hover:border-[var(--primary)]/50'
              }`}
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="rounded-md bg-[var(--bg-primary)] px-2.5 py-1 font-mono text-xs font-bold text-[var(--primary)] border border-[var(--border-color)]">
                    {step.number} {step.title}
                  </span>
                  <Icon
                    className={`w-5 h-5 ${
                      isSelected
                        ? 'text-[var(--primary)]'
                        : 'text-[var(--text-secondary)] group-hover:text-[var(--text-main)]'
                    }`}
                  />
                </div>

                <h2 className="mt-4 font-display text-lg font-bold text-[var(--text-main)]">
                  {step.subtitle}
                </h2>
                <p className="mt-2 text-xs leading-relaxed text-[var(--text-secondary)]">
                  {step.summary}
                </p>
              </div>

              <div className="mt-5 flex items-center justify-between border-t border-[var(--border-color)] pt-3 font-mono text-[11px]">
                <span
                  className={
                    isSelected
                      ? 'text-[var(--primary)] font-bold'
                      : 'text-[var(--text-secondary)]'
                  }
                >
                  {isSelected ? 'INSPECTING STEP' : 'CLICK TO INSPECT LOGIC'}
                </span>
                <ArrowRight
                  className={`w-3.5 h-3.5 ${
                    isSelected ? 'text-[var(--primary)]' : 'text-[var(--text-secondary)]'
                  }`}
                />
              </div>
            </button>
          );
        })}
      </div>

      {/* Interactive Deep Dive for Selected Step */}
      <div className="product-card p-6 sm:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-6 space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-[var(--primary)] bg-[var(--bg-surface)] px-3 py-1 font-mono text-xs font-bold text-[var(--primary)]">
              <StepIcon className="w-3.5 h-3.5" />
              <span>
                STEP {currentStep.number} — {currentStep.title}
              </span>
            </div>
            <h3 className="font-display text-2xl font-bold text-[var(--text-main)]">
              {currentStep.subtitle}
            </h3>
            <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
              {currentStep.summary}
            </p>
            <div className="rounded-xl border border-[var(--border-color)] bg-[var(--bg-secondary)] p-4">
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="mt-0.5 w-4 h-4 shrink-0 text-[var(--primary)]" />
                <p className="text-xs leading-relaxed text-[var(--text-main)]">
                  {currentStep.detail}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2 pt-2">
              {STEPS.map((s, idx) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setSelectedStep(idx)}
                  className={`rounded-md px-3 py-1.5 font-mono text-xs transition cursor-pointer ${
                    selectedStep === idx
                      ? 'bg-[var(--primary)] text-[#071320] font-bold'
                      : 'border border-[var(--border-color)] bg-[var(--bg-secondary)] text-[var(--text-secondary)] hover:text-[var(--text-main)]'
                  }`}
                >
                  {s.number} {s.title}
                </button>
              ))}
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="rounded-xl border border-[#1B3852] bg-[#06111D] p-5">
              <div className="mb-3 flex items-center justify-between border-b border-[#162C42] pb-2.5">
                <span className="flex items-center gap-2 font-mono text-xs font-bold text-[#43E6D1]">
                  <Code2 className="w-4 h-4" />
                  <span>LIVE IMPLEMENTATION TRACE ({currentStep.title})</span>
                </span>
                <span className="font-mono text-[11px] text-[#8EA2B3]">
                  matchingEngine.ts
                </span>
              </div>
              <pre className="overflow-x-auto font-mono text-xs leading-relaxed text-[#F5FAFC]">
                <code>{currentStep.codeExample}</code>
              </pre>
            </div>
          </div>
        </div>
      </div>

      {/* Score Classification Table */}
      <div className="product-card p-6 sm:p-8 space-y-6">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-[var(--primary)] font-bold block">
            STANDARDIZED SCORING BANDS
          </span>
          <h2 className="mt-1 font-display text-2xl font-bold text-[var(--text-main)]">
            Score Classification System (0–100)
          </h2>
          <p className="mt-1 text-sm text-[var(--text-secondary)]">
            Every condition profile score is normalized to a 0–100 scale and assigned one of four prototype match classifications.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="rounded-xl border border-[var(--border-color)] bg-[var(--bg-secondary)] p-4">
            <div className="font-mono text-xs text-[var(--text-secondary)]">
              RANGE: 0 – 24
            </div>
            <div className="mt-1 font-display text-lg font-bold text-[var(--primary)]">
              LOWER MATCH
            </div>
            <p className="mt-2 text-xs text-[var(--text-secondary)]">
              Few or low-weight catalog markers detected for this condition profile (e.g., Typhoid-Related Profile: 8).
            </p>
          </div>
          <div className="rounded-xl border border-[var(--border-color)] bg-[var(--bg-secondary)] p-4">
            <div className="font-mono text-xs text-[var(--text-secondary)]">
              RANGE: 25 – 49
            </div>
            <div className="mt-1 font-display text-lg font-bold text-[var(--warning)]">
              MODERATE MATCH
            </div>
            <p className="mt-2 text-xs text-[var(--text-secondary)]">
              Partial overlap with catalog markers for this profile (e.g., Dengue Susceptibility Profile: 31).
            </p>
          </div>
          <div className="rounded-xl border border-[var(--warning)]/50 bg-[var(--bg-secondary)] p-4">
            <div className="font-mono text-xs text-[var(--warning)]">
              RANGE: 50 – 74
            </div>
            <div className="mt-1 font-display text-lg font-bold text-[var(--warning)]">
              HIGHER MATCH
            </div>
            <p className="mt-2 text-xs text-[var(--text-secondary)]">
              Multiple primary catalog markers matched for this profile (e.g., Allergy-Related Profile: 72).
            </p>
          </div>
          <div className="rounded-xl border border-[var(--danger)]/50 bg-[var(--bg-secondary)] p-4">
            <div className="font-mono text-xs text-[var(--danger)]">
              RANGE: 75 – 100
            </div>
            <div className="mt-1 font-display text-lg font-bold text-[var(--danger)]">
              STRONGER MATCH
            </div>
            <p className="mt-2 text-xs text-[var(--text-secondary)]">
              Nearly all curated markers in the demonstration catalog for this condition profile are present.
            </p>
          </div>
        </div>
      </div>

      {/* Synchronized Web + Device Preview */}
      <WebDeviceSyncPanel />
    </div>
  );
};
