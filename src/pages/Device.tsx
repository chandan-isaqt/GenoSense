import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Play,
  RotateCcw,
  Cpu,
  Monitor,
  Wifi,
  Activity,
  CheckCircle2,
  Loader2,
  ArrowRight,
} from 'lucide-react';
import { useGenoSenseDemo } from '../hooks/useGenoSenseDemo';
import { GenoSense3DDevice } from '../components/device/GenoSense3DDevice';
import { WebDeviceSyncPanel } from '../components/device/WebDeviceSyncPanel';
import { getOledScreenContent } from '../services/deviceService';
import { OledDisplayStep } from '../types/genomics';

export const Device: React.FC = () => {
  const {
    oledStep,
    analysisResult,
    isAnalyzing,
    triggerDeviceAnalyze,
    resetDemo,
  } = useGenoSenseDemo();
  const navigate = useNavigate();

  const oledContent = getOledScreenContent(oledStep, analysisResult);

  const oledSequence: { step: OledDisplayStep; label: string }[] = [
    { step: 'READY', label: 'GENOSENSE READY' },
    { step: 'ANALYZING...', label: 'ANALYZING...' },
    { step: 'READING SAMPLE...', label: 'READING SAMPLE...' },
    { step: 'MATCHING MARKERS...', label: 'MATCHING MARKERS...' },
    { step: 'CALCULATING...', label: 'CALCULATING...' },
    { step: 'RESULT READY', label: 'RESULT READY' },
    {
      step: 'FINAL_SCORE',
      label: analysisResult
        ? `GENOSENSE ${analysisResult.primaryScore}% ${analysisResult.primaryCategory}`
        : 'GENOSENSE 72% HIGHER MATCH',
    },
  ];

  const currentIdx = oledSequence.findIndex((s) => s.step === oledStep);

  const hardwareReferences = [
    {
      role: 'INTERNAL COMPONENT',
      title: 'Raspberry Pi 4 Model B',
      desc: 'Planned internal edge-side computer inside the enclosure.',
      img: '/assets/hardware/raspberry-pi.jpg',
    },
    {
      role: 'FRONT DISPLAY MODULE',
      title: '128×64 Monochrome I2C OLED',
      desc: 'Displays status transitions and the final prototype score.',
      img: '/assets/hardware/oled.jpg',
    },
    {
      role: 'HARDWARE INTERRUPT',
      title: 'Tactile GPIO Analyze Button',
      desc: 'Physical push switch initiating the variant matching workflow.',
      img: '/assets/hardware/button.jpg',
    },
  ];

  return (
    <div className="space-y-12 pb-12 text-left max-w-6xl mx-auto">
      {/* Page Title & Action Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[var(--border-color)] pb-6">
        <div className="space-y-2">
          <span className="text-xs font-mono uppercase tracking-widest text-[var(--primary)] font-semibold block">
            CONNECTED EDGE INSTRUMENT CONCEPT
          </span>
          <h1 className="text-3xl sm:text-4xl font-display font-bold text-[var(--text-main)]">
            GenoSense Edge Device
          </h1>
          <p className="text-sm text-[var(--text-secondary)] max-w-2xl">
            Interact with the 3D prototype enclosure, inspect internal hardware hotspots, or press Analyze to watch the OLED screen and web state update together.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={triggerDeviceAnalyze}
            disabled={isAnalyzing}
            className="btn-primary-product text-xs py-3 px-6 flex items-center gap-2 cursor-pointer disabled:opacity-50 shadow-lg"
          >
            {isAnalyzing ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>ANALYZING...</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-current" />
                <span>PRESS ANALYZE</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={resetDemo}
            className="btn-secondary-product text-xs py-3 px-4 flex items-center gap-1.5 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>RESET DEMO</span>
          </button>
        </div>
      </div>

      {/* Section 21: 5 Hardware Telemetry Status Indicators */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 font-mono text-xs">
        <div className="product-card p-4 space-y-1">
          <span className="text-[10px] text-[var(--text-secondary)] block">DEVICE</span>
          <span className="font-bold text-[var(--primary)] flex items-center gap-1.5">
            <Cpu className="w-3.5 h-3.5" />
            READY
          </span>
        </div>

        <div className="product-card p-4 space-y-1">
          <span className="text-[10px] text-[var(--text-secondary)] block">OLED</span>
          <span className="font-bold text-[var(--primary)] flex items-center gap-1.5">
            <Monitor className="w-3.5 h-3.5" />
            {oledStep === 'FINAL_SCORE' ? 'SCORE DISPLAYED' : oledStep}
          </span>
        </div>

        <div className="product-card p-4 space-y-1">
          <span className="text-[10px] text-[var(--text-secondary)] block">API</span>
          <span className="font-bold text-[var(--text-main)]">SIMULATED</span>
        </div>

        <div className="product-card p-4 space-y-1">
          <span className="text-[10px] text-[var(--text-secondary)] block">NETWORK</span>
          <span className="font-bold text-[var(--primary)] flex items-center gap-1.5">
            <Wifi className="w-3.5 h-3.5" />
            CONNECTED
          </span>
        </div>

        <div className="product-card p-4 space-y-1 col-span-2 sm:col-span-1">
          <span className="text-[10px] text-[var(--text-secondary)] block">ANALYSIS</span>
          <span className="font-bold text-[var(--text-main)] flex items-center gap-1.5">
            <Activity className="w-3.5 h-3.5 text-[var(--primary)]" />
            {isAnalyzing ? 'RUNNING' : analysisResult ? 'COMPLETE' : 'WAITING'}
          </span>
        </div>
      </div>

      {/* Main Split: Large 3D Device (Left) + OLED Sequence Flow (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-7">
          <GenoSense3DDevice />
        </div>

        <div className="lg:col-span-5 space-y-6">
          {/* Physical OLED Close-Up */}
          <div className="p-6 rounded-2xl bg-[#06111D] border border-[#1B3852] space-y-4 shadow-xl">
            <div className="flex items-center justify-between text-xs font-mono text-[#8EA2B3] border-b border-[#162C42] pb-2.5">
              <span className="font-bold text-[#F5FAFC]">OLED DISPLAY SIMULATION</span>
              <span className="text-[#43E6D1]">128×64 PIXELS</span>
            </div>

            <div className="oled-hardware-screen p-6 h-36 rounded-xl border border-[#162C42] flex flex-col justify-between text-center font-mono">
              <div className="text-[10px] text-[#43E6D1]/80 tracking-widest">
                {oledContent.line1}
              </div>
              <div className="text-3xl font-display font-bold text-[#F5FAFC]">
                {oledContent.line2}
              </div>
              <div className="text-xs font-bold text-[#43E6D1] tracking-wider">
                {oledContent.line3}
              </div>
            </div>

            {analysisResult && (
              <button
                type="button"
                onClick={() => navigate('/results')}
                className="w-full py-2.5 px-4 rounded-lg bg-[#102434] hover:bg-[#162F44] text-[#43E6D1] border border-[#1B3852] text-xs font-mono font-bold flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>OPEN FULL WEB RESULT</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Section 22: Device Analysis Flow */}
          <div className="product-card p-6 space-y-4">
            <h2 className="text-base font-display font-bold text-[var(--text-main)]">
              OLED State Progression
            </h2>
            <div className="space-y-2 font-mono text-xs">
              {oledSequence.map((item, idx) => {
                const isCurrent = idx === currentIdx;
                const isDone = idx < currentIdx || (oledStep === 'FINAL_SCORE' && idx === oledSequence.length - 1);
                return (
                  <div
                    key={item.step}
                    className={`p-2.5 rounded-lg border flex items-center justify-between ${
                      isCurrent
                        ? 'bg-[var(--bg-surface)] border-[var(--primary)] text-[var(--primary)] font-bold'
                        : isDone
                          ? 'bg-[var(--bg-secondary)] border-[var(--border-color)] text-[var(--text-main)]'
                          : 'bg-[var(--bg-secondary)]/40 border-[var(--border-color)]/50 text-[var(--text-secondary)] opacity-60'
                    }`}
                  >
                    <span>{item.label}</span>
                    {isDone && <CheckCircle2 className="w-3.5 h-3.5 text-[var(--primary)]" />}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Section 23: Synchronized Web + OLED Panel */}
      <WebDeviceSyncPanel />

      {/* Section 32: Real Hardware Component References */}
      <section className="space-y-4 pt-4 border-t border-[var(--border-color)]">
        <div className="space-y-1">
          <span className="text-xs font-mono uppercase tracking-widest text-[var(--primary)] font-semibold block">
            HARDWARE COMPONENT REFERENCE
          </span>
          <h2 className="text-2xl font-display font-bold text-[var(--text-main)]">
            Inside the GenoSense Prototype Concept
          </h2>
          <p className="text-xs text-[var(--text-secondary)]">
            The Raspberry Pi is an internal component mounted inside the custom GenoSense enclosure alongside the OLED module and tactile switch.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {hardwareReferences.map((hw) => (
            <div key={hw.title} className="product-card overflow-hidden flex flex-col">
              <div className="h-44 bg-[#06111D] border-b border-[var(--border-color)] overflow-hidden">
                <img
                  src={hw.img}
                  alt={hw.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="p-5 space-y-1.5">
                <span className="text-[10px] font-mono uppercase text-[var(--primary)] font-bold">
                  {hw.role}
                </span>
                <h3 className="text-base font-display font-bold text-[var(--text-main)]">
                  {hw.title}
                </h3>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                  {hw.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Device;
