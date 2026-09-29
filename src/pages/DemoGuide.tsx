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
      desc: 'Click "LIVE DEMO" on the top navigation to trigger all 9 automated stages.',
      action: 'Run Live Demo',
    },
    {
      num: '02',
      title: 'Inspect Genomic Markers',
      desc: 'Navigate to "Genomic Analysis" to evaluate how 18 VCF variants are encoded into 24 numerical dosage features.',
      action: 'View Genomic Analysis',
      link: '/genomic-analysis',
    },
    {
      num: '03',
      title: 'Evaluate Random Forest',
      desc: 'Check "AI Model" for 200-tree bagging ensemble output (73% prototype score, HIGH risk classification).',
      action: 'View AI Model',
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
      desc: 'Head to "Hardware" and press the tactile button to see the SSD1306 monochrome OLED screen update live over I2C.',
      action: 'View Hardware',
      link: '/hardware',
    },
    {
      num: '06',
      title: 'Export Dossier Report',
      desc: 'Click "REPORT" in the top bar to inspect or print the comprehensive research prototype report.',
      action: 'Open Report Dossier',
    },
  ];

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[var(--border-color)] pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-[2px] bg-[var(--bg-surface)] border border-[var(--border-color)] text-[var(--primary)]">
              <BookOpen className="w-4 h-4" />
            </span>
            <h1 className="text-2xl font-display font-bold text-[var(--text-main)] tracking-wide">
              EVALUATOR &amp; DEMO GUIDE
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-[var(--text-secondary)] mt-1 font-mono">
            30-second evaluation path, interactive test harness, and sample VCF data
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={runFullDemo}
            disabled={isRunningFullDemo}
            className="btn-lab-primary text-xs flex items-center gap-1.5"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>RUN LIVE DEMO</span>
          </button>
          <button
            onClick={resetDemo}
            className="p-2 rounded-[2px] text-[var(--text-secondary)] hover:text-[var(--text-main)] bg-[var(--bg-surface)] border border-[var(--border-color)] transition-colors"
            title="Reset Global Demo"
            aria-label="Reset Global Demo"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 30-Second Fast Track Banner */}
      <div className="lab-card p-6 border-l-2 border-l-[var(--primary)] space-y-3">
        <div className="flex items-center gap-2 text-[var(--primary)] font-mono text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-4 h-4" />
          <span>30-SECOND FAST TRACK FOR JUDGES</span>
        </div>
        <p className="text-xs sm:text-sm text-[var(--text-main)] leading-relaxed max-w-4xl">
          GenoSense unites <strong>Bioinformatics</strong> (VCF genomic parsing), <strong>Machine Learning</strong> (Random Forest 200-trees),{' '}
          <strong>Explainable AI</strong> (TreeSHAP feature attributions), and <strong>Edge IoT</strong> (Raspberry Pi 4 driving an I2C SSD1306 OLED display).
          Everything you see on this dashboard is fully interactive, reproducible, and backed by deterministic synthetic genomic datasets.
        </p>
      </div>

      {/* Step-by-Step Evaluator Walkthrough */}
      <div className="space-y-4">
        <h2 className="text-base font-display font-bold text-[var(--text-main)] uppercase tracking-wider">
          Guided Evaluation Walkthrough
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 font-mono text-xs">
          {quickSteps.map((step) => (
            <div
              key={step.num}
              className="lab-card p-5 flex flex-col justify-between space-y-3"
            >
              <div>
                <span className="text-[10px] text-[var(--primary)] font-bold block mb-1">
                  STEP {step.num}
                </span>
                <h3 className="text-sm font-display font-bold text-[var(--text-main)]">{step.title}</h3>
                <p className="text-[11px] text-[var(--text-secondary)] font-sans mt-2 leading-relaxed">{step.desc}</p>
              </div>

              {step.link ? (
                <button
                  onClick={() => navigate(step.link!)}
                  className="inline-flex items-center gap-1.5 text-xs text-[var(--primary)] hover:underline pt-2 font-mono font-semibold"
                >
                  <span>{step.action}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              ) : step.title.includes('Report') ? (
                <button
                  onClick={() => setReportModalOpen(true)}
                  className="inline-flex items-center gap-1.5 text-xs text-[var(--primary)] hover:underline pt-2 font-mono font-semibold"
                >
                  <span>{step.action}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              ) : (
                <button
                  onClick={runFullDemo}
                  className="inline-flex items-center gap-1.5 text-xs text-[var(--primary)] hover:underline pt-2 font-mono font-semibold"
                >
                  <span>{step.action}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Synthetic VCF Sample File Viewer */}
      <div className="lab-card p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[var(--border-color)] pb-3">
          <div className="flex items-center gap-2">
            <FileCode2 className="w-4 h-4 text-[var(--primary)]" />
            <h3 className="text-xs font-mono font-bold text-[var(--text-main)] uppercase tracking-wider">
              Synthetic Reference VCF (sample_GS-DEMO-001.vcf)
            </h3>
          </div>
          <div className="flex items-center gap-2 font-mono text-xs">
            <button
              onClick={handleCopyVcf}
              className="flex items-center gap-1 px-3 py-1.5 rounded-[2px] bg-[var(--bg-surface)] hover:bg-[var(--bg-elevated)] text-[var(--text-secondary)] hover:text-[var(--text-main)] border border-[var(--border-color)] transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-[var(--primary)]" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'COPIED' : 'COPY'}</span>
            </button>
            <button
              onClick={handleDownloadVcf}
              className="flex items-center gap-1 px-3 py-1.5 rounded-[2px] bg-[var(--primary)]/10 hover:bg-[var(--primary)]/20 text-[var(--primary)] border border-[var(--primary)]/40 transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>DOWNLOAD .VCF</span>
            </button>
          </div>
        </div>

        <pre className="p-4 rounded-[2px] bg-[var(--bg-secondary)] border border-[var(--border-color)] text-[11px] font-mono text-[var(--primary)] overflow-x-auto max-h-56 leading-relaxed select-all">
          {DEMO_VCF_SAMPLE_CONTENT}
        </pre>
        <p className="text-[10px] font-mono text-[var(--text-secondary)]">
          Tip: You can download this sample and drag-and-drop it into the Genomic Analysis upload zone to test custom file ingestion.
        </p>
      </div>
    </div>
  );
};
