import React from 'react';
import { Dna, TreeDeciduous, HelpCircle, Server, Cpu, Atom } from 'lucide-react';

interface TechItem {
  name: string;
  category: string;
  description: string;
  icon: React.ElementType;
  badge: string;
  color: string;
}

export const TechStackSection: React.FC = () => {
  const stack: TechItem[] = [
    {
      name: 'Genomic Markers',
      category: 'Bioinformatics',
      description: 'SNP genotyping, variant calling, and 24-feature numerical encoding from VCF.',
      icon: Dna,
      badge: '24 Markers',
      color: 'from-cyan-500/20 to-blue-500/10 border-cyan-500/30 text-cyan-400',
    },
    {
      name: 'Random Forest',
      category: 'Machine Learning',
      description: 'Ensemble of 200 decision trees computing bagging splits for disease prototype risk.',
      icon: TreeDeciduous,
      badge: '200 Trees',
      color: 'from-emerald-500/20 to-teal-500/10 border-emerald-500/30 text-emerald-400',
    },
    {
      name: 'SHAP',
      category: 'Explainable AI',
      description: 'Shapley Additive exPlanations attributing feature contribution vectors.',
      icon: HelpCircle,
      badge: 'TreeExplainer',
      color: 'from-purple-500/20 to-indigo-500/10 border-purple-500/30 text-purple-400',
    },
    {
      name: 'Flask API',
      category: 'Backend Microservice',
      description: 'RESTful inference server serving model endpoints, telemetry, and edge syncing.',
      icon: Server,
      badge: 'REST / HTTP',
      color: 'from-blue-500/20 to-sky-500/10 border-blue-500/30 text-blue-400',
    },
    {
      name: 'Raspberry Pi',
      category: 'IoT Edge Device',
      description: 'SBC edge controller driving I2C SSD1306 128x64 monochrome OLED & GPIO button.',
      icon: Cpu,
      badge: 'Pi 4 / I2C',
      color: 'from-rose-500/20 to-orange-500/10 border-rose-500/30 text-rose-400',
    },
    {
      name: 'React',
      category: 'Frontend Client',
      description: 'Modern TypeScript SPA with Vite, Tailwind CSS, Recharts, and Framer Motion.',
      icon: Atom,
      badge: 'React 18',
      color: 'from-cyan-500/20 to-emerald-500/10 border-cyan-500/30 text-cyan-400',
    },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-sm font-mono font-bold text-slate-300 tracking-wider uppercase">
            TECHNOLOGY STACK
          </h2>
          <p className="text-xs text-slate-500 font-mono">
            Modular multi-tier architecture spanning biology, AI, and edge IoT
          </p>
        </div>
        <span className="text-[11px] font-mono px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-slate-400">
          6 Integrated Layers
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {stack.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.name}
              className={`p-4 rounded-2xl bg-gradient-to-br ${item.color} bg-navy-950/80 border glass-panel glass-panel-hover flex flex-col justify-between`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="p-2.5 rounded-xl bg-navy-900/90 border border-slate-800 text-inherit">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-navy-950 border border-slate-800 text-slate-300">
                    {item.badge}
                  </span>
                </div>
                <h3 className="text-sm font-bold text-white font-mono">{item.name}</h3>
                <span className="text-[11px] text-cyan-400/80 font-mono block mb-2">{item.category}</span>
                <p className="text-xs text-slate-300 leading-relaxed font-sans">{item.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
