import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FileCode2,
  Dna,
  Binary,
  TreeDeciduous,
  HelpCircle,
  Server,
  LayoutDashboard,
  Cpu,
  Monitor,
  Code,
  RotateCcw,
} from 'lucide-react';

export const TechnicalModeSection: React.FC = () => {
  const [isTechnicalMode, setIsTechnicalMode] = useState(false);

  const pipeline = [
    { name: 'VCF', desc: 'Raw Variant Call Format v4.2 mapped to GRCh38', icon: FileCode2 },
    { name: 'Marker Extraction', desc: 'Coordinate indexing matching 24 candidate loci', icon: Dna },
    { name: 'Feature Vector', desc: 'Normalized additive dosage tensor [0, 1, 2]', icon: Binary },
    { name: 'Random Forest', desc: '200 bagging decision trees majority voting', icon: TreeDeciduous },
    { name: 'SHAP', desc: 'TreeExplainer polynomial feature attribution', icon: HelpCircle },
    { name: 'Flask API', desc: 'WSGI REST microservice gateway on port 5000', icon: Server },
    { name: 'React', desc: 'Synchronous state management & responsive UI', icon: LayoutDashboard },
    { name: 'Raspberry Pi', desc: 'ARM64 SBC edge client managing GPIO interrupt', icon: Cpu },
    { name: 'OLED', desc: 'SSD1306 128×64 monochrome display over I2C', icon: Monitor },
  ];

  return (
    <section className="py-16 border-t border-[var(--border-color)]/70 space-y-8">
      {/* Mode Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1 text-left">
          <span className="text-xs font-mono text-[var(--primary)] uppercase tracking-widest font-semibold">
            ARCHITECTURE INSPECTOR
          </span>
          <h3 className="text-2xl font-display font-bold text-[var(--text-main)]">
            Technical View
          </h3>
          <p className="text-sm text-[var(--text-secondary)] font-sans">
            Explore the raw engineering flow from variant ingestion to I2C frame buffer.
          </p>
        </div>

        <button
          onClick={() => setIsTechnicalMode(!isTechnicalMode)}
          className="btn-secondary-product text-xs flex items-center gap-2 py-2 px-4 self-start sm:self-auto cursor-pointer"
        >
          <Code className="w-4 h-4 text-[var(--primary)]" />
          <span>{isTechnicalMode ? 'SWITCH BACK TO PRODUCT VIEW' : 'OPEN TECHNICAL VIEW'}</span>
        </button>
      </div>

      {/* Expandable Technical Pipeline */}
      {isTechnicalMode && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="product-card p-8 sm:p-10 space-y-6 animate-fadeIn"
        >
          <div className="flex items-center justify-between border-b border-[var(--border-color)] pb-3 text-xs font-mono text-[var(--text-secondary)]">
            <span className="text-[var(--primary)] font-bold">
              END-TO-END DATAFLOW TOPOLOGY
            </span>
            <span>REST API • I2C BUS • PYTHON &amp; REACT</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-9 gap-3">
            {pipeline.map((node, idx) => {
              const Icon = node.icon;
              return (
                <div
                  key={node.name}
                  className="p-3.5 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-color)] flex flex-col justify-between h-36 text-left space-y-2"
                >
                  <div>
                    <div className="flex items-center justify-between text-[10px] font-mono text-[var(--primary)] mb-1">
                      <span>0{idx + 1}</span>
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                    <div className="font-display font-bold text-xs text-[var(--text-main)] leading-tight">
                      {node.name}
                    </div>
                  </div>
                  <p className="text-[10px] text-[var(--text-secondary)] leading-tight font-sans">
                    {node.desc}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="flex justify-end pt-2">
            <button
              onClick={() => setIsTechnicalMode(false)}
              className="text-xs font-mono text-[var(--primary)] hover:underline flex items-center gap-1 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Switch back to Product View</span>
            </button>
          </div>
        </motion.div>
      )}
    </section>
  );
};
