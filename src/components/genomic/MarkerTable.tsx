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
    <div className="lab-card p-6 space-y-5">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#182532] pb-3">
        <div>
          <h3 className="text-base font-display font-bold text-[#F4F7FA] flex items-center gap-2">
            <Dna className="w-4 h-4 text-[#35D6C7]" />
            GENOMIC MARKER DOSAGE MATRIX (24 TARGETS)
          </h3>
          <p className="text-xs text-[#8B9AAA] mt-0.5 font-mono">
            Candidate loci mapped to GRCh38.p13 human reference assembly
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Category Filter Pills */}
          <div className="flex items-center gap-1 p-0.5 rounded-[2px] bg-[#05080D] border border-[#182532]">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilterCategory(cat)}
                className={`px-2.5 py-1 text-xs font-mono uppercase tracking-wider transition-colors rounded-[2px] ${
                  filterCategory === cat
                    ? 'bg-[#0B111A] text-[#35D6C7] border border-[#35D6C7] font-bold'
                    : 'text-[#8B9AAA] hover:text-[#F4F7FA]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative min-w-[200px]">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#8B9AAA]" />
            <input
              type="text"
              placeholder="Search gene or rsID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-1 rounded-[2px] bg-[#05080D] border border-[#182532] text-xs text-[#F4F7FA] placeholder-[#8B9AAA] focus:outline-none focus:border-[#35D6C7] font-mono"
            />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-[2px] border border-[#182532] bg-[#05080D]/50">
        <table className="w-full text-left text-xs font-mono border-collapse">
          <thead>
            <tr className="border-b border-[#182532] bg-[#080D14] text-[#8B9AAA] uppercase text-[10px] tracking-wider">
              <th className="py-2.5 px-4 font-semibold">Gene</th>
              <th className="py-2.5 px-4 font-semibold">Position</th>
              <th className="py-2.5 px-4 font-semibold">Association</th>
              <th className="py-2.5 px-4 font-semibold">Allele</th>
              <th className="py-2.5 px-4 font-semibold">Genotype</th>
              <th className="py-2.5 px-4 font-semibold text-right">Feature Value</th>
              <th className="py-2.5 px-4 font-semibold text-center">Inspect</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#182532]/60 text-[#F4F7FA]">
            {filteredMarkers.map((marker) => (
              <tr
                key={marker.id}
                className="hover:bg-[#080D14] transition-colors group cursor-pointer"
                onClick={() => selectGene(marker.gene)}
              >
                <td className="py-2.5 px-4 font-bold text-[#F4F7FA] flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#35D6C7]" />
                  <span className="text-[#35D6C7]">{marker.gene}</span>
                  <span className="text-[10px] text-[#8B9AAA] font-mono">({marker.rsId})</span>
                </td>
                <td className="py-2.5 px-4 text-[#8B9AAA]">{marker.position}</td>
                <td className="py-2.5 px-4">
                  <span
                    className={`px-2 py-0.5 rounded-[2px] text-[10px] font-bold uppercase tracking-wider ${
                      marker.association === 'Dengue'
                        ? 'bg-[#05080D] text-[#35D6C7] border border-[#35D6C7]/40'
                        : marker.association === 'Allergy'
                        ? 'bg-[#05080D] text-[#4DA3FF] border border-[#4DA3FF]/40'
                        : 'bg-[#05080D] text-[#8B9AAA] border border-[#182532]'
                    }`}
                  >
                    {marker.association}
                  </span>
                </td>
                <td className="py-2.5 px-4 text-[#8B9AAA]">{marker.allele}</td>
                <td className="py-2.5 px-4">
                  <span className="px-1.5 py-0.5 rounded-[2px] bg-[#05080D] border border-[#182532] text-[#F4F7FA] text-[11px]">
                    {marker.genotype}
                  </span>
                </td>
                <td className="py-2.5 px-4 text-right">
                  <span
                    className={`font-bold px-2 py-0.5 rounded-[2px] ${
                      marker.featureValue === 2
                        ? 'bg-[#05080D] text-[#35D6C7] border border-[#35D6C7]/50'
                        : marker.featureValue === 1
                        ? 'bg-[#05080D] text-[#4DA3FF] border border-[#4DA3FF]/50'
                        : 'bg-[#05080D] text-[#8B9AAA]'
                    }`}
                  >
                    {marker.featureValue}
                  </span>
                </td>
                <td className="py-2.5 px-4 text-center">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      selectGene(marker.gene);
                    }}
                    className="p-1 rounded text-[#8B9AAA] hover:text-[#35D6C7] transition-colors"
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

      <div className="flex items-center justify-between text-[#8B9AAA] text-[11px] font-mono pt-1">
        <span>
          Showing {filteredMarkers.length} of {displayMarkers.length} genomic targets
        </span>
        <span>Additive Dosage: Homozygous Ref (0) • Heterozygous (1) • Homozygous Alt (2)</span>
      </div>
    </div>
  );
};
