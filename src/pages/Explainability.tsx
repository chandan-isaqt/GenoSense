import React from 'react';
import { ShapBarChart } from '../components/shap/ShapBarChart';
import { FeatureDetailsPanel } from '../components/shap/FeatureDetailsPanel';
import { BarChart3, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const Explainability: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-purple-500/10 text-purple-400">
              <BarChart3 className="w-5 h-5" />
            </span>
            <h1 className="text-2xl font-bold font-mono text-white tracking-wide">
              EXPLAINABLE AI
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 font-mono">
            Understand which features influenced the model output using TreeSHAP attribution
          </p>
        </div>

        <button
          onClick={() => navigate('/hardware')}
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-semibold bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-[0_0_15px_rgba(6,182,212,0.3)] transition-all self-start sm:self-auto"
        >
          <span>Proceed to Hardware View</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      <ShapBarChart />

      <FeatureDetailsPanel />
    </div>
  );
};
