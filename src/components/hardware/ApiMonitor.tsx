import React from 'react';
import { Radio, RefreshCw } from 'lucide-react';
import { useGenoSenseDemo } from '../../hooks/useGenoSenseDemo';

export const ApiMonitor: React.FC = () => {
  const { apiActivities, simulateApiFailure, loadDemoSample } = useGenoSenseDemo();

  return (
    <div className="p-6 rounded-2xl bg-navy-950/80 border border-slate-800 space-y-4 glass-panel">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-blue-500/10 text-blue-400">
            <Radio className="w-4 h-4 animate-pulse" />
          </div>
          <div>
            <h3 className="text-base font-bold font-mono text-white">
              Flask API Telemetry Monitor
            </h3>
            <p className="text-xs text-slate-400 font-mono">
              Live HTTP request logger &amp; edge communication stream
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={simulateApiFailure}
            className="px-2.5 py-1 text-[11px] font-mono rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/30 transition-colors"
          >
            Simulate 503 Fail
          </button>
          <button
            onClick={() => loadDemoSample()}
            className="px-2.5 py-1 text-[11px] font-mono rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-colors flex items-center gap-1"
          >
            <RefreshCw className="w-3 h-3 text-cyan-400" />
            <span>Ping /health</span>
          </button>
        </div>
      </div>

      <div className="overflow-x-auto rounded-xl border border-slate-800/80 bg-navy-950/60">
        <table className="w-full text-left text-xs font-mono">
          <thead>
            <tr className="border-b border-slate-800 bg-navy-900/80 text-slate-400 uppercase text-[11px]">
              <th className="py-2.5 px-3">Time</th>
              <th className="py-2.5 px-3">Method</th>
              <th className="py-2.5 px-3">Endpoint</th>
              <th className="py-2.5 px-3">Status</th>
              <th className="py-2.5 px-3 text-right">Latency</th>
              <th className="py-2.5 px-3 hidden md:table-cell">Payload Details</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/50 text-slate-300">
            {apiActivities.map((log) => (
              <tr key={log.id} className="hover:bg-slate-900/60 transition-colors">
                <td className="py-2.5 px-3 text-slate-400 text-[11px]">{log.timestamp}</td>
                <td className="py-2.5 px-3">
                  <span
                    className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                      log.method === 'POST'
                        ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                        : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                    }`}
                  >
                    {log.method}
                  </span>
                </td>
                <td className="py-2.5 px-3 font-semibold text-white">{log.endpoint}</td>
                <td className="py-2.5 px-3">
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      log.status === 200
                        ? 'bg-emerald-500/20 text-emerald-300'
                        : 'bg-rose-500/20 text-rose-300'
                    }`}
                  >
                    {log.status === 200 ? '200 OK' : `${log.status} ERR`}
                  </span>
                </td>
                <td className="py-2.5 px-3 text-right text-cyan-400">{log.responseTimeMs}ms</td>
                <td className="py-2.5 px-3 text-slate-400 text-[11px] truncate max-w-xs hidden md:table-cell">
                  {log.details}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between text-[11px] font-mono text-slate-500">
        <span>Endpoints simulated via local asynchronous Promise latency handler</span>
        <span className="text-cyan-400">Microservice Gateway: Flask 3.0 / Gunicorn</span>
      </div>
    </div>
  );
};
