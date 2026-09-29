import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Play, Sparkles, FileText, RotateCcw, Menu, X, Dna } from 'lucide-react';
import { useGenoSenseDemo } from '../../hooks/useGenoSenseDemo';

export const TopNavbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { runFullDemo, isRunningFullDemo, resetDemo, setReportModalOpen, predictionReady, riskScore } =
    useGenoSenseDemo();
  const location = useLocation();

  const navLinks = [
    { name: 'Overview', path: '/' },
    { name: 'Genomic Analysis', path: '/genomic-analysis' },
    { name: 'AI Model', path: '/ai-prediction' },
    { name: 'Explainability', path: '/explainability' },
    { name: 'Hardware', path: '/hardware' },
    { name: 'Architecture', path: '/architecture' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-[#05080D]/95 backdrop-blur-md border-b border-[#182532]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Left: Brand Identity with live pulse indicator */}
        <NavLink to="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-[4px] bg-[#0B111A] border border-[#182532] group-hover:border-[#35D6C7] flex items-center justify-center transition-colors">
            <Dna className="w-4 h-4 text-[#35D6C7]" />
          </div>
          <div className="flex items-center gap-1.5">
            <span className="font-display font-bold text-lg tracking-wider text-[#F4F7FA]">
              GENOSENSE
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#35D6C7] shadow-[0_0_8px_#35D6C7] animate-pulse" />
          </div>
        </NavLink>

        {/* Center: Scientific Nav Links (Desktop) */}
        <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <NavLink
                key={link.path}
                to={link.path}
                className={`px-3 py-1.5 text-xs font-mono uppercase tracking-wider transition-colors rounded-[3px] ${
                  isActive
                    ? 'text-[#35D6C7] bg-[#0B111A] border border-[#182532] shadow-[0_0_8px_rgba(53,214,199,0.15)] font-semibold'
                    : 'text-[#8B9AAA] hover:text-[#F4F7FA] hover:bg-[#0B111A]/50'
                }`}
              >
                {link.name}
              </NavLink>
            );
          })}
        </nav>

        {/* Right: Actions */}
        <div className="flex items-center gap-3">
          {predictionReady && (
            <div className="hidden sm:flex items-center gap-2 px-2.5 py-1 rounded-[3px] bg-[#0B111A] border border-[#182532] text-xs font-mono">
              <span className="text-[#8B9AAA]">RISK:</span>
              <span className="text-[#35D6C7] font-bold">{riskScore}%</span>
            </div>
          )}

          <button
            onClick={() => setReportModalOpen(true)}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono uppercase tracking-wider rounded-[3px] bg-[#0B111A] hover:bg-[#182532] text-[#8B9AAA] hover:text-[#F4F7FA] border border-[#182532] transition-colors"
            title="Open Analysis Dossier"
          >
            <FileText className="w-3.5 h-3.5 text-[#35D6C7]" />
            <span>REPORT</span>
          </button>

          <button
            onClick={runFullDemo}
            disabled={isRunningFullDemo}
            className="btn-lab-primary text-xs flex items-center gap-2 py-2 px-4 shadow-none disabled:opacity-50"
          >
            {isRunningFullDemo ? (
              <>
                <Sparkles className="w-3.5 h-3.5 animate-spin" />
                <span>EXECUTING...</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>LIVE DEMO</span>
              </>
            )}
          </button>

          <button
            onClick={resetDemo}
            className="p-2 rounded-[3px] bg-[#0B111A] border border-[#182532] text-[#8B9AAA] hover:text-[#F4F7FA] hover:border-[#35D6C7]/50 transition-colors"
            title="Reset Simulation State"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-[3px] bg-[#0B111A] border border-[#182532] text-[#8B9AAA] hover:text-[#F4F7FA]"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#182532] bg-[#080D14] px-4 py-3 space-y-1">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) =>
                `block px-3 py-2 text-xs font-mono uppercase tracking-wider rounded-[3px] ${
                  isActive
                    ? 'text-[#35D6C7] bg-[#0B111A] border border-[#35D6C7]/40 font-bold'
                    : 'text-[#8B9AAA] hover:text-[#F4F7FA] hover:bg-[#0B111A]'
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
          <div className="pt-2 border-t border-[#182532] flex gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setReportModalOpen(true);
              }}
              className="flex-1 btn-lab-secondary text-xs py-2 text-center"
            >
              View Report
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
