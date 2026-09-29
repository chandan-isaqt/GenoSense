import React from 'react';
import {
  FileCode2,
  Dna,
  Binary,
  TreeDeciduous,
  HelpCircle,
  Server,
  LayoutDashboard,
  Monitor,
  ArrowDown,
} from 'lucide-react';

export const LaboratoryArchitectureSection: React.FC = () => {
  return (
    <section className="space-y-6 pt-6">
      {/* Section Header */}
      <div className="border-b border-[#182532] pb-4">
        <span className="text-[11px] font-mono text-[#35D6C7] uppercase tracking-widest block">
          SECTION 07 — FULL SYSTEM
        </span>
        <h2 className="text-2xl sm:text-3xl font-display font-bold text-[#F4F7FA] mt-1">
          GenoSense Architecture
        </h2>
        <p className="text-xs sm:text-sm font-mono text-[#8B9AAA] mt-1">
          Comprehensive topology from genomic sequencing inputs to twin cloud/edge endpoints
        </p>
      </div>

      {/* Main Large Architecture Topology */}
      <div className="lab-card p-6 sm:p-10 relative overflow-hidden">
        {/* Central Vertical Pipeline with Animated Connections */}
        <div className="max-w-3xl mx-auto space-y-4 relative">
          {/* Node 1: VCF */}
          <div className="p-4 rounded-[2px] bg-[#05080D] border border-[#182532] flex items-center justify-between font-mono text-xs">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-[2px] bg-[#0B111A] border border-[#182532] text-[#35D6C7]">
                <FileCode2 className="w-4 h-4" />
              </div>
              <div>
                <span className="font-display font-bold text-sm text-[#F4F7FA] block">VCF FILE</span>
                <span className="text-[10px] text-[#8B9AAA]">Reference GRCh38.p13 • 18 Variants</span>
              </div>
            </div>
            <span className="text-[10px] text-[#35D6C7] px-2 py-0.5 rounded bg-[#080D14] border border-[#182532]">
              INPUT STREAM
            </span>
          </div>

          <div className="flex justify-center my-1 text-[#35D6C7]">
            <ArrowDown className="w-4 h-4 animate-bounce" />
          </div>

          {/* Node 2: Marker Engine */}
          <div className="p-4 rounded-[2px] bg-[#05080D] border border-[#182532] flex items-center justify-between font-mono text-xs">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-[2px] bg-[#0B111A] border border-[#182532] text-[#35D6C7]">
                <Dna className="w-4 h-4" />
              </div>
              <div>
                <span className="font-display font-bold text-sm text-[#F4F7FA] block">MARKER ENGINE</span>
                <span className="text-[10px] text-[#8B9AAA]">Coordinate Indexing • 24 SNP Targets</span>
              </div>
            </div>
            <span className="text-[10px] text-[#8B9AAA]">SCAN: 15ms</span>
          </div>

          <div className="flex justify-center my-1 text-[#35D6C7]">
            <ArrowDown className="w-4 h-4 animate-bounce" />
          </div>

          {/* Node 3: Feature Vector */}
          <div className="p-4 rounded-[2px] bg-[#05080D] border border-[#182532] flex items-center justify-between font-mono text-xs">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-[2px] bg-[#0B111A] border border-[#182532] text-[#35D6C7]">
                <Binary className="w-4 h-4" />
              </div>
              <div>
                <span className="font-display font-bold text-sm text-[#F4F7FA] block">FEATURE VECTOR</span>
                <span className="text-[10px] text-[#8B9AAA]">Additive Genotype Encoding [0, 1, 2]</span>
              </div>
            </div>
            <span className="text-[10px] text-[#35D6C7]">24 FLOATS</span>
          </div>

          <div className="flex justify-center my-1 text-[#35D6C7]">
            <ArrowDown className="w-4 h-4 animate-bounce" />
          </div>

          {/* CENTRAL CORE: GENOSENSE AI CORE */}
          <div className="p-6 rounded-[3px] bg-[#080D14] border-2 border-[#35D6C7] text-center space-y-4 shadow-[0_0_20px_rgba(53,214,199,0.15)] relative">
            <div className="inline-block px-3 py-1 rounded-[2px] bg-[#05080D] border border-[#35D6C7] text-[#35D6C7] font-mono text-xs font-bold uppercase tracking-widest">
              GENOSENSE AI CORE
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left font-mono text-xs">
              <div className="p-3 bg-[#05080D] border border-[#182532] rounded-[2px]">
                <div className="flex items-center gap-2 text-[#35D6C7] font-bold">
                  <TreeDeciduous className="w-4 h-4" />
                  <span>RANDOM FOREST</span>
                </div>
                <p className="text-[11px] text-[#8B9AAA] mt-1">
                  200 bagging decision trees computing majority consensus output.
                </p>
              </div>

              <div className="p-3 bg-[#05080D] border border-[#182532] rounded-[2px]">
                <div className="flex items-center gap-2 text-[#4DA3FF] font-bold">
                  <HelpCircle className="w-4 h-4" />
                  <span>SHAP TREEEXPLAINER</span>
                </div>
                <p className="text-[11px] text-[#8B9AAA] mt-1">
                  Exact polynomial local feature attribution for explainability.
                </p>
              </div>
            </div>
          </div>

          <div className="flex justify-center my-1 text-[#35D6C7]">
            <ArrowDown className="w-4 h-4 animate-bounce" />
          </div>

          {/* Gateway: Flask API */}
          <div className="p-4 rounded-[2px] bg-[#05080D] border border-[#182532] flex items-center justify-between font-mono text-xs">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-[2px] bg-[#0B111A] border border-[#182532] text-[#35D6C7]">
                <Server className="w-4 h-4" />
              </div>
              <div>
                <span className="font-display font-bold text-sm text-[#F4F7FA] block">FLASK API GATEWAY</span>
                <span className="text-[10px] text-[#8B9AAA]">RESTful Microservice • POST /predict</span>
              </div>
            </div>
            <span className="text-[10px] text-[#35D6C7]">HTTP 200 OK</span>
          </div>

          {/* Dual Parallel Outputs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3">
            {/* Output 1: React Dashboard */}
            <div className="p-5 rounded-[2px] bg-[#080D14] border border-[#182532] font-mono text-xs space-y-2">
              <div className="flex items-center justify-between text-[#35D6C7] font-bold">
                <span className="flex items-center gap-2">
                  <LayoutDashboard className="w-4 h-4" />
                  <span>→ REACT DASHBOARD</span>
                </span>
                <span className="text-[10px] text-[#8B9AAA]">CLIENT SPA</span>
              </div>
              <p className="text-[11px] text-[#8B9AAA] font-sans">
                Interactive XAI decomposition, disease comparison charts, and live sample inspector.
              </p>
            </div>

            {/* Output 2: Raspberry Pi OLED */}
            <div className="p-5 rounded-[2px] bg-[#080D14] border border-[#182532] font-mono text-xs space-y-2">
              <div className="flex items-center justify-between text-[#35D6C7] font-bold">
                <span className="flex items-center gap-2">
                  <Monitor className="w-4 h-4" />
                  <span>→ RASPBERRY PI OLED</span>
                </span>
                <span className="text-[10px] text-[#8B9AAA]">EDGE IoT</span>
              </div>
              <p className="text-[11px] text-[#8B9AAA] font-sans">
                Point-of-care embedded display streaming calibrated risk scores via I2C bus.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
