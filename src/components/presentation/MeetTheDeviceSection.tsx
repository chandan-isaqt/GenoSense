import React from 'react';
import { Cpu, Monitor, CircleDot, Wifi, Cable, Zap } from 'lucide-react';
import { useGenoSenseDemo } from '../../hooks/useGenoSenseDemo';

export const MeetTheDeviceSection: React.FC = () => {
  const { oledStatus, riskScore, riskLevel, predictionReady } = useGenoSenseDemo();

  const hardwareComponents = [
    {
      name: 'RASPBERRY PI',
      tag: 'ARM64 SBC Controller',
      desc: 'Runs the edge-side client, communicates with the API, and manages the I2C display protocol.',
      icon: Cpu,
    },
    {
      name: 'OLED DISPLAY',
      tag: 'SSD1306 128×64',
      desc: 'Displays the returned prototype model score and risk level at point-of-care.',
      icon: Monitor,
    },
    {
      name: 'PUSH BUTTON',
      tag: 'Tactile Microswitch',
      desc: 'Starts an analysis request by triggering a hardware interrupt signal.',
      icon: CircleDot,
    },
    {
      name: 'WI-FI',
      tag: '802.11ac 2.4/5GHz',
      desc: 'Connects the device wirelessly to the GenoSense backend inference service.',
      icon: Wifi,
    },
    {
      name: 'GPIO',
      tag: '40-Pin Header',
      desc: 'Connects the physical tactile button and I2C clock/data lines to the processor.',
      icon: Cable,
    },
  ];

  return (
    <section id="device" className="space-y-10 py-12 border-t border-[var(--border-color)]">
      {/* Section Header */}
      <div className="max-w-3xl space-y-3">
        <span className="text-[11px] font-mono text-[var(--primary)] uppercase tracking-widest block">
          03 • THE HARDWARE PROTOTYPE
        </span>
        <h2 className="text-3xl sm:text-4xl font-display font-bold text-[var(--text-main)] tracking-tight">
          Meet the GenoSense Edge Device
        </h2>
        <p className="text-base text-[var(--text-secondary)] font-sans leading-relaxed">
          A low-cost hardware interface for receiving the model result. Built to demonstrate how genomic AI can reach accessible, point-of-care environments.
        </p>
      </div>

      {/* Main Stylized Physical Prototype Device with Connector Callouts */}
      <div className="lab-card p-6 sm:p-10 relative overflow-hidden shadow-lg">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Visual Physical Device Diagram */}
          <div className="lg:col-span-7 flex flex-col items-center justify-center">
            {/* The Stylized Physical GenoSense Prototype Enclosure */}
            <div className="w-full max-w-md bg-[#070C12] border-2 border-[#182532] rounded-xl p-6 relative font-mono shadow-2xl text-left select-none">
              {/* Corner mounting brass standoffs */}
              <div className="absolute top-3 left-3 w-3 h-3 rounded-full border border-amber-500/40 bg-amber-500/20" />
              <div className="absolute top-3 right-3 w-3 h-3 rounded-full border border-amber-500/40 bg-amber-500/20" />
              <div className="absolute bottom-3 left-3 w-3 h-3 rounded-full border border-amber-500/40 bg-amber-500/20" />
              <div className="absolute bottom-3 right-3 w-3 h-3 rounded-full border border-amber-500/40 bg-amber-500/20" />

              {/* Callout Pointer: OLED DISPLAY */}
              <div className="relative mb-6">
                <div className="flex items-center justify-between text-[10px] text-[#8B9AAA] mb-1">
                  <span className="text-[#35D6C7] font-bold flex items-center gap-1.5">
                    <Monitor className="w-3.5 h-3.5" />
                    OLED DISPLAY (SSD1306)
                  </span>
                  <span className="text-[#8B9AAA]">I2C BUS 1 (0x3C)</span>
                </div>

                {/* Physical OLED screen */}
                <div className="oled-container rounded-md p-4 h-32 flex flex-col justify-between border border-[#182532] shadow-inner text-center">
                  <div className="flex items-center justify-between text-[9px] text-[#35D6C7]/80 border-b border-[#182532] pb-1">
                    <span>GENOSENSE EDGE v1.2</span>
                    <span className="flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#35D6C7] animate-ping" />
                      LIVE
                    </span>
                  </div>

                  <div className="py-1">
                    <div className="text-[11px] text-[#35D6C7] uppercase font-mono tracking-wider">
                      {oledStatus === 'READY' ? 'READY FOR SAMPLE' : `STATUS: ${oledStatus}`}
                    </div>
                    <div className="text-2xl font-display font-black text-[#F4F7FA] mt-0.5">
                      {predictionReady ? `${riskScore}%` : '73%'}
                    </div>
                    <div className="text-[10px] font-bold text-[#35D6C7]">
                      PROTOTYPE: {predictionReady ? riskLevel : 'HIGH'}
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-[8px] text-[#35D6C7]/60 border-t border-[#182532] pt-1">
                    <span>REF: GRCh38</span>
                    <span>BUFFER 128×64</span>
                  </div>
                </div>
              </div>

              {/* Central Connector Line */}
              <div className="flex justify-center -my-2">
                <div className="w-0.5 h-6 bg-[#35D6C7]/40" />
              </div>

              {/* Callout: RASPBERRY PI 4 SBC BOARD */}
              <div className="p-4 rounded-lg bg-[#0B111A] border border-[#182532] my-2 space-y-3">
                <div className="flex items-center justify-between text-[11px] text-[#8B9AAA]">
                  <span className="font-bold text-[#F4F7FA] flex items-center gap-1.5">
                    <Cpu className="w-3.5 h-3.5 text-[#35D6C7]" />
                    RASPBERRY PI 4 MODEL B
                  </span>
                  <span className="text-[10px] text-[#35D6C7] bg-[#070C12] px-2 py-0.5 rounded border border-[#182532]">
                    ARM64 1.5GHz
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-[10px] text-[#8B9AAA]">
                  <div className="p-2 bg-[#070C12] rounded border border-[#182532] flex items-center justify-between">
                    <span className="flex items-center gap-1">
                      <Wifi className="w-3 h-3 text-[#35D6C7]" /> Wi-Fi
                    </span>
                    <span className="text-[#35D6C7]">ONLINE</span>
                  </div>
                  <div className="p-2 bg-[#070C12] rounded border border-[#182532] flex items-center justify-between">
                    <span className="flex items-center gap-1">
                      <Cable className="w-3 h-3 text-[#4DA3FF]" /> GPIO
                    </span>
                    <span className="text-[#4DA3FF]">PIN 17</span>
                  </div>
                </div>
              </div>

              {/* Central Connector Line */}
              <div className="flex justify-center -my-2">
                <div className="w-0.5 h-6 bg-[#35D6C7]/40" />
              </div>

              {/* Callout: PUSH BUTTON */}
              <div className="pt-3 text-center space-y-1.5">
                <div className="w-full py-3 rounded-md bg-[#0F1722] border-2 border-[#35D6C7]/60 text-[#35D6C7] font-display font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm">
                  <CircleDot className="w-4 h-4 text-[#35D6C7]" />
                  <span>TACTILE BUTTON • GPIO PIN 17</span>
                </div>
                <span className="text-[10px] text-[#8B9AAA] block">
                  Hardware trigger initiates client HTTP request
                </span>
              </div>
            </div>
          </div>

          {/* Right Description & Visual Highlights */}
          <div className="lg:col-span-5 space-y-6 text-left">
            <div className="space-y-2">
              <span className="text-xs font-mono font-bold text-[var(--primary)] uppercase tracking-wider">
                PHYSICAL EMBEDDED ARCHITECTURE
              </span>
              <h3 className="text-2xl font-display font-bold text-[var(--text-main)]">
                Not a Mockup. A Real Hardware Client.
              </h3>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                The GenoSense edge device acts as a complete point-of-care client. A researcher or health worker presses the physical button to trigger an analysis request. The device queries the model API, receives the prediction, and renders the result directly onto the monochrome OLED screen.
              </p>
            </div>

            <div className="space-y-3 font-mono text-xs">
              <div className="p-3.5 rounded bg-[var(--bg-secondary)] border border-[var(--border-color)] flex items-center justify-between">
                <span className="text-[var(--text-secondary)]">POWER CONSUMPTION:</span>
                <span className="text-[var(--text-main)] font-bold flex items-center gap-1">
                  <Zap className="w-3.5 h-3.5 text-[var(--warning)]" /> ~3.5 Watts (5V / 3A USB-C)
                </span>
              </div>

              <div className="p-3.5 rounded bg-[var(--bg-secondary)] border border-[var(--border-color)] flex items-center justify-between">
                <span className="text-[var(--text-secondary)]">COMMUNICATION BUS:</span>
                <span className="text-[var(--primary)] font-bold">I2C (400kHz Fast Mode)</span>
              </div>

              <div className="p-3.5 rounded bg-[var(--bg-secondary)] border border-[var(--border-color)] flex items-center justify-between">
                <span className="text-[var(--text-secondary)]">BILL OF MATERIALS:</span>
                <span className="text-[var(--text-main)] font-bold">&lt; $65 Total Hardware Cost</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Component Cards (Section 14: What does each hardware component do?) */}
      <div className="space-y-4">
        <h3 className="text-sm font-mono font-bold text-[var(--text-secondary)] uppercase tracking-wider">
          What does each hardware component do?
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {hardwareComponents.map((comp) => {
            const Icon = comp.icon;
            return (
              <div
                key={comp.name}
                className="lab-card p-4 flex flex-col justify-between space-y-3 shadow-sm"
              >
                <div className="space-y-2">
                  <div className="w-8 h-8 rounded-[4px] bg-[var(--bg-secondary)] border border-[var(--border-color)] flex items-center justify-center text-[var(--primary)]">
                    <Icon className="w-4 h-4" />
                  </div>
                  <h4 className="font-display font-bold text-xs text-[var(--text-main)]">
                    {comp.name}
                  </h4>
                  <p className="text-[11px] text-[var(--text-secondary)] leading-relaxed">
                    {comp.desc}
                  </p>
                </div>
                <div className="text-[10px] font-mono text-[var(--primary)] pt-2 border-t border-[var(--border-color)]">
                  {comp.tag}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
