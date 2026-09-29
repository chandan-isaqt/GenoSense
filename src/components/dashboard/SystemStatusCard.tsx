import React from 'react';
import { Server, Brain, HelpCircle, Cpu, Monitor, Wifi } from 'lucide-react';
import { useGenoSenseDemo } from '../../hooks/useGenoSenseDemo';

export const SystemStatusCard: React.FC = () => {
  const { oledStatus, hardwareConnected, predictionReady, shapReady } = useGenoSenseDemo();

  const statuses = [
    {
      label: 'API',
      value: 'ONLINE',
      sub: 'HTTP 200 OK • 8ms',
      icon: Server,
      color: 'text-emerald-400 bg-emerald-950/80 border-emerald-800/60',
      dotColor: 'bg-emerald-400',
    },
    {
      label: 'AI MODEL',
      value: predictionReady ? 'EVALUATED' : 'READY',
      sub: '200 Trees • Bagging',
      icon: Brain,
      color: 'text-cyan-400 bg-cyan-950/80 border-cyan-800/60',
      dotColor: 'bg-cyan-400',
    },
    {
      label: 'SHAP',
      value: shapReady ? 'ATTRIBUTED' : 'READY',
      sub: 'TreeExplainer Engine',
      icon: HelpCircle,
      color: 'text-purple-400 bg-purple-950/80 border-purple-800/60',
      dotColor: 'bg-purple-400',
    },
    {
      label: 'RASPBERRY PI',
      value: hardwareConnected ? 'CONNECTED' : 'DISCONNECTED',
      sub: 'Pi 4 B • I2C Bus 1',
      icon: Cpu,
      color: 'text-emerald-400 bg-emerald-950/80 border-emerald-800/60',
      dotColor: 'bg-emerald-400',
    },
    {
      label: 'OLED',
      value: oledStatus,
      sub: 'SSD1306 128x64 px',
      icon: Monitor,
      color: 'text-cyan-400 bg-cyan-950/80 border-cyan-800/60',
      dotColor: 'bg-cyan-400',
    },
  ];

  return (
    <div className="p-5 rounded-2xl bg-navy-950/90 border border-slate-800/90 glass-panel space-y-4">
      <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400">
            <Wifi className="w-4 h-4" />
          </div>
          <h2 className="text-sm font-mono font-bold text-white uppercase tracking-wider">
            SYSTEM STATUS
          </h2>
        </div>
        <span className="text-[11px] font-mono text-emerald-400 flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          All Subsystems Normal
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
        {statuses.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.label}
              className="p-3.5 rounded-xl bg-navy-900/60 border border-slate-800 flex flex-col justify-between hover:border-slate-700 transition-colors"
            >
              <div className="flex items-center justify-between text-slate-400 mb-2">
                <span className="text-[10px] font-mono uppercase tracking-wider">{item.label}</span>
                <Icon className="w-3.5 h-3.5 text-slate-500" />
              </div>
              <div className="flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${item.dotColor} shadow-[0_0_6px_currentColor]`}></span>
                <span className="text-xs font-mono font-bold text-white tracking-wide truncate">
                  {item.value}
                </span>
              </div>
              <span className="text-[10px] text-slate-500 font-mono mt-1 truncate">{item.sub}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
