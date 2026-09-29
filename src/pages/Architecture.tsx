import React from 'react';
import { ArchitecturePipeline } from '../components/architecture/ArchitecturePipeline';
import { GitBranch, ArrowRight, Layers, Cpu, Server } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const Architecture: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Page Title Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-cyan-500/10 text-cyan-400">
              <GitBranch className="w-5 h-5" />
            </span>
            <h1 className="text-2xl font-bold font-mono text-white tracking-wide">
              SYSTEM ARCHITECTURE
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 font-mono">
            Full bioinformatics dataflow, ML inference engine, and parallel edge hardware topology
          </p>
        </div>

        <button
          onClick={() => navigate('/demo-guide')}
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-semibold bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-[0_0_15px_rgba(6,182,212,0.3)] transition-all self-start sm:self-auto"
        >
          <span>Explore Demo Guide</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Main Interactive Animated Architecture Diagram */}
      <ArchitecturePipeline />

      {/* Technical Architecture Notes */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-navy-950/80 border border-slate-800 space-y-2 glass-panel">
          <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono font-bold">
            <Layers className="w-4 h-4" />
            <span>Biotechnology Layer</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Consumes standard Variant Call Format (.vcf) aligned to the GRCh38 human reference genome.
            Extracts single nucleotide polymorphisms (SNPs) through coordinate indexing and encodes genotypes into
            additive matrices [0, 1, 2].
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-navy-950/80 border border-slate-800 space-y-2 glass-panel">
          <div className="flex items-center gap-2 text-purple-400 text-xs font-mono font-bold">
            <Server className="w-4 h-4" />
            <span>Machine Learning &amp; XAI</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            200-estimator Random Forest ensemble trained on synthetic genomic risk profiles. TreeSHAP computes
            exact feature attributions in O(TLD^2) complexity, providing local model interpretability without
            biological causation claims.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-navy-950/80 border border-slate-800 space-y-2 glass-panel">
          <div className="flex items-center gap-2 text-emerald-400 text-xs font-mono font-bold">
            <Cpu className="w-4 h-4" />
            <span>Edge IoT Deployment</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Raspberry Pi 4 Model B connects via Wi-Fi to the Flask API gateway. Hardware interrupts on GPIO pin 17
            trigger remote inferences, streaming formatted telemetry over the I2C bus (0x3C) to drive the SSD1306
            monochrome OLED screen.
          </p>
        </div>
      </div>
    </div>
  );
};
