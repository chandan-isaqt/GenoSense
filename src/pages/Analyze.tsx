import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Play,
  Upload,
  FileSpreadsheet,
  CheckCircle2,
  AlertTriangle,
  Loader2,
  Eye,
  Download,
  RotateCcw,
  ArrowRight,
  Dna,
} from 'lucide-react';
import { useGenoSenseDemo } from '../hooks/useGenoSenseDemo';
import { ORDERED_ANALYSIS_STAGES } from '../context/GenoSenseContext';
import { DEMO_CSV_CONTENT, DEMO_SAMPLE_PROFILE } from '../data/demoVariants';

export const Analyze: React.FC = () => {
  const {
    loadedSample,
    sampleLoadedMessage,
    validationErrors,
    validationWarnings,
    isAnalyzing,
    analysisStage,
    completedStages,
    progressStep,
    analysisResult,
    loadDemoSample,
    handleFileUpload,
    runSampleAnalysis,
    resetDemo,
  } = useGenoSenseDemo();

  const [showCsvFormat, setShowCsvFormat] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const csvInputRef = useRef<HTMLInputElement | null>(null);
  const vcfInputRef = useRef<HTMLInputElement | null>(null);
  const navigate = useNavigate();

  const progressSteps = [
    { num: 1, code: '01 INPUT' },
    { num: 2, code: '02 PROCESS' },
    { num: 3, code: '03 MATCH' },
    { num: 4, code: '04 SCORE' },
    { num: 5, code: '05 RESULT' },
  ];

  const onFileSelected = async (file: File) => {
    const text = await file.text();
    await handleFileUpload(file.name, text);
  };

  const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      await onFileSelected(file);
    }
  };

  const handleDownloadDemoCsv = () => {
    const blob = new Blob([DEMO_CSV_CONTENT], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'GS-DEMO-001.csv';
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleAnalyzeClick = async () => {
    const res = await runSampleAnalysis();
    if (res) {
      // Remain visible so user sees all checkmarks, or let them click View Results
    }
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
        {/* Left Column: Demo Sample Card + File Upload */}
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

            <div className="flex flex-wrap items-center gap-3 pt-1">
              <button
                type="button"
                onClick={loadDemoSample}
                disabled={isAnalyzing}
                className="btn-primary-product text-xs py-2.5 px-5 flex items-center gap-2 cursor-pointer disabled:opacity-50"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>USE DEMO SAMPLE</span>
              </button>

              <button
                type="button"
                onClick={() => csvInputRef.current?.click()}
                disabled={isAnalyzing}
                className="btn-secondary-product text-xs py-2.5 px-4 flex items-center gap-2 cursor-pointer disabled:opacity-50"
              >
                <FileSpreadsheet className="w-4 h-4" />
                <span>UPLOAD CSV</span>
              </button>

              <button
                type="button"
                onClick={() => vcfInputRef.current?.click()}
                disabled={isAnalyzing}
                className="px-3.5 py-2.5 rounded-lg bg-[var(--bg-secondary)] hover:bg-[var(--bg-elevated)] border border-[var(--border-color)] text-xs font-mono text-[var(--text-secondary)] hover:text-[var(--text-main)] cursor-pointer disabled:opacity-50"
              >
                UPLOAD VCF
              </button>
            </div>
          </div>

          {/* Drag & Drop File Upload Zone */}
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
            onClick={() => csvInputRef.current?.click()}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                csvInputRef.current?.click();
              }
            }}
            aria-label="Drop CSV or VCF file here or click to choose file"
            className={`p-8 rounded-2xl border-2 border-dashed transition-all text-center space-y-3 cursor-pointer ${
              isDragging
                ? 'border-[var(--primary)] bg-[var(--primary)]/10'
                : 'border-[var(--border-color)] bg-[var(--bg-surface)]/60 hover:border-[var(--primary)]/60'
            }`}
          >
            <input
              ref={csvInputRef}
              type="file"
              accept=".csv"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) onFileSelected(file);
                e.target.value = '';
              }}
            />
            <input
              ref={vcfInputRef}
              type="file"
              accept=".vcf"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) onFileSelected(file);
                e.target.value = '';
              }}
            />

            <div className="w-12 h-12 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-color)] flex items-center justify-center mx-auto text-[var(--primary)]">
              <Upload className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <p className="text-sm font-display font-bold text-[var(--text-main)] uppercase tracking-wider">
                DROP FILE HERE OR CHOOSE FILE
              </p>
              <p className="text-xs text-[var(--text-secondary)] font-mono">
                Supports .csv (sample_id,gene,variant,allele,genotype) or prototype .vcf
              </p>
            </div>
          </div>

          {/* Validation Errors */}
          {validationErrors.length > 0 && (
            <div
              role="alert"
              className="p-4 rounded-xl bg-[var(--danger)]/10 border border-[var(--danger)] text-xs font-mono space-y-2"
            >
              <div className="flex items-center gap-2 font-bold text-[var(--danger)]">
                <AlertTriangle className="w-4 h-4" />
                <span>FILE VALIDATION FAILED</span>
              </div>
              <ul className="list-disc list-inside space-y-1 text-[var(--text-main)]">
                {validationErrors.map((err, i) => (
                  <li key={i}>{err}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Validation Warnings */}
          {validationWarnings.length > 0 && (
            <div className="p-3.5 rounded-xl bg-[var(--warning)]/10 border border-[var(--warning)] text-xs font-mono text-[var(--warning)]">
              {validationWarnings.join(' ')}
            </div>
          )}

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
                    <span>ANALYZE SAMPLE</span>
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

            {/* No Marker Matches Warning if user uploaded valid CSV with 0 catalog hits */}
            {analysisResult && analysisResult.matchedMarkers.length === 0 && (
              <div className="p-4 rounded-xl bg-[var(--warning)]/10 border border-[var(--warning)] text-xs font-mono text-[var(--text-main)] space-y-2">
                <p className="font-bold text-[var(--warning)]">
                  No matching demo markers were found in this file. Try the provided demo sample.
                </p>
                <button
                  type="button"
                  onClick={loadDemoSample}
                  className="btn-primary-product text-xs py-1.5 px-3 cursor-pointer"
                >
                  Load GS-DEMO-001 Sample
                </button>
              </div>
            )}

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
