import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Play,
  RotateCcw,
  CheckCircle2,
  Loader2,
  FileCode2,
  Dna,
  Brain,
  HelpCircle,
  Cpu,
} from 'lucide-react';
import { useGenoSenseDemo } from '../../hooks/useGenoSenseDemo';

export const FullSystemDemoSection: React.FC = () => {
  const {
    sampleLoaded,
    markersExtracted,
    predictionReady,
    shapReady,
    oledStatus,
    riskScore,
    riskLevel,
    loadDemoSample,
    extractMarkers,
    runAiPrediction,
    runShapAnalysis,
    triggerHardwareAnalyzeButton,
    runFullDemo,
    resetDemo,
    isRunningFullDemo,
    fullDemoStep,
    setReportModalOpen,
  } = useGenoSenseDemo();

  const [guidedStep, setGuidedStep] = useState(1);
  const [isProcessingStep, setIsProcessingStep] = useState(false);

  // Stepper handlers
  const handleStep1 = () => {
    loadDemoSample();
    setGuidedStep(2);
  };

  const handleStep2 = async () => {
    setIsProcessingStep(true);
    await extractMarkers();
    setIsProcessingStep(false);
    setGuidedStep(3);
  };

  const handleStep3 = async () => {
    setIsProcessingStep(true);
    await runAiPrediction();
    setIsProcessingStep(false);
    setGuidedStep(4);
  };

  const handleStep4 = async () => {
    setIsProcessingStep(true);
    await runShapAnalysis();
    setIsProcessingStep(false);
    setGuidedStep(5);
  };

  const handleStep5 = async () => {
    setIsProcessingStep(true);
    await triggerHardwareAnalyzeButton();
    setIsProcessingStep(false);
    setGuidedStep(6);
  };

  const handleRestart = () => {
    resetDemo();
    setGuidedStep(1);
  };

  const demoStages = [
    { num: 1, label: 'Sample', icon: FileCode2, done: sampleLoaded || guidedStep > 1 },
    { num: 2, label: 'Extract', icon: Dna, done: markersExtracted || guidedStep > 2 },
    { num: 3, label: 'Analyze', icon: Brain, done: predictionReady || guidedStep > 3 },
    { num: 4, label: 'Explain', icon: HelpCircle, done: shapReady || guidedStep > 4 },
    { num: 5, label: 'Device', icon: Cpu, done: oledStatus === 'RESULT READY' || guidedStep > 5 },
  ];

  return (
    <section id="full-demo" className="space-y-8 py-12 border-t border-[var(--border-color)]">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div className="max-w-2xl space-y-3">
          <span className="text-[11px] font-mono text-[var(--primary)] uppercase tracking-widest block">
            10 • GUIDED DEMO
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-[var(--text-main)] tracking-tight">
            See GenoSense in Action
          </h2>
          <p className="text-base text-[var(--text-secondary)] font-sans leading-relaxed">
            Follow the guided step-by-step walkthrough below, or trigger the autonomous demo in a single click.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={runFullDemo}
            disabled={isRunningFullDemo || isProcessingStep}
            className="btn-lab-primary text-xs flex items-center gap-2 py-3 px-5 shadow-sm disabled:opacity-50 cursor-pointer"
          >
            {isRunningFullDemo ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-[var(--primary-text)]" />
                <span>EXECUTING (STEP {fullDemoStep}/9)...</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-current text-[var(--primary-text)]" />
                <span>RUN FULL DEMO</span>
              </>
            )}
          </button>

          <button
            onClick={handleRestart}
            disabled={isRunningFullDemo || isProcessingStep}
            className="btn-lab-secondary text-xs flex items-center gap-1.5 py-3 px-4 disabled:opacity-50 cursor-pointer"
            title="Restart Demo"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>RESTART</span>
          </button>
        </div>
      </div>

      {/* Main Guided Journey Card */}
      <div className="lab-card p-6 sm:p-10 space-y-8 shadow-xl">
        {/* Progress Tracker Strip (Section 11) */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 font-mono text-xs">
          {demoStages.map((stage) => {
            const isCurrent = guidedStep === stage.num;
            const Icon = stage.icon;

            return (
              <div
                key={stage.num}
                className={`p-3 rounded-[4px] border flex items-center gap-2.5 transition-all ${
                  stage.done
                    ? 'bg-[var(--bg-surface)] border-[var(--primary)] text-[var(--primary)] shadow-sm'
                    : isCurrent
                    ? 'bg-[var(--bg-secondary)] border-[var(--primary)] text-[var(--primary)] font-bold ring-2 ring-[var(--primary)]/20'
                    : 'bg-[var(--bg-secondary)] border-[var(--border-color)] text-[var(--text-secondary)]/70'
                }`}
              >
                <div className="p-1 rounded bg-[var(--bg-surface)] text-[var(--primary)]">
                  {stage.done ? (
                    <CheckCircle2 className="w-4 h-4 text-[var(--primary)]" />
                  ) : (
                    <Icon className="w-4 h-4" />
                  )}
                </div>
                <div className="truncate">
                  <span className="text-[10px] block opacity-70">0{stage.num}</span>
                  <span className="font-semibold truncate">{stage.label}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Dynamic Guided Interaction Frame */}
        <div className="p-6 sm:p-8 rounded-[4px] bg-[var(--bg-secondary)] border border-[var(--border-color)] space-y-6">
          {/* STEP 1: Choose Sample */}
          {guidedStep === 1 && (
            <div className="space-y-4">
              <div className="space-y-1">
                <span className="text-xs font-mono font-bold text-[var(--primary)] uppercase">
                  STEP 1: CHOOSE A GENOMIC SAMPLE
                </span>
                <h3 className="text-xl font-display font-bold text-[var(--text-main)]">
                  Mount Synthetic Research Specimen
                </h3>
                <p className="text-sm text-[var(--text-secondary)]">
                  Load pre-configured 24-loci reference sample <code className="text-[var(--primary)]">GS-DEMO-001</code> to start the pipeline.
                </p>
              </div>

              <button
                onClick={handleStep1}
                className="btn-lab-primary text-xs py-3 px-6 cursor-pointer"
              >
                USE DEMO SAMPLE
              </button>
            </div>
          )}

          {/* STEP 2: Extract Markers */}
          {guidedStep === 2 && (
            <div className="space-y-4">
              <div className="space-y-1">
                <span className="text-xs font-mono font-bold text-[var(--primary)] uppercase">
                  STEP 2: EXTRACT GENOMIC MARKERS
                </span>
                <h3 className="text-xl font-display font-bold text-[var(--text-main)]">
                  Parse DNA Alleles &amp; Loci Coordinates
                </h3>
                <p className="text-sm text-[var(--text-secondary)]">
                  Scan the raw VCF file and extract 24 candidate SNP markers mapped to chromosome positions.
                </p>
              </div>

              <button
                onClick={handleStep2}
                disabled={isProcessingStep}
                className="btn-lab-primary text-xs py-3 px-6 flex items-center gap-2 cursor-pointer"
              >
                {isProcessingStep ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
                <span>EXTRACT 24 MARKERS</span>
              </button>
            </div>
          )}

          {/* STEP 3: Run AI */}
          {guidedStep === 3 && (
            <div className="space-y-4">
              <div className="space-y-1">
                <span className="text-xs font-mono font-bold text-[var(--primary)] uppercase">
                  STEP 3: RUN MACHINE LEARNING MODEL
                </span>
                <h3 className="text-xl font-display font-bold text-[var(--text-main)]">
                  Execute 200 Decision Trees Ensemble
                </h3>
                <p className="text-sm text-[var(--text-secondary)]">
                  Random Forest processes the additive dosage tensor and computes class risk probability.
                </p>
              </div>

              <button
                onClick={handleStep3}
                disabled={isProcessingStep}
                className="btn-lab-primary text-xs py-3 px-6 flex items-center gap-2 cursor-pointer"
              >
                {isProcessingStep ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
                <span>RUN RANDOM FOREST</span>
              </button>
            </div>
          )}

          {/* STEP 4: Explain with SHAP */}
          {guidedStep === 4 && (
            <div className="space-y-4">
              <div className="space-y-1">
                <span className="text-xs font-mono font-bold text-[var(--primary)] uppercase">
                  STEP 4: GENERATE EXPLANATION
                </span>
                <h3 className="text-xl font-display font-bold text-[var(--text-main)]">
                  Calculate TreeSHAP Feature Attributions
                </h3>
                <p className="text-sm text-[var(--text-secondary)]">
                  Attribute the exact positive and negative influence of each genetic marker on the prediction.
                </p>
              </div>

              <button
                onClick={handleStep4}
                disabled={isProcessingStep}
                className="btn-lab-primary text-xs py-3 px-6 flex items-center gap-2 cursor-pointer"
              >
                {isProcessingStep ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
                <span>VIEW EXPLANATION</span>
              </button>
            </div>
          )}

          {/* STEP 5: Send to Device */}
          {guidedStep === 5 && (
            <div className="space-y-4">
              <div className="space-y-1">
                <span className="text-xs font-mono font-bold text-[var(--primary)] uppercase">
                  STEP 5: DISPATCH TO EDGE DEVICE
                </span>
                <h3 className="text-xl font-display font-bold text-[var(--text-main)]">
                  Transmit Telemetry to Raspberry Pi &amp; OLED
                </h3>
                <p className="text-sm text-[var(--text-secondary)]">
                  Deliver the JSON response to the edge client and command the I2C bus to render the result.
                </p>
              </div>

              <button
                onClick={handleStep5}
                disabled={isProcessingStep}
                className="btn-lab-primary text-xs py-3 px-6 flex items-center gap-2 cursor-pointer"
              >
                {isProcessingStep ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
                <span>SEND TO DEVICE</span>
              </button>
            </div>
          )}

          {/* STEP 6: Result Synchronized */}
          {guidedStep === 6 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-6"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[var(--border-color)] pb-4">
                <div>
                  <span className="text-xs font-mono font-bold text-[var(--primary)] uppercase flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" />
                    STEP 6: PIPELINE COMPLETED SUCCESSFULLY
                  </span>
                  <div className="flex items-baseline gap-3 mt-1">
                    <span className="text-4xl font-display font-black text-[var(--text-main)]">
                      {riskScore}%
                    </span>
                    <span className="px-2 py-0.5 rounded text-xs font-mono font-bold uppercase bg-[var(--bg-surface)] border border-[var(--danger)]/50 text-[var(--danger)]">
                      {riskLevel} RISK
                    </span>
                    <span className="text-xs font-mono text-[var(--text-secondary)]">
                      (SSD1306 BUFFER + WEB SYNCHRONIZED)
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setReportModalOpen(true)}
                    className="btn-lab-primary text-xs py-2 px-4 cursor-pointer"
                  >
                    VIEW REPORT DOSSIER
                  </button>
                  <button
                    onClick={handleRestart}
                    className="btn-lab-secondary text-xs py-2 px-4 cursor-pointer"
                  >
                    TEST ANOTHER SAMPLE
                  </button>
                </div>
              </div>

              <p className="text-xs font-mono text-[var(--text-secondary)]">
                The prototype result is now live on both the web dashboard and the physical Raspberry Pi OLED buffer.
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};
