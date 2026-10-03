import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { TopNavbar } from './TopNavbar';
import { ReportModal } from '../common/ReportModal';
import { ImageSourcesModal } from '../common/ImageSourcesModal';
import { AlertCircle } from 'lucide-react';
import { SYNTHETIC_DISCLAIMER } from '../../data/demoData';

export const Layout: React.FC = () => {
  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-main)] product-atmosphere flex flex-col font-sans selection:bg-[var(--primary)]/20 selection:text-[var(--primary)] transition-colors duration-200">
      {/* Premium Top Navigation */}
      <TopNavbar />

      {/* Main Content Viewport */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
        <Outlet />
      </main>

      {/* Subtle Footer Medical / Scientific Disclaimer */}
      <footer className="w-full border-t border-[var(--border-color)] bg-[var(--bg-primary)]/95 py-5 text-center text-xs text-[var(--text-secondary)] transition-colors duration-200">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono">
          <div className="flex items-center gap-2 text-left">
            <AlertCircle className="w-3.5 h-3.5 text-[var(--warning)] flex-shrink-0" />
            <p className="text-[11px] leading-relaxed text-[var(--text-secondary)]">
              <strong className="text-[var(--warning)] font-semibold uppercase mr-1">Scientific Notice:</strong>
              {SYNTHETIC_DISCLAIMER}
            </p>
          </div>
          <div className="flex items-center gap-4 text-[10px] text-[var(--text-muted)] flex-shrink-0">
            <ImageSourcesModal />
            <span>•</span>
            <NavLink to="/presentation" className="hover:text-[var(--primary)] transition-colors">
              Slide Deck (/presentation)
            </NavLink>
            <span>•</span>
            <span>GENOSENSE v1.2</span>
          </div>
        </div>
      </footer>

      {/* Global Analysis Report Modal */}
      <ReportModal />
    </div>
  );
};
