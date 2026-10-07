import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { AlertCircle } from 'lucide-react';
import { TopNavbar } from './TopNavbar';
import { ImageSourcesModal } from '../common/ImageSourcesModal';
import { SCIENTIFIC_SAFETY_DISCLAIMER } from '../../data/demoVariants';

export const Layout: React.FC = () => {
  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-main)] product-atmosphere flex flex-col font-sans selection:bg-[var(--primary)]/20 selection:text-[var(--primary)] transition-colors duration-200">
      <TopNavbar />

      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
        <Outlet />
      </main>

      <footer className="w-full border-t border-[var(--border-color)] bg-[var(--bg-primary)]/95 py-6 text-xs text-[var(--text-secondary)] transition-colors duration-200 print:hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 font-mono">
          <div className="flex items-start gap-2.5 text-left max-w-3xl">
            <AlertCircle className="w-4 h-4 text-[var(--warning)] flex-shrink-0 mt-0.5" />
            <p className="text-[11px] leading-relaxed text-[var(--text-secondary)]">
              <strong className="text-[var(--warning)] font-semibold uppercase mr-1">
                Scientific Safety Notice:
              </strong>
              {SCIENTIFIC_SAFETY_DISCLAIMER}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-[11px] text-[var(--text-muted)] flex-shrink-0">
            <ImageSourcesModal />
            <span>•</span>
            <NavLink
              to="/demo"
              className="hover:text-[var(--primary)] transition-colors"
            >
              PPT Demo Mode (/demo)
            </NavLink>
            <span>•</span>
            <NavLink
              to="/report"
              className="hover:text-[var(--primary)] transition-colors"
            >
              Report View
            </NavLink>
            <span>•</span>
            <span>Research / Educational Prototype</span>
          </div>
        </div>
      </footer>
    </div>
  );
};
