import React from 'react';
import {
  FileCode2,
  Dna,
  Binary,
  TreeDeciduous,
  HelpCircle,
  Server,
  LayoutDashboard,
  Monitor,
  ArrowDown,
} from 'lucide-react';

export const LaboratoryArchitectureSection: React.FC = () => {
  return (
    <section className="space-y-6 pt-6">
      {/* Section Header */}
      <div className="border-b border-[var(--border-color)] pb-4">
        <span className="text-[11px] font-mono text-[var(--primary)] uppercase tracking-widest block">
          SECTION 07 — FULL SYSTEM
        </span>
        <h2 className="text-2xl sm:text-3xl font-display font-bold text-[var(--text-main)] mt-1">
          GenoSense Architecture
        </h2>
        <p className="text-xs sm:text-sm font-mono text-[var(--text-secondary)] mt-1">
          Comprehensive topology from genomic sequencing inputs to twin cloud/edge endpoints
        </p>
      </div>

      {/* Main Large Architecture Topology */}
      <div className="lab-card p-6 sm:p-10 relative overflow-hidden">
        {/* Central Vertical Pipeline with Animated Connections */}
        <div className="max-w-3xl mx-auto space-y-4 relative">
          {/* Node 1: VCF */}
          <div className="p-4 rounded-[2px] bg-[var(--bg-secondary)] border border-[var(--border-color)] flex items-center justify-between font-mono text-xs">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-[2px] bg-[var(--bg-surface)] border border-[var(--border-color)] text-[var(--primary)]">
                <FileCode2 className="w-4 h-4" />
              </div>
              <div>
                <span className="font-display font-bold text-sm text-[var(--text-main)] block">VCF FILE</span>
                <span className="text-[10px] text-[var(--text-secondary)]">Reference GRCh38.p13 • 18 Variants</span>
              </div>
            </div>
            <span className="text-[10px] text-[var(--primary)] font-semibold px-2 py-0.5 rounded bg-[var(--bg-elevated)] border border-[var(--border-color)]">
              INPUT STREAM
            </span>
          </div>

          <div className="flex justify-center my-1 text-[var(--primary)]">
            <ArrowDown className="w-4 h-4 animate-bounce" />
          </div>

          {/* Node 2: Marker Engine */}
          <div className="p-4 rounded-[2px] bg-[var(--bg-secondary)] border border-[var(--border-color)] flex items-center justify-between font-mono text-xs">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-[2px] bg-[var(--bg-surface)] border border-[var(--border-color)] text-[var(--primary)]">
                <Dna className="w-4 h-4" />
              </div>
              <div>
                <span className="font-display font-bold text-sm text-[var(--text-main)] block">MARKER ENGINE</span>
                <span className="text-[10px] text-[var(--text-secondary)]">Coordinate Indexing • 24 SNP Targets</span>
              </div>
            </div>
            <span className="text-[10px] text-[var(--text-secondary)]">SCAN: 15ms</span>
          </div>

          <div className="flex justify-center my-1 text-[var(--primary)]">
            <ArrowDown className="w-4 h-4 animate-bounce" />
          </div>

          {/* Node 3: Feature Vector */}
          <div className="p-4 rounded-[2px] bg-[var(--bg-secondary)] border border-[var(--border-color)] flex items-center justify-between font-mono text-xs">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-[2px] bg-[var(--bg-surface)] border border-[var(--border-color)] text-[var(--primary)]">
                <Binary className="w-4 h-4" />
              </div>
              <div>
                <span className="font-display font-bold text-sm text-[var(--text-main)] block">FEATURE VECTOR</span>
                <span className="text-[10px] text-[var(--text-secondary)]">Additive Genotype Encoding [0, 1, 2]</span>
              </div>
            </div>
            <span className="text-[10px] text-[var(--primary)] font-semibold">24 FLOATS</span>
          </div>

          <div className="flex justify-center my-1 text-[var(--primary)]">
            <ArrowDown className="w-4 h-4 animate-bounce" />
          </div>

          {/* CENTRAL CORE: GENOSENSE AI CORE */}
          <div className="p-6 rounded-[3px] bg-[var(--bg-elevated)] border-2 border-[var(--primary)] text-center space-y-4 shadow-sm relative">
            <div className="inline-block px-3 py-1 rounded-[2px] bg-[var(--bg-surface)] border border-[var(--primary)] text-[var(--primary)] font-mono text-xs font-bold uppercase tracking-widest">
              GENOSENSE AI CORE
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left font-mono text-xs">
              <div className="p-3 bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-[2px]">
                <div className="flex items-center gap-2 text-[var(--primary)] font-bold">
                  <TreeDeciduous className="w-4 h-4" />
                  <span>RANDOM FOREST</span>
                </div>
                <p className="text-[11px] text-[var(--text-secondary)] mt-1">
                  200 bagging decision trees computing majority consensus output.
                </p>
              </div>

              <div className="p-3 bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-[2px]">
                <div className="flex items-center gap-2 text-[var(--secondary)] font-bold">
                  <HelpCircle className="w-4 h-4" />
                  <span>SHAP TREEEXPLAINER</span>
                </div>
                <p className="text-[11px] text-[var(--text-secondary)] mt-1">
                  Exact polynomial local feature attribution for explainability.
                </p>
              </div>
            </div>
          </div>

          <div className="flex justify-center my-1 text-[var(--primary)]">
            <ArrowDown className="w-4 h-4 animate-bounce" />
          </div>

          {/* Gateway: Flask API */}
          <div className="p-4 rounded-[2px] bg-[var(--bg-secondary)] border border-[var(--border-color)] flex items-center justify-between font-mono text-xs">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-[2px] bg-[var(--bg-surface)] border border-[var(--border-color)] text-[var(--primary)]">
                <Server className="w-4 h-4" />
              </div>
              <div>
                <span className="font-display font-bold text-sm text-[var(--text-main)] block">FLASK API GATEWAY</span>
                <span className="text-[10px] text-[var(--text-secondary)]">RESTful Microservice • POST /predict</span>
              </div>
            </div>
            <span className="text-[10px] text-[var(--primary)] font-semibold">HTTP 200 OK</span>
          </div>

          {/* Dual Parallel Outputs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3">
            {/* Output 1: React Dashboard */}
            <div className="p-5 rounded-[2px] bg-[var(--bg-surface)] border border-[var(--border-color)] font-mono text-xs space-y-2 shadow-sm">
              <div className="flex items-center justify-between text-[var(--primary)] font-bold">
                <span className="flex items-center gap-2">
                  <LayoutDashboard className="w-4 h-4" />
                  <span>→ REACT DASHBOARD</span>
                </span>
                <span className="text-[10px] text-[var(--text-secondary)]">CLIENT SPA</span>
              </div>
              <p className="text-[11px] text-[var(--text-secondary)] font-sans">
                Interactive XAI decomposition, disease comparison charts, and live sample inspector.
              </p>
            </div>

            {/* Output 2: Raspberry Pi OLED */}
            <div className="p-5 rounded-[2px] bg-[var(--bg-surface)] border border-[var(--border-color)] font-mono text-xs space-y-2 shadow-sm">
              <div className="flex items-center justify-between text-[var(--primary)] font-bold">
                <span className="flex items-center gap-2">
                  <Monitor className="w-4 h-4" />
                  <span>→ RASPBERRY PI OLED</span>
                </span>
                <span className="text-[10px] text-[var(--text-secondary)]">EDGE IoT</span>
              </div>
              <p className="text-[11px] text-[var(--text-secondary)] font-sans">
                Point-of-care embedded display streaming calibrated risk scores via I2C bus.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
