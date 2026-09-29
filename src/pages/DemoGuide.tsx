import React, { useState } from 'react';
import {
  BookOpen,
  Sparkles,
  ArrowRight,
  Play,
  RotateCcw,
  FileCode2,
  Copy,
  Check,
  Download,
} from 'lucide-react';
import { useGenoSenseDemo } from '../hooks/useGenoSenseDemo';
import { DEMO_VCF_SAMPLE_CONTENT } from '../data/demoData';
import { useNavigate } from 'react-router-dom';

export const DemoGuide: React.FC = () => {
  const navigate = useNavigate();
  const { runFullDemo, resetDemo, isRunningFullDemo, setReportModalOpen } = useGenoSenseDemo();
  const [copied, setCopied] = useState(false);

  const handleCopyVcf = () => {
    navigator.clipboard.writeText(DEMO_VCF_SAMPLE_CONTENT);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadVcf = () => {
    const blob = new Blob([DEMO_VCF_SAMPLE_CONTENT], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'sample_GS-DEMO-001.vcf';
    a.click();
    URL.revokeObjectURL(url);
  };

  const quickSteps = [
    {
      num: '01',
      title: 'Run 1-Click Pipeline',
      desc: 'Click "Run Full GenoSense Demo" on the Overview page or Header to automate all 9 execution steps.',
      action: 'Click Run Full Demo',
    },
    {
      num: '02',
      title: 'Inspect Genomic Markers',
      desc: 'Navigate to "Genomic Analysis" to view how 18 VCF variants are encoded into 24 numerical features.',
      action: 'View Genomic Analysis',
      link: '/genomic-analysis',
    },
    {
      num: '03',
      title: 'Evaluate Random Forest',
      desc: 'Check "AI Prediction" for the 200-tree ensemble output (73% prototype score, HIGH risk classification).',
      action: 'View AI Prediction',
      link: '/ai-prediction',
    },
    {
      num: '04',
      title: 'Explore Explainable AI (SHAP)',
      desc: 'Open "Explainability" to interact with the SHAP bar chart and click GENE-A, GENE-B, or GENE-D for attribution details.',
      action: 'View Explainability',
      link: '/explainability',
    },
    {
      num: '05',
      title: 'Test Raspberry Pi Edge OLED',
      desc: 'Head to "Hardware" and press the tactile 3D red button to see the OLED screen update live over I2C.',
      action: 'View Hardware',
      link: '/hardware',
    },
    {
      num: '06',
      title: 'Export Dossier Report',
      desc: 'Click "View Report" in the top bar to inspect or print the comprehensive research prototype report.',
      action: 'Open Report Modal',
    },
  ];

  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-cyan-500/10 text-cyan-400">
              <BookOpen className="w-5 h-5" />
            </span>
            <h1 className="text-2xl font-bold font-mono text-white tracking-wide">
              EVALUATOR &amp; DEMO GUIDE
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 font-mono">
            30-second evaluation path, interactive test harness, and sample VCF data
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={runFullDemo}
            disabled={isRunningFullDemo}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-mono font-semibold bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white shadow-[0_0_15px_rgba(6,182,212,0.3)] transition-all"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>Run Full Demo</span>
          </button>
          <button
            onClick={resetDemo}
            className="p-2 rounded-xl text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 transition-colors"
            title="Reset Global Demo"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="p-6 rounded-2xl bg-gradient-to-r from-cyan-950/60 via-navy-900 to-blue-950/40 border border-cyan-500/30 space-y-4">
        <div className="flex items-center gap-2 text-cyan-300 font-mono text-sm font-bold">
          <Sparkles className="w-5 h-5 text-cyan-400" />
          <span>30-SECOND FAST TRACK FOR JUDGES</span>
        </div>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-3xl">
          GenoSense unites <strong>Bioinformatics</strong> (VCF genomic parsing), <strong>Machine Learning</strong> (Random Forest 200-trees),{' '}
          <strong>Explainable AI</strong> (TreeSHAP feature attributions), and <strong>Edge IoT</strong> (Raspberry Pi 4 driving an I2C SSD1306 OLED display).
          Everything you see on this dashboard is fully interactive and backed by deterministic synthetic genomic datasets.
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="text-base font-bold font-mono text-white uppercase tracking-wider">
          Guided Evaluation Walkthrough
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {quickSteps.map((step) => (
            <div
              key={step.num}
              className="p-5 rounded-2xl bg-navy-950/80 border border-slate-800 glass-panel flex flex-col justify-between space-y-3"
            >
              <div>
                <span className="text-xs font-mono font-bold text-cyan-400 block mb-1">
                  Step {step.num}
                </span>
                <h3 className="text-sm font-bold font-mono text-white">{step.title}</h3>
                <p className="text-xs text-slate-400 mt-2 leading-relaxed">{step.desc}</p>
              </div>

              {step.link ? (
                <button
                  onClick={() => navigate(step.link!)}
                  className="inline-flex items-center gap-1.5 text-xs font-mono text-cyan-400 hover:text-cyan-300 pt-2"
                >
                  <span>{step.action}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              ) : step.title.includes('Report') ? (
                <button
                  onClick={() => setReportModalOpen(true)}
                  className="inline-flex items-center gap-1.5 text-xs font-mono text-cyan-400 hover:text-cyan-300 pt-2"
                >
                  <span>{step.action}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              ) : (
                <button
                  onClick={runFullDemo}
                  className="inline-flex items-center gap-1.5 text-xs font-mono text-cyan-400 hover:text-cyan-300 pt-2"
                >
                  <span>{step.action}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="p-6 rounded-2xl bg-navy-950/80 border border-slate-800 space-y-4 glass-panel">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <FileCode2 className="w-4 h-4 text-cyan-400" />
            <h3 className="text-sm font-bold font-mono text-white">
              Synthetic Reference VCF File (sample_GS-DEMO-001.vcf)
            </h3>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyVcf}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-mono bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied!' : 'Copy VCF'}</span>
            </button>
            <button
              onClick={handleDownloadVcf}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-mono bg-cyan-600/20 hover:bg-cyan-600/30 text-cyan-300 border border-cyan-500/30 transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download .vcf</span>
            </button>
          </div>
        </div>

        <pre className="p-4 rounded-xl bg-black/60 border border-slate-800 text-[11px] font-mono text-cyan-400/90 overflow-x-auto max-h-56 leading-relaxed select-all">
          {DEMO_VCF_SAMPLE_CONTENT}
        </pre>
        <p className="text-[11px] font-mono text-slate-500">
          Tip: You can download this sample and drag-and-drop it into the Genomic Analysis upload zone to test custom file ingestion.
        </p>
      </div>
    </div>
  );
};
