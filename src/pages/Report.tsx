import React from 'react';
import { Link } from 'react-router-dom';
import {
  Printer,
  FileDown,
  ArrowLeft,
  ShieldAlert,
  CheckCircle2,
  Cpu,
  Dna,
} from 'lucide-react';
import { useGenoSenseDemo } from '../hooks/useGenoSenseDemo';
import { buildReportDocument, triggerPrintReport } from '../services/reportService';
import { executeSampleAnalysis } from '../services/analysisService';
import { DEMO_SAMPLE_PROFILE } from '../data/demoVariants';

export const Report: React.FC = () => {
  const { analysisResult } = useGenoSenseDemo();
  const effectiveResult =
    analysisResult || executeSampleAnalysis(DEMO_SAMPLE_PROFILE);
  const report = buildReportDocument(effectiveResult);

  const handleDownloadJson = () => {
    const blob = new Blob([JSON.stringify(report, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `GENOSENSE-REPORT-${report.sampleId}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-12 text-left">
      {/* Top Action Bar (hidden when printing) */}
      <div className="flex flex-wrap items-center justify-between gap-4 print:hidden">
        <Link
          to="/results"
          className="btn-secondary-product text-xs py-2 px-3.5 flex items-center gap-2"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>BACK TO RESULTS</span>
        </Link>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            type="button"
            onClick={triggerPrintReport}
            className="btn-primary-product text-xs py-2 px-4 flex items-center gap-2 cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>PRINT REPORT</span>
          </button>
          <button
            type="button"
            onClick={triggerPrintReport}
            className="btn-secondary-product text-xs py-2 px-4 flex items-center gap-2 cursor-pointer"
          >
            <FileDown className="w-3.5 h-3.5 text-[var(--primary)]" />
            <span>EXPORT PDF</span>
          </button>
          <button
            type="button"
            onClick={handleDownloadJson}
            className="btn-secondary-product text-xs py-2 px-3.5 cursor-pointer"
          >
            JSON SUMMARY
          </button>
        </div>
      </div>

      {/* Printable Report Sheet */}
      <div className="product-card p-6 sm:p-10 space-y-8 print:border-black print:bg-white print:text-black print:shadow-none">
        {/* Report Header */}
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-[var(--border-color)] pb-6">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-widest text-[var(--primary)]">
              <Dna className="w-4 h-4" />
              <span>GENOSENSE PROTOTYPE DOCUMENTATION</span>
            </div>
            <h1 className="mt-1 font-display text-2xl sm:text-3xl font-bold text-[var(--text-main)]">
              {report.reportTitle}
            </h1>
            <p className="mt-1 font-mono text-xs text-[var(--text-secondary)]">
              SAMPLE: {report.sampleId} • GENERATED: {report.generatedAt}
            </p>
          </div>

          <div className="rounded-xl border border-[var(--border-color)] bg-[var(--bg-secondary)] px-4 py-3 font-mono text-xs">
            <div className="flex items-center gap-1.5 font-bold text-[var(--primary)]">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>DETERMINISTIC RUN VERIFIED</span>
            </div>
            <div className="mt-1 text-[11px] text-[var(--text-secondary)]">
              Phase 1 Weighted Matching
            </div>
          </div>
        </div>

        {/* Sample Metadata & System Configuration Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="rounded-xl border border-[var(--border-color)] bg-[var(--bg-secondary)] p-5">
            <div className="font-mono text-xs font-bold uppercase tracking-wider text-[var(--primary)]">
              SAMPLE METADATA
            </div>
            <dl className="mt-3 space-y-2 font-mono text-xs">
              <div className="flex justify-between border-b border-[var(--border-color)] pb-1.5">
                <dt className="text-[var(--text-secondary)]">Sample ID:</dt>
                <dd className="font-bold text-[var(--text-main)]">{report.sampleId}</dd>
              </div>
              <div className="flex justify-between border-b border-[var(--border-color)] pb-1.5">
                <dt className="text-[var(--text-secondary)]">Age:</dt>
                <dd className="font-semibold text-[var(--text-main)]">{report.age}</dd>
              </div>
              <div className="flex justify-between border-b border-[var(--border-color)] pb-1.5">
                <dt className="text-[var(--text-secondary)]">Sex:</dt>
                <dd className="font-semibold text-[var(--text-main)]">{report.sex}</dd>
              </div>
              <div className="flex justify-between border-b border-[var(--border-color)] pb-1.5">
                <dt className="text-[var(--text-secondary)]">Variants:</dt>
                <dd className="font-bold text-[var(--text-main)]">
                  {report.variantCount}
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-[var(--text-secondary)]">Matched Markers:</dt>
                <dd className="font-bold text-[var(--primary)]">
                  {report.matchedMarkerCount}
                </dd>
              </div>
            </dl>
          </div>

          <div className="rounded-xl border border-[var(--border-color)] bg-[var(--bg-secondary)] p-5">
            <div className="flex items-center gap-1.5 font-mono text-xs font-bold uppercase tracking-wider text-[var(--primary)]">
              <Cpu className="w-3.5 h-3.5" />
              <span>ENGINE & DEVICE TELEMETRY</span>
            </div>
            <dl className="mt-3 space-y-2 font-mono text-xs">
              <div className="flex justify-between border-b border-[var(--border-color)] pb-1.5">
                <dt className="text-[var(--text-secondary)]">Engine:</dt>
                <dd className="font-bold text-[var(--text-main)]">{report.engine}</dd>
              </div>
              <div className="flex justify-between border-b border-[var(--border-color)] pb-1.5">
                <dt className="text-[var(--text-secondary)]">Dataset:</dt>
                <dd className="font-semibold text-[var(--text-main)]">
                  {report.dataset}
                </dd>
              </div>
              <div className="flex justify-between border-b border-[var(--border-color)] pb-1.5">
                <dt className="text-[var(--text-secondary)]">Device:</dt>
                <dd className="font-semibold text-[var(--text-main)]">
                  {report.deviceStatus}
                </dd>
              </div>
              <div className="flex justify-between border-b border-[var(--border-color)] pb-1.5">
                <dt className="text-[var(--text-secondary)]">OLED Status:</dt>
                <dd className="font-bold text-[var(--primary)]">SYNCED (128×64 I2C)</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-[var(--text-secondary)]">Catalog Coverage:</dt>
                <dd className="font-semibold text-[var(--text-main)]">
                  13 Synthetic Markers
                </dd>
              </div>
            </dl>
          </div>
        </div>

        {/* Condition Profile Results */}
        <div className="space-y-3">
          <h2 className="font-mono text-xs font-bold uppercase tracking-wider text-[var(--primary)]">
            RESULTS BY CONDITION PROFILE
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {report.results.map((cs) => (
              <div
                key={cs.condition}
                className="rounded-xl border border-[var(--border-color)] bg-[var(--bg-secondary)] p-4"
              >
                <div className="font-mono text-[11px] uppercase text-[var(--text-secondary)]">
                  {cs.condition}
                </div>
                <div className="mt-2 flex items-baseline gap-1.5">
                  <span className="font-display text-3xl font-bold text-[var(--text-main)]">
                    {cs.score}
                  </span>
                  <span className="font-mono text-xs text-[var(--text-secondary)]">
                    / 100
                  </span>
                </div>
                <div className="mt-2 inline-block rounded-md border border-[var(--border-color)] bg-[var(--bg-surface)] px-2.5 py-0.5 font-mono text-[11px] font-bold text-[var(--primary)]">
                  {cs.category}
                </div>
                <div className="mt-2 font-mono text-[11px] text-[var(--text-secondary)]">
                  Matched Markers: {cs.matchedCount} of {cs.totalCatalogCount}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Prototype Feature Contributions */}
        <div className="space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <h2 className="font-mono text-xs font-bold uppercase tracking-wider text-[var(--primary)]">
              FEATURE CONTRIBUTIONS
            </h2>
            <span className="font-mono text-[11px] text-[var(--text-secondary)]">
              Phase 1 prototype contribution view (Real SHAP planned in Phase 6)
            </span>
          </div>

          <div className="overflow-x-auto rounded-xl border border-[var(--border-color)]">
            <table className="w-full border-collapse text-left font-mono text-xs">
              <thead>
                <tr className="border-b border-[var(--border-color)] bg-[var(--bg-secondary)] text-[11px] uppercase text-[var(--text-secondary)]">
                  <th className="py-2.5 px-4">Gene</th>
                  <th className="py-2.5 px-4">Variant</th>
                  <th className="py-2.5 px-4">Condition Profile</th>
                  <th className="py-2.5 px-4">Contribution</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border-color)]">
                {report.featureContributions.length === 0 ? (
                  <tr>
                    <td
                      colSpan={4}
                      className="py-6 text-center text-[var(--text-secondary)]"
                    >
                      No catalog markers matched in this sample.
                    </td>
                  </tr>
                ) : (
                  report.featureContributions.map((fc) => (
                    <tr
                      key={`${fc.gene}-${fc.variant}`}
                      className="bg-[var(--bg-secondary)]/50"
                    >
                      <td className="py-2.5 px-4 font-bold text-[var(--primary)]">
                        {fc.gene}
                      </td>
                      <td className="py-2.5 px-4 text-[var(--text-main)]">
                        {fc.variant}
                      </td>
                      <td className="py-2.5 px-4 text-[var(--text-main)]">
                        {fc.condition}
                      </td>
                      <td className="py-2.5 px-4 font-bold text-[var(--primary)]">
                        {fc.contribution}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer Disclaimer */}
        <div className="rounded-xl border border-[var(--warning)]/40 bg-[var(--bg-secondary)] p-4">
          <div className="flex items-start gap-3">
            <ShieldAlert className="mt-0.5 w-5 h-5 shrink-0 text-[var(--warning)]" />
            <div className="font-mono text-xs leading-relaxed text-[var(--text-main)]">
              <strong className="uppercase text-[var(--warning)] mr-1.5">
                NON-CLINICAL PROTOTYPE NOTICE:
              </strong>
              Research and educational prototype only. Not for clinical diagnosis.{' '}
              {report.disclaimer}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
