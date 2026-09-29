import React from 'react';
import { Activity } from 'lucide-react';
import { useGenoSenseDemo } from '../../hooks/useGenoSenseDemo';

export const WebDashboardResultSection: React.FC = () => {
  const {
    predictionReady,
    riskScore,
    riskLevel,
    sampleId,
    totalMarkers,
    totalFeatures,
    randomForestTrees,
    selectedGene,
    selectGene,
  } = useGenoSenseDemo();

  const topInfluentialGenes = [
    { gene: 'GENE-A', value: +0.31, direction: 'Increases output risk', rsId: 'rs1800629', featureValue: 2 },
    { gene: 'GENE-B', value: +0.19, direction: 'Increases output risk', rsId: 'rs1800896', featureValue: 1 },
    { gene: 'GENE-D', value: +0.08, direction: 'Moderate positive weight', rsId: 'rs4986790', featureValue: 1 },
  ];

  return (
    <section id="analysis-result" className="space-y-8 py-12 border-t border-[var(--border-color)]">
      {/* Section Header */}
      <div className="max-w-3xl space-y-3">
        <span className="text-[11px] font-mono text-[var(--primary)] uppercase tracking-widest block">
          07 • WEB DASHBOARD VIEW
        </span>
        <h2 className="text-3xl sm:text-4xl font-display font-bold text-[var(--text-main)] tracking-tight">
          Analysis Result
        </h2>
        <p className="text-base text-[var(--text-secondary)] font-sans leading-relaxed">
          The dashboard synthesizes model predictions and identifies the exact biological drivers behind the classification.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Left Column: Large Model Output Score in Space Grotesk */}
        <div className="lg:col-span-5 lab-card p-8 flex flex-col justify-between text-center space-y-6 shadow-md">
          <div className="flex items-center justify-between text-xs font-mono text-[var(--text-secondary)] border-b border-[var(--border-color)] pb-3">
            <span className="uppercase tracking-widest text-[var(--primary)] font-semibold">
              PREDICTION CLASSIFIER
            </span>
            <span className="text-[10px]">SYNTHETIC PHENOTYPE</span>
          </div>

          <div className="py-4 space-y-2">
            <div className="text-7xl sm:text-8xl font-display font-black text-[var(--text-main)] tracking-tight leading-none">
              {predictionReady ? `${riskScore}%` : '73%'}
            </div>
            <div className="font-mono text-xs uppercase tracking-widest text-[var(--text-secondary)] pt-1">
              PROTOTYPE MODEL OUTPUT
            </div>

            <div className="pt-2">
              <span className="inline-block px-4 py-1 rounded text-sm font-mono font-bold uppercase bg-[var(--bg-secondary)] border border-[var(--danger)]/50 text-[var(--danger)]">
                {predictionReady ? riskLevel : 'HIGH'}
              </span>
            </div>
          </div>

          {/* Metadata Specs Matrix */}
          <div className="grid grid-cols-2 gap-3 text-xs font-mono pt-4 border-t border-[var(--border-color)] text-left">
            <div className="p-2.5 rounded bg-[var(--bg-secondary)] border border-[var(--border-color)]">
              <span className="text-[10px] text-[var(--text-secondary)] block">Sample:</span>
              <span className="font-bold text-[var(--text-main)]">
                {sampleId === 'GS-STANDBY' ? 'GS-DEMO-001' : sampleId}
              </span>
            </div>
            <div className="p-2.5 rounded bg-[var(--bg-secondary)] border border-[var(--border-color)]">
              <span className="text-[10px] text-[var(--text-secondary)] block">Markers analyzed:</span>
              <span className="font-bold text-[var(--primary)]">{totalMarkers || 24}</span>
            </div>
            <div className="p-2.5 rounded bg-[var(--bg-secondary)] border border-[var(--border-color)]">
              <span className="text-[10px] text-[var(--text-secondary)] block">Features:</span>
              <span className="font-bold text-[var(--text-main)]">{totalFeatures || 24}</span>
            </div>
            <div className="p-2.5 rounded bg-[var(--bg-secondary)] border border-[var(--border-color)]">
              <span className="text-[10px] text-[var(--text-secondary)] block">Model / Trees:</span>
              <span className="font-bold text-[var(--secondary)]">
                Random Forest ({randomForestTrees || 200})
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: What influenced this result? Clean SHAP Visualization */}
        <div className="lg:col-span-7 lab-card p-8 flex flex-col justify-between space-y-6 shadow-md">
          <div className="flex items-center justify-between text-xs font-mono text-[var(--text-secondary)] border-b border-[var(--border-color)] pb-3">
            <span className="font-bold text-[var(--text-main)] flex items-center gap-2">
              <Activity className="w-4 h-4 text-[var(--primary)]" />
              What influenced this result?
            </span>
            <span className="text-[10px] text-[var(--primary)] font-semibold">SHAP ATTRIBUTION</span>
          </div>

          {/* Clean SHAP Visualization Bars */}
          <div className="space-y-4 font-mono">
            {topInfluentialGenes.map((item) => {
              const isSelected = selectedGene === item.gene;
              const barPercentage = Math.min((item.value / 0.35) * 100, 100);

              return (
                <div
                  key={item.gene}
                  onClick={() => selectGene(item.gene)}
                  className={`p-4 rounded-[4px] border cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-[var(--bg-secondary)] border-[var(--primary)] ring-1 ring-[var(--primary)]/30'
                      : 'bg-[var(--bg-secondary)]/50 border-[var(--border-color)] hover:border-[var(--primary)]/50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2.5">
                      <span className="font-bold text-sm text-[var(--text-main)]">{item.gene}</span>
                      <span className="text-[11px] text-[var(--text-secondary)]">({item.rsId})</span>
                    </div>
                    <span className="font-display font-bold text-base text-[var(--primary)]">
                      +{item.value.toFixed(2)}
                    </span>
                  </div>

                  {/* Horizontal Bar */}
                  <div className="w-full h-2 bg-[var(--bg-surface)] rounded-full overflow-hidden flex border border-[var(--border-color)]">
                    <div
                      className="h-full bg-[var(--primary)] rounded-full transition-all duration-500"
                      style={{ width: `${barPercentage}%` }}
                    />
                  </div>

                  <div className="flex items-center justify-between text-[10px] text-[var(--text-secondary)] mt-1.5">
                    <span>{item.direction}</span>
                    <span>Dosage Value: {item.featureValue}</span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="p-3 rounded bg-[var(--bg-secondary)] border border-[var(--border-color)] text-xs font-mono text-[var(--text-secondary)] flex items-center justify-between">
            <span>Base model expectation: E[f(x)] = 0.22</span>
            <span className="text-[var(--primary)] font-bold">Sum of Contributions → 73%</span>
          </div>
        </div>
      </div>
    </section>
  );
};
