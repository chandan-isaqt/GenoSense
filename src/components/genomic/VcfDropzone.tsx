import React, { useState, useRef } from 'react';
import { UploadCloud, AlertCircle, Database, Sparkles } from 'lucide-react';
import { useGenoSenseDemo } from '../../hooks/useGenoSenseDemo';

export const VcfDropzone: React.FC = () => {
  const {
    sampleLoaded,
    sampleId,
    totalMarkers,
    totalVariants,
    totalFeatures,
    loadDemoSample,
    loadCustomVcf,
  } = useGenoSenseDemo();

  const [isDragOver, setIsDragOver] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    setErrorMessage(null);

    const file = e.dataTransfer.files?.[0];
    if (!file) return;

    if (!file.name.toLowerCase().endsWith('.vcf')) {
      setErrorMessage('Invalid file format. Only standard genomic .vcf files are supported.');
      return;
    }

    const success = await loadCustomVcf(file.name);
    if (!success) {
      setErrorMessage('Failed to parse VCF file. Please check reference header.');
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrorMessage(null);
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.name.toLowerCase().endsWith('.vcf')) {
      setErrorMessage('Invalid file format. Only standard genomic .vcf files are supported.');
      return;
    }

    await loadCustomVcf(file.name);
  };

  return (
    <div className="space-y-4">
      {/* Dropzone container */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`relative cursor-pointer rounded-2xl p-8 border-2 border-dashed transition-all flex flex-col items-center justify-center text-center backdrop-blur-md ${
          isDragOver
            ? 'border-cyan-400 bg-cyan-950/40 shadow-[0_0_25px_rgba(6,182,212,0.3)]'
            : sampleLoaded
            ? 'border-emerald-500/40 bg-navy-950/60 hover:border-emerald-400/60'
            : 'border-slate-800 bg-navy-950/40 hover:border-cyan-500/40 hover:bg-navy-900/40'
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept=".vcf"
          className="hidden"
          onChange={handleFileChange}
        />

        <div className="p-4 rounded-2xl bg-cyan-950/50 border border-cyan-500/30 text-cyan-400 mb-3 shadow-[0_0_15px_rgba(6,182,212,0.15)]">
          <UploadCloud className="w-8 h-8" />
        </div>

        <h3 className="text-base font-bold text-white font-mono">
          Drop your VCF file here
        </h3>
        <p className="text-xs text-slate-400 mt-1 max-w-sm">
          Drag and drop your Variant Call Format (<code className="text-cyan-400 font-mono">.vcf</code>) file or click to browse
        </p>

        <div className="mt-4 flex items-center gap-2">
          <span className="text-[11px] font-mono px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-slate-400">
            Accepted: .vcf
          </span>
          <span className="text-[11px] font-mono px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-slate-400">
            GRCh38 Reference
          </span>
        </div>
      </div>

      {/* Error state if invalid file */}
      {errorMessage && (
        <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2 font-mono">
          <AlertCircle className="w-4 h-4 flex-shrink-0 text-rose-400" />
          <span>{errorMessage}</span>
          <button
            onClick={() => setErrorMessage(null)}
            className="ml-auto text-rose-400 hover:text-rose-200 underline text-[11px]"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Demo sample loader button */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-4 rounded-xl bg-navy-900/60 border border-slate-800">
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <Database className="w-4 h-4 text-cyan-400" />
          <span>No VCF file on hand? Use the pre-computed synthetic dataset.</span>
        </div>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            loadDemoSample();
          }}
          className="w-full sm:w-auto px-4 py-2 rounded-xl text-xs font-mono font-semibold bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/40 transition-all flex items-center justify-center gap-2"
        >
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          <span>Use Demo Sample</span>
        </button>
      </div>

      {/* Sample statistics if sample is loaded */}
      {sampleLoaded && (
        <div className="p-5 rounded-2xl bg-gradient-to-br from-navy-900/90 to-navy-950 border border-cyan-500/30 shadow-lg space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300">
                Active Sample Mounted
              </span>
            </div>
            <span className="text-xs font-mono font-bold text-cyan-400 px-2 py-0.5 rounded bg-cyan-950 border border-cyan-800">
              {sampleId}
            </span>
          </div>

          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="p-3 rounded-xl bg-navy-950/70 border border-slate-800">
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block">
                Markers
              </span>
              <span className="text-xl font-bold font-mono text-white mt-1 block">
                {totalMarkers || 24}
              </span>
            </div>

            <div className="p-3 rounded-xl bg-navy-950/70 border border-slate-800">
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block">
                Variants
              </span>
              <span className="text-xl font-bold font-mono text-emerald-400 mt-1 block">
                {totalVariants || 18}
              </span>
            </div>

            <div className="p-3 rounded-xl bg-navy-950/70 border border-slate-800">
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block">
                Features
              </span>
              <span className="text-xl font-bold font-mono text-cyan-400 mt-1 block">
                {totalFeatures || 24}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
