import React, { useState } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { Dna, Menu, X, Play, FileText } from 'lucide-react';
import { useGenoSenseDemo } from '../../hooks/useGenoSenseDemo';
import { ThemeToggle } from './ThemeToggle';

export const TopNavbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { setReportModalOpen, predictionReady, riskScore } = useGenoSenseDemo();
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { name: 'Product', sectionId: 'hero' },
    { name: 'Device', sectionId: 'device' },
    { name: 'How It Works', sectionId: 'how-it-works' },
    { name: 'AI', sectionId: 'ai' },
    { name: 'Demo', sectionId: 'demo' },
  ];

  const handleNavClick = (sectionId: string) => {
    setMobileMenuOpen(false);
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleTryDemo = () => {
    setMobileMenuOpen(false);
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const el = document.getElementById('demo');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById('demo');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[var(--bg-primary)]/85 backdrop-blur-xl border-b border-[var(--border-color)] transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <NavLink
          to="/"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center gap-2.5 group cursor-pointer"
        >
          <div className="w-8 h-8 rounded-lg bg-[var(--bg-surface)] border border-[var(--border-color)] group-hover:border-[var(--primary)] flex items-center justify-center transition-all duration-300 shadow-sm">
            <Dna className="w-4 h-4 text-[var(--primary)]" />
          </div>
          <div className="flex items-center gap-2">
            <span className="font-display font-bold text-lg tracking-wider text-[var(--text-main)]">
              GENOSENSE
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--primary)] shadow-[0_0_8px_var(--primary)] animate-pulse" />
          </div>
        </NavLink>

        {/* Center: Clean Minimal Navigation Links */}
        <nav className="hidden md:flex items-center space-x-1 lg:space-x-3">
          {navItems.map((item) => (
            <button
              key={item.name}
              onClick={() => handleNavClick(item.sectionId)}
              className="px-3.5 py-1.5 text-xs font-mono uppercase tracking-wider text-[var(--text-secondary)] hover:text-[var(--text-main)] hover:bg-[var(--bg-surface)]/60 rounded-md transition-all cursor-pointer"
            >
              {item.name}
            </button>
          ))}
        </nav>

        {/* Right Actions: Theme Switcher + Single Primary CTA */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          {predictionReady && (
            <div className="hidden lg:flex items-center gap-2 px-2.5 py-1 rounded-md bg-[var(--bg-surface)] border border-[var(--border-color)] text-xs font-mono">
              <span className="text-[var(--text-secondary)]">RISK:</span>
              <span className="text-[var(--primary)] font-bold">{riskScore}%</span>
            </div>
          )}

          <button
            onClick={() => setReportModalOpen(true)}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono uppercase tracking-wider rounded-md bg-[var(--bg-surface)] hover:bg-[var(--bg-elevated)] text-[var(--text-secondary)] hover:text-[var(--text-main)] border border-[var(--border-color)] transition-colors cursor-pointer"
            title="Open Analysis Dossier"
          >
            <FileText className="w-3.5 h-3.5 text-[var(--primary)]" />
            <span>REPORT</span>
          </button>

          {/* Theme Switcher */}
          <ThemeToggle />

          {/* Primary CTA */}
          <button
            onClick={handleTryDemo}
            className="btn-primary-product text-xs flex items-center gap-2 py-2 px-4 shadow-sm cursor-pointer"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span className="font-bold">TRY DEMO</span>
          </button>

          {/* Mobile hamburger button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1.5 rounded-md bg-[var(--bg-surface)] border border-[var(--border-color)] text-[var(--text-secondary)] hover:text-[var(--text-main)] cursor-pointer"
            aria-label="Toggle Navigation"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[var(--border-color)] bg-[var(--bg-secondary)] px-4 py-3 space-y-2">
          {navItems.map((item) => (
            <button
              key={item.name}
              onClick={() => handleNavClick(item.sectionId)}
              className="w-full text-left px-3 py-2 text-xs font-mono uppercase tracking-wider text-[var(--text-secondary)] hover:text-[var(--text-main)] hover:bg-[var(--bg-surface)] rounded-[3px] transition-colors cursor-pointer"
            >
              {item.name}
            </button>
          ))}
          <div className="pt-2 border-t border-[var(--border-color)] flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setReportModalOpen(true);
              }}
              className="btn-lab-secondary text-xs py-2 text-center"
            >
              View Report Dossier
            </button>
            <button
              onClick={handleTryDemo}
              className="btn-primary-product text-xs py-2.5 text-center flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>TRY DEMO</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
