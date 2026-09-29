import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { DisclaimerBanner } from './DisclaimerBanner';
import { ReportModal } from '../common/ReportModal';
import { X } from 'lucide-react';

export const Layout: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-navy-950 text-slate-100 font-sans">
      {/* Desktop Sidebar (persistent) */}
      <aside className="hidden lg:block h-full flex-shrink-0 z-30">
        <Sidebar />
      </aside>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="relative w-72 max-w-[80vw] h-full z-10 flex flex-col shadow-2xl">
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="absolute top-4 right-4 z-20 p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
            <Sidebar onCloseMobile={() => setMobileMenuOpen(false)} />
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-full overflow-hidden relative">
        <Header onOpenMobileMenu={() => setMobileMenuOpen(true)} />

        <main className="flex-1 overflow-y-auto pb-16 sm:pb-14 px-4 sm:px-8 py-6 max-w-7xl w-full mx-auto">
          <Outlet />
        </main>

        <DisclaimerBanner />
      </div>

      {/* Global Analysis Report Modal */}
      <ReportModal />
    </div>
  );
};
