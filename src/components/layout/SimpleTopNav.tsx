import React, { useState } from 'react';
import { Dna, Menu, X, Play } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';

interface SimpleTopNavProps {
  onNavigateSection: (sectionId: string) => void;
  onTryGenoSense: () => void;
}

export const SimpleTopNav: React.FC<SimpleTopNavProps> = ({
  onNavigateSection,
  onTryGenoSense,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { name: 'How It Works', sectionId: 'how-it-works' },
    { name: 'Device', sectionId: 'device' },
    { name: 'AI Analysis', sectionId: 'analysis-result' },
    { name: 'Demo', sectionId: 'full-demo' },
  ];

  const handleLinkClick = (sectionId: string) => {
    setMobileMenuOpen(false);
    onNavigateSection(sectionId);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[var(--bg-primary)]/95 backdrop-blur-md border-b border-[var(--border-color)] transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center gap-2.5 group cursor-pointer text-left"
        >
          <div className="w-8 h-8 rounded-[4px] bg-[var(--bg-surface)] border border-[var(--border-color)] group-hover:border-[var(--primary)] flex items-center justify-center transition-colors">
            <Dna className="w-4 h-4 text-[var(--primary)]" />
          </div>
          <div className="flex items-center gap-1.5">
            <span className="font-display font-bold text-lg tracking-wider text-[var(--text-main)]">
              GENOSENSE
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--primary)] shadow-[0_0_8px_var(--primary)] animate-pulse" />
          </div>
        </button>

        {/* Center: 4 Simple Clean Navigation Links */}
        <nav className="hidden md:flex items-center space-x-1 lg:space-x-4">
          {navItems.map((item) => (
            <button
              key={item.name}
              onClick={() => handleLinkClick(item.sectionId)}
              className="px-3 py-1.5 text-xs font-mono uppercase tracking-wider text-[var(--text-secondary)] hover:text-[var(--text-main)] hover:bg-[var(--bg-surface)]/60 rounded-[3px] transition-colors cursor-pointer"
            >
              {item.name}
            </button>
          ))}
        </nav>

        {/* Right Actions: Theme Toggle + Single Primary CTA */}
        <div className="flex items-center gap-3">
          {/* Theme Switcher */}
          <ThemeToggle />

          {/* Primary CTA */}
          <button
            onClick={onTryGenoSense}
            className="btn-lab-primary text-xs flex items-center gap-1.5 py-2 px-4 shadow-sm cursor-pointer"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span className="font-bold">TRY GENOSENSE</span>
          </button>

          {/* Mobile hamburger button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1.5 rounded bg-[var(--bg-surface)] border border-[var(--border-color)] text-[var(--text-secondary)] hover:text-[var(--text-main)] cursor-pointer"
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
              onClick={() => handleLinkClick(item.sectionId)}
              className="w-full text-left px-3 py-2 text-xs font-mono uppercase tracking-wider text-[var(--text-secondary)] hover:text-[var(--text-main)] hover:bg-[var(--bg-surface)] rounded-[3px] transition-colors cursor-pointer"
            >
              {item.name}
            </button>
          ))}
          <div className="pt-2 border-t border-[var(--border-color)]">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onTryGenoSense();
              }}
              className="w-full btn-lab-primary text-xs py-2.5 text-center flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>TRY GENOSENSE</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
