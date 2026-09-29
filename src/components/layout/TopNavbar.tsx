import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Play, Sparkles, FileText, RotateCcw, Menu, X, Dna } from 'lucide-react';
import { useGenoSenseDemo } from '../../hooks/useGenoSenseDemo';
import { ThemeToggle } from './ThemeToggle';

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
    <header className="sticky top-0 z-40 w-full bg-[var(--bg-primary)]/95 backdrop-blur-md border-b border-[var(--border-color)] transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Left: Brand Identity with live pulse indicator */}
        <NavLink to="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-[4px] bg-[var(--bg-surface)] border border-[var(--border-color)] group-hover:border-[var(--primary)] flex items-center justify-center transition-colors">
            <Dna className="w-4 h-4 text-[var(--primary)]" />
          </div>
          <div className="flex items-center gap-1.5">
            <span className="font-display font-bold text-lg tracking-wider text-[var(--text-main)]">
              GENOSENSE
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--primary)] shadow-[0_0_8px_var(--primary)] animate-pulse" />
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
                    ? 'text-[var(--primary)] bg-[var(--bg-surface)] border border-[var(--border-color)] shadow-sm font-semibold'
                    : 'text-[var(--text-secondary)] hover:text-[var(--text-main)] hover:bg-[var(--bg-surface)]/50'
                }`}
              >
                {link.name}
              </NavLink>
            );
          })}
        </nav>

        {/* Right: Actions and Theme Switcher */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          {/* Theme Toggle Component */}
          <ThemeToggle />

          {predictionReady && (
            <div className="hidden lg:flex items-center gap-2 px-2.5 py-1 rounded-[3px] bg-[var(--bg-surface)] border border-[var(--border-color)] text-xs font-mono">
              <span className="text-[var(--text-secondary)]">RISK:</span>
              <span className="text-[var(--primary)] font-bold">{riskScore}%</span>
            </div>
          )}

          <button
            onClick={() => setReportModalOpen(true)}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono uppercase tracking-wider rounded-[3px] bg-[var(--bg-surface)] hover:bg-[var(--bg-elevated)] text-[var(--text-secondary)] hover:text-[var(--text-main)] border border-[var(--border-color)] transition-colors"
            title="Open Analysis Dossier"
          >
            <FileText className="w-3.5 h-3.5 text-[var(--primary)]" />
            <span>REPORT</span>
          </button>

          <button
            onClick={runFullDemo}
            disabled={isRunningFullDemo}
            className="btn-lab-primary text-xs flex items-center gap-2 py-1.5 px-3.5 sm:py-2 sm:px-4 shadow-none disabled:opacity-50"
          >
            {isRunningFullDemo ? (
              <>
                <Sparkles className="w-3.5 h-3.5 animate-spin" />
                <span className="hidden sm:inline">EXECUTING...</span>
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
            className="p-1.5 sm:p-2 rounded-[3px] bg-[var(--bg-surface)] border border-[var(--border-color)] text-[var(--text-secondary)] hover:text-[var(--text-main)] hover:border-[var(--primary)]/50 transition-colors"
            title="Reset Simulation State"
            aria-label="Reset Simulation"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1.5 rounded-[3px] bg-[var(--bg-surface)] border border-[var(--border-color)] text-[var(--text-secondary)] hover:text-[var(--text-main)]"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[var(--border-color)] bg-[var(--bg-secondary)] px-4 py-3 space-y-1 transition-colors duration-200">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) =>
                `block px-3 py-2 text-xs font-mono uppercase tracking-wider rounded-[3px] ${
                  isActive
                    ? 'text-[var(--primary)] bg-[var(--bg-surface)] border border-[var(--primary)]/40 font-bold'
                    : 'text-[var(--text-secondary)] hover:text-[var(--text-main)] hover:bg-[var(--bg-surface)]'
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
          <div className="pt-2 border-t border-[var(--border-color)] flex gap-2">
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
