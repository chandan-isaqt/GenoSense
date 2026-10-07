import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  CheckCircle2,
  Play,
  FileText,
  ArrowDown,
  Info,
  Cpu,
  ShieldAlert,
  RotateCcw,
  Sparkles,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import { useGenoSenseDemo } from '../hooks/useGenoSenseDemo';
import { WebDeviceSyncPanel } from '../components/device/WebDeviceSyncPanel';

export const Results: React.FC = () => {
  const {
    analysisResult,
    isAnalyzing,
    selectedMatchedMarker,
    setSelectedMatchedMarker,
    triggerDeviceAnalyze,
    resetDemo,
  } = useGenoSenseDemo();
  const navigate = useNavigate();

  if (!analysisResult) {
    return (
      <div className="max-w-4xl mx-auto py-12 text-center space-y-6">
        <div className="product-card p-10 space-y-5">
          <span className="text-xs font-mono uppercase tracking-widest text-[var(--primary)] font-bold block">
            NO ACTIVE ANALYSIS RESULT
          </span>
          <h1 className="text-3xl font-display font-bold text-[var(--text-main)]">
            Run a Sample to View Calculated Results
          </h1>
          <p className="text-sm text-[var(--text-secondary)] max-w-xl mx-auto">
            GenoSense computes marker-match scores dynamically from the loaded variant profile and marker catalog. Click below to run the deterministic GS-DEMO-001 profile or open the Analyze workspace.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <button
              type="button"
              onClick={() => triggerDeviceAnalyze()}
              disabled={isAnalyzing}
              className="btn-primary-product text-xs py-3 px-6 flex items-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>{isAnalyzing ? 'RUNNING ANALYSIS...' : 'RUN GS-DEMO-001 NOW'}</span>
            </button>
            <button
              type="button"
              onClick={() => navigate('/analyze')}
              className="btn-secondary-product text-xs py-3 px-5 cursor-pointer"
            >
              GO TO ANALYZE PAGE
            </button>
          </div>
        </div>
      </div>
    );
  }

  const primary = analysisResult.primaryCondition;

  const chartData = analysisResult.featureContributions.map((fc) => ({
    name: `${fc.gene} (${fc.variant})`,
    weight: fc.weight,
    condition: fc.condition,
  }));

  return (
    <div className="space-y-12 pb-12 text-left max-w-6xl mx-auto">
      {/* Top Result Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[var(--border-color)] pb-6">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2.5">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[var(--bg-surface)] border border-[var(--primary)] text-[var(--primary)] text-xs font-mono font-bold">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Analysis Complete</span>
            </span>
            <span className="text-xs font-mono text-[var(--text-secondary)]">
              Sample ID: <strong className="text-[var(--text-main)]">{analysisResult.sample.sampleId}</strong>
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-display font-bold text-[var(--text-main)]">
            Analysis Result
          </h1>
          <p className="text-xs font-mono text-[var(--warning)]">
            Synthetic demonstration data — not clinically validated.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => navigate('/report')}
            className="btn-primary-product text-xs py-2.5 px-5 flex items-center gap-2 cursor-pointer"
          >
            <FileText className="w-4 h-4" />
            <span>GENERATE REPORT</span>
          </button>
          <button
            type="button"
            onClick={() => navigate('/device')}
            className="btn-secondary-product text-xs py-2.5 px-4 flex items-center gap-2 cursor-pointer"
          >
            <Cpu className="w-4 h-4" />
            <span>VIEW 3D DEVICE</span>
          </button>
          <button
            type="button"
            onClick={resetDemo}
            className="p-2.5 rounded-lg bg-[var(--bg-surface)] border border-[var(--border-color)] text-[var(--text-secondary)] hover:text-[var(--text-main)] cursor-pointer"
            title="Reset Demo"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Section 15: 3 Main Profile Score Cards */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono uppercase tracking-widest text-[var(--primary)] font-semibold">
            PROTOTYPE MARKER-MATCH SCORES (0–100 SCALE)
          </span>
          <span className="text-xs font-mono text-[var(--text-secondary)]">
            Formula: (Matched Weight Sum / Catalog Weight Sum) × 100
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {analysisResult.conditions.map((cond) => {
            const isHigher = cond.score >= 50;
            const isModerate = cond.score >= 25 && cond.score < 50;

            return (
              <div
                key={cond.conditionId}
                className={`product-card p-6 flex flex-col justify-between space-y-5 ${
                  cond.conditionId === primary.conditionId
                    ? 'border-[var(--primary)] ring-1 ring-[var(--primary)]/30'
                    : ''
                }`}
              >
                <div className="space-y-1.5">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[var(--text-secondary)] block">
                    Prototype Marker-Match Category
                  </span>
                  <h2 className="text-lg font-display font-bold text-[var(--text-main)]">
                    {cond.conditionTitle}
                  </h2>
                  <p className="text-[11px] text-[var(--text-secondary)]">
                    {cond.researchSubtitle}
                  </p>
                </div>

                <div className="py-3 flex items-baseline justify-between border-y border-[var(--border-color)]">
                  <div>
                    <span className="text-5xl font-display font-bold text-[var(--text-main)]">
                      {cond.score}
                    </span>
                    <span className="text-xs font-mono text-[var(--text-secondary)] ml-1.5">
                      / 100
                    </span>
                  </div>

                  <span
                    className={`px-3 py-1 rounded text-xs font-mono font-bold uppercase border ${
                      isHigher
                        ? 'bg-[var(--primary)]/15 text-[var(--primary)] border-[var(--primary)]'
                        : isModerate
                          ? 'bg-[var(--secondary)]/15 text-[var(--secondary)] border-[var(--secondary)]'
                          : 'bg-[var(--bg-secondary)] text-[var(--text-secondary)] border-[var(--border-color)]'
                    }`}
                  >
                    {cond.category}
                  </span>
                </div>

                <div className="text-xs font-mono text-[var(--text-secondary)] space-y-1">
                  <div className="flex justify-between">
                    <span>Matched Markers:</span>
                    <span className="text-[var(--text-main)] font-bold">
                      {cond.matchedMarkers.length} of {cond.totalApplicableMarkers}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Weight Ratio:</span>
                    <span className="text-[var(--primary)] font-bold">
                      {cond.matchedWeightSum.toFixed(2)} / {cond.totalApplicableWeightSum.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Section 17: Mandatory "WHY THIS RESULT?" Visual Flow */}
      <section className="product-card p-6 sm:p-8 space-y-6">
        <div className="space-y-1">
          <span className="text-xs font-mono uppercase tracking-widest text-[var(--primary)] font-semibold block">
            PLAIN-LANGUAGE SCORE REASONING
          </span>
          <h2 className="text-2xl font-display font-bold text-[var(--text-main)]">
            WHY THIS PROFILE SCORED HIGHER ({primary.conditionTitle})
          </h2>
          <p className="text-sm text-[var(--text-secondary)]">
            The score is not a black-box guess; it is calculated directly from the matched demonstration markers below.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-3 items-center font-mono text-xs text-center">
          <div className="p-4 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-color)] space-y-1">
            <span className="text-[10px] text-[var(--primary)] font-bold block">STEP 1</span>
            <p className="font-display font-bold text-sm text-[var(--text-main)]">
              {primary.matchedMarkers.length} relevant demo markers matched
            </p>
          </div>

          <div className="flex justify-center md:rotate-[-90deg]">
            <ArrowDown className="w-4 h-4 text-[var(--primary)]" />
          </div>

          <div className="p-4 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-color)] space-y-1">
            <span className="text-[10px] text-[var(--primary)] font-bold block">STEP 2</span>
            <p className="font-display font-bold text-sm text-[var(--text-main)]">
              {primary.strongWeightCount} markers had stronger weights (&ge;0.20)
            </p>
          </div>

          <div className="flex justify-center md:rotate-[-90deg]">
            <ArrowDown className="w-4 h-4 text-[var(--primary)]" />
          </div>

          <div className="p-4 rounded-xl bg-[var(--bg-surface)] border-2 border-[var(--primary)] space-y-1">
            <span className="text-[10px] text-[var(--primary)] font-bold block">
              COMBINED NORMALIZED SCORE
            </span>
            <p className="font-display font-bold text-2xl text-[var(--text-main)]">
              {primary.score} • {primary.category}
            </p>
          </div>
        </div>
      </section>

      {/* Section 16: Detected Markers Table + Clickable Detail Drawer */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-7 product-card p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-[var(--border-color)] pb-3">
            <div>
              <h2 className="text-xl font-display font-bold text-[var(--text-main)]">
                Detected Markers ({analysisResult.matchedMarkers.length})
              </h2>
              <p className="text-xs text-[var(--text-secondary)]">
                Click any matched row to inspect its full marker catalog record.
              </p>
            </div>
            <span className="text-xs font-mono text-[var(--primary)] font-bold">
              DYNAMIC MATCH OUTPUT
            </span>
          </div>

          <div className="overflow-x-auto rounded-lg border border-[var(--border-color)]">
            <table className="w-full text-left font-mono text-xs">
              <thead className="bg-[var(--bg-secondary)] text-[var(--text-secondary)]">
                <tr>
                  <th className="py-2.5 px-3">Marker ID</th>
                  <th className="py-2.5 px-3">Gene</th>
                  <th className="py-2.5 px-3">Variant</th>
                  <th className="py-2.5 px-3">Condition</th>
                  <th className="py-2.5 px-3">Weight</th>
                  <th className="py-2.5 px-3">Match</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border-color)]">
                {analysisResult.matchedMarkers.map((mm) => {
                  const isSelected =
                    selectedMatchedMarker?.marker.markerId === mm.marker.markerId;
                  return (
                    <tr
                      key={mm.marker.markerId}
                      onClick={() => setSelectedMatchedMarker(mm)}
                      className={`cursor-pointer transition-colors ${
                        isSelected
                          ? 'bg-[var(--primary)]/15 font-bold'
                          : 'hover:bg-[var(--bg-secondary)]/70'
                      }`}
                    >
                      <td className="py-2.5 px-3 text-[var(--primary)]">
                        {mm.marker.markerId}
                      </td>
                      <td className="py-2.5 px-3 text-[var(--text-main)]">
                        {mm.marker.gene}
                      </td>
                      <td className="py-2.5 px-3">{mm.marker.variant}</td>
                      <td className="py-2.5 px-3">{mm.marker.condition}</td>
                      <td className="py-2.5 px-3 text-[var(--primary)]">
                        +{mm.effectiveWeight.toFixed(2)}
                      </td>
                      <td className="py-2.5 px-3">
                        <span className="px-2 py-0.5 rounded bg-[var(--bg-secondary)] text-[var(--primary)] border border-[var(--border-color)] text-[10px]">
                          MATCHED ({mm.inputVariant.allele})
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Selected Marker Details Inspector */}
        <div className="lg:col-span-5 product-card p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-[var(--border-color)] pb-3">
            <h3 className="text-lg font-display font-bold text-[var(--text-main)] flex items-center gap-2">
              <Info className="w-4 h-4 text-[var(--primary)]" />
              <span>Marker Details</span>
            </h3>
            <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-[var(--bg-secondary)] text-[var(--warning)] border border-[var(--border-color)]">
              Synthetic Demo Marker
            </span>
          </div>

          {selectedMatchedMarker ? (
            <div className="space-y-3 font-mono text-xs">
              <div className="grid grid-cols-2 gap-2.5">
                <div className="p-3 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-color)]">
                  <span className="text-[10px] text-[var(--text-secondary)] block">
                    Marker ID
                  </span>
                  <span className="text-sm font-bold text-[var(--primary)]">
                    {selectedMatchedMarker.marker.markerId}
                  </span>
                </div>
                <div className="p-3 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-color)]">
                  <span className="text-[10px] text-[var(--text-secondary)] block">
                    Gene / Variant
                  </span>
                  <span className="text-sm font-bold text-[var(--text-main)]">
                    {selectedMatchedMarker.marker.gene} • {selectedMatchedMarker.marker.variant}
                  </span>
                </div>
                <div className="p-3 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-color)]">
                  <span className="text-[10px] text-[var(--text-secondary)] block">
                    Risk Allele / Weight
                  </span>
                  <span className="text-sm font-bold text-[var(--primary)]">
                    Allele {selectedMatchedMarker.marker.riskAllele} (+{selectedMatchedMarker.marker.weight.toFixed(2)})
                  </span>
                </div>
                <div className="p-3 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-color)]">
                  <span className="text-[10px] text-[var(--text-secondary)] block">
                    Condition
                  </span>
                  <span className="text-xs font-bold text-[var(--text-main)]">
                    {selectedMatchedMarker.marker.condition}
                  </span>
                </div>
              </div>

              <div className="p-3.5 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-color)] space-y-1">
                <span className="text-[10px] text-[var(--text-secondary)] uppercase block">
                  Evidence
                </span>
                <p className="text-xs text-[var(--text-main)] font-sans">
                  {selectedMatchedMarker.marker.evidence}
                </p>
              </div>

              <div className="p-3.5 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-color)] space-y-1">
                <span className="text-[10px] text-[var(--text-secondary)] uppercase block">
                  Source
                </span>
                <p className="text-xs text-[var(--primary)] font-bold">
                  {selectedMatchedMarker.marker.source}
                </p>
              </div>
            </div>
          ) : (
            <p className="text-xs text-[var(--text-secondary)] py-8 text-center">
              Select a row in the Detected Markers table to view its details.
            </p>
          )}
        </div>
      </section>

      {/* Section 18: Prototype Feature Contribution / Honest SHAP Placeholder */}
      <section className="product-card p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[var(--border-color)] pb-4">
          <div className="space-y-1">
            <span className="text-xs font-mono uppercase tracking-widest text-[var(--primary)] font-semibold flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Prototype Feature Contribution</span>
            </span>
            <h2 className="text-2xl font-display font-bold text-[var(--text-main)]">
              Why did the system produce this result?
            </h2>
          </div>

          <span className="px-3 py-1 rounded-full bg-[var(--bg-secondary)] border border-[var(--border-color)] text-[11px] font-mono text-[var(--text-secondary)]">
            Phase 1 prototype contribution view. Real SHAP integration will be connected in the ML phase.
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Contribution List */}
          <div className="lg:col-span-6 space-y-3 font-mono text-xs">
            {analysisResult.featureContributions.map((fc) => (
              <div
                key={fc.markerId}
                className="p-3.5 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-color)] space-y-2"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-display font-bold text-sm text-[var(--text-main)]">
                      {fc.gene}
                    </span>
                    <span className="text-[var(--text-secondary)] ml-2">
                      ({fc.variant} • {fc.condition})
                    </span>
                  </div>
                  <span className="font-display font-bold text-base text-[var(--primary)]">
                    {fc.formattedContribution}
                  </span>
                </div>
                <div className="w-full h-2 rounded-full bg-[var(--bg-surface)] overflow-hidden">
                  <div
                    className="h-full bg-[var(--primary)] rounded-full"
                    style={{ width: `${Math.min(100, (fc.weight / 0.35) * 100)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Recharts Bar Visualization */}
          <div className="lg:col-span-6 h-72 p-4 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-color)]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={chartData}
                layout="vertical"
                margin={{ top: 8, right: 24, left: 24, bottom: 8 }}
              >
                <XAxis type="number" domain={[0, 0.35]} stroke="#8EA2B3" fontSize={11} />
                <YAxis
                  type="category"
                  dataKey="name"
                  stroke="#8EA2B3"
                  fontSize={11}
                  width={120}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#06111D',
                    borderColor: '#1B3852',
                    color: '#F5FAFC',
                    fontFamily: 'IBM Plex Mono',
                    fontSize: '12px',
                  }}
                />
                <Bar dataKey="weight" radius={[0, 6, 6, 0]}>
                  {chartData.map((_, idx) => (
                    <Cell
                      key={idx}
                      fill={idx < 3 ? '#43E6D1' : '#5CA8FF'}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>

      {/* Section 19: Model Layer Transparency */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="product-card p-6 space-y-3 border-[var(--primary)]/50">
          <div className="flex items-center justify-between font-mono text-xs">
            <span className="text-[var(--text-secondary)]">CURRENT MODEL LAYER</span>
            <span className="px-2.5 py-0.5 rounded bg-[var(--primary)]/20 text-[var(--primary)] font-bold">
              ACTIVE
            </span>
          </div>
          <h3 className="text-xl font-display font-bold text-[var(--text-main)]">
            WEIGHTED MARKER MATCHING ENGINE
          </h3>
          <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
            The current prototype demonstrates deterministic marker matching. Every score is computed directly from matched variant weights against the local demonstration catalog.
          </p>
        </div>

        <div className="product-card p-6 space-y-3 opacity-85">
          <div className="flex items-center justify-between font-mono text-xs">
            <span className="text-[var(--text-secondary)]">FUTURE ML LAYER</span>
            <span className="px-2.5 py-0.5 rounded bg-[var(--bg-secondary)] text-[var(--secondary)] border border-[var(--border-color)] font-bold">
              PLANNED
            </span>
          </div>
          <h3 className="text-xl font-display font-bold text-[var(--text-main)]">
            RANDOM FOREST + TREE-SHAP
          </h3>
          <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
            A validated machine-learning model and TreeSHAP attribution pipeline are architected as a later phase once curated training cohorts are connected.
          </p>
        </div>
      </section>

      {/* Section 23: Synchronized Web + OLED Panel */}
      <WebDeviceSyncPanel />

      {/* Safety Footer Note */}
      <div className="p-4 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-color)] flex items-center gap-3 text-xs font-mono text-[var(--text-secondary)]">
        <ShieldAlert className="w-4 h-4 text-[var(--warning)] flex-shrink-0" />
        <span>
          Synthetic demonstration data — not clinically validated. Does not diagnose active infection or clinical disease.
        </span>
      </div>
    </div>
  );
};

export default Results;
