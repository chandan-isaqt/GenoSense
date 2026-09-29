import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Cpu, Monitor, CircleDot, Terminal, Loader2 } from 'lucide-react';
import { useGenoSenseDemo } from '../../hooks/useGenoSenseDemo';

export const LaboratoryHardwareBench: React.FC = () => {
  const { oledStatus, triggerHardwareAnalyzeButton, riskScore, riskLevel, apiActivities } =
    useGenoSenseDemo();
  const [isBtnPressed, setIsBtnPressed] = useState(false);

  const isBusy = oledStatus === 'ANALYZING...' || oledStatus === 'CONNECTING API...';

  const handlePressAnalyze = async () => {
    if (isBusy) return;
    setIsBtnPressed(true);
    setTimeout(() => setIsBtnPressed(false), 200);
    await triggerHardwareAnalyzeButton();
  };

  return (
    <section className="space-y-8 pt-6">
      {/* Section 05 Header */}
      <div className="border-b border-[var(--border-color)] pb-4">
        <span className="text-[11px] font-mono text-[var(--primary)] uppercase tracking-widest block">
          SECTION 05 — RASPBERRY PI
        </span>
        <h2 className="text-2xl sm:text-3xl font-display font-bold text-[var(--text-main)] mt-1">
          Edge Intelligence
        </h2>
        <p className="text-xs sm:text-sm font-mono text-[var(--text-secondary)] mt-1">
          Raspberry Pi + OLED • Hardware Bench Simulation
        </p>
      </div>

      {/* Bench Layout: Realistic Vector SBC on Left, Physical OLED & Tactile Button on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Left: Vector-Style Raspberry Pi Board (Outer card adapts to theme, PCB stays dark) */}
        <div className="lg:col-span-7 lab-card p-6 flex flex-col justify-between space-y-5">
          <div className="flex items-center justify-between border-b border-[var(--border-color)] pb-3 text-xs font-mono">
            <span className="text-[var(--text-main)] font-bold flex items-center gap-2">
              <Cpu className="w-4 h-4 text-[var(--primary)]" />
              RASPBERRY PI 4 MODEL B (ARM64 SBC)
            </span>
            <span className="text-[var(--primary)] font-semibold">I2C BUS #1 • IP: 192.168.1.42</span>
          </div>

          {/* Realistic Vector Circuit Board Illustration (PHYSICALLY DARK IN ALL THEMES) */}
          <div className="relative p-5 rounded-[4px] bg-[#070C12] border border-[#182532] font-mono text-xs overflow-hidden shadow-inner">
            {/* PCB Corner mounting holes */}
            <div className="absolute top-2 left-2 w-3 h-3 rounded-full border border-[#35D6C7]/40 bg-[#05080D]" />
            <div className="absolute top-2 right-2 w-3 h-3 rounded-full border border-[#35D6C7]/40 bg-[#05080D]" />
            <div className="absolute bottom-2 left-2 w-3 h-3 rounded-full border border-[#35D6C7]/40 bg-[#05080D]" />
            <div className="absolute bottom-2 right-2 w-3 h-3 rounded-full border border-[#35D6C7]/40 bg-[#05080D]" />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-2">
              {/* CPU Chip */}
              <div className="p-4 bg-[#0B111A] border border-[#182532] rounded-[2px] relative flex flex-col justify-between h-28">
                <div className="flex items-center justify-between text-[10px] text-[#8B9AAA]">
                  <span>BROADCOM</span>
                  <span className="text-[#35D6C7]">BCM2711</span>
                </div>
                <div className="text-center font-bold text-sm text-[#F4F7FA] font-display">
                  QUAD-CORE ARM Cortex-A72 @ 1.5GHz
                </div>
                <div className="text-[9px] text-[#8B9AAA] text-right">
                  4GB LPDDR4-3200
                </div>
              </div>

              {/* GPIO Header & I2C */}
              <div className="p-4 bg-[#0B111A] border border-[#182532] rounded-[2px] flex flex-col justify-between h-28">
                <div className="flex items-center justify-between text-[10px] text-[#8B9AAA]">
                  <span>40-PIN GPIO HEADER</span>
                  <span className="text-[#35D6C7]">PIN 17</span>
                </div>
                <div className="flex items-center justify-between text-[11px] text-[#F4F7FA]">
                  <span>I2C (SDA/SCL):</span>
                  <span className="text-[#35D6C7] font-bold">BUS 1 (0x3C)</span>
                </div>
                <div className="text-[10px] text-[#8B9AAA]">
                  INTERRUPT: BUTTON TRIGGER ARMED
                </div>
              </div>
            </div>

            {/* Hardware Status Indicators */}
            <div className="mt-4 pt-3 border-t border-[#182532] grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
              <div className="flex items-center justify-between p-2 rounded-[2px] bg-[#0B111A] border border-[#182532]">
                <span className="text-[#8B9AAA]">POWER</span>
                <span className="w-2 h-2 rounded-full bg-[#35D6C7] shadow-[0_0_6px_#35D6C7]" />
              </div>
              <div className="flex items-center justify-between p-2 rounded-[2px] bg-[#0B111A] border border-[#182532]">
                <span className="text-[#8B9AAA]">NETWORK</span>
                <span className="w-2 h-2 rounded-full bg-[#35D6C7] shadow-[0_0_6px_#35D6C7]" />
              </div>
              <div className="flex items-center justify-between p-2 rounded-[2px] bg-[#0B111A] border border-[#182532]">
                <span className="text-[#8B9AAA]">API</span>
                <span className="w-2 h-2 rounded-full bg-[#35D6C7] shadow-[0_0_6px_#35D6C7]" />
              </div>
              <div className="flex items-center justify-between p-2 rounded-[2px] bg-[#0B111A] border border-[#182532]">
                <span className="text-[#8B9AAA]">OLED</span>
                <span className="w-2 h-2 rounded-full bg-[#35D6C7] shadow-[0_0_6px_#35D6C7]" />
              </div>
            </div>
          </div>

          <div className="text-[10px] font-mono text-[var(--text-secondary)] flex items-center justify-between">
            <span>LINUX DEBIAN 12 (BOOKWORM) • LUMA.OLED I2C DRIVER</span>
            <span className="text-[var(--primary)] font-semibold">GPIO EVENT: FALLING_EDGE</span>
          </div>
        </div>

        {/* Right: Physical OLED Screen & Pressable Button */}
        <div className="lg:col-span-5 lab-card p-6 flex flex-col justify-between space-y-6">
          <div className="flex items-center justify-between border-b border-[var(--border-color)] pb-3 text-xs font-mono text-[var(--text-secondary)]">
            <span className="uppercase tracking-wider flex items-center gap-1.5 text-[var(--primary)] font-semibold">
              <Monitor className="w-4 h-4" />
              PHYSICAL OLED DISPLAY
            </span>
            <span>SSD1306 128x64</span>
          </div>

          {/* Physical Monochrome OLED Screen (REMAINS PHYSICALLY DARK IN ALL THEMES) */}
          <div className="oled-container rounded-[2px] p-5 h-44 flex flex-col justify-between select-none">
            {/* OLED Header */}
            <div className="flex items-center justify-between text-[10px] border-b border-[#182532] pb-1 text-[#35D6C7]/80">
              <span>GENOSENSE EDGE v1.2</span>
              <span>I2C: 0x3C</span>
            </div>

            {/* OLED Display Content State Engine */}
            <div className="flex-1 flex flex-col items-center justify-center text-center py-2">
              {oledStatus === 'READY' && (
                <div className="space-y-1">
                  <div className="text-xl font-display font-bold tracking-widest text-[#35D6C7]">
                    GENOSENSE
                  </div>
                  <div className="text-xs tracking-wider text-[#35D6C7]/80">
                    SYSTEM READY
                  </div>
                </div>
              )}

              {oledStatus === 'ANALYZING...' && (
                <div className="space-y-1.5 animate-pulse">
                  <div className="text-base font-display font-bold tracking-widest text-[#35D6C7]">
                    ANALYZING...
                  </div>
                  <div className="text-[11px] text-[#35D6C7]/80">
                    PARSING 24 MARKERS
                  </div>
                </div>
              )}

              {oledStatus === 'CONNECTING API...' && (
                <div className="space-y-1.5 animate-pulse">
                  <div className="text-base font-display font-bold tracking-widest text-[#35D6C7]">
                    API REQUEST...
                  </div>
                  <div className="text-[11px] text-[#35D6C7]/80">
                    POST /predict HTTP/1.1
                  </div>
                </div>
              )}

              {oledStatus === 'RESULT READY' && (
                <div className="space-y-1">
                  <div className="text-xs font-mono text-[#35D6C7]/70 border-b border-[#35D6C7]/20 pb-0.5">
                    RESULT READY
                  </div>
                  <div className="text-lg font-display font-bold tracking-widest text-[#35D6C7]">
                    RISK: {riskLevel}
                  </div>
                  <div className="text-2xl font-display font-black text-[#F4F7FA]">
                    SCORE: {riskScore}%
                  </div>
                </div>
              )}

              {oledStatus === 'ERROR' && (
                <div className="space-y-1 text-[#FF6678]">
                  <div className="text-base font-bold">API ERROR 503</div>
                  <div className="text-[11px]">TIMEOUT</div>
                </div>
              )}

              {oledStatus === 'STANDBY' && (
                <div className="text-xs text-[#35D6C7]/70">
                  GENOSENSE • STANDBY
                </div>
              )}
            </div>

            {/* OLED Footer */}
            <div className="flex items-center justify-between text-[9px] border-t border-[#182532] pt-1 text-[#35D6C7]/60">
              <span>CLOCK: 400kHz</span>
              <span>LIVE BUFFER</span>
            </div>
          </div>

          {/* Physical-looking Push Button */}
          <div className="pt-2 text-center space-y-2">
            <motion.button
              whileTap={{ scale: 0.96, y: 2 }}
              animate={{ y: isBtnPressed ? 2 : 0 }}
              disabled={isBusy}
              onClick={handlePressAnalyze}
              className="w-full py-3.5 px-6 rounded-[3px] bg-[var(--primary)] hover:opacity-90 text-[var(--primary-text)] font-display font-bold text-sm tracking-wider uppercase flex items-center justify-center gap-2 transition-all shadow-none disabled:opacity-50"
            >
              {isBusy ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-[var(--primary-text)]" />
                  <span>TRANSMITTING...</span>
                </>
              ) : (
                <>
                  <CircleDot className="w-4 h-4 text-[var(--primary-text)]" />
                  <span>PRESS TO ANALYZE</span>
                </>
              )}
            </motion.button>
            <span className="text-[10px] font-mono text-[var(--text-secondary)] block">
              GPIO Pin 17 • Hardware Interrupt Signal
            </span>
          </div>
        </div>
      </div>

      {/* SECTION 06 — API TRANSACTION */}
      <div className="space-y-4 pt-4 border-t border-[var(--border-color)]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <span className="text-[11px] font-mono text-[var(--primary)] uppercase tracking-widest block">
              SECTION 06 — API TRANSACTION
            </span>
            <h3 className="text-xl font-display font-bold text-[var(--text-main)] mt-0.5">
              Conceptual Data Movement &amp; Telemetry Stream
            </h3>
          </div>
          <span className="text-xs font-mono text-[var(--text-secondary)]">
            GATEWAY: Flask 3.0 WSGI • Port 5000
          </span>
        </div>

        {/* Conceptual Data Movement Flow Chart */}
        <div className="lab-card p-4 overflow-x-auto">
          <div className="flex items-center justify-between min-w-[700px] text-xs font-mono text-center gap-2">
            <span className="p-2 rounded-[2px] bg-[var(--bg-secondary)] border border-[var(--border-color)] text-[var(--text-main)] font-bold">
              Raspberry Pi
            </span>
            <span className="text-[var(--primary)]">→ POST /predict →</span>
            <span className="p-2 rounded-[2px] bg-[var(--bg-secondary)] border border-[var(--border-color)] text-[var(--primary)] font-bold">
              Flask API
            </span>
            <span className="text-[var(--primary)]">→ Evaluate →</span>
            <span className="p-2 rounded-[2px] bg-[var(--bg-secondary)] border border-[var(--border-color)] text-[var(--text-main)] font-bold">
              Random Forest
            </span>
            <span className="text-[var(--primary)]">→ Attribute →</span>
            <span className="p-2 rounded-[2px] bg-[var(--bg-secondary)] border border-[var(--border-color)] text-[var(--secondary)] font-bold">
              SHAP
            </span>
            <span className="text-[var(--primary)]">→ JSON Response →</span>
            <span className="p-2 rounded-[2px] bg-[var(--bg-secondary)] border border-[var(--border-color)] text-[var(--text-main)] font-bold">
              OLED + Dashboard
            </span>
          </div>
        </div>

        {/* Terminal-like API Monitor (REMAINS AUTHENTIC DARK TERMINAL IN ALL THEMES) */}
        <div className="lab-card p-5 bg-[#020408] border-[#182532] font-mono text-xs space-y-2">
          <div className="flex items-center justify-between text-[#8B9AAA] border-b border-[#182532] pb-2 text-[11px]">
            <span className="flex items-center gap-2 text-[#35D6C7]">
              <Terminal className="w-3.5 h-3.5" />
              FLASK API TELEMETRY LOG (TERMINAL)
            </span>
            <span>HTTP/1.1 STREAM</span>
          </div>

          <div className="space-y-1 text-xs">
            <div className="text-[#8B9AAA]">
              <span className="text-[#35D6C7]">15:42:01</span> POST /predict
            </div>
            <div className="text-[#8B9AAA]">
              <span className="text-[#35D6C7]">15:42:01</span> 200 OK
            </div>
            <div className="text-[#8B9AAA]">
              <span className="text-[#35D6C7]">15:42:01</span> model inference 42ms
            </div>
            <div className="text-[#8B9AAA]">
              <span className="text-[#35D6C7]">15:42:01</span> SHAP ready
            </div>
            <div className="text-[#8B9AAA]">
              <span className="text-[#35D6C7]">15:42:01</span> response delivered
            </div>
            {apiActivities.slice(0, 3).map((act) => (
              <div key={act.id} className="text-[#8B9AAA]">
                <span className="text-[#35D6C7]">{act.timestamp}</span> {act.method} {act.endpoint} {act.status} OK — {act.responseTimeMs}ms
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
