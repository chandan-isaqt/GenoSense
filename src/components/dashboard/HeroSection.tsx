import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Play, ArrowRight, Dna, Sparkles, FileText } from 'lucide-react';
import { useGenoSenseDemo } from '../../hooks/useGenoSenseDemo';
import { DnaAnimation } from '../common/DnaAnimation';

export const HeroSection: React.FC = () => {
  const navigate = useNavigate();
  const { isRunningFullDemo, runFullDemo, predictionReady, riskScore, riskLevel, setReportModalOpen } =
    useGenoSenseDemo();

  return (
    <div className="relative rounded-3xl p-6 sm:p-10 bg-gradient-to-br from-navy-900 via-navy-950 to-navy-900 border border-cyan-500/20 shadow-[0_10px_40px_rgba(0,0,0,0.6)] overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none" />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-7 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 text-xs font-mono shadow-[0_0_12px_rgba(6,182,212,0.25)]">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
            <span>Biotechnology &amp; Explainable AI Showcase</span>
          </div>

          <div className="space-y-2">
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white font-mono">
              GENOSENSE
            </h1>
            <p className="text-xl sm:text-2xl font-light text-cyan-400 tracking-wide font-mono">
              “From Genomic Data to Explainable AI”
            </p>
          </div>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-sans max-w-2xl">
            An interactive proof-of-concept demonstrating genomic marker extraction, machine learning, explainable
            AI, API integration, and low-cost hardware deployment.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => navigate('/genomic-analysis')}
              className="flex items-center gap-2 px-6 py-3 rounded-xl font-mono text-xs sm:text-sm font-semibold bg-cyan-500 hover:bg-cyan-400 text-navy-950 shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>Start Analysis</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={runFullDemo}
              disabled={isRunningFullDemo}
              className="flex items-center gap-2 px-6 py-3 rounded-xl font-mono text-xs sm:text-sm font-semibold bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 hover:border-cyan-500/40 transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
            >
              {isRunningFullDemo ? (
                <>
                  <Sparkles className="w-4 h-4 animate-spin text-cyan-400" />
                  <span>Running Demo...</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 text-cyan-400 fill-current" />
                  <span>Run Demo</span>
                </>
              )}
            </button>

            {predictionReady && (
              <button
                onClick={() => setReportModalOpen(true)}
                className="flex items-center gap-2 px-4 py-3 rounded-xl font-mono text-xs sm:text-sm font-medium bg-navy-900 hover:bg-navy-800 text-cyan-300 border border-cyan-500/30 transition-all"
              >
                <FileText className="w-4 h-4" />
                <span>View Report</span>
              </button>
            )}
          </div>
        </div>

        <div className="lg:col-span-5 flex flex-col items-center justify-center">
          <div className="w-full max-w-sm rounded-2xl p-5 bg-navy-950/80 border border-cyan-500/25 shadow-xl backdrop-blur-md relative overflow-hidden">
            <div className="flex items-center justify-between border-b border-slate-800/80 pb-3 mb-3">
              <span className="text-xs font-mono text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <Dna className="w-3.5 h-3.5 text-cyan-400" />
                Double Helix Simulation
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800">
                Live 3D-CSS
              </span>
            </div>

            <DnaAnimation />

            <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between">
              <div>
                <span className="text-[11px] font-mono text-slate-400 block">Prototype Output:</span>
                <span className="text-lg font-bold font-mono text-white">
                  {predictionReady ? `${riskScore}%` : 'Standby (73% Demo)'}
                </span>
              </div>
              <div className="text-right">
                <span className="text-[11px] font-mono text-slate-400 block">Classification:</span>
                <span
                  className={`text-xs font-mono font-bold px-2 py-0.5 rounded inline-block ${
                    predictionReady
                      ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                      : 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                  }`}
                >
                  {predictionReady ? riskLevel : 'READY'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
