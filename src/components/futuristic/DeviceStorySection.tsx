import React, { useState } from 'react';
import { Monitor, CircleDot, Cpu, Wifi } from 'lucide-react';
import { useGenoSenseDemo } from '../../hooks/useGenoSenseDemo';

export const DeviceStorySection: React.FC = () => {
  const [activeCallout, setActiveCallout] = useState<string | null>(null);
  const { riskScore, riskLevel, predictionReady } = useGenoSenseDemo();

  const callouts = [
    {
      id: 'oled',
      title: 'OLED',
      desc: 'Shows the returned model output.',
      detail: 'Monochrome SSD1306 128×64 matrix rendering calibrated risk score and prototype category.',
      icon: Monitor,
    },
    {
      id: 'button',
      title: 'ANALYZE BUTTON',
      desc: 'Starts the demo.',
      detail: 'Physical tactile button wired to Raspberry Pi GPIO Pin 17 with hardware debounce.',
      icon: CircleDot,
    },
    {
      id: 'rpi',
      title: 'RASPBERRY PI',
      desc: 'Runs the edge-side client.',
      detail: 'Single-board Quad-core ARM64 computer executing local polling and driving the I2C bus.',
      icon: Cpu,
    },
    {
      id: 'wifi',
      title: 'WI-FI',
      desc: 'Connects the device to the API.',
      detail: 'Integrated dual-band 802.11ac wireless interface transmitting secure REST requests.',
      icon: Wifi,
    },
  ];

  return (
    <section id="device" className="py-20 border-t border-[var(--border-color)]/70 space-y-12">
      {/* Section Header (Section 10) */}
      <div className="max-w-3xl space-y-3 text-left">
        <span className="text-xs font-mono text-[var(--primary)] uppercase tracking-widest block font-semibold">
          HARDWARE ARCHITECTURE
        </span>
        <h2 className="text-4xl sm:text-5xl font-display font-bold text-[var(--text-main)] tracking-tight">
          Meet the GenoSense Device
        </h2>
        <p className="text-base sm:text-lg text-[var(--text-secondary)] font-sans leading-relaxed">
          A compact, purpose-built medical-grade prototype designed for benchtop and bedside genomic AI inference.
        </p>
      </div>

      {/* Main Interactive Showcase Canvas */}
      <div className="product-card p-8 sm:p-12 relative overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Central 3D-Style Device Illustration */}
          <div className="lg:col-span-7 flex flex-col items-center justify-center relative">
            {/* The Stylized GenoSense Enclosure */}
            <div className="w-full max-w-md p-8 rounded-2xl bg-[#091522] border-2 border-[#1B3650] shadow-2xl relative space-y-6 select-none">
              {/* Highlight Overlay for OLED */}
              <div
                className={`transition-all duration-300 rounded-lg p-1 ${
                  activeCallout === 'oled'
                    ? 'ring-2 ring-[#42E8D1] shadow-[0_0_24px_rgba(66,232,209,0.35)]'
                    : ''
                }`}
              >
                <div className="oled-hardware-screen p-5 h-28 flex flex-col justify-between text-center border border-[#162C42]">
                  <div className="flex items-center justify-between text-[8px] text-[#42E8D1]/80">
                    <span>GENOSENSE</span>
                    <span>128×64</span>
                  </div>
                  <div className="py-0.5">
                    <div className="text-[10px] text-[#42E8D1] font-mono">
                      {predictionReady ? `RISK: ${riskLevel}` : 'READY'}
                    </div>
                    <div className="text-xl font-display font-black text-[#F5FAFC]">
                      {predictionReady ? `${riskScore}%` : '73%'}
                    </div>
                  </div>
                  <div className="text-[8px] text-[#42E8D1]/60">PROTOTYPE ESTIMATE</div>
                </div>
              </div>

              {/* Highlight Overlay for Internal Raspberry Pi & Wi-Fi */}
              <div className="grid grid-cols-2 gap-3">
                <div
                  className={`p-3 rounded-lg bg-[#07111F] border border-[#1B3650] transition-all duration-300 ${
                    activeCallout === 'rpi'
                      ? 'border-[#42E8D1] shadow-[0_0_20px_rgba(66,232,209,0.3)] ring-1 ring-[#42E8D1]'
                      : ''
                  }`}
                >
                  <div className="text-[10px] font-mono text-[#8EA2B3] flex items-center gap-1.5">
                    <Cpu className="w-3.5 h-3.5 text-[#42E8D1]" />
                    <span>ARM64 SBC</span>
                  </div>
                  <div className="text-xs font-bold text-[#F5FAFC] mt-1 font-display">Raspberry Pi 4</div>
                </div>

                <div
                  className={`p-3 rounded-lg bg-[#07111F] border border-[#1B3650] transition-all duration-300 ${
                    activeCallout === 'wifi'
                      ? 'border-[#5AA9FF] shadow-[0_0_20px_rgba(90,169,255,0.3)] ring-1 ring-[#5AA9FF]'
                      : ''
                  }`}
                >
                  <div className="text-[10px] font-mono text-[#8EA2B3] flex items-center gap-1.5">
                    <Wifi className="w-3.5 h-3.5 text-[#5AA9FF]" />
                    <span>WIRELESS</span>
                  </div>
                  <div className="text-xs font-bold text-[#F5FAFC] mt-1 font-display">Wi-Fi 802.11ac</div>
                </div>
              </div>

              {/* Highlight Overlay for Button */}
              <div
                className={`transition-all duration-300 rounded-lg ${
                  activeCallout === 'button'
                    ? 'ring-2 ring-[#42E8D1] shadow-[0_0_24px_rgba(66,232,209,0.4)]'
                    : ''
                }`}
              >
                <div className="w-full py-3.5 rounded-lg bg-[#42E8D1] text-[#07111F] font-display font-bold text-xs tracking-wider uppercase flex items-center justify-center gap-2 shadow-md">
                  <CircleDot className="w-4 h-4 text-[#07111F]" />
                  <span>TACTILE PUSH BUTTON</span>
                </div>
              </div>
            </div>
          </div>

          {/* 4 Interactive Callout Cards with Connector Lines */}
          <div className="lg:col-span-5 space-y-3 text-left font-mono">
            <div className="text-xs font-mono text-[var(--primary)] uppercase tracking-widest font-bold pb-1 flex items-center gap-2">
              <span>WHAT YOU SEE</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--primary)]" />
            </div>
            {callouts.map((c) => {
              const isSelected = activeCallout === c.id;
              const Icon = c.icon;

              return (
                <div
                  key={c.id}
                  onMouseEnter={() => setActiveCallout(c.id)}
                  onMouseLeave={() => setActiveCallout(null)}
                  className={`p-4 rounded-xl border transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? 'bg-[var(--bg-secondary)] border-[var(--primary)] shadow-md translate-x-1'
                      : 'bg-[var(--bg-surface)] border-[var(--border-color)] hover:border-[var(--primary)]/50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`p-2 rounded-lg border ${
                        isSelected
                          ? 'bg-[var(--primary)] text-[var(--primary-text)] border-[var(--primary)]'
                          : 'bg-[var(--bg-secondary)] text-[var(--primary)] border-[var(--border-color)]'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-display font-bold text-sm text-[var(--text-main)]">
                        {c.title}
                      </h4>
                      <p className="text-xs text-[var(--primary)] font-semibold font-mono">
                        “{c.desc}”
                      </p>
                    </div>
                  </div>
                  <p className="text-[11px] text-[var(--text-secondary)] font-sans mt-2 leading-relaxed">
                    {c.detail}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
