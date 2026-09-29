import React, { useState } from 'react';
import { AlertCircle, X } from 'lucide-react';
import { SYNTHETIC_DISCLAIMER } from '../../data/demoData';

export const DisclaimerBanner: React.FC = () => {
  const [minimized, setMinimized] = useState(false);

  if (minimized) {
    return (
      <button
        onClick={() => setMinimized(false)}
        className="fixed bottom-3 right-4 z-40 px-3 py-1.5 rounded-full bg-navy-900/90 border border-amber-500/30 text-amber-400 text-xs font-mono shadow-lg hover:border-amber-400 transition-colors flex items-center gap-1.5 backdrop-blur-md"
        title="View Medical Disclaimer"
      >
        <AlertCircle className="w-3.5 h-3.5" />
        <span>Research Prototype Disclaimer</span>
      </button>
    );
  }

  return (
    <aside
      aria-label="Research and Educational Prototype Notice"
      className="fixed bottom-0 left-0 right-0 z-40 bg-navy-950/95 border-t border-amber-500/25 px-4 py-2 text-slate-300 text-xs backdrop-blur-md transition-all shadow-[0_-4px_20px_rgba(0,0,0,0.5)]"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <span className="p-1 rounded bg-amber-500/10 text-amber-400 flex-shrink-0">
            <AlertCircle className="w-4 h-4" />
          </span>
          <p className="leading-snug text-slate-300 text-[11px] sm:text-xs">
            <strong className="text-amber-300 uppercase tracking-wider font-mono mr-1.5">
              Notice:
            </strong>
            {SYNTHETIC_DISCLAIMER}
          </p>
        </div>
        <button
          onClick={() => setMinimized(true)}
          className="p-1 rounded hover:bg-slate-800 text-slate-400 hover:text-white transition-colors flex-shrink-0"
          title="Minimize banner"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </aside>
  );
};
