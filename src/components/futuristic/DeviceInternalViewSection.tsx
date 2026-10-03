import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Monitor, Cpu, Cable, CircleDot, Wifi, ArrowDown, CheckCircle2 } from 'lucide-react';

export const DeviceInternalViewSection: React.FC = () => {
  const [selectedPartIndex, setSelectedPartIndex] = useState<number>(0);

  const parts = [
    {
      id: 'oled',
      name: 'OLED Display',
      simpleRole: 'The screen on the front.',
      explanation:
        'Displays the GenoSense status and shows the AI risk estimate the moment calculation completes.',
      image: '/assets/hardware/oled.jpg',
      icon: Monitor,
    },
    {
      id: 'rpi',
      name: 'Raspberry Pi',
      simpleRole: 'The small computer inside.',
      explanation:
        'A compact, low-cost computer that communicates with the AI system and controls the screen.',
      image: '/assets/hardware/raspberry-pi.jpg',
      icon: Cpu,
    },
    {
      id: 'gpio',
      name: 'GPIO Wiring',
      simpleRole: 'The internal wires.',
      explanation:
        'Connects the screen, the push button, and the computer board so they can exchange signals.',
      icon: Cable,
    },
    {
      id: 'button',
      name: 'Analyze Button',
      simpleRole: 'The physical switch.',
      explanation:
        'A tactile push button that lets a user initiate the entire AI analysis workflow with one touch.',
      image: '/assets/hardware/button.jpg',
      icon: CircleDot,
    },
    {
      id: 'wifi',
      name: 'Wi-Fi Connection',
      simpleRole: 'The wireless link.',
      explanation:
        'Wirelessly sends the genomic request to the model server and receives the results back.',
      icon: Wifi,
    },
  ];

  const currentPart = parts[selectedPartIndex];

  return (
    <section id="inside-the-device" className="py-20 border-t border-[var(--border-color)]/70 space-y-12">
      {/* Section Header (Section 12) */}
      <div className="max-w-3xl space-y-3 text-left">
        <span className="text-xs font-mono text-[var(--primary)] uppercase tracking-widest block font-semibold">
          CUTAWAY EXPLORATION
        </span>
        <h2 className="text-4xl sm:text-5xl font-display font-bold text-[var(--text-main)] tracking-tight">
          What is inside?
        </h2>
        <p className="text-base sm:text-lg text-[var(--text-secondary)] font-sans leading-relaxed">
          Inside the GenoSense enclosure, standard hardware components work together as a cohesive edge instrument. Click any component below to see what it does.
        </p>
      </div>

      {/* Main Interactive Cutaway Stage */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Column: Vertical Flow: OLED -> Raspberry Pi -> GPIO -> Button -> Wi-Fi */}
        <div className="lg:col-span-5 space-y-2">
          {parts.map((p, idx) => {
            const isSelected = selectedPartIndex === idx;
            const Icon = p.icon;

            return (
              <React.Fragment key={p.id}>
                <button
                  onClick={() => setSelectedPartIndex(idx)}
                  className={`w-full text-left p-4 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-4 ${
                    isSelected
                      ? 'bg-[var(--bg-surface)] border-[var(--primary)] shadow-md ring-1 ring-[var(--primary)]/30'
                      : 'bg-[var(--bg-surface)]/60 border-[var(--border-color)] hover:border-[var(--text-secondary)]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        isSelected
                          ? 'bg-[var(--primary)] text-[var(--primary-text)] font-bold'
                          : 'bg-[var(--bg-secondary)] text-[var(--text-secondary)]'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-base font-display font-bold text-[var(--text-main)]">
                        {p.name}
                      </h3>
                      <p className="text-xs text-[var(--text-secondary)] font-sans">
                        {p.simpleRole}
                      </p>
                    </div>
                  </div>

                  <span
                    className={`text-xs font-mono font-bold ${
                      isSelected ? 'text-[var(--primary)]' : 'text-[var(--text-secondary)]'
                    }`}
                  >
                    {isSelected ? 'SELECTED' : 'VIEW'}
                  </span>
                </button>

                {/* Connector Arrow */}
                {idx < parts.length - 1 && (
                  <div className="flex justify-center py-0.5">
                    <ArrowDown className="w-3.5 h-3.5 text-[var(--primary)]/60" />
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>

        {/* Right Column: Visual Stage with Real Photographic Reference */}
        <div className="lg:col-span-7">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPart.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              className="product-card p-6 sm:p-8 space-y-6 shadow-2xl text-left"
            >
              {/* Photo Display if available */}
              {currentPart.image ? (
                <div className="w-full h-64 sm:h-72 rounded-xl overflow-hidden bg-[#050C16] border border-[var(--border-color)] relative group">
                  <img
                    src={currentPart.image}
                    alt={currentPart.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute top-4 left-4 inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#06111D]/80 backdrop-blur-md border border-[var(--border-color)] text-xs font-mono text-[var(--primary)]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--primary)] animate-pulse" />
                    <span>REAL HARDWARE REFERENCE</span>
                  </div>
                </div>
              ) : (
                <div className="w-full h-44 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-color)] flex flex-col items-center justify-center p-6 text-center space-y-2">
                  <currentPart.icon className="w-12 h-12 text-[var(--primary)]" />
                  <span className="text-xs font-mono text-[var(--text-secondary)] uppercase tracking-wider">
                    {currentPart.name} Subsystem
                  </span>
                </div>
              )}

              {/* Simple Plain-Language Explanation */}
              <div className="space-y-2">
                <span className="text-xs font-mono text-[var(--primary)] uppercase tracking-wider font-semibold">
                  SIMPLE EXPLANATION
                </span>
                <h3 className="text-2xl font-display font-bold text-[var(--text-main)]">
                  {currentPart.name}
                </h3>
                <p className="text-sm sm:text-base text-[var(--text-secondary)] font-sans leading-relaxed">
                  {currentPart.explanation}
                </p>
              </div>

              {/* Component Key Takeaway */}
              <div className="p-4 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-color)] flex items-center gap-3 text-xs font-mono text-[var(--text-main)]">
                <CheckCircle2 className="w-4 h-4 text-[var(--primary)] flex-shrink-0" />
                <span>
                  {currentPart.id === 'oled' && 'Provides immediate feedback without needing an external computer monitor.'}
                  {currentPart.id === 'rpi' && 'Runs independently as an edge node inside the enclosure.'}
                  {currentPart.id === 'gpio' && 'Allows physical buttons and displays to interact with software.'}
                  {currentPart.id === 'button' && 'Simple single-touch operation for laboratory personnel.'}
                  {currentPart.id === 'wifi' && 'Secure wireless telemetry transmission to the AI inference backend.'}
                </span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
