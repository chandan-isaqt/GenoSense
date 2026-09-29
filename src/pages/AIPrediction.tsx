import React from 'react';
import { RandomForestCard } from '../components/ai/RandomForestCard';
import { ScoreCounter } from '../components/ai/ScoreCounter';
import { DiseaseComparisonChart } from '../components/ai/DiseaseComparisonChart';
import { BrainCircuit, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useGenoSenseDemo } from '../hooks/useGenoSenseDemo';

export const AIPrediction: React.FC = () => {
  const navigate = useNavigate();
  const { predictionReady } = useGenoSenseDemo();

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Page Title Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-cyan-500/10 text-cyan-400">
              <BrainCircuit className="w-5 h-5" />
            </span>
            <h1 className="text-2xl font-bold font-mono text-white tracking-wide">
              AI PREDICTION
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 font-mono">
            Random Forest inference engine on extracted 24-dimensional genomic features
          </p>
        </div>

        {predictionReady && (
          <button
            onClick={() => navigate('/explainability')}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-semibold bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-[0_0_15px_rgba(6,182,212,0.3)] transition-all self-start sm:self-auto"
          >
            <span>Proceed to Explainability</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Large Central Card: Random Forest Ensemble */}
      <RandomForestCard />

      {/* Prototype Risk Score & Counter */}
      <ScoreCounter />

      {/* Multi-Disease Prototype Comparison Chart */}
      <DiseaseComparisonChart />
    </div>
  );
};
