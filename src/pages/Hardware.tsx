import React from 'react';
import { OledDisplay } from '../components/hardware/OledDisplay';
import { GpioButtonControl } from '../components/hardware/GpioButtonControl';
import { EdgeDeviceCard } from '../components/hardware/EdgeDeviceCard';
import { ApiMonitor } from '../components/hardware/ApiMonitor';
import { Cpu, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const Hardware: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Page Title Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400">
              <Cpu className="w-5 h-5" />
            </span>
            <h1 className="text-2xl font-bold font-mono text-white tracking-wide">
              Raspberry Pi Edge Device
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 font-mono">
            Physical edge hardware simulation: SSD1306 128x64 OLED, GPIO triggers, and I2C telemetry
          </p>
        </div>

        <button
          onClick={() => navigate('/architecture')}
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-semibold bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-[0_0_15px_rgba(6,182,212,0.3)] transition-all self-start sm:self-auto"
        >
          <span>View Architecture</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Two Column Layout: OLED Simulation on Left, GPIO Button Control on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-6 space-y-4">
          <div className="text-xs font-mono uppercase tracking-wider text-slate-400 flex items-center justify-between">
            <span>Hardware Output Device</span>
            <span className="text-cyan-400">SSD1306 Monochrome</span>
          </div>
          <OledDisplay />
        </div>

        <div className="lg:col-span-6 space-y-4">
          <div className="text-xs font-mono uppercase tracking-wider text-slate-400 flex items-center justify-between">
            <span>Edge Input Interface</span>
            <span className="text-rose-400">Interrupt Pin</span>
          </div>
          <GpioButtonControl />
        </div>
      </div>

      {/* Hardware Component Specifications & Badges */}
      <EdgeDeviceCard />

      {/* Live Flask API Telemetry Monitor */}
      <ApiMonitor />
    </div>
  );
};
