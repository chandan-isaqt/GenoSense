import React, { useState, useRef } from 'react';
import { UploadCloud, Sparkles, AlertCircle, FileCode, Check } from 'lucide-react';
import { useGenoSenseDemo } from '../../hooks/useGenoSenseDemo';

export const VcfLaboratoryWorkspace: React.FC = () => {
  const {
    sampleLoaded,
    sampleId,
    totalMarkers,
    totalVariants,
    totalFeatures,
    loadDemoSample,
    loadCustomVcf,
    extractMarkers,
    markersExtracted,
    extractionProgress,
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
      setErrorMessage('FORMAT ERROR: Only standard genomic .vcf files accepted.');
      return;
    }

    const success = await loadCustomVcf(file.name);
    if (!success) {
      setErrorMessage('PARSER ERROR: Reference header GRCh38 check failed.');
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrorMessage(null);
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.name.toLowerCase().endsWith('.vcf')) {
      setErrorMessage('FORMAT ERROR: Only standard genomic .vcf files accepted.');
      return;
    }

    await loadCustomVcf(file.name);
  };

  const handleTriggerDemoAndExtract = async () => {
    loadDemoSample();
    await extractMarkers();
  };

  return (
    <div className="space-y-6">
      {/* Workspace Header */}
      <div className="border-b border-[#182532] pb-4">
        <span className="text-[11px] font-mono text-[#35D6C7] uppercase tracking-widest block">
          SECTION 02 — GENOMIC ANALYSIS
        </span>
        <h2 className="text-2xl sm:text-3xl font-display font-bold text-[#F4F7FA] mt-1">
          GENOMIC ANALYSIS
        </h2>
        <p className="text-xs sm:text-sm font-mono text-[#8B9AAA] mt-1">
          “Selected genomic markers → numerical features”
        </p>
      </div>

      {/* Main Two-Column Laboratory Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Left: VCF Upload Panel */}
        <div className="lg:col-span-7 lab-card p-6 flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between text-xs font-mono border-b border-[#182532] pb-3 text-[#8B9AAA]">
            <span className="uppercase tracking-wider flex items-center gap-2">
              <FileCode className="w-4 h-4 text-[#35D6C7]" />
              VARIANT CALL FORMAT INGESTION
            </span>
            <span className="text-[10px] text-[#35D6C7]">REF: GRCh38.p13</span>
          </div>

          {/* Large Drop Zone */}
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`cursor-pointer border border-dashed rounded-[3px] p-8 text-center transition-all flex flex-col items-center justify-center ${
              isDragOver
                ? 'border-[#35D6C7] bg-[#0B111A]'
                : 'border-[#182532] bg-[#05080D]/60 hover:border-[#35D6C7]/50'
            }`}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept=".vcf"
              className="hidden"
              onChange={handleFileChange}
            />

            <UploadCloud className="w-8 h-8 text-[#35D6C7] mb-2" />
            <h3 className="font-display font-bold text-base text-[#F4F7FA] tracking-wide">
              DROP VCF FILE
            </h3>
            <p className="text-xs font-mono text-[#8B9AAA] mt-1">
              or click to browse local filesystem (.vcf)
            </p>
          </div>

          {errorMessage && (
            <div className="p-2.5 rounded-[2px] bg-[#05080D] border border-[#FF6678]/40 text-[#FF6678] text-xs font-mono flex items-center gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Bottom Action: Use Demo Sample */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
            <span className="text-xs font-mono text-[#8B9AAA]">
              Or load deterministic synthetic research specimen:
            </span>
            <button
              onClick={handleTriggerDemoAndExtract}
              className="btn-lab-primary text-xs w-full sm:w-auto flex items-center justify-center gap-2"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>USE DEMO SAMPLE</span>
            </button>
          </div>
        </div>

        {/* Right: LIVE SAMPLE INSPECTOR */}
        <div className="lg:col-span-5 lab-card p-6 flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between text-xs font-mono border-b border-[#182532] pb-3 text-[#8B9AAA]">
            <span className="uppercase tracking-wider">LIVE SAMPLE INSPECTOR</span>
            <span className="text-[#35D6C7] flex items-center gap-1 font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-[#35D6C7] animate-pulse" />
              ACTIVE SENSOR
            </span>
          </div>

          {/* Technical Metadata Matrix */}
          <div className="grid grid-cols-2 gap-3 font-mono">
            <div className="p-3 bg-[#05080D] border border-[#182532] rounded-[2px]">
              <span className="text-[10px] text-[#8B9AAA] uppercase tracking-wider block">Sample</span>
              <span className="text-sm font-bold text-[#F4F7FA] mt-0.5 block">
                {sampleLoaded ? sampleId : 'GS-DEMO-001'}
              </span>
            </div>

            <div className="p-3 bg-[#05080D] border border-[#182532] rounded-[2px]">
              <span className="text-[10px] text-[#8B9AAA] uppercase tracking-wider block">Markers</span>
              <span className="text-sm font-bold text-[#35D6C7] mt-0.5 block">
                {sampleLoaded ? totalMarkers || 24 : 24}
              </span>
            </div>

            <div className="p-3 bg-[#05080D] border border-[#182532] rounded-[2px]">
              <span className="text-[10px] text-[#8B9AAA] uppercase tracking-wider block">Variants</span>
              <span className="text-sm font-bold text-[#4DA3FF] mt-0.5 block">
                {sampleLoaded ? totalVariants || 18 : 18}
              </span>
            </div>

            <div className="p-3 bg-[#05080D] border border-[#182532] rounded-[2px]">
              <span className="text-[10px] text-[#8B9AAA] uppercase tracking-wider block">Features</span>
              <span className="text-sm font-bold text-[#F4F7FA] mt-0.5 block">
                {sampleLoaded ? totalFeatures || 24 : 24}
              </span>
            </div>
          </div>

          {/* Status Indicator */}
          <div className="p-3 bg-[#05080D] border border-[#182532] rounded-[2px] flex items-center justify-between text-xs font-mono">
            <span className="text-[#8B9AAA]">PIPELINE STATUS:</span>
            <span className="text-[#35D6C7] font-bold">
              {markersExtracted ? 'READY (ENCODED)' : 'READY'}
            </span>
          </div>

          <div className="text-[10px] font-mono text-[#8B9AAA]/70 text-right">
            CHIP: SYNTH-GENOMICS-REV4 • I2C BUS CHECK: PASS
          </div>
        </div>
      </div>

      {/* VCF Processing Console Animation */}
      <div className="lab-card p-5 space-y-4 font-mono">
        <div className="flex items-center justify-between text-xs border-b border-[#182532] pb-2 text-[#8B9AAA]">
          <span className="uppercase text-[#35D6C7]">REAL-TIME GENOMIC PIPELINE TELEMETRY</span>
          <span>{extractionProgress}% COMPLETE</span>
        </div>

        {/* Console step blocks */}
        <div className="space-y-2 text-xs">
          <div className="flex items-center justify-between">
            <span className="text-[#8B9AAA]">READING VCF</span>
            <span className="text-[#35D6C7]">
              {extractionProgress >= 25 ? '██████████ [DONE]' : extractionProgress > 0 ? '█████░░░░░' : '░░░░░░░░░░'}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-[#8B9AAA]">LOCATING MARKERS</span>
            <span className="text-[#35D6C7]">
              {extractionProgress >= 50 ? '██████████ [DONE]' : extractionProgress > 25 ? '█████░░░░░' : '░░░░░░░░░░'}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-[#8B9AAA]">ENCODING GENOTYPES</span>
            <span className="text-[#35D6C7]">
              {extractionProgress >= 75 ? '██████████ [DONE]' : extractionProgress > 50 ? '█████░░░░░' : '░░░░░░░░░░'}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-[#8B9AAA]">BUILDING FEATURE VECTOR</span>
            <span className="text-[#35D6C7]">
              {extractionProgress >= 100 ? '██████████ [DONE]' : extractionProgress > 75 ? '█████░░░░░' : '░░░░░░░░░░'}
            </span>
          </div>
        </div>

        {/* Feature Vector Ready Banner */}
        {markersExtracted && (
          <div className="pt-2 border-t border-[#182532] flex items-center justify-between text-xs text-[#35D6C7] font-bold">
            <span className="flex items-center gap-1.5">
              <Check className="w-4 h-4" />
              <span>✓ FEATURE VECTOR READY (24 NUMERICAL FLOATS EXTRACTED)</span>
            </span>
            <span className="text-[10px] text-[#8B9AAA] font-normal">LATENCY: 48ms</span>
          </div>
        )}
      </div>
    </div>
  );
};
