import React from 'react';
import { Menu, Play, FileText, Sparkles, RotateCcw } from 'lucide-react';
import { useGenoSenseDemo } from '../../hooks/useGenoSenseDemo';

interface HeaderProps {
  onOpenMobileMenu: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenMobileMenu }) => {
  const {
    isRunningFullDemo,
    runFullDemo,
    setReportModalOpen,
    resetDemo,
    predictionReady,
    riskScore,
    riskLevel,
    sampleLoaded,
    sampleId,
  } = useGenoSenseDemo();

  return (
    <header className="sticky top-0 z-30 h-16 bg-navy-950/80 backdrop-blur-md border-b border-slate-800/80 px-4 sm:px-6 flex items-center justify-between">
      <div className="flex items-center gap-3 sm:gap-4">
        <button
          onClick={onOpenMobileMenu}
          className="lg:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 focus:outline-none"
          aria-label="Open menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2">
          <span className="px-2.5 py-1 text-[11px] font-mono font-medium rounded-full bg-cyan-950/80 text-cyan-300 border border-cyan-800/60 shadow-[0_0_8px_rgba(6,182,212,0.2)]">
            Research Prototype
          </span>
          <span className="px-2.5 py-1 text-[11px] font-mono font-medium rounded-full bg-emerald-950/70 text-emerald-300 border border-emerald-800/50">
            Demo Mode
          </span>
          {sampleLoaded && (
            <span className="hidden md:inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-mono rounded-full bg-slate-900 text-slate-300 border border-slate-700">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
              {sampleId}
            </span>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-3">
        {predictionReady && (
          <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-lg bg-navy-900 border border-slate-800 text-xs font-mono">
            <span className="text-slate-400">Score:</span>
            <span className="font-bold text-cyan-400">{riskScore}%</span>
            <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-rose-500/20 text-rose-300 border border-rose-500/30">
              {riskLevel}
            </span>
          </div>
        )}

        <button
          onClick={() => setReportModalOpen(true)}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono font-medium rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-colors"
          title="View Analysis Report"
        >
          <FileText className="w-3.5 h-3.5 text-cyan-400" />
          <span className="hidden sm:inline">View Report</span>
        </button>

        <button
          onClick={runFullDemo}
          disabled={isRunningFullDemo}
          className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-mono font-semibold rounded-lg bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white shadow-[0_0_12px_rgba(6,182,212,0.25)] transition-all disabled:opacity-50"
        >
          {isRunningFullDemo ? (
            <>
              <Sparkles className="w-3.5 h-3.5 animate-spin" />
              <span>Running...</span>
            </>
          ) : (
            <>
              <Play className="w-3.5 h-3.5 fill-current" />
              <span className="hidden sm:inline">Run Full Demo</span>
              <span className="sm:hidden">Run</span>
            </>
          )}
        </button>

        <button
          onClick={resetDemo}
          className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          title="Reset Global Demo State"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
};
