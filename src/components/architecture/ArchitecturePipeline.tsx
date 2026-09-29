import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FileCode2,
  Dna,
  Binary,
  TreeDeciduous,
  Target,
  HelpCircle,
  Server,
  LayoutDashboard,
  Cpu,
  Monitor,
  Play,
  CheckCircle2,
  Sparkles,
  ArrowRight,
} from 'lucide-react';
import { useGenoSenseDemo } from '../../hooks/useGenoSenseDemo';

interface ArchitectureNode {
  id: string;
  label: string;
  category: string;
  desc: string;
  icon: React.ElementType;
}

export const ArchitecturePipeline: React.FC = () => {
  const { runFullDemo, isRunningFullDemo, fullDemoStep, predictionReady } = useGenoSenseDemo();
  const [pipelineAnimStep, setPipelineAnimStep] = useState<number>(predictionReady ? 10 : 0);

  const primaryNodes: ArchitectureNode[] = [
    {
      id: 'vcf',
      label: 'VCF Data',
      category: 'Input Layer',
      desc: 'Raw genetic variant records (GRCh38.p13)',
      icon: FileCode2,
    },
    {
      id: 'extraction',
      label: 'Marker Extraction',
      category: 'Bioinformatics',
      desc: 'Target SNP locus matching & filtering',
      icon: Dna,
    },
    {
      id: 'features',
      label: 'Feature Engineering',
      category: 'Data Prep',
      desc: 'Additive genotype numerical vectors [0, 1, 2]',
      icon: Binary,
    },
    {
      id: 'rf',
      label: 'Random Forest',
      category: 'ML Ensemble',
      desc: '200 decision trees bootstrap aggregation',
      icon: TreeDeciduous,
    },
    {
      id: 'score',
      label: 'Prototype Score',
      category: 'Model Output',
      desc: 'Calibrated non-clinical risk indicator (73%)',
      icon: Target,
    },
    {
      id: 'shap',
      label: 'SHAP Attribution',
      category: 'XAI Engine',
      desc: 'TreeExplainer feature impact attribution',
      icon: HelpCircle,
    },
    {
      id: 'api',
      label: 'Flask API',
      category: 'Gateway',
      desc: 'REST microservice inference & sync endpoints',
      icon: Server,
    },
    {
      id: 'dashboard',
      label: 'React Dashboard',
      category: 'Presentation',
      desc: 'Interactive SPA with visual analytics',
      icon: LayoutDashboard,
    },
  ];

  const edgeNodes: ArchitectureNode[] = [
    {
      id: 'api-edge',
      label: 'Flask API (Sync)',
      category: 'Gateway Bridge',
      desc: 'Broadcasts predictions to edge subscribers',
      icon: Server,
    },
    {
      id: 'pi',
      label: 'Raspberry Pi',
      category: 'Edge Controller',
      desc: 'Embedded Linux SBC with I2C bus & GPIO',
      icon: Cpu,
    },
    {
      id: 'oled',
      label: 'OLED Display',
      category: 'Physical Output',
      desc: 'SSD1306 128x64 px hardware risk screen',
      icon: Monitor,
    },
  ];

  const handleRunPipeline = async () => {
    setPipelineAnimStep(1);
    for (let step = 1; step <= 9; step++) {
      setPipelineAnimStep(step);
      await new Promise((r) => setTimeout(r, 600));
    }
    setPipelineAnimStep(10);
    await runFullDemo();
  };

  const isNodeActive = (stepNum: number) => {
    if (isRunningFullDemo) return fullDemoStep === stepNum;
    return pipelineAnimStep === stepNum;
  };

  const isNodeComplete = (stepNum: number) => {
    if (isRunningFullDemo) return fullDemoStep > stepNum;
    if (predictionReady) return true;
    return pipelineAnimStep > stepNum;
  };

  return (
    <div className="p-6 sm:p-8 rounded-2xl bg-navy-950/80 border border-slate-800 space-y-8 glass-panel">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <h2 className="text-xl font-bold font-mono text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-cyan-400" />
            End-to-End System Architecture
          </h2>
          <p className="text-xs text-slate-400 font-mono mt-1">
            Dataflow topology from genomic files to XAI explanations and edge OLED display
          </p>
        </div>

        <button
          onClick={handleRunPipeline}
          disabled={isRunningFullDemo}
          className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-mono text-xs sm:text-sm font-semibold bg-gradient-to-r from-cyan-500 via-cyan-400 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-slate-950 shadow-[0_0_20px_rgba(6,182,212,0.35)] transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
        >
          {isRunningFullDemo ? (
            <>
              <Sparkles className="w-4 h-4 animate-spin text-slate-950" />
              <span>Pipeline Running...</span>
            </>
          ) : (
            <>
              <Play className="w-4 h-4 fill-current text-slate-950" />
              <span>RUN FULL PIPELINE</span>
            </>
          )}
        </button>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider">
          <span>Primary Genomic &amp; AI Inference Pipeline</span>
          <span className="text-slate-500 font-normal">Sequential Execution</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {primaryNodes.map((node, idx) => {
            const stepNum = idx + 1;
            const completed = isNodeComplete(stepNum);
            const active = isNodeActive(stepNum);
            const Icon = node.icon;

            return (
              <motion.div
                key={node.id}
                animate={{
                  scale: active ? 1.03 : 1,
                  borderColor: active
                    ? 'rgba(6, 182, 212, 0.9)'
                    : completed
                    ? 'rgba(16, 185, 129, 0.5)'
                    : 'rgba(51, 65, 85, 0.6)',
                }}
                className={`p-4 rounded-xl border relative transition-all bg-navy-900/60 flex flex-col justify-between ${
                  active
                    ? 'shadow-[0_0_20px_rgba(6,182,212,0.35)] bg-cyan-950/40'
                    : completed
                    ? 'shadow-[0_0_10px_rgba(16,185,129,0.15)] bg-navy-950/80'
                    : ''
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono text-slate-400">Step 0{stepNum}</span>
                    <span
                      className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full ${
                        completed
                          ? 'bg-emerald-950 text-emerald-300 border border-emerald-700/60 flex items-center gap-1'
                          : active
                          ? 'bg-cyan-950 text-cyan-300 border border-cyan-500 animate-pulse'
                          : 'bg-slate-900 text-slate-500 border border-slate-800'
                      }`}
                    >
                      {completed ? (
                        <>
                          <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                          <span>✓ COMPLETE</span>
                        </>
                      ) : active ? (
                        'RUNNING'
                      ) : (
                        'QUEUED'
                      )}
                    </span>
                  </div>

                  <div className="flex items-center gap-2.5 my-2">
                    <div
                      className={`p-2 rounded-lg border ${
                        completed
                          ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                          : active
                          ? 'bg-cyan-500/20 border-cyan-500/40 text-cyan-300'
                          : 'bg-slate-800/80 border-slate-700 text-slate-400'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold font-mono text-white leading-tight">
                        {node.label}
                      </h4>
                      <span className="text-[10px] font-mono text-cyan-400/80">{node.category}</span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-400 mt-2 leading-relaxed">{node.desc}</p>
                </div>

                {idx < primaryNodes.length - 1 && (
                  <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 z-10">
                    <div className="w-6 h-6 rounded-full bg-navy-950 border border-slate-700 flex items-center justify-center text-slate-400">
                      <ArrowRight className="w-3 h-3 text-cyan-400" />
                    </div>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>

      <div className="pt-6 border-t border-slate-800 space-y-3">
        <div className="flex items-center justify-between text-xs font-mono text-emerald-400 font-bold uppercase tracking-wider">
          <div className="flex items-center gap-2">
            <Cpu className="w-4 h-4" />
            <span>Parallel Branch: Edge Device Telemetry</span>
          </div>
          <span className="text-slate-500 font-normal">I2C / Hardware Bus Sync</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {edgeNodes.map((node, idx) => {
            const edgeStepNum = 7 + idx;
            const completed = isNodeComplete(edgeStepNum);
            const active = isNodeActive(edgeStepNum);
            const Icon = node.icon;

            return (
              <motion.div
                key={node.id}
                animate={{
                  scale: active ? 1.03 : 1,
                  borderColor: active
                    ? 'rgba(6, 182, 212, 0.9)'
                    : completed
                    ? 'rgba(16, 185, 129, 0.5)'
                    : 'rgba(51, 65, 85, 0.6)',
                }}
                className={`p-4 rounded-xl border relative transition-all bg-navy-900/60 flex flex-col justify-between ${
                  active
                    ? 'shadow-[0_0_20px_rgba(6,182,212,0.35)] bg-cyan-950/40'
                    : completed
                    ? 'shadow-[0_0_10px_rgba(16,185,129,0.15)] bg-navy-950/80'
                    : ''
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono text-slate-400">Edge Node 0{idx + 1}</span>
                    <span
                      className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full ${
                        completed
                          ? 'bg-emerald-950 text-emerald-300 border border-emerald-700/60 flex items-center gap-1'
                          : active
                          ? 'bg-cyan-950 text-cyan-300 border border-cyan-500 animate-pulse'
                          : 'bg-slate-900 text-slate-500 border border-slate-800'
                      }`}
                    >
                      {completed ? (
                        <>
                          <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                          <span>✓ COMPLETE</span>
                        </>
                      ) : active ? (
                        'RUNNING'
                      ) : (
                        'STANDBY'
                      )}
                    </span>
                  </div>

                  <div className="flex items-center gap-2.5 my-2">
                    <div
                      className={`p-2 rounded-lg border ${
                        completed
                          ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                          : active
                          ? 'bg-cyan-500/20 border-cyan-500/40 text-cyan-300'
                          : 'bg-slate-800/80 border-slate-700 text-slate-400'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold font-mono text-white leading-tight">
                        {node.label}
                      </h4>
                      <span className="text-[10px] font-mono text-emerald-400/80">{node.category}</span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-400 mt-2 leading-relaxed">{node.desc}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
