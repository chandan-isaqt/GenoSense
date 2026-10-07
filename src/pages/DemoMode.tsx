import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import {
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  Play,
  CheckCircle2,
  Cpu,
  FileText,
  Sparkles,
  ExternalLink,
} from 'lucide-react';
import { useGenoSenseDemo } from '../hooks/useGenoSenseDemo';
import { ORDERED_ANALYSIS_STAGES } from '../context/GenoSenseContext';
import { executeSampleAnalysis } from '../services/analysisService';
import { DEMO_SAMPLE_PROFILE } from '../data/demoVariants';
import { GenoSense3DDevice } from '../components/device/GenoSense3DDevice';
import { WebDeviceSyncPanel } from '../components/device/WebDeviceSyncPanel';

interface PresentationStep {
  stepNumber: number;
  title: string;
  subtitle: string;
  presenterNote: string;
}

const PRESENTATION_STEPS: PresentationStep[] = [
  {
    stepNumber: 1,
    title: 'Load Demo Profile (GS-DEMO-001)',
    subtitle: 'Deterministic 20-variant genomic profile loaded into memory',
    presenterNote:
      'Introduce GenoSense and show the synthetic demo profile GS-DEMO-001 (Age 10, Male, 20 SNP variants across immune & susceptibility genes).',
  },
  {
    stepNumber: 2,
    title: 'Click Analyze',
    subtitle: 'Trigger the deterministic variant analysis pipeline',
    presenterNote:
      'Click the Analyze button below (or press NEXT) to initiate the real-time normalization and catalog matching engine.',
  },
  {
    stepNumber: 3,
    title: 'Watch Processing Stages',
    subtitle: '7-stage pipeline: Read → Normalize → Search Catalog → Match → Score → Explain → Ready',
    presenterNote:
      'Highlight that GenoSense does not hardcode final numbers—every variant row is normalized and matched against the 13-marker catalog.',
  },
  {
    stepNumber: 4,
    title: 'View Matched Markers (6 of 20 Variants)',
    subtitle: '3 Allergy-Related, 2 Dengue Susceptibility, and 1 Typhoid-Related marker matched',
    presenterNote:
      'Point out the exact matched rsIDs: rs2243250 (IL4), rs9273363 (HLA-DQB1), rs2427837 (FCER1A), rs4804803 (CD209), rs1800629 (TNF), and rs17238892 (SLC11A1).',
  },
  {
    stepNumber: 5,
    title: 'View Condition Profile Scores',
    subtitle: 'Allergy: 72 (HIGHER MATCH) • Dengue: 31 (MODERATE MATCH) • Typhoid: 8 (LOWER MATCH)',
    presenterNote:
      'Show the normalized 0–100 scores computed via (matchedWeightSum / totalApplicableWeightSum) * 100.',
  },
  {
    stepNumber: 6,
    title: 'View Prototype Feature Contributions',
    subtitle: 'Transparent additive marker weights (+0.31, +0.22, +0.19) explain the 72/100 score',
    presenterNote:
      'Explain how Phase 1 uses transparent Prototype Feature Contributions, with TreeSHAP scheduled for the Random Forest phase.',
  },
  {
    stepNumber: 7,
    title: 'Open Interactive 3D GenoSense Device',
    subtitle: 'Raspberry Pi 4 edge enclosure with 128×64 OLED, tactile button, and LED telemetry',
    presenterNote:
      'Rotate the 3D device, toggle the cutaway view to reveal the internal Raspberry Pi 4 PCB, and click any hardware hotspot.',
  },
  {
    stepNumber: 8,
    title: 'Press Device Analyze Button',
    subtitle: 'Hardware-triggered execution from the physical tactile button',
    presenterNote:
      'Click the cyan Analyze button on the 3D device (or the trigger button below) to run the pipeline directly from the edge hardware.',
  },
  {
    stepNumber: 9,
    title: 'OLED Display Updates & Synchronizes',
    subtitle: 'One Analysis. Two Interfaces. Web result and 128×64 I2C OLED match identically',
    presenterNote:
      'Verify that the OLED readout displays ALLERGY PROFILE / 72% / HIGHER MATCH in sync with the web interface.',
  },
  {
    stepNumber: 10,
    title: 'Generate Printable Analysis Report',
    subtitle: 'Complete audit summary ready for print or PDF export',
    presenterNote:
      'Conclude the presentation by showing the structured non-clinical prototype report with full sample metadata and safety disclaimer.',
  },
];

export const DemoMode: React.FC = () => {
  const {
    loadedSample,
    analysisResult,
    isAnalyzing,
    analysisStage,
    completedStages,
    loadDemoSample,
    triggerDeviceAnalyze,
    resetDemo,
  } = useGenoSenseDemo();

  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const currentStep = PRESENTATION_STEPS[currentStepIndex];

  const effectiveSample = loadedSample || DEMO_SAMPLE_PROFILE;
  const effectiveResult =
    analysisResult || executeSampleAnalysis(effectiveSample);

  useEffect(() => {
    if (!loadedSample) {
      loadDemoSample();
    }
  }, [loadedSample, loadDemoSample]);

  const handleNext = useCallback(() => {
    setCurrentStepIndex((prev) => {
      const nextIdx = Math.min(PRESENTATION_STEPS.length - 1, prev + 1);
      if ((nextIdx === 2 || nextIdx === 7) && !analysisResult && !isAnalyzing) {
        void triggerDeviceAnalyze();
      }
      return nextIdx;
    });
  }, [analysisResult, isAnalyzing, triggerDeviceAnalyze]);

  const handleBack = useCallback(() => {
    setCurrentStepIndex((prev) => Math.max(0, prev - 1));
  }, []);

  const handleRestart = useCallback(() => {
    resetDemo();
    loadDemoSample();
    setCurrentStepIndex(0);
  }, [resetDemo, loadDemoSample]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handleBack();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [handleNext, handleBack]);

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-12 text-left">
      {/* Top Presentation Header & Step Progress Bar */}
      <div className="product-card p-5 space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-widest text-[var(--primary)]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>
                PRESENTATION / PPT GUIDED DEMO MODE (STEP {currentStep.stepNumber} OF{' '}
                {PRESENTATION_STEPS.length})
              </span>
            </div>
            <h1 className="mt-1 font-display text-2xl sm:text-3xl font-bold text-[var(--text-main)]">
              {currentStep.stepNumber}. {currentStep.title}
            </h1>
            <p className="mt-0.5 text-sm text-[var(--text-secondary)]">
              {currentStep.subtitle}
            </p>
          </div>

          {/* NEXT / BACK / RESTART Controls */}
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              type="button"
              onClick={handleRestart}
              className="btn-secondary-product text-xs py-2.5 px-3.5 flex items-center gap-1.5 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5 text-[var(--primary)]" />
              <span>RESTART</span>
            </button>
            <button
              type="button"
              onClick={handleBack}
              disabled={currentStepIndex === 0}
              className="btn-secondary-product text-xs py-2.5 px-4 flex items-center gap-1.5 cursor-pointer disabled:opacity-40"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>BACK</span>
            </button>
            <button
              type="button"
              onClick={handleNext}
              disabled={currentStepIndex === PRESENTATION_STEPS.length - 1}
              className="btn-primary-product text-xs py-2.5 px-5 flex items-center gap-1.5 cursor-pointer disabled:opacity-40"
            >
              <span>NEXT</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 10-Step Pill Bar */}
        <div className="grid grid-cols-5 sm:grid-cols-10 gap-1.5">
          {PRESENTATION_STEPS.map((s, idx) => {
            const isCurrent = idx === currentStepIndex;
            const isDone = idx < currentStepIndex;
            return (
              <button
                key={s.stepNumber}
                type="button"
                onClick={() => setCurrentStepIndex(idx)}
                className={`rounded-lg py-2 px-1 text-center font-mono text-[11px] font-semibold transition cursor-pointer ${
                  isCurrent
                    ? 'bg-[var(--primary)] text-[#071320] font-bold shadow'
                    : isDone
                      ? 'border border-[var(--primary)]/40 bg-[var(--bg-surface)] text-[var(--primary)]'
                      : 'border border-[var(--border-color)] bg-[var(--bg-secondary)] text-[var(--text-secondary)] hover:text-[var(--text-main)]'
                }`}
              >
                {String(s.stepNumber).padStart(2, '0')}
              </button>
            );
          })}
        </div>

        {/* Presenter Speaking Note */}
        <div className="rounded-xl border border-[var(--primary)]/30 bg-[var(--bg-secondary)] px-4 py-2.5 font-mono text-xs text-[var(--text-main)]">
          <span className="font-bold text-[var(--primary)]">PRESENTER NOTE: </span>
          {currentStep.presenterNote}
        </div>
      </div>

      {/* Dynamic Stage Content for Steps 1–10 */}
      <div className="product-card p-6 sm:p-8">
        {/* STEP 1: Load Demo Profile */}
        {currentStep.stepNumber === 1 && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
              <div className="rounded-xl border border-[var(--border-color)] bg-[var(--bg-secondary)] p-4">
                <div className="font-mono text-[11px] text-[var(--text-secondary)]">
                  SAMPLE ID
                </div>
                <div className="mt-1 font-mono text-lg font-bold text-[var(--primary)]">
                  {effectiveSample.sampleId}
                </div>
              </div>
              <div className="rounded-xl border border-[var(--border-color)] bg-[var(--bg-secondary)] p-4">
                <div className="font-mono text-[11px] text-[var(--text-secondary)]">
                  AGE
                </div>
                <div className="mt-1 font-mono text-lg font-bold text-[var(--text-main)]">
                  {effectiveSample.age}
                </div>
              </div>
              <div className="rounded-xl border border-[var(--border-color)] bg-[var(--bg-secondary)] p-4">
                <div className="font-mono text-[11px] text-[var(--text-secondary)]">
                  SEX
                </div>
                <div className="mt-1 font-mono text-lg font-bold text-[var(--text-main)]">
                  {effectiveSample.sex}
                </div>
              </div>
              <div className="rounded-xl border border-[var(--border-color)] bg-[var(--bg-secondary)] p-4">
                <div className="font-mono text-[11px] text-[var(--text-secondary)]">
                  VARIANTS
                </div>
                <div className="mt-1 font-mono text-lg font-bold text-[var(--text-main)]">
                  {effectiveSample.variants.length}
                </div>
              </div>
              <div className="rounded-xl border border-[var(--border-color)] bg-[var(--bg-secondary)] p-4">
                <div className="font-mono text-[11px] text-[var(--text-secondary)]">
                  DATA TYPE
                </div>
                <div className="mt-1 font-mono text-xs font-bold text-[var(--primary)]">
                  {effectiveSample.dataType}
                </div>
              </div>
            </div>

            <div className="overflow-x-auto rounded-xl border border-[var(--border-color)]">
              <table className="w-full border-collapse text-left font-mono text-xs">
                <thead>
                  <tr className="border-b border-[var(--border-color)] bg-[var(--bg-secondary)] text-[11px] uppercase text-[var(--text-secondary)]">
                    <th className="py-2.5 px-4">#</th>
                    <th className="py-2.5 px-4">Gene</th>
                    <th className="py-2.5 px-4">rsID</th>
                    <th className="py-2.5 px-4">Allele</th>
                    <th className="py-2.5 px-4">Genotype</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--border-color)]">
                  {effectiveSample.variants.slice(0, 8).map((v, idx) => (
                    <tr key={`${v.gene}-${v.variant}`} className="bg-[var(--bg-secondary)]/40">
                      <td className="py-2 px-4 text-[var(--text-secondary)]">
                        VAR-{String(idx + 1).padStart(3, '0')}
                      </td>
                      <td className="py-2 px-4 font-bold text-[var(--primary)]">
                        {v.gene}
                      </td>
                      <td className="py-2 px-4 text-[var(--text-main)]">{v.variant}</td>
                      <td className="py-2 px-4 text-[var(--text-main)]">{v.allele}</td>
                      <td className="py-2 px-4 text-[var(--text-main)]">{v.genotype}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="bg-[var(--bg-secondary)] px-4 py-2 text-center font-mono text-[11px] text-[var(--text-secondary)]">
                Showing first 8 of {effectiveSample.variants.length} variants in{' '}
                {effectiveSample.sampleId}
              </div>
            </div>
          </div>
        )}

        {/* STEP 2 & STEP 3: Click Analyze & Watch Processing */}
        {(currentStep.stepNumber === 2 || currentStep.stepNumber === 3) && (
          <div className="max-w-2xl mx-auto space-y-6 py-4 text-center">
            <div className="inline-flex w-16 h-16 items-center justify-center rounded-2xl border border-[var(--primary)] bg-[var(--bg-surface)] text-[var(--primary)]">
              <Cpu className={`w-8 h-8 ${isAnalyzing ? 'animate-spin' : ''}`} />
            </div>
            <h2 className="font-display text-2xl font-bold text-[var(--text-main)]">
              {isAnalyzing
                ? analysisStage
                : analysisResult
                  ? 'RESULT READY — ALL 7 STAGES COMPLETED'
                  : 'Deterministic Pipeline Ready'}
            </h2>
            <p className="text-sm text-[var(--text-secondary)]">
              Click below to watch the 7-stage variant normalization, catalog lookup, and weighted scoring sequence execute live.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-left font-mono text-xs">
              {ORDERED_ANALYSIS_STAGES.map((stage) => {
                const isDone =
                  completedStages.includes(stage) || Boolean(analysisResult);
                const isCurrent = isAnalyzing && analysisStage === stage;
                return (
                  <div
                    key={stage}
                    className={`rounded-lg border px-3.5 py-2.5 flex items-center justify-between ${
                      isCurrent
                        ? 'border-[var(--primary)] bg-[var(--bg-surface)] text-[var(--primary)] font-bold'
                        : isDone
                          ? 'border-[var(--primary)]/40 bg-[var(--bg-secondary)] text-[var(--text-main)]'
                          : 'border-[var(--border-color)] bg-[var(--bg-secondary)]/50 text-[var(--text-secondary)]'
                    }`}
                  >
                    <span>{stage}</span>
                    <span className="text-[10px]">
                      {isCurrent ? 'RUNNING' : isDone ? '✓ DONE' : 'PENDING'}
                    </span>
                  </div>
                );
              })}
            </div>

            <button
              type="button"
              onClick={() => void triggerDeviceAnalyze()}
              disabled={isAnalyzing}
              className="btn-primary-product text-xs py-3 px-6 inline-flex items-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>
                {isAnalyzing ? 'EXECUTING PIPELINE...' : 'RUN ANALYZE PIPELINE NOW'}
              </span>
            </button>
          </div>
        )}

        {/* STEP 4: View Matched Markers */}
        {currentStep.stepNumber === 4 && (
          <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 className="font-display text-xl font-bold text-[var(--text-main)]">
                Matched Catalog Markers ({effectiveResult.matchedMarkers.length} Matched of{' '}
                {effectiveResult.sample.variants.length} Sample Variants)
              </h3>
              <span className="rounded-full bg-[var(--bg-surface)] border border-[var(--primary)] px-3 py-1 font-mono text-xs font-bold text-[var(--primary)]">
                13-Record Synthetic Catalog
              </span>
            </div>

            <div className="overflow-x-auto rounded-xl border border-[var(--border-color)]">
              <table className="w-full border-collapse text-left font-mono text-xs">
                <thead>
                  <tr className="border-b border-[var(--border-color)] bg-[var(--bg-secondary)] text-[11px] uppercase text-[var(--text-secondary)]">
                    <th className="py-3 px-4">Marker ID</th>
                    <th className="py-3 px-4">Gene</th>
                    <th className="py-3 px-4">Variant</th>
                    <th className="py-3 px-4">Risk Allele</th>
                    <th className="py-3 px-4">Condition Profile</th>
                    <th className="py-3 px-4">Weight</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--border-color)]">
                  {effectiveResult.matchedMarkers.map((m) => (
                    <tr key={m.marker.markerId} className="bg-[var(--bg-surface)]/60">
                      <td className="py-3 px-4 font-bold text-[var(--text-main)]">
                        {m.marker.markerId}
                      </td>
                      <td className="py-3 px-4 font-bold text-[var(--primary)]">
                        {m.marker.gene}
                      </td>
                      <td className="py-3 px-4 text-[var(--text-main)]">
                        {m.marker.variant}
                      </td>
                      <td className="py-3 px-4 text-[var(--text-main)]">
                        {m.inputVariant.allele} (Genotype {m.inputVariant.genotype})
                      </td>
                      <td className="py-3 px-4 text-[var(--text-main)]">
                        {m.marker.condition}
                      </td>
                      <td className="py-3 px-4 font-bold text-[var(--primary)]">
                        +{m.effectiveWeight.toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* STEP 5: View Condition Scores */}
        {currentStep.stepNumber === 5 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {effectiveResult.conditions.map((cs) => (
              <div
                key={cs.conditionId}
                className="rounded-2xl border border-[var(--border-color)] bg-[var(--bg-secondary)] p-6"
              >
                <div className="font-mono text-xs uppercase text-[var(--text-secondary)]">
                  {cs.conditionTitle}
                </div>
                <div className="mt-3 flex items-baseline gap-2">
                  <span className="font-display text-5xl font-bold text-[var(--text-main)]">
                    {cs.score}
                  </span>
                  <span className="font-mono text-sm text-[var(--text-secondary)]">
                    / 100
                  </span>
                </div>
                <div className="mt-3 inline-block rounded-md bg-[var(--bg-surface)] border border-[var(--primary)] px-3 py-1 font-mono text-xs font-bold text-[var(--primary)]">
                  {cs.category}
                </div>
                <div className="mt-4 h-2.5 w-full overflow-hidden rounded-full bg-[var(--bg-primary)]">
                  <div
                    className="h-full bg-[var(--primary)]"
                    style={{ width: `${cs.score}%` }}
                  />
                </div>
                <p className="mt-3 font-mono text-xs text-[var(--text-secondary)]">
                  Formula: ({cs.matchedWeightSum.toFixed(2)} /{' '}
                  {cs.totalApplicableWeightSum.toFixed(2)}) × 100 = {cs.score}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* STEP 6: View Explanation */}
        {currentStep.stepNumber === 6 && (
          <div className="space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h3 className="font-display text-xl font-bold text-[var(--text-main)]">
                  Prototype Feature Contribution Breakdown
                </h3>
                <p className="text-xs text-[var(--text-secondary)]">
                  Phase 1 prototype contribution view. Real SHAP integration will be connected in the ML phase.
                </p>
              </div>
              <span className="rounded-lg border border-[var(--border-color)] bg-[var(--bg-secondary)] px-3 py-1.5 font-mono text-xs text-[var(--primary)]">
                Engine: Weighted Marker Matching (ACTIVE)
              </span>
            </div>

            <div className="space-y-3">
              {effectiveResult.featureContributions.map((fc) => (
                <div
                  key={fc.markerId}
                  className="rounded-xl border border-[var(--border-color)] bg-[var(--bg-secondary)] p-4"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 font-mono text-xs">
                    <div>
                      <span className="font-bold text-[var(--primary)]">
                        {fc.variant}
                      </span>{' '}
                      <span className="text-[var(--text-main)]">({fc.gene})</span>{' '}
                      <span className="text-[var(--text-secondary)]">
                        — {fc.condition}
                      </span>
                    </div>
                    <span className="font-bold text-[var(--primary)]">
                      {fc.formattedContribution}
                    </span>
                  </div>
                  <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-[var(--bg-primary)]">
                    <div
                      className="h-full bg-[var(--primary)]"
                      style={{ width: `${Math.min(100, fc.weight * 250)}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* STEP 7 & STEP 8: Interactive 3D Device & Press Analyze */}
        {(currentStep.stepNumber === 7 || currentStep.stepNumber === 8) && (
          <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="font-mono text-xs text-[var(--text-secondary)]">
                {currentStep.stepNumber === 8
                  ? 'Click the glowing cyan ANALYZE button on the 3D enclosure or use the button on the right:'
                  : 'Drag to rotate the 3D GenoSense enclosure, toggle Cutaway view, or inspect hotspots:'}
              </div>
              <button
                type="button"
                onClick={() => void triggerDeviceAnalyze()}
                disabled={isAnalyzing}
                className="btn-primary-product text-xs py-2 px-4 inline-flex items-center gap-2 cursor-pointer"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>PRESS DEVICE ANALYZE BUTTON</span>
              </button>
            </div>
            <GenoSense3DDevice />
          </div>
        )}

        {/* STEP 9: OLED Updates & Synchronizes */}
        {currentStep.stepNumber === 9 && <WebDeviceSyncPanel />}

        {/* STEP 10: Generate Report */}
        {currentStep.stepNumber === 10 && (
          <div className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[var(--border-color)] pb-4">
              <div>
                <div className="flex items-center gap-2 font-mono text-xs font-bold text-[var(--primary)]">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>END-TO-END DEMO COMPLETE</span>
                </div>
                <h3 className="mt-1 font-display text-2xl font-bold text-[var(--text-main)]">
                  GENOSENSE ANALYSIS REPORT ({effectiveResult.sample.sampleId})
                </h3>
              </div>

              <div className="flex items-center gap-3">
                <Link
                  to="/report"
                  className="btn-primary-product text-xs py-2.5 px-4 inline-flex items-center gap-2"
                >
                  <FileText className="w-4 h-4" />
                  <span>OPEN FULL PRINTABLE REPORT</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {effectiveResult.conditions.map((cs) => (
                <div
                  key={cs.conditionId}
                  className="rounded-xl border border-[var(--border-color)] bg-[var(--bg-secondary)] p-4 font-mono"
                >
                  <div className="text-xs text-[var(--text-secondary)]">
                    {cs.conditionTitle}
                  </div>
                  <div className="mt-1 text-2xl font-bold text-[var(--text-main)]">
                    {cs.score} / 100
                  </div>
                  <div className="mt-1 text-xs font-bold text-[var(--primary)]">
                    {cs.category}
                  </div>
                </div>
              ))}
            </div>

            <div className="rounded-xl border border-[var(--border-color)] bg-[var(--bg-secondary)] p-4 font-mono text-xs text-[var(--text-secondary)]">
              <div>
                Engine: Weighted Marker Matching • Dataset: Synthetic Demonstration Data • Device: Simulated
              </div>
              <div className="mt-1 text-[var(--warning)]">
                Research and educational prototype only. Not for clinical diagnosis.
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
