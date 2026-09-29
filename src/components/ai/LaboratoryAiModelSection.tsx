import React from 'react';
import { TreeDeciduous, Play, Sparkles } from 'lucide-react';
import { useGenoSenseDemo } from '../../hooks/useGenoSenseDemo';

export const LaboratoryAiModelSection: React.FC = () => {
  const {
    modelRunning,
    predictionReady,
    runAiPrediction,
    riskScore,
    riskLevel,
    randomForestTrees,
    totalFeatures,
  } = useGenoSenseDemo();

  const sampleTrees = [
    { id: 'T01', label: 'TREE 01', depth: 8, vote: '0.74' },
    { id: 'T02', label: 'TREE 02', depth: 7, vote: '0.71' },
    { id: 'T03', label: 'TREE 03', depth: 8, vote: '0.76' },
    { id: 'T04', label: 'TREE 04', depth: 6, vote: '0.70' },
    { id: 'T05', label: 'TREE 05', depth: 9, vote: '0.75' },
    { id: 'T06', label: 'TREE 06', depth: 7, vote: '0.72' },
  ];

  const diseaseGauges = [
    { name: 'ALLERGY', score: 62 },
    { name: 'DENGUE', score: predictionReady ? riskScore : 73 },
    { name: 'TYPHOID', score: 41 },
  ];

  return (
    <section className="space-y-6 pt-6">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-[var(--border-color)] pb-4">
        <div>
          <span className="text-[11px] font-mono text-[var(--primary)] uppercase tracking-widest block">
            SECTION 03 — AI MODEL
          </span>
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-[var(--text-main)] mt-1">
            Random Forest Inference
          </h2>
        </div>

        <button
          onClick={runAiPrediction}
          disabled={modelRunning}
          className="btn-lab-primary text-xs flex items-center gap-2 py-2 px-4 disabled:opacity-50"
        >
          {modelRunning ? (
            <>
              <Sparkles className="w-3.5 h-3.5 animate-spin" />
              <span>EVALUATING 200 TREES...</span>
            </>
          ) : (
            <>
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>{predictionReady ? 'RE-RUN AI ANALYSIS' : 'RUN AI ANALYSIS'}</span>
            </>
          )}
        </button>
      </div>

      {/* Main Grid: Ensemble Tree Convergence on Left, Risk Score & Disease Gauges on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Left: Tree Bagging Architecture Visualization */}
        <div className="lg:col-span-7 lab-card p-6 flex flex-col justify-between space-y-5">
          <div className="flex items-center justify-between border-b border-[var(--border-color)] pb-3 text-xs font-mono">
            <span className="text-[var(--text-main)] font-bold flex items-center gap-2">
              <TreeDeciduous className="w-4 h-4 text-[var(--primary)]" />
              RANDOM FOREST ENSEMBLE
            </span>
            <span className="text-[var(--primary)] font-semibold">{randomForestTrees || 200} TREES • BAGGING</span>
          </div>

          {/* Parallel Decision Tree Convergence Diagram */}
          <div className="p-4 bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-[3px] font-mono text-xs overflow-x-auto">
            <div className="text-[10px] text-[var(--text-secondary)] uppercase tracking-wider mb-3">
              PARALLEL DECISION TREE CONVERGENCE DIAGRAM
            </div>

            <div className="space-y-1.5 text-xs text-[var(--text-secondary)]">
              {sampleTrees.map((tree, idx) => (
                <div key={tree.id} className="flex items-center gap-2">
                  <span className="text-[var(--primary)] font-bold">{tree.label}</span>
                  <span className="text-[var(--border-color)] font-mono">─</span>
                  <span className="text-[10px] text-[var(--text-secondary)]">
                    (d:{tree.depth})
                  </span>
                  <span className="text-[var(--border-color)] font-mono">
                    {idx === 0 ? '─┐' : idx === sampleTrees.length - 1 ? '─┘' : '─┤'}
                  </span>
                  {idx === 2 && (
                    <span className="text-[var(--secondary)] ml-2 font-bold flex items-center gap-1">
                      ──→ AGGREGATION ──→ SCORE
                      {modelRunning && (
                        <span className="w-2 h-2 rounded-full bg-[var(--primary)] animate-ping ml-1" />
                      )}
                    </span>
                  )}
                  {idx !== 2 && <span className="text-transparent">──→ AGGREGATION ──→ SCORE</span>}
                </div>
              ))}
            </div>

            {/* Trees processing status */}
            <div className="mt-4 pt-3 border-t border-[var(--border-color)] flex items-center justify-between text-[11px] text-[var(--text-secondary)]">
              <span>Bootstrap: 24 features subsampled</span>
              <span className="text-[var(--primary)] font-bold">
                {modelRunning ? 'PROCESSING BATCHES...' : predictionReady ? 'CONVERGENCE ACHIEVED' : 'STANDBY'}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 text-center font-mono text-xs">
            <div className="p-2.5 bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-[2px]">
              <span className="text-[10px] text-[var(--text-secondary)] block">Estimators</span>
              <span className="font-bold text-[var(--text-main)] mt-0.5 block">200</span>
            </div>
            <div className="p-2.5 bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-[2px]">
              <span className="text-[10px] text-[var(--text-secondary)] block">Features Used</span>
              <span className="font-bold text-[var(--primary)] mt-0.5 block">{totalFeatures || 24}</span>
            </div>
            <div className="p-2.5 bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-[2px]">
              <span className="text-[10px] text-[var(--text-secondary)] block">Latency</span>
              <span className="font-bold text-[var(--secondary)] mt-0.5 block">42ms</span>
            </div>
          </div>
        </div>

        {/* Right: Huge Score Result & Disease Gauges */}
        <div className="lg:col-span-5 space-y-6 flex flex-col justify-between">
          {/* RISK RESULT BLOCK */}
          <div className="lab-card p-6 text-center space-y-3 relative overflow-hidden">
            <div className="flex items-center justify-between text-[11px] font-mono border-b border-[var(--border-color)] pb-2 text-[var(--text-secondary)]">
              <span className="uppercase tracking-widest text-[var(--primary)] font-semibold">
                PROTOTYPE MODEL OUTPUT
              </span>
              <span className="text-[10px]">SYNTHETIC OUTPUT</span>
            </div>

            {/* Giant 73% in Space Grotesk */}
            <div className="py-2">
              <div className="text-6xl sm:text-7xl font-display font-black text-[var(--text-main)] tracking-tight">
                {predictionReady ? `${riskScore}%` : '73%'}
              </div>
              <div className="mt-1 font-mono text-xs uppercase tracking-widest text-[var(--text-secondary)]">
                MODEL SCORE
              </div>
            </div>

            {/* Risk Badge */}
            <div className="inline-block px-3 py-1 rounded-[2px] bg-[var(--bg-secondary)] border border-[var(--danger)]/50 text-[var(--danger)] font-mono text-xs font-bold tracking-wider">
              {predictionReady ? riskLevel : 'HIGH'}
            </div>

            <div className="pt-2 text-[10px] font-mono text-[var(--text-secondary)] border-t border-[var(--border-color)]">
              Synthetic demonstration output
            </div>
          </div>

          {/* DISEASE OUTPUT: 3 Thin Horizontal Scientific Gauges */}
          <div className="lab-card p-6 space-y-4">
            <div className="text-[11px] font-mono uppercase tracking-widest text-[var(--text-secondary)] border-b border-[var(--border-color)] pb-2">
              DISEASE PROTOTYPE COMPARISON GAUGES
            </div>

            <div className="space-y-3.5 font-mono text-xs">
              {diseaseGauges.map((item) => (
                <div key={item.name} className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[var(--text-main)] font-bold tracking-wider">{item.name}</span>
                    <span className="text-[var(--primary)] font-display font-bold text-sm">
                      {item.score}
                    </span>
                  </div>

                  {/* Thin 2px Scientific Gauge */}
                  <div className="w-full h-1 bg-[var(--bg-secondary)] border border-[var(--border-color)] overflow-hidden">
                    <div
                      className="h-full bg-[var(--primary)] transition-all duration-500"
                      style={{ width: `${item.score}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="text-[10px] font-mono text-[var(--text-muted)] text-right">
              CALIBRATED ZERO-CENTERED PROBABILITIES
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
