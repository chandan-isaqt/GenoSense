import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import { useGenoSenseDemo } from '../../hooks/useGenoSenseDemo';

export const DiseaseComparisonChart: React.FC = () => {
  const { diseaseScores, predictionReady, riskScore } = useGenoSenseDemo();

  const data = diseaseScores.map((item) => ({
    name: item.name,
    score: item.name === 'Dengue' && predictionReady ? riskScore : item.score,
    riskLevel: item.riskLevel,
    markers: item.markerCount,
  }));

  const getBarColor = (_name: string, score: number) => {
    if (score >= 70) return '#f43f5e'; // Rose / High
    if (score >= 50) return '#06b6d4'; // Cyan / Moderate
    return '#3b82f6'; // Blue / Low
  };

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const d = payload[0].payload;
      return (
        <div className="p-3 rounded-xl bg-navy-950 border border-slate-700 shadow-xl text-xs font-mono">
          <p className="font-bold text-white text-sm">{d.name}</p>
          <p className="text-cyan-400 mt-1">Prototype Score: {d.score}%</p>
          <p className="text-slate-400">Class: {d.riskLevel}</p>
          <p className="text-slate-500 text-[10px] mt-1">{d.markers} Target Markers Evaluated</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="p-6 rounded-2xl bg-navy-950/80 border border-slate-800 space-y-4 glass-panel">
      <div className="border-b border-slate-800 pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
        <div>
          <h3 className="text-base font-bold font-mono text-white">
            Prototype Model Outputs
          </h3>
          <p className="text-xs text-slate-400 font-mono">
            Synthetic demonstration values only.
          </p>
        </div>
        <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-400 self-start sm:self-auto">
          Multi-Disease Bagging Output
        </span>
      </div>

      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 20, right: 30, left: -10, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
            <XAxis
              dataKey="name"
              stroke="#94a3b8"
              tick={{ fill: '#94a3b8', fontSize: 12, fontFamily: 'monospace' }}
              axisLine={{ stroke: '#334155' }}
              tickLine={false}
            />
            <YAxis
              domain={[0, 100]}
              stroke="#94a3b8"
              tick={{ fill: '#94a3b8', fontSize: 11, fontFamily: 'monospace' }}
              axisLine={{ stroke: '#334155' }}
              tickLine={false}
              tickFormatter={(v) => `${v}%`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="score" radius={[6, 6, 0, 0]} maxBarSize={64}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={getBarColor(entry.name, entry.score)} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-6 pt-2 text-xs font-mono text-slate-400 border-t border-slate-800/80">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded bg-[#06b6d4]"></span>
          <span>Allergy: 62%</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded bg-[#f43f5e]"></span>
          <span>Dengue: 73% (Active Test)</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded bg-[#3b82f6]"></span>
          <span>Typhoid: 41%</span>
        </div>
      </div>
    </div>
  );
};
