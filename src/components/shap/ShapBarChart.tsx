import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  Cell,
} from 'recharts';
import { useGenoSenseDemo } from '../../hooks/useGenoSenseDemo';

export const ShapBarChart: React.FC = () => {
  const { shapAttributions, selectedGene, selectGene } = useGenoSenseDemo();

  const data = shapAttributions.map((item) => ({
    gene: item.gene,
    value: item.value,
    direction: item.direction,
    featureValue: item.featureValue,
    isSelected: selectedGene === item.gene,
  }));

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const d = payload[0].payload;
      return (
        <div className="p-3 rounded-xl bg-navy-950 border border-slate-700 shadow-xl text-xs font-mono">
          <p className="font-bold text-white text-sm">{d.gene}</p>
          <p className="text-slate-300 mt-1">
            SHAP Attribution:{' '}
            <span className={d.value > 0 ? 'text-rose-400 font-bold' : 'text-emerald-400 font-bold'}>
              {d.value > 0 ? `+${d.value.toFixed(2)}` : d.value.toFixed(2)}
            </span>
          </p>
          <p className="text-slate-400">Feature Value: {d.featureValue}</p>
          <p className="text-slate-500 text-[10px] mt-1">{d.direction}</p>
          <p className="text-cyan-400 text-[10px] mt-1">Click bar to view molecular details</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="p-6 rounded-2xl bg-navy-950/80 border border-slate-800 space-y-4 glass-panel">
      <div className="border-b border-slate-800 pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h2 className="text-base font-bold font-mono text-white">Explainable AI</h2>
          <p className="text-xs text-slate-400 font-mono">
            Understand which features influenced the model output.
          </p>
        </div>
        <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-purple-950/80 text-purple-300 border border-purple-800 self-start sm:self-auto">
          TreeSHAP Attribution (log-odds)
        </span>
      </div>

      <div className="h-80 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            layout="vertical"
            data={data}
            margin={{ top: 15, right: 30, left: 30, bottom: 15 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" horizontal={false} />
            <XAxis
              type="number"
              domain={[-0.15, 0.4]}
              stroke="#94a3b8"
              tick={{ fill: '#94a3b8', fontSize: 11, fontFamily: 'monospace' }}
              axisLine={{ stroke: '#334155' }}
              tickLine={false}
              tickFormatter={(v) => (v > 0 ? `+${v}` : `${v}`)}
            />
            <YAxis
              type="category"
              dataKey="gene"
              stroke="#94a3b8"
              tick={{ fill: '#e2e8f0', fontSize: 12, fontFamily: 'monospace', fontWeight: 600 }}
              axisLine={{ stroke: '#334155' }}
              tickLine={false}
              width={70}
            />
            <Tooltip content={<CustomTooltip />} />
            <ReferenceLine x={0} stroke="#475569" strokeWidth={1.5} />
            <Bar
              dataKey="value"
              radius={[4, 4, 4, 4]}
              onClick={(entry) => selectGene(entry.gene)}
              cursor="pointer"
              maxBarSize={28}
            >
              {data.map((entry) => {
                const isSelected = selectedGene === entry.gene;
                let fillColor = entry.value >= 0 ? '#f43f5e' : '#10b981';
                if (isSelected) {
                  fillColor = entry.value >= 0 ? '#fb7185' : '#34d399';
                }
                return (
                  <Cell
                    key={entry.gene}
                    fill={fillColor}
                    stroke={isSelected ? '#38bdf8' : 'none'}
                    strokeWidth={isSelected ? 2 : 0}
                  />
                );
              })}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="flex flex-wrap items-center justify-between text-xs font-mono text-slate-400 pt-2 border-t border-slate-800">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded bg-rose-500"></span>
            <span>+ Positive SHAP (Increases Risk Output)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded bg-emerald-500"></span>
            <span>- Negative SHAP (Decreases Risk Output)</span>
          </div>
        </div>
        <span className="text-[11px] text-cyan-400">Click any bar to inspect feature attributes</span>
      </div>
    </div>
  );
};
