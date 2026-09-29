import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle, X, Dna, Brain, Eye, Cpu, LayoutDashboard, ArrowRight } from 'lucide-react';

interface FirstTimeUserGuideModalProps {
  onStartDemo?: () => void;
}

export const FirstTimeUserGuideModal: React.FC<FirstTimeUserGuideModalProps> = ({ onStartDemo }) => {
  const [isOpen, setIsOpen] = useState(false);

  const pillars = [
    {
      label: 'WHAT',
      title: 'Genomic Marker Extraction',
      description: 'GenoSense ingests raw DNA sequences and identifies specific candidate disease-associated markers.',
      icon: Dna,
    },
    {
      label: 'AI',
      title: 'Machine-Learning Inference',
      description: 'A 200-tree Random Forest ensemble generates a prototype model risk estimate from numerical features.',
      icon: Brain,
    },
    {
      label: 'EXPLANATION',
      title: 'Transparent SHAP Attribution',
      description: 'TreeSHAP mathematical attribution reveals exactly which genes increased or decreased the predicted score.',
      icon: Eye,
    },
    {
      label: 'DEVICE',
      title: 'Raspberry Pi + OLED Hardware',
      description: 'A low-cost single-board computer receives the telemetry and renders it on a physical 128×64 screen.',
      icon: Cpu,
    },
    {
      label: 'DASHBOARD',
      title: 'Synchronized Web Interface',
      description: 'The same result and attribution profiles appear simultaneously in the web application for researchers.',
      icon: LayoutDashboard,
    },
  ];

  return (
    <>
      {/* Floating Help Control Button (Always Available in Bottom Right) */}
      <div className="fixed bottom-6 right-6 z-40">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-[var(--bg-surface)] border-2 border-[var(--primary)] text-[var(--primary)] text-xs font-mono font-bold uppercase tracking-wider shadow-xl hover:bg-[var(--primary)] hover:text-[var(--primary-text)] transition-colors cursor-pointer"
        >
          <HelpCircle className="w-4 h-4" />
          <span className="hidden sm:inline">How does GenoSense work?</span>
          <span className="sm:hidden">Help</span>
          <span className="w-2 h-2 rounded-full bg-[var(--primary)] animate-pulse" />
        </motion.button>
      </div>

      {/* Clean Guided Overlay Modal */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-sm font-sans">
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 8 }}
              transition={{ duration: 0.15 }}
              className="relative w-full max-w-2xl bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-xl shadow-2xl p-6 sm:p-8 space-y-6 text-[var(--text-main)]"
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b border-[var(--border-color)] pb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded bg-[var(--bg-secondary)] text-[var(--primary)] border border-[var(--border-color)]">
                    <HelpCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xl font-display font-bold text-[var(--text-main)]">
                      How Does GenoSense Work?
                    </h3>
                    <p className="text-xs font-mono text-[var(--text-secondary)]">
                      30-Second Quick Primer for New Visitors
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded hover:bg-[var(--bg-secondary)] text-[var(--text-secondary)] hover:text-[var(--text-main)] transition-colors cursor-pointer"
                  aria-label="Close Guide"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* 5 Key Pillars */}
              <div className="space-y-3 font-mono text-xs">
                {pillars.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={item.label}
                      className="p-3 rounded bg-[var(--bg-secondary)] border border-[var(--border-color)] flex items-start gap-3"
                    >
                      <div className="p-1.5 rounded bg-[var(--bg-surface)] text-[var(--primary)] flex-shrink-0 mt-0.5">
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-[var(--primary)] text-[10px] uppercase">
                            {item.label}:
                          </span>
                          <span className="font-bold text-[var(--text-main)]">{item.title}</span>
                        </div>
                        <p className="text-[11px] text-[var(--text-secondary)] font-sans leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Footer Actions */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-[var(--border-color)]">
                <span className="text-[11px] font-mono text-[var(--text-secondary)]">
                  Research Prototype • Non-Clinical Educational Demo
                </span>

                <button
                  onClick={() => {
                    setIsOpen(false);
                    if (onStartDemo) onStartDemo();
                  }}
                  className="btn-lab-primary text-xs flex items-center gap-2 py-2 px-5 cursor-pointer"
                >
                  <span>TRY THE DEMO NOW</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
