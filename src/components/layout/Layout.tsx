import React from 'react';
import { Outlet } from 'react-router-dom';
import { TopNavbar } from './TopNavbar';
import { ReportModal } from '../common/ReportModal';
import { AlertCircle } from 'lucide-react';
import { SYNTHETIC_DISCLAIMER } from '../../data/demoData';

export const Layout: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#05080D] text-[#F4F7FA] lab-grid-bg flex flex-col font-sans selection:bg-[#35D6C7]/20 selection:text-[#35D6C7]">
      {/* Premium Top Navigation */}
      <TopNavbar />

      {/* Main Content Viewport */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
        <Outlet />
      </main>

      {/* Subtle Footer Medical / Scientific Disclaimer */}
      <footer className="w-full border-t border-[#182532] bg-[#05080D]/90 py-5 text-center text-xs text-[#8B9AAA]">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3 font-mono">
          <div className="flex items-center gap-2 text-left">
            <AlertCircle className="w-3.5 h-3.5 text-[#F5B942] flex-shrink-0" />
            <p className="text-[11px] leading-relaxed text-[#8B9AAA]">
              <strong className="text-[#F5B942] font-semibold uppercase mr-1">Scientific Notice:</strong>
              {SYNTHETIC_DISCLAIMER}
            </p>
          </div>
          <div className="text-[10px] text-[#8B9AAA]/60 flex-shrink-0">
            GENOSENSE PROTOTYPE v1.2 • GRCh38
          </div>
        </div>
      </footer>

      {/* Global Analysis Report Modal */}
      <ReportModal />
    </div>
  );
};
