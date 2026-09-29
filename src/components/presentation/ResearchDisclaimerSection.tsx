import React from 'react';
import { AlertTriangle, FileText } from 'lucide-react';
import { useGenoSenseDemo } from '../../hooks/useGenoSenseDemo';

export const ResearchDisclaimerSection: React.FC = () => {
  const { setReportModalOpen } = useGenoSenseDemo();

  return (
    <section className="space-y-6 py-12 border-t border-[var(--border-color)]">
      <div className="lab-card p-6 sm:p-8 border-l-4 border-l-[var(--warning)] space-y-4 shadow-sm bg-[var(--bg-secondary)]/50">
        <div className="flex items-center justify-between border-b border-[var(--border-color)] pb-3">
          <div className="flex items-center gap-2.5 text-[var(--warning)]">
            <AlertTriangle className="w-5 h-5 flex-shrink-0" />
            <h3 className="font-display font-bold text-base uppercase tracking-wider text-[var(--text-main)]">
              Research Prototype Notice
            </h3>
          </div>
          <span className="text-[10px] font-mono text-[var(--warning)] font-bold uppercase tracking-widest px-2 py-0.5 rounded bg-[var(--bg-surface)] border border-[var(--warning)]/40">
            NON-CLINICAL USE
          </span>
        </div>

        <p className="text-sm sm:text-base text-[var(--text-main)] font-medium leading-relaxed">
          “GenoSense is an educational/research proof-of-concept. Demonstration outputs use synthetic data and are not clinically validated. The system must not be used for diagnosis, treatment, or medical decision-making.”
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2 font-mono text-xs text-[var(--text-secondary)]">
          <div className="p-3 rounded bg-[var(--bg-surface)] border border-[var(--border-color)]">
            <span className="text-[10px] text-[var(--primary)] font-bold block mb-1">PROVENANCE:</span>
            Synthetic genotypes mapped to GRCh38.p13 human reference assembly coordinates.
          </div>
          <div className="p-3 rounded bg-[var(--bg-surface)] border border-[var(--border-color)]">
            <span className="text-[10px] text-[var(--secondary)] font-bold block mb-1">INTENT:</span>
            Demonstrating explainable AI (XAI) and edge hardware deployment pipelines.
          </div>
          <div className="p-3 rounded bg-[var(--bg-surface)] border border-[var(--border-color)] flex items-center justify-between">
            <div>
              <span className="text-[10px] text-[var(--warning)] font-bold block mb-1">DOSSIER:</span>
              Download synthetic analysis report.
            </div>
            <button
              onClick={() => setReportModalOpen(true)}
              className="p-2 rounded bg-[var(--bg-secondary)] hover:text-[var(--primary)] border border-[var(--border-color)] transition-colors cursor-pointer"
              title="Open Report Dossier"
            >
              <FileText className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
