import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Play, ArrowRight, Sparkles } from 'lucide-react';
import { useGenoSenseDemo } from '../../hooks/useGenoSenseDemo';
import { DnaAnimation } from '../common/DnaAnimation';

export const HeroSection: React.FC = () => {
  const navigate = useNavigate();
  const { isRunningFullDemo, runFullDemo } = useGenoSenseDemo();

  return (
    <section className="relative min-h-[calc(100vh-140px)] flex flex-col justify-center py-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Left Column: Headlines, Identity & CTA */}
        <div className="lg:col-span-7 space-y-6 text-left">
          {/* Small Top Label */}
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-[2px] bg-[#0B111A] border border-[#182532] text-[#35D6C7] text-xs font-mono uppercase tracking-widest">
            <span className="w-1.5 h-1.5 rounded-full bg-[#35D6C7] animate-ping" />
            <span>GENOMIC AI RESEARCH PROTOTYPE</span>
          </div>

          {/* Title & Large Heading */}
          <div className="space-y-3">
            <span className="text-sm font-mono tracking-widest text-[#8B9AAA] uppercase block">
              GENOSENSE
            </span>
            <h1 className="text-4xl sm:text-6xl font-bold font-display tracking-tight text-[#F4F7FA] leading-[1.08]">
              Decode the Genome.<br />
              <span className="text-[#35D6C7]">Understand the Risk.</span>
            </h1>
          </div>

          {/* Subheading */}
          <p className="text-base sm:text-lg text-[#8B9AAA] font-sans leading-relaxed max-w-2xl">
            An interactive proof-of-concept combining genomic marker extraction, machine learning,
            explainable AI, and low-cost edge hardware.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={runFullDemo}
              disabled={isRunningFullDemo}
              className="btn-lab-primary flex items-center gap-2 text-sm disabled:opacity-50"
            >
              {isRunningFullDemo ? (
                <>
                  <Sparkles className="w-4 h-4 animate-spin" />
                  <span>EXECUTING DEMO...</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-current" />
                  <span>RUN LIVE DEMO</span>
                </>
              )}
            </button>

            <button
              onClick={() => {
                const el = document.getElementById('pipeline-section');
                if (el) {
                  el.scrollIntoView({ behavior: 'smooth' });
                } else {
                  navigate('/architecture');
                }
              }}
              className="btn-lab-secondary flex items-center gap-2 text-sm"
            >
              <span>EXPLORE PIPELINE</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Status Readouts Below Buttons */}
          <div className="flex flex-wrap items-center gap-5 pt-3 text-xs font-mono text-[#8B9AAA]">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#35D6C7]" />
              <span className="text-[#F4F7FA]">AI MODEL READY</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#35D6C7]" />
              <span className="text-[#F4F7FA]">API ONLINE</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#35D6C7]" />
              <span className="text-[#F4F7FA]">EDGE DEVICE CONNECTED</span>
            </div>
          </div>
        </div>

        {/* Right Column: High-Tech DNA Visualization */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center relative">
          <div className="w-full relative lab-card p-4 flex flex-col items-center">
            {/* Corner crosshairs like scientific instrumentation */}
            <div className="absolute top-2 left-2 w-2 h-2 border-t border-l border-[#35D6C7]/60" />
            <div className="absolute top-2 right-2 w-2 h-2 border-t border-r border-[#35D6C7]/60" />
            <div className="absolute bottom-2 left-2 w-2 h-2 border-b border-l border-[#35D6C7]/60" />
            <div className="absolute bottom-2 right-2 w-2 h-2 border-b border-r border-[#35D6C7]/60" />

            <DnaAnimation width={380} height={460} />
          </div>
        </div>
      </div>
    </section>
  );
};
