import React from 'react';
import { Cpu, Wifi, Server, Monitor, CircleDot, CheckCircle2 } from 'lucide-react';
import { useGenoSenseDemo } from '../../hooks/useGenoSenseDemo';

export const EdgeDeviceCard: React.FC = () => {
  const { hardwareConnected, oledStatus } = useGenoSenseDemo();

  const hardwareComponents = [
    {
      name: 'Raspberry Pi',
      spec: 'Model 4B (Broadcom BCM2711, 4GB RAM)',
      status: hardwareConnected ? 'ONLINE' : 'OFFLINE',
      icon: Cpu,
      color: 'text-emerald-400 bg-emerald-950/80 border-emerald-800/60',
      badge: 'Edge SBC',
    },
    {
      name: 'Wi-Fi Interface',
      spec: '802.11ac dual-band (IP: 192.168.1.42)',
      status: 'CONNECTED',
      icon: Wifi,
      color: 'text-cyan-400 bg-cyan-950/80 border-cyan-800/60',
      badge: '5 GHz Band',
    },
    {
      name: 'Flask API Link',
      spec: 'HTTP/1.1 REST Gateway (Port 5000)',
      status: 'SYNCHRONIZED',
      icon: Server,
      color: 'text-blue-400 bg-blue-950/80 border-blue-800/60',
      badge: '8ms Latency',
    },
    {
      name: 'OLED Display',
      spec: 'SSD1306 128x64 Monochrome (I2C: 0x3C)',
      status: oledStatus,
      icon: Monitor,
      color: 'text-purple-400 bg-purple-950/80 border-purple-800/60',
      badge: 'I2C Bus #1',
    },
    {
      name: 'GPIO Button',
      spec: 'Pin 17 (WiringPi 0, Internal Pull-Up)',
      status: 'ARMED',
      icon: CircleDot,
      color: 'text-rose-400 bg-rose-950/80 border-rose-800/60',
      badge: 'Ext Interrupt',
    },
  ];

  return (
    <div className="p-6 rounded-2xl bg-navy-950/80 border border-slate-800 space-y-5 glass-panel">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
        <div>
          <h3 className="text-base font-bold font-mono text-white flex items-center gap-2">
            <Cpu className="w-5 h-5 text-cyan-400" />
            Raspberry Pi Edge Hardware Architecture
          </h3>
          <p className="text-xs text-slate-400 font-mono">
            Low-cost point-of-care IoT deployment specification
          </p>
        </div>
        <span className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800 flex items-center gap-1.5 self-start sm:self-auto">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
          Hardware Bus Verified
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {hardwareComponents.map((comp) => {
          const Icon = comp.icon;
          return (
            <div
              key={comp.name}
              className="p-4 rounded-xl bg-navy-900/60 border border-slate-800/90 flex flex-col justify-between hover:border-slate-700 transition-colors"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="p-2 rounded-lg bg-navy-950 border border-slate-800 text-slate-300">
                    <Icon className="w-4 h-4 text-cyan-400" />
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-slate-400">
                    {comp.badge}
                  </span>
                </div>
                <h4 className="text-sm font-bold text-white font-mono">{comp.name}</h4>
                <p className="text-xs text-slate-400 mt-1 leading-snug">{comp.spec}</p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500">
                  Status:
                </span>
                <span
                  className={`text-[11px] font-mono font-bold px-2 py-0.5 rounded border ${comp.color}`}
                >
                  {comp.status}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
