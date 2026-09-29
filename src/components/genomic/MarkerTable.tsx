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
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[var(--border-color)] pb-3">
        <div>
          <h3 className="text-base font-display font-bold text-[var(--text-main)] flex items-center gap-2">
            <Dna className="w-4 h-4 text-[var(--primary)]" />
            GENOMIC MARKER DOSAGE MATRIX (24 TARGETS)
          </h3>
          <p className="text-xs text-[var(--text-secondary)] mt-0.5 font-mono">
            Candidate loci mapped to GRCh38.p13 human reference assembly
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Category Filter Pills */}
          <div className="flex items-center gap-1 p-0.5 rounded-[2px] bg-[var(--bg-secondary)] border border-[var(--border-color)]">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilterCategory(cat)}
                className={`px-2.5 py-1 text-xs font-mono uppercase tracking-wider transition-colors rounded-[2px] ${
                  filterCategory === cat
                    ? 'bg-[var(--bg-surface)] text-[var(--primary)] border border-[var(--primary)] font-bold shadow-sm'
                    : 'text-[var(--text-secondary)] hover:text-[var(--text-main)]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative min-w-[200px]">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-secondary)]" />
            <input
              type="text"
              placeholder="Search gene or rsID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-1 rounded-[2px] bg-[var(--bg-secondary)] border border-[var(--border-color)] text-xs text-[var(--text-main)] placeholder-[var(--text-secondary)] focus:outline-none focus:border-[var(--primary)] font-mono"
            />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-[2px] border border-[var(--border-color)] bg-[var(--bg-surface)]">
        <table className="w-full text-left text-xs font-mono border-collapse">
          <thead>
            <tr className="border-b border-[var(--border-color)] bg-[var(--bg-secondary)] text-[var(--text-secondary)] uppercase text-[10px] tracking-wider">
              <th className="py-2.5 px-4 font-semibold">Gene</th>
              <th className="py-2.5 px-4 font-semibold">Position</th>
              <th className="py-2.5 px-4 font-semibold">Association</th>
              <th className="py-2.5 px-4 font-semibold">Allele</th>
              <th className="py-2.5 px-4 font-semibold">Genotype</th>
              <th className="py-2.5 px-4 font-semibold text-right">Feature Value</th>
              <th className="py-2.5 px-4 font-semibold text-center">Inspect</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--border-color)]/60 text-[var(--text-main)]">
            {filteredMarkers.map((marker) => (
              <tr
                key={marker.id}
                className="hover:bg-[var(--bg-elevated)] transition-colors group cursor-pointer"
                onClick={() => selectGene(marker.gene)}
              >
                <td className="py-2.5 px-4 font-bold text-[var(--text-main)] flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--primary)]" />
                  <span className="text-[var(--primary)]">{marker.gene}</span>
                  <span className="text-[10px] text-[var(--text-secondary)] font-mono">({marker.rsId})</span>
                </td>
                <td className="py-2.5 px-4 text-[var(--text-secondary)]">{marker.position}</td>
                <td className="py-2.5 px-4">
                  <span
                    className={`px-2 py-0.5 rounded-[2px] text-[10px] font-bold uppercase tracking-wider ${
                      marker.association === 'Dengue'
                        ? 'bg-[var(--bg-secondary)] text-[var(--primary)] border border-[var(--primary)]/40'
                        : marker.association === 'Allergy'
                        ? 'bg-[var(--bg-secondary)] text-[var(--secondary)] border border-[var(--secondary)]/40'
                        : 'bg-[var(--bg-secondary)] text-[var(--text-secondary)] border border-[var(--border-color)]'
                    }`}
                  >
                    {marker.association}
                  </span>
                </td>
                <td className="py-2.5 px-4 text-[var(--text-secondary)]">{marker.allele}</td>
                <td className="py-2.5 px-4">
                  <span className="px-1.5 py-0.5 rounded-[2px] bg-[var(--bg-secondary)] border border-[var(--border-color)] text-[var(--text-main)] text-[11px]">
                    {marker.genotype}
                  </span>
                </td>
                <td className="py-2.5 px-4 text-right">
                  <span
                    className={`font-bold px-2 py-0.5 rounded-[2px] ${
                      marker.featureValue === 2
                        ? 'bg-[var(--bg-secondary)] text-[var(--primary)] border border-[var(--primary)]/50'
                        : marker.featureValue === 1
                        ? 'bg-[var(--bg-secondary)] text-[var(--secondary)] border border-[var(--secondary)]/50'
                        : 'bg-[var(--bg-secondary)] text-[var(--text-secondary)]'
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
                    className="p-1 rounded text-[var(--text-secondary)] hover:text-[var(--primary)] transition-colors"
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

      <div className="flex items-center justify-between text-[var(--text-secondary)] text-[11px] font-mono pt-1">
        <span>
          Showing {filteredMarkers.length} of {displayMarkers.length} genomic targets
        </span>
        <span>Additive Dosage: Homozygous Ref (0) • Heterozygous (1) • Homozygous Alt (2)</span>
      </div>
    </div>
  );
};
