import React, { useState } from 'react';
import {
  Database,
  Cpu,
  Layers,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Search,
  Server,
  Lock,
  Code2,
} from 'lucide-react';
import { useGenoSenseDemo } from '../hooks/useGenoSenseDemo';
import { ConditionId } from '../types/genomics';

const IMPLEMENTED_NOW_STEPS = [
  'CSV / Demo Variants',
  'Variant Parser & Normalizer',
  'Marker Catalog (13 Records)',
  'Weighted Matching Engine',
  'Normalized 0–100 Score',
  'Web + 3D OLED Result',
];

const PLANNED_NEXT_STEPS = [
  'Raw Multi-Sample VCF',
  'scikit-allel / cyvcf2',
  'Genotype Feature Vector',
  'Random Forest Classifier',
  'TreeSHAP Explainer',
  'Flask / FastAPI Backend',
  'SQLite / PostgreSQL',
  'Physical Raspberry Pi GPIO + SSD1306 I2C',
];

const ROADMAP_PHASES = [
  {
    phase: 'PHASE 1',
    title: 'Frontend + Local Demo Engine',
    status: 'COMPLETED (CURRENT)',
    active: true,
    items: [
      'Deterministic 20-variant sample (GS-DEMO-001)',
      '13-record synthetic marker catalog',
      'Weighted marker matching & feature contributions',
      'Interactive Three.js 3D hardware prototype & OLED sync',
    ],
  },
  {
    phase: 'PHASE 2',
    title: 'SQLite / PostgreSQL Database',
    status: 'PLANNED',
    active: false,
    items: [
      'Persistent marker catalog & reference allele tables',
      'Sample analysis run history & audit timestamps',
      'Versioned condition profile definitions',
    ],
  },
  {
    phase: 'PHASE 3',
    title: 'Flask / FastAPI Backend',
    status: 'PLANNED',
    active: false,
    items: [
      'REST endpoints for /api/analyze, /api/markers, /api/report',
      'Server-side validation & asynchronous job queue',
      'WebSocket push to connected edge devices',
    ],
  },
  {
    phase: 'PHASE 4',
    title: 'VCF Parsing with scikit-allel',
    status: 'PLANNED',
    active: false,
    items: [
      'Full VCF 4.2 header & genotype field parsing',
      'Quality filter (QUAL, DP, FILTER=PASS) enforcement',
      'Reference genome GRCh38 coordinate liftover',
    ],
  },
  {
    phase: 'PHASE 5',
    title: 'Random Forest Model',
    status: 'PLANNED',
    active: false,
    items: [
      'Multi-variant non-linear epistatic interaction modeling',
      'Cross-validated probability calibration per condition profile',
      'Side-by-side comparison with Phase-1 weighted engine',
    ],
  },
  {
    phase: 'PHASE 6',
    title: 'SHAP Explainability',
    status: 'PLANNED',
    active: false,
    items: [
      'Exact TreeSHAP local feature attribution values',
      'Base value to final probability waterfall decomposition',
      'Interactive per-sample force & summary plots',
    ],
  },
  {
    phase: 'PHASE 7',
    title: 'Raspberry Pi + OLED Hardware Integration',
    status: 'PLANNED',
    active: false,
    items: [
      'Physical GPIO tactile trigger daemon in Python',
      'SSD1306 128×64 I2C OLED frame buffer driver',
      'Bidirectional MQTT / HTTP telemetry sync with web UI',
    ],
  },
];

export const Technical: React.FC = () => {
  const { markerCatalog, analysisResult } = useGenoSenseDemo();
  const [conditionFilter, setConditionFilter] = useState<'ALL' | ConditionId>('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const matchedIds = new Set(
    analysisResult ? analysisResult.matchedMarkers.map((m) => m.marker.markerId) : []
  );

  const filteredMarkers = markerCatalog.filter((marker) => {
    const matchesCondition =
      conditionFilter === 'ALL' || marker.conditionId === conditionFilter;
    const q = searchQuery.trim().toLowerCase();
    const matchesQuery =
      !q ||
      marker.markerId.toLowerCase().includes(q) ||
      marker.gene.toLowerCase().includes(q) ||
      marker.variant.toLowerCase().includes(q) ||
      marker.condition.toLowerCase().includes(q);
    return matchesCondition && matchesQuery;
  });

  return (
    <div className="max-w-6xl mx-auto space-y-12 pb-12 text-left">
      {/* Page Header */}
      <div className="border-b border-[var(--border-color)] pb-6 space-y-1.5">
        <span className="text-xs font-mono uppercase tracking-widest text-[var(--primary)] font-bold block">
          TECHNICAL ARCHITECTURE & MARKER CATALOG
        </span>
        <h1 className="text-3xl sm:text-4xl font-display font-bold text-[var(--text-main)]">
          System Architecture, Catalog & Roadmap
        </h1>
        <p className="text-sm text-[var(--text-secondary)] max-w-3xl">
          Complete technical specification separating what is actively running in Phase 1 from the planned backend, machine learning, SHAP, and physical edge hardware phases.
        </p>
      </div>

      {/* Model Layer Status Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="product-card p-6 border-[var(--primary)]/50 space-y-4">
          <div className="flex items-center justify-between">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[var(--bg-surface)] border border-[var(--primary)] px-3 py-1 font-mono text-xs font-bold text-[var(--primary)]">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>ACTIVE IN PHASE 1</span>
            </span>
            <Cpu className="w-5 h-5 text-[var(--primary)]" />
          </div>
          <h2 className="font-display text-xl font-bold text-[var(--text-main)]">
            WEIGHTED MARKER MATCHING ENGINE
          </h2>
          <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
            Deterministic TypeScript engine that normalizes uploaded CSV/VCF rows, cross-references the 13-marker synthetic catalog, calculates condition-grouped weighted scores (0–100), and generates per-marker feature contributions in real time.
          </p>
          <div className="rounded-xl border border-[var(--border-color)] bg-[var(--bg-secondary)] p-3.5 font-mono text-xs text-[var(--text-main)]">
            score = clamp(round((matchedWeightSum / totalApplicableWeightSum) * 100), 0, 100)
          </div>
        </div>

        <div className="product-card p-6 space-y-4">
          <div className="flex items-center justify-between">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--border-color)] bg-[var(--bg-secondary)] px-3 py-1 font-mono text-xs font-semibold text-[var(--text-secondary)]">
              <Clock className="w-3.5 h-3.5 text-[var(--secondary)]" />
              <span>PLANNED PHASE 5–6</span>
            </span>
            <Layers className="w-5 h-5 text-[var(--secondary)]" />
          </div>
          <h2 className="font-display text-xl font-bold text-[var(--text-main)]">
            RANDOM FOREST + TREESHAP PIPELINE
          </h2>
          <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
            Planned Python microservice (scikit-learn + shap + scikit-allel) that consumes multi-locus genotype feature vectors, predicts calibrated ensemble probabilities, and computes exact TreeSHAP additive explanations.
          </p>
          <div className="rounded-xl border border-[var(--border-color)] bg-[var(--bg-secondary)] p-3.5 font-mono text-xs text-[var(--text-secondary)]">
            src/services/api.ts already exposes modular async contracts ready for backend swap.
          </div>
        </div>
      </div>

      {/* IMPLEMENTED NOW vs PLANNED NEXT */}
      <div className="product-card p-6 sm:p-8 space-y-6">
        <div>
          <h2 className="font-display text-2xl font-bold text-[var(--text-main)]">
            Architecture Comparison: Implemented Now vs. Planned Next
          </h2>
          <p className="mt-1 text-sm text-[var(--text-secondary)]">
            Transparent distinction between the live in-browser deterministic prototype and the full stack roadmap.
          </p>
        </div>

        <div className="space-y-6">
          {/* Implemented Now */}
          <div className="rounded-xl border border-[var(--primary)]/40 bg-[var(--bg-secondary)] p-5">
            <div className="mb-3 flex items-center gap-2 font-mono text-xs font-bold text-[var(--primary)]">
              <CheckCircle2 className="w-4 h-4" />
              <span>IMPLEMENTED NOW (LIVE DETERMINISTIC ENGINE)</span>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              {IMPLEMENTED_NOW_STEPS.map((step, i) => (
                <React.Fragment key={step}>
                  <span className="rounded-lg border border-[var(--primary)]/40 bg-[var(--bg-surface)] px-3 py-2 font-mono text-xs font-semibold text-[var(--text-main)]">
                    {step}
                  </span>
                  {i < IMPLEMENTED_NOW_STEPS.length - 1 && (
                    <span className="font-mono text-xs text-[var(--primary)]">→</span>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Planned Next */}
          <div className="rounded-xl border border-[var(--border-color)] bg-[var(--bg-secondary)] p-5">
            <div className="mb-3 flex items-center gap-2 font-mono text-xs font-bold text-[var(--secondary)]">
              <Clock className="w-4 h-4" />
              <span>PLANNED NEXT (PYTHON ML + HARDWARE BACKEND)</span>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              {PLANNED_NEXT_STEPS.map((step, i) => (
                <React.Fragment key={step}>
                  <span className="rounded-lg border border-[var(--border-color)] bg-[var(--bg-surface)] px-3 py-2 font-mono text-xs text-[var(--text-secondary)]">
                    {step}
                  </span>
                  {i < PLANNED_NEXT_STEPS.length - 1 && (
                    <span className="font-mono text-xs text-[var(--text-secondary)]">→</span>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* MARKER CATALOG TABLE */}
      <div className="product-card p-6 sm:p-8 space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <Database className="w-4 h-4 text-[var(--primary)]" />
              <span className="font-mono text-xs uppercase tracking-widest text-[var(--primary)] font-bold">
                GENOSENSE SYNTHETIC DEMO DATASET
              </span>
            </div>
            <h2 className="mt-1 font-display text-2xl font-bold text-[var(--text-main)]">
              Curated Marker Catalog ({markerCatalog.length} Records)
            </h2>
            <p className="mt-1 text-sm text-[var(--text-secondary)]">
              Every marker below is explicitly labeled as a{' '}
              <span className="font-mono text-xs text-[var(--text-main)] font-semibold">
                Synthetic Demo Marker
              </span>{' '}
              calibrated for transparent deterministic verification.
            </p>
          </div>

          {/* Filter & Search */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 w-3.5 h-3.5 -translate-y-1/2 text-[var(--text-secondary)]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Filter gene or rsID..."
                className="rounded-lg border border-[var(--border-color)] bg-[var(--bg-secondary)] py-1.5 pl-8 pr-3 font-mono text-xs text-[var(--text-main)] placeholder:text-[var(--text-secondary)] focus:border-[var(--primary)] focus:outline-none"
              />
            </div>

            {(['ALL', 'ALLERGY', 'DENGUE', 'TYPHOID'] as const).map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setConditionFilter(cat)}
                className={`rounded-lg px-3 py-1.5 font-mono text-xs transition cursor-pointer ${
                  conditionFilter === cat
                    ? 'bg-[var(--primary)] font-bold text-[#071320]'
                    : 'border border-[var(--border-color)] bg-[var(--bg-secondary)] text-[var(--text-secondary)] hover:text-[var(--text-main)]'
                }`}
              >
                {cat === 'ALL' ? 'ALL (13)' : cat}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto rounded-xl border border-[var(--border-color)]">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="border-b border-[var(--border-color)] bg-[var(--bg-secondary)] font-mono text-[11px] uppercase text-[var(--text-secondary)]">
                <th className="py-3 px-4">Marker ID</th>
                <th className="py-3 px-4">Gene</th>
                <th className="py-3 px-4">Variant</th>
                <th className="py-3 px-4">Risk Allele</th>
                <th className="py-3 px-4">Condition Profile</th>
                <th className="py-3 px-4">Weight</th>
                <th className="py-3 px-4">Evidence Label</th>
                <th className="py-3 px-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border-color)] font-mono text-xs">
              {filteredMarkers.map((marker) => {
                const isMatchedInActive = matchedIds.has(marker.markerId);
                return (
                  <tr
                    key={marker.markerId}
                    className={
                      isMatchedInActive
                        ? 'bg-[var(--bg-surface)]'
                        : 'bg-[var(--bg-secondary)]/50 hover:bg-[var(--bg-secondary)]'
                    }
                  >
                    <td className="py-3 px-4 font-semibold text-[var(--text-main)]">
                      {marker.markerId}
                    </td>
                    <td className="py-3 px-4 font-bold text-[var(--primary)]">
                      {marker.gene}
                    </td>
                    <td className="py-3 px-4 text-[var(--text-main)]">{marker.variant}</td>
                    <td className="py-3 px-4 text-[var(--text-main)]">
                      {marker.riskAllele}
                    </td>
                    <td className="py-3 px-4 text-[var(--text-main)]">
                      {marker.condition}
                    </td>
                    <td className="py-3 px-4 font-bold text-[var(--text-main)]">
                      {marker.weight.toFixed(2)}
                    </td>
                    <td className="py-3 px-4 text-[var(--text-secondary)]">
                      {marker.evidence}
                    </td>
                    <td className="py-3 px-4">
                      <span className="inline-flex items-center gap-1 rounded-md border border-[var(--border-color)] bg-[var(--bg-primary)] px-2 py-0.5 text-[10px] text-[var(--primary)]">
                        {marker.status}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* 7-Phase Roadmap */}
      <div className="product-card p-6 sm:p-8 space-y-6">
        <div>
          <span className="font-mono text-xs uppercase tracking-widest text-[var(--primary)] font-bold block">
            ENGINEERING TIMELINE
          </span>
          <h2 className="mt-1 font-display text-2xl font-bold text-[var(--text-main)]">
            7-Phase Development Roadmap
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {ROADMAP_PHASES.map((phase) => (
            <div
              key={phase.phase}
              className={`rounded-xl border p-5 ${
                phase.active
                  ? 'border-[var(--primary)] bg-[var(--bg-surface)]'
                  : 'border-[var(--border-color)] bg-[var(--bg-secondary)]'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-[var(--primary)]">
                  {phase.phase}
                </span>
                <span
                  className={`rounded-full px-2.5 py-0.5 font-mono text-[10px] font-bold ${
                    phase.active
                      ? 'bg-[var(--primary)] text-[#071320]'
                      : 'border border-[var(--border-color)] text-[var(--text-secondary)]'
                  }`}
                >
                  {phase.status}
                </span>
              </div>
              <h3 className="mt-2 font-display text-base font-bold text-[var(--text-main)]">
                {phase.title}
              </h3>
              <ul className="mt-3 space-y-1.5 text-xs text-[var(--text-secondary)]">
                {phase.items.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 shrink-0 rounded-full bg-[var(--primary)]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Backend API Service Layer & Security / Privacy Notice */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* API Layer */}
        <div className="product-card p-6 space-y-4">
          <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[var(--primary)] font-bold">
            <Server className="w-4 h-4" />
            <span>BACKEND-READY SERVICE ABSTRACTION</span>
          </div>
          <h3 className="font-display text-xl font-bold text-[var(--text-main)]">
            Modular Service Layer (src/services/api.ts)
          </h3>
          <p className="text-xs leading-relaxed text-[var(--text-secondary)]">
            UI components never hardcode business math. All operations route through clean service contracts so Flask/FastAPI can replace local execution without UI rewrites:
          </p>
          <div className="rounded-xl border border-[#1B3852] bg-[#06111D] p-4 font-mono text-xs text-[#F5FAFC]">
            <div className="flex items-center gap-2 text-[#43E6D1] mb-2 font-bold">
              <Code2 className="w-3.5 h-3.5" />
              <span>src/services/api.ts Exports</span>
            </div>
            <ul className="space-y-1 text-[11px] text-[#8EA2B3]">
              <li>• analyzeDemo(sampleProfile): Promise&lt;AnalysisResult&gt;</li>
              <li>• uploadVariants(fileName, content): Promise&lt;ValidationResult&gt;</li>
              <li>• getMarkers(): Promise&lt;MarkerRecord[]&gt;</li>
              <li>• getResult(sampleId): Promise&lt;AnalysisResult&gt;</li>
              <li>• generateReport(result): Promise&lt;GenoSenseReportDocument&gt;</li>
            </ul>
          </div>
        </div>

        {/* Security & Privacy Notice (Section 42) */}
        <div className="product-card p-6 space-y-4">
          <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[var(--primary)] font-bold">
            <ShieldCheck className="w-4 h-4" />
            <span>SECURITY & PRIVACY ARCHITECTURE</span>
          </div>
          <h3 className="font-display text-xl font-bold text-[var(--text-main)]">
            Data Governance: Current Demo vs. Future Production
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="rounded-xl border border-[var(--primary)]/40 bg-[var(--bg-secondary)] p-4">
              <div className="font-mono text-xs font-bold text-[var(--primary)]">
                CURRENT DEMO (PHASE 1)
              </div>
              <ul className="mt-2.5 space-y-1.5 text-xs text-[var(--text-main)]">
                <li>• Synthetic genomic data only</li>
                <li>• Local in-browser processing</li>
                <li>• Zero external data transmission</li>
                <li>• Safe for classroom & PPT review</li>
              </ul>
            </div>

            <div className="rounded-xl border border-[var(--border-color)] bg-[var(--bg-secondary)] p-4">
              <div className="flex items-center gap-1.5 font-mono text-xs font-bold text-[var(--secondary)]">
                <Lock className="w-3.5 h-3.5" />
                <span>FUTURE PRODUCTION</span>
              </div>
              <ul className="mt-2.5 space-y-1.5 text-xs text-[var(--text-secondary)]">
                <li>• Encrypted genomic storage (AES-256)</li>
                <li>• Authenticated API access (OAuth2/JWT)</li>
                <li>• Audit logging & consent tracking</li>
                <li>• De-identified sample IDs</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
