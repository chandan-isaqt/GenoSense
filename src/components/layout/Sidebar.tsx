import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Dna,
  BrainCircuit,
  BarChart3,
  Cpu,
  GitBranch,
  BookOpen,
  Play,
  RotateCcw,
  Sparkles,
} from 'lucide-react';
import { useGenoSenseDemo } from '../../hooks/useGenoSenseDemo';

interface SidebarProps {
  onCloseMobile?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ onCloseMobile }) => {
  const { isRunningFullDemo, runFullDemo, resetDemo, predictionReady, riskScore } = useGenoSenseDemo();

  const navItems = [
    { name: 'Overview', path: '/', icon: LayoutDashboard },
    { name: 'Genomic Analysis', path: '/genomic-analysis', icon: Dna },
    { name: 'AI Prediction', path: '/ai-prediction', icon: BrainCircuit },
    { name: 'Explainability', path: '/explainability', icon: BarChart3 },
    { name: 'Hardware', path: '/hardware', icon: Cpu },
    { name: 'Architecture', path: '/architecture', icon: GitBranch },
    { name: 'Demo Guide', path: '/demo-guide', icon: BookOpen },
  ];

  return (
    <div className="w-64 h-full flex flex-col bg-navy-900 border-r border-slate-800/80 select-none">
      {/* Brand Header */}
      <div className="p-5 border-b border-slate-800/80 bg-navy-950/60">
        <NavLink to="/" onClick={onCloseMobile} className="flex items-center gap-3 group">
          <div className="relative w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-600 via-cyan-400 to-emerald-400 p-[1.5px] shadow-[0_0_15px_rgba(6,182,212,0.35)] group-hover:shadow-[0_0_22px_rgba(6,182,212,0.55)] transition-all">
            <div className="w-full h-full bg-navy-950 rounded-[10px] flex items-center justify-center">
              <Dna className="w-5 h-5 text-cyan-400 group-hover:scale-110 transition-transform" />
            </div>
          </div>
          <div>
            <span className="text-xl font-extrabold tracking-wider bg-gradient-to-r from-white via-cyan-100 to-cyan-300 bg-clip-text text-transparent block font-mono">
              GenoSense
            </span>
            <span className="text-[11px] font-mono text-cyan-400/80 tracking-wide block">
              Genomic AI Prototype
            </span>
          </div>
        </NavLink>
      </div>

      {/* Quick Status Pill */}
      {predictionReady && (
        <div className="mx-4 mt-3 px-3 py-2 rounded-lg bg-navy-950/70 border border-cyan-500/20 flex items-center justify-between text-xs font-mono">
          <span className="text-slate-400">Risk Score:</span>
          <span className="font-bold text-cyan-300 bg-cyan-950/80 px-1.5 py-0.5 rounded border border-cyan-700/50">
            {riskScore}% (HIGH)
          </span>
        </div>
      )}

      {/* Main Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        <div className="px-3 pb-2 text-[10px] font-mono uppercase tracking-widest text-slate-500 font-semibold">
          Navigation
        </div>
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={onCloseMobile}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all group ${
                  isActive
                    ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 shadow-[0_0_15px_rgba(6,182,212,0.15)] font-semibold'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <Icon
                    className={`w-4 h-4 transition-colors ${
                      isActive ? 'text-cyan-400' : 'text-slate-500 group-hover:text-slate-300'
                    }`}
                  />
                  <span>{item.name}</span>
                  {isActive && (
                    <span className="ml-auto w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_6px_#22d3ee]" />
                  )}
                </>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* Action Buttons in Sidebar */}
      <div className="p-3 border-t border-slate-800/80 bg-navy-950/40 space-y-2">
        <button
          onClick={runFullDemo}
          disabled={isRunningFullDemo}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs font-mono font-semibold bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white shadow-[0_0_15px_rgba(6,182,212,0.25)] transition-all disabled:opacity-50"
        >
          {isRunningFullDemo ? (
            <>
              <Sparkles className="w-3.5 h-3.5 animate-spin" />
              <span>Running Pipeline...</span>
            </>
          ) : (
            <>
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Run Full Demo</span>
            </>
          )}
        </button>

        <button
          onClick={resetDemo}
          className="w-full flex items-center justify-center gap-2 px-3 py-1.5 rounded-xl text-xs font-mono text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 transition-colors"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Reset Demo</span>
        </button>
      </div>

      {/* Footer System Indicator */}
      <div className="p-3.5 border-t border-slate-800/80 bg-navy-950/80 flex items-center justify-between text-xs font-mono text-slate-400">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
          </span>
          <span className="text-emerald-400 font-medium">Demo System Online</span>
        </div>
        <span className="text-[10px] text-slate-500">v1.2</span>
      </div>
    </div>
  );
};
