import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  CircleDot,
  Cpu,
  Server,
  Brain,
  HelpCircle,
  Monitor,
  Play,
} from 'lucide-react';

export const ButtonFlowSection: React.FC = () => {
  const [activeStep, setActiveStep] = useState(1);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const steps = [
    {
      step: 1,
      name: 'PRESS',
      source: 'BUTTON',
      destination: 'RASPBERRY PI',
      desc: 'User presses the physical or digital demo button on GPIO Pin 17.',
      techNote: 'Falling-edge hardware interrupt triggered in < 4ms',
      icon: CircleDot,
    },
    {
      step: 2,
      name: 'CONNECT',
      source: 'RASPBERRY PI',
      destination: 'API GATEWAY',
      desc: 'Device client sends the genomic sample request payload over Wi-Fi to the API.',
      techNote: 'HTTP/1.1 POST /predict with sample ID & token',
      icon: Server,
    },
    {
      step: 3,
      name: 'ANALYZE',
      source: 'API GATEWAY',
      destination: 'AI MODEL',
      desc: 'Random Forest machine learning model evaluates the 24 encoded features.',
      techNote: '200 decision trees evaluate majority voting probability',
      icon: Brain,
    },
    {
      step: 4,
      name: 'EXPLAIN',
      source: 'AI MODEL',
      destination: 'SHAP ATTRIBUTION',
      desc: 'TreeSHAP calculates exact mathematical contributions for every marker.',
      techNote: 'Local log-odds deviation from baseline E[f(x)] = 0.22',
      icon: HelpCircle,
    },
    {
      step: 5,
      name: 'RETURN',
      source: 'SHAP ATTRIBUTION',
      destination: 'RASPBERRY PI',
      desc: 'The calibrated score and explanation payload return to the device.',
      techNote: 'JSON payload response delivered back over REST',
      icon: Cpu,
    },
    {
      step: 6,
      name: 'DISPLAY',
      source: 'RASPBERRY PI',
      destination: 'OLED SCREEN',
      desc: 'The SSD1306 monochrome screen and web dashboard update simultaneously.',
      techNote: 'I2C buffer written at 400kHz clock speed: 73% HIGH',
      icon: Monitor,
    },
  ];

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev >= 6 ? 1 : prev + 1));
    }, 2400);
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  return (
    <section className="space-y-8 py-12 border-t border-[var(--border-color)]">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div className="max-w-2xl space-y-3">
          <span className="text-[11px] font-mono text-[var(--primary)] uppercase tracking-widest block">
            04 • INTERACTION SEQUENCE
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-[var(--text-main)] tracking-tight">
            What happens when you press Analyze?
          </h2>
          <p className="text-base text-[var(--text-secondary)] font-sans leading-relaxed">
            From physical switch to screen buffer in 6 seamless stages.
          </p>
        </div>

        <button
          onClick={() => setIsAutoPlaying(!isAutoPlaying)}
          className="btn-lab-secondary text-xs flex items-center gap-2 self-start sm:self-auto"
        >
          <Play className={`w-3.5 h-3.5 ${isAutoPlaying ? 'text-[var(--primary)]' : ''}`} />
          <span>{isAutoPlaying ? 'PAUSE CYCLE' : 'AUTO CYCLE'}</span>
        </button>
      </div>

      {/* Visual Traveling Data Stream Diagram */}
      {/* BUTTON → RASPBERRY PI → API → AI MODEL → SHAP → RASPBERRY PI → OLED */}
      <div className="lab-card p-6 sm:p-8 space-y-6">
        <div className="text-xs font-mono text-[var(--text-secondary)] uppercase tracking-wider flex items-center justify-between border-b border-[var(--border-color)] pb-3">
          <span>DATA FLOW PIPELINE: BUTTON → RASPBERRY PI → API → AI MODEL → SHAP → RASPBERRY PI → OLED</span>
          <span className="text-[var(--primary)] font-bold">STEP 0{activeStep} / 06</span>
        </div>

        {/* 6 Step Cards with Connecting Line and Active Indicator */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {steps.map((st) => {
            const isActive = activeStep === st.step;
            const isCompleted = activeStep > st.step;
            const Icon = st.icon;

            return (
              <div
                key={st.step}
                onClick={() => {
                  setIsAutoPlaying(false);
                  setActiveStep(st.step);
                }}
                className={`p-4 rounded-[4px] border cursor-pointer transition-all flex flex-col justify-between h-44 text-left select-none ${
                  isActive
                    ? 'bg-[var(--bg-surface)] border-[var(--primary)] shadow-md ring-2 ring-[var(--primary)]/20'
                    : isCompleted
                    ? 'bg-[var(--bg-surface)] border-[var(--border-color)] opacity-90'
                    : 'bg-[var(--bg-secondary)] border-[var(--border-color)] opacity-60 hover:opacity-100'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between text-xs font-mono mb-2">
                    <span className="text-[10px] text-[var(--text-secondary)]">0{st.step}</span>
                    <span
                      className={`w-2 h-2 rounded-full ${
                        isActive
                          ? 'bg-[var(--primary)] animate-ping'
                          : isCompleted
                          ? 'bg-[var(--primary)]'
                          : 'bg-[var(--border-color)]'
                      }`}
                    />
                  </div>

                  <div className="p-2 w-fit rounded bg-[var(--bg-secondary)] text-[var(--primary)] border border-[var(--border-color)] mb-2">
                    <Icon className="w-4 h-4" />
                  </div>

                  <h3 className="font-display font-bold text-sm text-[var(--text-main)]">
                    {st.name}
                  </h3>
                </div>

                <p className="text-[11px] text-[var(--text-secondary)] font-mono leading-tight">
                  {st.source} → {st.destination}
                </p>
              </div>
            );
          })}
        </div>

        {/* Active Stage Callout Box */}
        <motion.div
          key={activeStep}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-5 rounded-[4px] bg-[var(--bg-secondary)] border-l-4 border-l-[var(--primary)] flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-mono text-xs"
        >
          <div className="space-y-1">
            <span className="text-[10px] text-[var(--primary)] uppercase tracking-wider font-bold">
              STAGE 0{activeStep}: {steps[activeStep - 1].name} ({steps[activeStep - 1].source} → {steps[activeStep - 1].destination})
            </span>
            <p className="text-sm font-sans text-[var(--text-main)] font-medium">
              {steps[activeStep - 1].desc}
            </p>
          </div>
          <div className="px-3 py-1.5 rounded bg-[var(--bg-surface)] border border-[var(--border-color)] text-[var(--primary)] flex-shrink-0">
            {steps[activeStep - 1].techNote}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
