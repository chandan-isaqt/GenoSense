import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cpu, Monitor, CircleDot, Box, ArrowRight, ShieldCheck, Info } from 'lucide-react';

export const RealHardwareReferenceSection: React.FC = () => {
  const [selectedComponent, setSelectedComponent] = useState<number>(0);

  const components = [
    {
      id: 'rpi',
      category: 'REAL COMPONENT',
      name: 'Raspberry Pi 4 Model B',
      role: 'Embedded Edge Compute Core',
      image: '/assets/hardware/raspberry-pi.jpg',
      badge: 'Single-Board Computer',
      description:
        'A genuine Quad-Core ARM Cortex-A72 (ARM v8) 64-bit single-board computer running edge polling services, telemetry dispatch, and secure network communication.',
      specs: [
        { label: 'Architecture', value: 'Broadcom BCM2711, Quad-core Cortex-A72' },
        { label: 'Clock Speed', value: '1.5 GHz 64-bit SoC' },
        { label: 'Role in GenoSense', value: 'Executes lightweight client & manages I2C OLED display' },
        { label: 'Photo Source', value: 'Wikimedia Commons (Michael Henzler, CC BY-SA 4.0)' },
      ],
      icon: Cpu,
    },
    {
      id: 'oled',
      category: 'REAL COMPONENT',
      name: '0.96" Monochrome I2C OLED Display',
      role: 'Instant Physical Telemetry Screen',
      image: '/assets/hardware/oled.jpg',
      badge: 'SSD1306 Display Module',
      description:
        'A physical 128×64 dot matrix organic LED display module communicating over a 2-wire I2C bus at 400 kHz to render instant status messages and model risk estimates.',
      specs: [
        { label: 'Resolution', value: '128 × 64 monochrome pixels' },
        { label: 'Bus Interface', value: 'I2C (SDA/SCL, 0x3C address)' },
        { label: 'Role in GenoSense', value: 'Provides zero-latency bedside or benchtop visual feedback' },
        { label: 'Photo Source', value: 'Wikimedia Commons (Turbospok, CC BY-SA 4.0)' },
      ],
      icon: Monitor,
    },
    {
      id: 'button',
      category: 'REAL COMPONENT',
      name: 'Tactile Push Button Switch',
      role: 'Hardware Interrupt Trigger',
      image: '/assets/hardware/button.jpg',
      badge: 'GPIO Momentary Switch',
      description:
        'A physical momentary tactile switch wired directly to Raspberry Pi GPIO Pin 17 with an internal software pull-up resistor to initiate on-demand genomic analysis.',
      specs: [
        { label: 'Connection', value: 'GPIO 17 + Ground (Active LOW)' },
        { label: 'Debounce', value: 'Software interrupt debounce filter (200ms)' },
        { label: 'Role in GenoSense', value: 'Tactile physical trigger to start analysis without mouse' },
        { label: 'Photo Source', value: 'Wikimedia Commons (CC BY-SA 3.0)' },
      ],
      icon: CircleDot,
    },
    {
      id: 'assembly',
      category: 'GENOSENSE PROTOTYPE DEVICE',
      name: 'GenoSense Custom Prototype Enclosure',
      role: 'Complete Assembled Edge Instrument',
      image: '/assets/hardware/device-reference.jpg',
      badge: 'Finished Prototype Concept',
      description:
        'The custom industrial enclosure houses the Raspberry Pi, front-facing OLED, status indicator LED, and tactile button into a compact, medical-grade benchtop instrument.',
      specs: [
        { label: 'Enclosure Material', value: 'Matte dark anodized aluminum chassis' },
        { label: 'Thermal Design', value: 'Passive convection micro-ventilation slots' },
        { label: 'Status Distinction', value: 'Clearly distinguished from raw developer boards' },
        { label: 'Source', value: 'GenoSense Prototype Industrial Design' },
      ],
      icon: Box,
    },
  ];

  return (
    <section id="components" className="py-20 border-t border-[var(--border-color)]/70 space-y-12">
      {/* Section Header */}
      <div className="max-w-3xl space-y-3 text-left">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--bg-surface)] border border-[var(--border-color)] text-[var(--primary)] text-xs font-mono uppercase tracking-widest">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>AUTHENTIC HARDWARE FOUNDATION</span>
        </div>
        <h2 className="text-4xl sm:text-5xl font-display font-bold text-[var(--text-main)] tracking-tight">
          Built with real components.
        </h2>
        <p className="text-base sm:text-lg text-[var(--text-secondary)] font-sans leading-relaxed">
          GenoSense is not an abstract concept. It is built upon proven, accessible, commercial hardware building blocks integrated into a dedicated benchtop prototype enclosure.
        </p>
      </div>

      {/* Distinction Callout Banner */}
      <div className="p-4 sm:p-5 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-color)] flex items-start gap-3.5">
        <Info className="w-5 h-5 text-[var(--primary)] flex-shrink-0 mt-0.5" />
        <div className="space-y-1 text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
          <strong className="text-[var(--text-main)] font-semibold">Important Distinction: </strong>
          A naked Raspberry Pi board is an internal compute module, not the finished product. Below you can inspect the individual real-world hardware components and examine how they assemble into the <strong>GenoSense Prototype Device</strong>.
        </div>
      </div>

      {/* Component Tabs & Visual Showcase */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Component Selector List (Left Column) */}
        <div className="lg:col-span-5 space-y-3">
          {components.map((comp, idx) => {
            const isSelected = selectedComponent === idx;
            const Icon = comp.icon;
            const isAssembly = comp.id === 'assembly';

            return (
              <button
                key={comp.id}
                onClick={() => setSelectedComponent(idx)}
                className={`w-full text-left p-4 sm:p-5 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-4 ${
                  isSelected
                    ? isAssembly
                      ? 'bg-[var(--bg-surface)] border-[var(--primary)] shadow-lg ring-1 ring-[var(--primary)]/30'
                      : 'bg-[var(--bg-surface)] border-[var(--primary)] shadow-md'
                    : 'bg-[var(--bg-surface)]/60 border-[var(--border-color)] hover:border-[var(--text-secondary)]'
                }`}
              >
                <div className="flex items-center gap-3.5">
                  <div
                    className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      isSelected
                        ? 'bg-[var(--primary)] text-[var(--primary-text)]'
                        : 'bg-[var(--bg-secondary)] text-[var(--text-secondary)]'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider block font-semibold text-[var(--primary)]">
                      {comp.category}
                    </span>
                    <h3 className="text-sm sm:text-base font-display font-bold text-[var(--text-main)]">
                      {comp.name}
                    </h3>
                    <p className="text-xs text-[var(--text-secondary)] font-sans line-clamp-1">
                      {comp.role}
                    </p>
                  </div>
                </div>

                <div className="flex items-center text-xs font-mono text-[var(--text-secondary)]">
                  <span className="hidden sm:inline">{isSelected ? 'ACTIVE' : 'VIEW'}</span>
                  <ArrowRight
                    className={`w-4 h-4 ml-1 transition-transform ${isSelected ? 'translate-x-1 text-[var(--primary)]' : ''}`}
                  />
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Component Detailed Stage (Right Column) */}
        <div className="lg:col-span-7">
          <AnimatePresence mode="wait">
            {components.map((comp, idx) => {
              if (selectedComponent !== idx) return null;
              const isAssembly = comp.id === 'assembly';

              return (
                <motion.div
                  key={comp.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.3 }}
                  className="product-card overflow-hidden shadow-2xl space-y-6 p-6 sm:p-8"
                >
                  {/* Photo Display Vessel */}
                  <div className="relative w-full h-64 sm:h-80 rounded-xl overflow-hidden bg-[#050C16] border border-[var(--border-color)] flex items-center justify-center group">
                    <img
                      src={comp.image}
                      alt={comp.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />

                    {/* Gradient overlay for text readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#06111D] via-transparent to-transparent pointer-events-none" />

                    {/* Badge Overlay */}
                    <div className="absolute top-4 left-4 inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#06111D]/85 backdrop-blur-md border border-[var(--border-color)] text-xs font-mono text-[var(--primary)]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[var(--primary)] animate-pulse" />
                      <span>{comp.badge}</span>
                    </div>

                    {isAssembly && (
                      <div className="absolute bottom-4 left-4 right-4 p-3 rounded-lg bg-[#06111D]/90 backdrop-blur-md border border-[var(--primary)]/40 flex items-center justify-between text-xs font-mono">
                        <span className="text-[#F5FAFC] font-bold">GENOSENSE PROTOTYPE ENCLOSURE</span>
                        <span className="text-[var(--primary)] font-bold">ALL PARTS INTEGRATED</span>
                      </div>
                    )}
                  </div>

                  {/* Component Description & Role */}
                  <div className="space-y-3 text-left">
                    <div className="flex items-center gap-2 text-xs font-mono text-[var(--primary)] uppercase tracking-wider">
                      <span>{comp.category}</span>
                      <span>•</span>
                      <span>{comp.role}</span>
                    </div>

                    <h3 className="text-2xl font-display font-bold text-[var(--text-main)]">
                      {comp.name}
                    </h3>

                    <p className="text-sm text-[var(--text-secondary)] font-sans leading-relaxed">
                      {comp.description}
                    </p>
                  </div>

                  {/* Technical Specifications Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 font-mono text-xs">
                    {comp.specs.map((spec) => (
                      <div
                        key={spec.label}
                        className="p-3 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-color)] space-y-1"
                      >
                        <span className="text-[10px] text-[var(--text-secondary)] uppercase tracking-wider block">
                          {spec.label}
                        </span>
                        <span className="text-[var(--text-main)] font-semibold block text-xs">
                          {spec.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
