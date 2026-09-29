import React from 'react';
import { VcfDropzone } from '../components/genomic/VcfDropzone';
import { ExtractionPipelineProgress } from '../components/genomic/ExtractionPipelineProgress';
import { MarkerTable } from '../components/genomic/MarkerTable';
import { Dna, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useGenoSenseDemo } from '../hooks/useGenoSenseDemo';

export const GenomicAnalysis: React.FC = () => {
  const navigate = useNavigate();
  const { markersExtracted } = useGenoSenseDemo();

  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-cyan-500/10 text-cyan-400">
              <Dna className="w-5 h-5" />
            </span>
            <h1 className="text-2xl font-bold font-mono text-white tracking-wide">
              GENOMIC ANALYSIS
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 font-mono">
            VCF ingestion, SNP calling, and 24-dimensional feature vector extraction
          </p>
        </div>

        {markersExtracted && (
          <button
            onClick={() => navigate('/ai-prediction')}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-semibold bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-[0_0_15px_rgba(6,182,212,0.3)] transition-all self-start sm:self-auto"
          >
            <span>Proceed to AI Prediction</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>

      <VcfDropzone />

      <ExtractionPipelineProgress />

      <MarkerTable />
    </div>
  );
};
