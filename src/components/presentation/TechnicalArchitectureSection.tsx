import React, { useState } from 'react';
import {
  FileCode2,
  Dna,
  Binary,
  TreeDeciduous,
  HelpCircle,
  Server,
  LayoutDashboard,
  Monitor,
  ChevronDown,
  ChevronUp,
  ArrowDown,
  Code,
} from 'lucide-react';

export const TechnicalArchitectureSection: React.FC = () => {
  const [showDetails, setShowDetails] = useState(false);

  const architectureNodes = [
    { title: 'VCF / DNA', desc: 'Raw Variant Call Format (v4.2) records mapped to reference genome GRCh38.p13', icon: FileCode2 },
    { title: 'Marker Extraction', desc: 'Coordinate hash indexer filtering 24 target SNP loci in ~15ms', icon: Dna },
    { title: 'Feature Engineering', desc: 'Additive dosage transformation producing 24-dimensional normalized float tensor', icon: Binary },
    { title: 'Random Forest', desc: '200 bagging decision trees computing majority voting class probability', icon: TreeDeciduous },
    { title: 'SHAP Explanation', desc: 'Polynomial-time TreeExplainer measuring directional log-odds attribution', icon: HelpCircle },
    { title: 'Flask API', desc: 'WSGI microservice gateway exposing RESTful endpoints (/predict, /telemetry)', icon: Server },
  ];

  return (
    <section id="architecture" className="space-y-6 py-12 border-t border-[var(--border-color)]">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div className="max-w-2xl space-y-3">
          <span className="text-[11px] font-mono text-[var(--primary)] uppercase tracking-widest block">
            09 • OPTIONAL DEEP DIVE
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-[var(--text-main)] tracking-tight">
            Under the Hood
          </h2>
          <p className="text-base text-[var(--text-secondary)] font-sans leading-relaxed">
            The full engineering architecture from sequencing input to twin cloud &amp; edge endpoints. Optional for technical evaluators.
          </p>
        </div>

        {/* Toggle Button: Show Technical Details */}
        <button
          onClick={() => setShowDetails(!showDetails)}
          className="btn-lab-secondary text-xs flex items-center gap-2 py-2.5 px-4 shadow-sm self-start sm:self-auto cursor-pointer"
        >
          <Code className="w-4 h-4 text-[var(--primary)]" />
          <span>{showDetails ? 'HIDE TECHNICAL DETAILS' : 'SHOW TECHNICAL DETAILS'}</span>
          {showDetails ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
      </div>

      {/* Expandable Architecture View */}
      {showDetails && (
        <div className="lab-card p-6 sm:p-10 space-y-8 animate-fadeIn shadow-md">
          {/* Central Vertical Flow with Animated Connectors */}
          <div className="max-w-2xl mx-auto space-y-3">
            {architectureNodes.map((node, index) => {
              const Icon = node.icon;
              return (
                <React.Fragment key={node.title}>
                  <div className="p-4 rounded bg-[var(--bg-secondary)] border border-[var(--border-color)] flex items-center justify-between text-xs font-mono">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded bg-[var(--bg-surface)] text-[var(--primary)] border border-[var(--border-color)]">
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="font-display font-bold text-sm text-[var(--text-main)] block">
                          {node.title}
                        </span>
                        <span className="text-[11px] text-[var(--text-secondary)] font-sans">
                          {node.desc}
                        </span>
                      </div>
                    </div>
                    <span className="text-[10px] text-[var(--primary)] px-2 py-0.5 rounded bg-[var(--bg-surface)] border border-[var(--border-color)] font-mono">
                      STAGE 0{index + 1}
                    </span>
                  </div>

                  {/* Flow Arrow */}
                  <div className="flex justify-center -my-1 text-[var(--primary)]">
                    <ArrowDown className="w-4 h-4 animate-bounce" />
                  </div>
                </React.Fragment>
              );
            })}

            {/* Split Endpoints: Dashboard & Raspberry Pi -> OLED */}
            <div className="p-4 rounded bg-[var(--bg-secondary)] border-2 border-[var(--primary)]/60 space-y-3">
              <div className="text-center font-mono text-xs text-[var(--primary)] font-bold uppercase tracking-wider">
                DUAL PARALLEL OUTPUT DISPATCH
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Branch 1: Web Dashboard */}
                <div className="p-3.5 rounded bg-[var(--bg-surface)] border border-[var(--border-color)] text-xs font-mono space-y-1">
                  <div className="flex items-center gap-2 text-[var(--primary)] font-bold">
                    <LayoutDashboard className="w-4 h-4" />
                    <span>REACT DASHBOARD</span>
                  </div>
                  <p className="text-[11px] text-[var(--text-secondary)] font-sans">
                    Client SPA with interactive XAI decomposition and sample inspection.
                  </p>
                </div>

                {/* Branch 2: Raspberry Pi -> OLED */}
                <div className="p-3.5 rounded bg-[var(--bg-surface)] border border-[var(--border-color)] text-xs font-mono space-y-1">
                  <div className="flex items-center gap-2 text-[var(--primary)] font-bold">
                    <Monitor className="w-4 h-4" />
                    <span>RASPBERRY PI → OLED</span>
                  </div>
                  <p className="text-[11px] text-[var(--text-secondary)] font-sans">
                    Single-board edge client streaming output directly to I2C SSD1306 buffer.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
