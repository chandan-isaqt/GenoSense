import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Play,
  CheckCircle2,
  Loader2,
  Eye,
  Download,
  RotateCcw,
  ArrowRight,
  Dna,
  Cpu,
} from 'lucide-react';
import { useGenoSenseDemo } from '../hooks/useGenoSenseDemo';
import { ORDERED_ANALYSIS_STAGES } from '../context/GenoSenseContext';
import { DEMO_CSV_CONTENT, DEMO_SAMPLE_PROFILE } from '../data/demoVariants';

export const Analyze: React.FC = () => {
  const {
    loadedSample,
    sampleLoadedMessage,
    isAnalyzing,
    analysisStage,
    completedStages,
    progressStep,
    analysisResult,
    loadDemoSample,
    runSampleAnalysis,
    resetDemo,
  } = useGenoSenseDemo();

  const [showCsvFormat, setShowCsvFormat] = useState(false);
  const navigate = useNavigate();

  const progressSteps = [
    { num: 1, code: '01 INPUT' },
    { num: 2, code: '02 PROCESS' },
    { num: 3, code: '03 MATCH' },
    { num: 4, code: '04 SCORE' },
    { num: 5, code: '05 RESULT' },
  ];

  const handleDownloadDemoCsv = () => {
    const blob = new Blob([DEMO_CSV_CONTENT], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'GS-DEMO-001.csv';
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleUseDemoSample = async () => {
    loadDemoSample();
    await runSampleAnalysis(DEMO_SAMPLE_PROFILE);
  };

  const handleAnalyzeClick = async () => {
    await runSampleAnalysis(DEMO_SAMPLE_PROFILE);
  };

  return (
    <div className="space-y-10 pb-12 text-left max-w-6xl mx-auto">
      {/* Header & 5-Step Progress Indicator */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-2">
            <span className="text-xs font-mono uppercase tracking-widest text-[var(--primary)] font-semibold block">
              VARIANT PROCESSING WORKSPACE
            </span>
            <h1 className="text-3xl sm:text-4xl font-display font-bold text-[var(--text-main)]">
              Run a GenoSense Analysis
            </h1>
            <p className="text-sm text-[var(--text-secondary)]">
              GenoSense uses variant records rather than a full raw DNA sequence for this prototype.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setShowCsvFormat((prev) => !prev)}
              className="px-3 py-2 rounded-lg bg-[var(--bg-surface)] hover:bg-[var(--bg-elevated)] border border-[var(--border-color)] text-xs font-mono text-[var(--primary)] flex items-center gap-1.5 cursor-pointer"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>View CSV Format</span>
            </button>
            <button
              type="button"
              onClick={resetDemo}
              className="px-3 py-2 rounded-lg bg-[var(--bg-surface)] hover:bg-[var(--bg-elevated)] border border-[var(--border-color)] text-xs font-mono text-[var(--text-secondary)] hover:text-[var(--text-main)] flex items-center gap-1.5 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>RESET DEMO</span>
            </button>
          </div>
        </div>

        {/* 01 INPUT -> 02 PROCESS -> 03 MATCH -> 04 SCORE -> 05 RESULT */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
          {progressSteps.map((step) => {
            const isActive = progressStep === step.num;
            const isDone = progressStep > step.num || (step.num === 5 && analysisResult !== null);
            return (
              <div
                key={step.code}
                className={`p-3 rounded-xl border font-mono text-xs flex items-center justify-between transition-all ${
                  isActive
                    ? 'bg-[var(--bg-surface)] border-[var(--primary)] text-[var(--primary)] font-bold shadow-sm'
                    : isDone
                      ? 'bg-[var(--bg-surface)]/80 border-[var(--primary)]/50 text-[var(--text-main)]'
                      : 'bg-[var(--bg-secondary)]/50 border-[var(--border-color)] text-[var(--text-secondary)]'
                }`}
              >
                <span>{step.code}</span>
                {isDone && <CheckCircle2 className="w-4 h-4 text-[var(--primary)]" />}
              </div>
            );
          })}
        </div>
      </div>

      {/* Collapsible CSV Format Drawer */}
      {showCsvFormat && (
        <div className="product-card p-6 space-y-4 border-[var(--primary)]/50">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[var(--border-color)] pb-3">
            <div>
              <h2 className="text-base font-display font-bold text-[var(--text-main)]">
                Required Demo CSV Format
              </h2>
              <p className="text-xs text-[var(--text-secondary)]">
                Columns required: <code className="text-[var(--primary)] font-mono">sample_id,gene,variant,allele,genotype</code>
              </p>
            </div>
            <button
              type="button"
              onClick={handleDownloadDemoCsv}
              className="px-3 py-1.5 rounded-lg bg-[var(--bg-secondary)] hover:bg-[var(--bg-elevated)] border border-[var(--border-color)] text-xs font-mono text-[var(--primary)] flex items-center gap-1.5 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download GS-DEMO-001.csv</span>
            </button>
          </div>
          <pre className="p-4 rounded-lg bg-[#06111D] text-[#43E6D1] font-mono text-xs overflow-x-auto border border-[#1B3852]">
{`sample_id,gene,variant,allele,genotype
GS-DEMO-001,GENE-A,VAR-001,A,2
GS-DEMO-001,GENE-B,VAR-002,G,2
GS-DEMO-001,GENE-C,VAR-003,G,1
GS-DEMO-001,GENE-D,VAR-004,T,1
GS-DEMO-001,GENE-E,VAR-005,T,0`}
          </pre>
        </div>
      )}

      {/* Main Split Grid: Input Selection (Left) & Execution Pipeline (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Demo Sample Card + Overview Details */}
        <div className="lg:col-span-6 space-y-6">
          {/* Deterministic Demo Sample Card */}
          <div className="product-card p-6 space-y-5">
            <div className="flex items-center justify-between border-b border-[var(--border-color)] pb-3">
              <div className="flex items-center gap-2">
                <Dna className="w-4 h-4 text-[var(--primary)]" />
                <h2 className="text-lg font-display font-bold text-[var(--text-main)]">
                  Demo Sample
                </h2>
              </div>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase bg-[var(--bg-secondary)] text-[var(--primary)] border border-[var(--border-color)] font-bold">
                Deterministic Profile
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 font-mono text-xs">
              <div className="p-3 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-color)]">
                <span className="text-[10px] text-[var(--text-secondary)] block">
                  Sample ID
                </span>
                <span className="text-sm font-bold text-[var(--text-main)]">
                  {DEMO_SAMPLE_PROFILE.sampleId}
                </span>
              </div>
              <div className="p-3 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-color)]">
                <span className="text-[10px] text-[var(--text-secondary)] block">
                  Age / Sex
                </span>
                <span className="text-sm font-bold text-[var(--text-main)]">
                  {DEMO_SAMPLE_PROFILE.age} / {DEMO_SAMPLE_PROFILE.sex}
                </span>
              </div>
              <div className="p-3 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-color)] col-span-2 sm:col-span-1">
                <span className="text-[10px] text-[var(--text-secondary)] block">
                  Variants
                </span>
                <span className="text-sm font-bold text-[var(--primary)]">
                  {DEMO_SAMPLE_PROFILE.variants.length} Records
                </span>
              </div>
            </div>

            <div className="text-xs font-mono text-[var(--text-secondary)] flex items-center justify-between px-1">
              <span>Data:</span>
              <span className="text-[var(--text-main)] font-semibold">
                {DEMO_SAMPLE_PROFILE.dataType}
              </span>
            </div>

            <div className="pt-1">
              <button
                type="button"
                onClick={handleUseDemoSample}
                disabled={isAnalyzing}
                className="btn-primary-product text-xs py-2.5 px-5 flex items-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>ANALYZING DEMO...</span>
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    <span>USE DEMO SAMPLE</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Deterministic Demonstration Details Card */}
          <div className="product-card p-6 space-y-4">
            <div className="flex items-center gap-2 border-b border-[var(--border-color)] pb-3">
              <Cpu className="w-4 h-4 text-[var(--primary)]" />
              <h3 className="text-base font-display font-bold text-[var(--text-main)]">
                Deterministic Prototype Pipeline
              </h3>
            </div>

            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
              GenoSense operates in deterministic demonstration mode. Clicking{' '}
              <strong className="text-[var(--primary)] font-mono">USE DEMO SAMPLE</strong> executes the end-to-end variant normalization, cross-references the 13-record synthetic marker catalog, calculates weighted profile scores, and syncs with the simulated OLED hardware.
            </p>

            <div className="space-y-2.5 pt-1 text-xs font-mono">
              <div className="flex items-center justify-between p-2.5 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-color)]">
                <span className="text-[var(--text-secondary)]">Target Conditions:</span>
                <span className="text-[var(--text-main)] font-semibold">Allergy, Dengue, Typhoid</span>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-color)]">
                <span className="text-[var(--text-secondary)]">Curated Markers:</span>
                <span className="text-[var(--primary)] font-semibold">13 Synthetic Records</span>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-color)]">
                <span className="text-[var(--text-secondary)]">Scoring Engine:</span>
                <span className="text-[var(--text-main)] font-semibold">Weighted Match (0–100)</span>
              </div>
            </div>
          </div>

          {/* Sample Loaded Confirmation Banner */}
          {sampleLoadedMessage && (
            <div className="p-4 rounded-xl bg-[var(--bg-surface)] border-2 border-[var(--primary)] flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-md">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-[var(--primary)] flex-shrink-0" />
                <div>
                  <p className="text-xs font-mono font-bold text-[var(--primary)] uppercase">
                    Sample loaded successfully.
                  </p>
                  <p className="text-sm font-display font-bold text-[var(--text-main)]">
                    {loadedSample?.sampleId} • {loadedSample?.variants.length} variants
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={handleAnalyzeClick}
                disabled={isAnalyzing || !loadedSample}
                className="btn-primary-product text-xs py-3 px-5 flex items-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>ANALYZING...</span>
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 fill-current" />
                    <span>{analysisResult ? 'RE-ANALYZE SAMPLE' : 'ANALYZE SAMPLE'}</span>
                  </>
                )}
              </button>
            </div>
          )}
        </div>

        {/* Right Column: Live Processing Pipeline & Loaded Variants Preview */}
        <div className="lg:col-span-6 space-y-6">
          <div className="product-card p-6 space-y-5">
            <div className="flex items-center justify-between border-b border-[var(--border-color)] pb-3">
              <h2 className="text-lg font-display font-bold text-[var(--text-main)]">
                Analysis Processing Pipeline
              </h2>
              <span className="text-xs font-mono text-[var(--primary)] font-bold">
                {isAnalyzing
                  ? analysisStage
                  : analysisResult
                    ? 'ANALYSIS COMPLETE'
                    : loadedSample
                      ? 'READY TO ANALYZE'
                      : 'WAITING FOR SAMPLE'}
              </span>
            </div>

            {/* 7 Processing States */}
            <div className="space-y-2.5 font-mono text-xs">
              {ORDERED_ANALYSIS_STAGES.map((stage) => {
                const isDone = completedStages.includes(stage);
                const isCurrent = isAnalyzing && analysisStage === stage;

                return (
                  <div
                    key={stage}
                    className={`p-3.5 rounded-xl border flex items-center justify-between transition-all ${
                      isCurrent
                        ? 'bg-[var(--bg-surface)] border-[var(--primary)] text-[var(--primary)] font-bold shadow-sm'
                        : isDone
                          ? 'bg-[var(--bg-secondary)] border-[var(--border-color)] text-[var(--text-main)]'
                          : 'bg-[var(--bg-secondary)]/40 border-[var(--border-color)]/50 text-[var(--text-secondary)] opacity-60'
                    }`}
                  >
                    <span>{stage}</span>
                    {isDone ? (
                      <span className="text-[var(--primary)] font-bold">✓</span>
                    ) : isCurrent ? (
                      <Loader2 className="w-4 h-4 animate-spin text-[var(--primary)]" />
                    ) : (
                      <span>—</span>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Completion Callout & Navigation to Results */}
            {analysisResult && (
              <div className="p-5 rounded-xl bg-[var(--bg-secondary)] border-2 border-[var(--primary)] space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-mono uppercase text-[var(--primary)] font-bold block">
                      PRIMARY MATCH RESULT
                    </span>
                    <h3 className="text-lg font-display font-bold text-[var(--text-main)]">
                      {analysisResult.primaryCondition.conditionTitle}
                    </h3>
                  </div>
                  <div className="text-right">
                    <span className="text-3xl font-display font-bold text-[var(--primary)]">
                      {analysisResult.primaryScore}
                    </span>
                    <span className="block text-[10px] font-mono font-bold text-[var(--text-main)]">
                      {analysisResult.primaryCategory}
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={() => navigate('/results')}
                    className="btn-primary-product text-xs py-2.5 px-5 flex items-center gap-2 cursor-pointer"
                  >
                    <span>VIEW FULL RESULTS</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => navigate('/report')}
                    className="btn-secondary-product text-xs py-2.5 px-4 cursor-pointer"
                  >
                    GENERATE REPORT
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Loaded Variant Records Preview Table */}
          {loadedSample && (
            <div className="product-card p-6 space-y-3">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="font-bold text-[var(--text-main)]">
                  LOADED VARIANT RECORDS ({loadedSample.variants.length})
                </span>
                <span className="text-[var(--primary)]">{loadedSample.sampleId}</span>
              </div>
              <div className="max-h-52 overflow-y-auto rounded-lg border border-[var(--border-color)]">
                <table className="w-full text-left font-mono text-xs">
                  <thead className="bg-[var(--bg-secondary)] text-[var(--text-secondary)] sticky top-0">
                    <tr>
                      <th className="py-2 px-3">Gene</th>
                      <th className="py-2 px-3">Variant</th>
                      <th className="py-2 px-3">Allele</th>
                      <th className="py-2 px-3">Genotype</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[var(--border-color)]">
                    {loadedSample.variants.map((v, i) => (
                      <tr key={`${v.variant}-${i}`} className="hover:bg-[var(--bg-secondary)]/50">
                        <td className="py-1.5 px-3 font-bold text-[var(--text-main)]">{v.gene}</td>
                        <td className="py-1.5 px-3 text-[var(--primary)]">{v.variant}</td>
                        <td className="py-1.5 px-3">{v.allele}</td>
                        <td className="py-1.5 px-3">{v.genotype}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Analyze;
