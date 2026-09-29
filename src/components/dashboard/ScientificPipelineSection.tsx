import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FileCode2,
  Dna,
  Binary,
  TreeDeciduous,
  HelpCircle,
  Server,
  Cpu,
  LayoutDashboard,
  CheckCircle2,
} from 'lucide-react';
import { useGenoSenseDemo } from '../../hooks/useGenoSenseDemo';

interface PipelineNode {
  id: string;
  step: string;
  title: string;
  shortDesc: string;
  detail: string;
  techSpec: string;
  icon: React.ElementType;
}

export const ScientificPipelineSection: React.FC = () => {
  const { fullDemoStep, isRunningFullDemo, predictionReady } = useGenoSenseDemo();
  const [selectedNodeId, setSelectedNodeId] = useState<string>('01');

  const nodes: PipelineNode[] = [
    {
      id: '01',
      step: '01',
      title: 'VCF DATA',
      shortDesc: 'Genomic variant ingestion',
      detail: 'Raw Variant Call Format (v4.2) records mapped to reference genome GRCh38.p13 with chromosome coordinates, alleles, and genotype calls.',
      techSpec: 'Input: .vcf | Format: 1000 Genomes compliant | Target: 24 loci',
      icon: FileCode2,
    },
    {
      id: '02',
      step: '02',
      title: 'MARKER EXTRACTION',
      shortDesc: 'SNP locus identification',
      detail: 'Fast string scanning algorithm filtering multi-allelic sites and matching candidate disease-associated SNP markers (TNF, IL4R, TLR4, IFNG).',
      techSpec: 'Algorithm: Coordinate Hash Indexing | Latency: ~15ms',
      icon: Dna,
    },
    {
      id: '03',
      step: '03',
      title: 'FEATURE ENGINEERING',
      shortDesc: 'Additive numerical encoding',
      detail: 'Genotype strings transformed to numerical dosage values: 0/0 homozygous reference → 0, 0/1 heterozygous → 1, 1/1 homozygous alternate → 2.',
      techSpec: 'Vector: 24-dimensional normalized float tensor [0.0 - 2.0]',
      icon: Binary,
    },
    {
      id: '04',
      step: '04',
      title: 'RANDOM FOREST',
      shortDesc: '200 trees bagging ensemble',
      detail: 'Bootstrap aggregated decision trees evaluate recursive feature splits, computing probability calibration across synthetic phenotypes.',
      techSpec: 'Estimators: 200 | Criterion: Gini Impurity | Bagging: Subsample 0.8',
      icon: TreeDeciduous,
    },
    {
      id: '05',
      step: '05',
      title: 'SHAP',
      shortDesc: 'TreeExplainer attribution',
      detail: 'Calculates exact local Shapley values in polynomial time, attributing individual feature contributions to model log-odds deviation from baseline.',
      techSpec: 'Complexity: O(TLD^2) | Base Value: 0.22 | Directional Attribution',
      icon: HelpCircle,
    },
    {
      id: '06',
      step: '06',
      title: 'API',
      shortDesc: 'Flask microservice gateway',
      detail: 'High-throughput WSGI server exposing REST endpoints for model inference, telemetry streaming, and edge polling.',
      techSpec: 'Gateway: Flask 3.0 / Gunicorn | Port: 5000 | Format: JSON Payload',
      icon: Server,
    },
    {
      id: '07',
      step: '07',
      title: 'EDGE DEVICE',
      shortDesc: 'Raspberry Pi SBC controller',
      detail: 'Single-board computer receiving HTTP predictions, handling GPIO interrupt signals from physical button, and commanding I2C display bus.',
      techSpec: 'Hardware: Broadcom BCM2711 | OS: Linux Debian ARM64 | I2C: Bus 1',
      icon: Cpu,
    },
    {
      id: '08',
      step: '08',
      title: 'DASHBOARD',
      shortDesc: 'Scientific visualization',
      detail: 'Modern React SPA providing synchronized interactive inspection, SHAP decomposition, and continuous hardware-in-the-loop telemetry.',
      techSpec: 'Stack: React 18, TypeScript, Recharts, Framer Motion',
      icon: LayoutDashboard,
    },
  ];

  const selectedNode = nodes.find((n) => n.id === selectedNodeId) || nodes[0];

  return (
    <section id="pipeline-section" className="space-y-6 pt-6">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-[var(--border-color)] pb-4">
        <div>
          <span className="text-[11px] font-mono text-[var(--primary)] uppercase tracking-widest block">
            SECTION 01 — THE PIPELINE
          </span>
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-[var(--text-main)] mt-1">
            From Genome to Insight
          </h2>
        </div>
        <p className="text-xs font-mono text-[var(--text-secondary)]">
          Click any node to expand low-level scientific specifications
        </p>
      </div>

      {/* Horizontal Connected Pipeline with Travelling Data Pulse */}
      <div className="relative py-4 overflow-x-auto">
        {/* Continuous Connecting Line */}
        <div className="hidden lg:block absolute top-1/2 left-6 right-6 h-[1px] bg-[var(--border-color)] -translate-y-1/2 z-0">
          {/* Animated Travelling Data Pulse */}
          <motion.div
            className="w-24 h-[2px] bg-gradient-to-r from-transparent via-[var(--primary)] to-transparent shadow-[0_0_8px_var(--primary)]"
            animate={{
              x: ['0%', '1000%'],
            }}
            transition={{
              duration: 3.5,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
        </div>

        {/* 8 Connected Nodes */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 relative z-10 min-w-[700px] lg:min-w-0">
          {nodes.map((node, index) => {
            const stepNum = index + 1;
            const isSelected = selectedNodeId === node.id;
            const isComplete = predictionReady || (isRunningFullDemo && fullDemoStep > stepNum);
            const isCurrent = isRunningFullDemo && fullDemoStep === stepNum;
            const Icon = node.icon;

            return (
              <div
                key={node.id}
                onClick={() => setSelectedNodeId(node.id)}
                className={`cursor-pointer p-3 rounded-[3px] border transition-all text-left flex flex-col justify-between h-36 ${
                  isSelected
                    ? 'bg-[var(--bg-surface)] border-[var(--primary)] shadow-sm ring-1 ring-[var(--primary)]/30'
                    : isCurrent
                    ? 'bg-[var(--bg-surface)] border-[var(--primary)] animate-pulse'
                    : isComplete
                    ? 'bg-[var(--bg-surface)] border-[var(--border-color)] hover:border-[var(--primary)]/50'
                    : 'bg-[var(--bg-secondary)] border-[var(--border-color)] hover:border-[var(--primary)]/30 opacity-80 hover:opacity-100'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between text-xs font-mono mb-2">
                    <span className="text-[var(--text-secondary)] text-[10px]">{node.step}</span>
                    {isComplete ? (
                      <CheckCircle2 className="w-3.5 h-3.5 text-[var(--primary)]" />
                    ) : (
                      <span className="w-1.5 h-1.5 rounded-full bg-[var(--border-color)]" />
                    )}
                  </div>

                  <div className="p-1.5 w-fit rounded-[2px] bg-[var(--bg-elevated)] border border-[var(--border-color)] text-[var(--primary)] mb-2">
                    <Icon className="w-4 h-4" />
                  </div>

                  <h3 className="font-display font-bold text-xs text-[var(--text-main)] tracking-wide leading-tight">
                    {node.title}
                  </h3>
                </div>

                <p className="text-[10px] text-[var(--text-secondary)] font-mono leading-tight truncate">
                  {node.shortDesc}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Expanded Scientific Node Dossier */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedNode.id}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.2 }}
          className="lab-card p-5 border-l-2 border-l-[var(--primary)] space-y-3"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[var(--border-color)] pb-2.5">
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono font-bold text-[var(--primary)] px-2 py-0.5 rounded-[2px] bg-[var(--bg-secondary)] border border-[var(--border-color)]">
                NODE {selectedNode.step}
              </span>
              <h3 className="font-display font-bold text-base text-[var(--text-main)] tracking-wide">
                {selectedNode.title} — {selectedNode.shortDesc}
              </h3>
            </div>
            <span className="text-[11px] font-mono text-[var(--text-secondary)]">
              STATUS: {predictionReady ? 'VERIFIED' : 'READY'}
            </span>
          </div>

          <p className="text-xs sm:text-sm text-[var(--text-main)] leading-relaxed">
            {selectedNode.detail}
          </p>

          <div className="p-2.5 rounded-[2px] bg-[var(--bg-secondary)] border border-[var(--border-color)] text-xs font-mono text-[var(--primary)] flex items-center justify-between">
            <span>{selectedNode.techSpec}</span>
            <span className="text-[var(--text-secondary)] text-[10px]">REAL-TIME REPRODUCIBLE</span>
          </div>
        </motion.div>
      </AnimatePresence>
    </section>
  );
};
