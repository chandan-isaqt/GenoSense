import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Dna, Menu, X, Play, RotateCcw } from 'lucide-react';
import { useGenoSenseDemo } from '../../hooks/useGenoSenseDemo';
import { ThemeToggle } from './ThemeToggle';

export const TopNavbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { loadedSample, analysisResult, resetDemo } = useGenoSenseDemo();
  const navigate = useNavigate();

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Analyze', path: '/analyze' },
    { name: 'Results', path: '/results' },
    { name: 'Device', path: '/device' },
    { name: 'How It Works', path: '/how-it-works' },
    { name: 'Technical', path: '/technical' },
  ];

  const handleStartDemo = () => {
    setMobileMenuOpen(false);
    navigate('/analyze');
  };

  const handleReset = () => {
    resetDemo();
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[var(--bg-primary)]/90 backdrop-blur-xl border-b border-[var(--border-color)] transition-colors duration-200 print:hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <NavLink
          to="/"
          className="flex items-center gap-2.5 group cursor-pointer"
        >
          <div className="w-8 h-8 rounded-lg bg-[var(--bg-surface)] border border-[var(--border-color)] group-hover:border-[var(--primary)] flex items-center justify-center transition-colors">
            <Dna className="w-4 h-4 text-[var(--primary)]" />
          </div>
          <div className="flex flex-col text-left">
            <span className="font-display font-bold text-base tracking-wider text-[var(--text-main)] leading-none">
              GENOSENSE
            </span>
            <span className="text-[9px] font-mono text-[var(--text-secondary)] tracking-wider">
              VARIANT PROTOTYPE
            </span>
          </div>
        </NavLink>

        {/* Minimal Navigation Links */}
        <nav className="hidden md:flex items-center space-x-1 lg:space-x-2" aria-label="Main Navigation">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/'}
              className={({ isActive }) =>
                `px-3 py-1.5 text-xs font-mono uppercase tracking-wider rounded-md transition-colors ${
                  isActive
                    ? 'text-[var(--primary)] bg-[var(--bg-surface)] font-bold border border-[var(--border-color)]'
                    : 'text-[var(--text-secondary)] hover:text-[var(--text-main)] hover:bg-[var(--bg-surface)]/50'
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}
        </nav>

        {/* Right Actions: Reset + Light/Dark + START DEMO */}
        <div className="flex items-center gap-2 sm:gap-3">
          {(loadedSample || analysisResult) && (
            <button
              type="button"
              onClick={handleReset}
              className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-mono text-[var(--text-secondary)] hover:text-[var(--text-main)] bg-[var(--bg-surface)] border border-[var(--border-color)] transition-colors cursor-pointer"
              title="Clear analysis state and return to SYSTEM READY"
            >
              <RotateCcw className="w-3.5 h-3.5 text-[var(--primary)]" />
              <span>RESET DEMO</span>
            </button>
          )}

          <ThemeToggle />

          <button
            type="button"
            onClick={handleStartDemo}
            className="btn-primary-product text-xs flex items-center gap-1.5 py-2 px-4 cursor-pointer"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span className="font-bold">START DEMO</span>
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1.5 rounded-md bg-[var(--bg-surface)] border border-[var(--border-color)] text-[var(--text-secondary)] hover:text-[var(--text-main)] cursor-pointer"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[var(--border-color)] bg-[var(--bg-secondary)] px-4 py-3 space-y-2">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/'}
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) =>
                `block w-full text-left px-3 py-2 text-xs font-mono uppercase tracking-wider rounded-md ${
                  isActive
                    ? 'text-[var(--primary)] bg-[var(--bg-surface)] font-bold'
                    : 'text-[var(--text-secondary)] hover:text-[var(--text-main)]'
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}
          <div className="pt-2 border-t border-[var(--border-color)] flex flex-col gap-2">
            <button
              type="button"
              onClick={handleReset}
              className="btn-secondary-product text-xs py-2 flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>RESET DEMO</span>
            </button>
            <button
              type="button"
              onClick={handleStartDemo}
              className="btn-primary-product text-xs py-2.5 flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>START DEMO</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
