import React, { useState, useMemo } from 'react';
import { Search, Dna, Info } from 'lucide-react';
import { useGenoSenseDemo } from '../../hooks/useGenoSenseDemo';
import { DEMO_GENETIC_MARKERS } from '../../data/demoData';

export const MarkerTable: React.FC = () => {
  const { markers, selectGene } = useGenoSenseDemo();
  const [filterCategory, setFilterCategory] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const displayMarkers = markers.length > 0 ? markers : DEMO_GENETIC_MARKERS;

  const categories = ['All', 'Allergy', 'Dengue', 'Typhoid'];

  const filteredMarkers = useMemo(() => {
    return displayMarkers.filter((marker) => {
      const matchesCategory =
        filterCategory === 'All' || marker.association.toLowerCase() === filterCategory.toLowerCase();
      const matchesSearch =
        marker.gene.toLowerCase().includes(searchTerm.toLowerCase()) ||
        marker.rsId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        marker.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
        marker.consequence.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [displayMarkers, filterCategory, searchTerm]);

  return (
    <div className="p-6 rounded-2xl bg-navy-950/80 border border-slate-800 space-y-5 glass-panel">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h3 className="text-base font-bold font-mono text-white flex items-center gap-2">
            <Dna className="w-5 h-5 text-cyan-400" />
            Genomic Marker Matrix (24 Features)
          </h3>
          <p className="text-xs text-slate-400 mt-1 font-mono">
            Biomarkers derived from VCF variant loci and genotype calling
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-1 p-1 rounded-xl bg-navy-900 border border-slate-800">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilterCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-colors ${
                  filterCategory === cat
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-semibold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative min-w-[200px]">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              placeholder="Search gene or rsID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-navy-900 border border-slate-800 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500/60 font-mono"
            />
          </div>
        </div>
      </div>

      <div className="overflow-x-auto rounded-xl border border-slate-800/80 bg-navy-950/40">
        <table className="w-full text-left text-xs font-mono border-collapse">
          <thead>
            <tr className="border-b border-slate-800 bg-navy-900/80 text-slate-400 uppercase text-[11px] tracking-wider">
              <th className="py-3 px-4 font-semibold">Gene</th>
              <th className="py-3 px-4 font-semibold">Position</th>
              <th className="py-3 px-4 font-semibold">Association</th>
              <th className="py-3 px-4 font-semibold">Allele</th>
              <th className="py-3 px-4 font-semibold">Genotype</th>
              <th className="py-3 px-4 font-semibold text-right">Feature Value</th>
              <th className="py-3 px-4 font-semibold text-center">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60 text-slate-300">
            {filteredMarkers.map((marker) => (
              <tr
                key={marker.id}
                className="hover:bg-cyan-950/20 transition-colors group cursor-pointer"
                onClick={() => selectGene(marker.gene)}
              >
                <td className="py-3 px-4 font-bold text-white flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
                  <span className="text-cyan-300 group-hover:text-cyan-200">{marker.gene}</span>
                  <span className="text-[10px] text-slate-500 font-mono">({marker.rsId})</span>
                </td>
                <td className="py-3 px-4 text-slate-400">{marker.position}</td>
                <td className="py-3 px-4">
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                      marker.association === 'Dengue'
                        ? 'bg-rose-500/10 text-rose-300 border border-rose-500/30'
                        : marker.association === 'Allergy'
                        ? 'bg-amber-500/10 text-amber-300 border border-amber-500/30'
                        : marker.association === 'Typhoid'
                        ? 'bg-blue-500/10 text-blue-300 border border-blue-500/30'
                        : 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/30'
                    }`}
                  >
                    {marker.association}
                  </span>
                </td>
                <td className="py-3 px-4 text-slate-300">{marker.allele}</td>
                <td className="py-3 px-4">
                  <span className="px-1.5 py-0.5 rounded bg-slate-900 border border-slate-700 text-slate-300 text-[11px]">
                    {marker.genotype}
                  </span>
                </td>
                <td className="py-3 px-4 text-right">
                  <span
                    className={`font-bold px-2 py-0.5 rounded ${
                      marker.featureValue === 2
                        ? 'bg-rose-500/20 text-rose-300'
                        : marker.featureValue === 1
                        ? 'bg-cyan-500/20 text-cyan-300'
                        : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {marker.featureValue}
                  </span>
                </td>
                <td className="py-3 px-4 text-center">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      selectGene(marker.gene);
                    }}
                    className="p-1 rounded text-slate-500 hover:text-cyan-300 transition-colors"
                    title="Inspect Gene"
                  >
                    <Info className="w-3.5 h-3.5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between text-slate-500 text-[11px] font-mono">
        <span>
          Showing {filteredMarkers.length} of {displayMarkers.length} genomic markers
        </span>
        <span>Reference genome: GRCh38.p13 • Genotype additive encoding [0, 1, 2]</span>
      </div>
    </div>
  );
};
