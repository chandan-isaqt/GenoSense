import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  FastForward,
  Dna,
  Cpu,
  CircleDot,
  TreeDeciduous,
  Sparkles,
  Monitor,
  LayoutDashboard,
  Layers,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const PresentationModePage: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();

  const slides = [
    {
      num: 1,
      title: 'What is GenoSense?',
      subtitle: 'Biotechnology × Machine Learning × Edge Computing',
      content:
        'GenoSense is a research prototype that processes selected genomic markers with a machine-learning pipeline and delivers an explainable model output to both a web interface and a connected edge device.',
      highlights: [
        'Ingests variant genomic data (VCF formatted)',
        'Extracts 24 candidate disease-associated loci',
        'Delivers consensus output simultaneously to web and hardware',
      ],
      icon: Dna,
      image: '/assets/biology/dna.jpg',
    },
    {
      num: 2,
      title: 'The Physical Device',
      subtitle: 'Compact, purpose-built medical-grade edge hardware',
      content:
        'Inside an industrial matte enclosure, GenoSense houses a Quad-core Raspberry Pi 4 single-board computer, a 0.96" monochrome I2C OLED display, and a dedicated tactile button.',
      highlights: [
        'Front-facing 128×64 OLED screen (SSD1306 protocol)',
        'Physical GPIO tactile interrupt button',
        'Dual-band Wi-Fi connection for secure API communication',
      ],
      icon: Cpu,
      image: '/assets/hardware/device-reference.jpg',
    },
    {
      num: 3,
      title: 'Press Analyze: The Workflow',
      subtitle: 'Instantaneous telemetry propagation upon physical press',
      content:
        'A single press of the physical button initiates the sequence: the edge client connects to the API gateway, uploads the sample vector, computes inferences, and returns calibrated results in milliseconds.',
      highlights: [
        'Hardware debounce ensures clean signal capture',
        'State transitions: STANDBY → READING → AI PROCESSING → RESULT READY',
        'Non-blocking asynchronous telemetry dispatch',
      ],
      icon: CircleDot,
      image: '/assets/hardware/button.jpg',
    },
    {
      num: 4,
      title: 'The AI Pipeline',
      subtitle: 'Consensus voting over 200 Random Forest decision trees',
      content:
        'The normalized 24-feature vector enters a 200-tree Random Forest ensemble. Individual trees vote based on candidate genetic markers, aggregating into a calibrated 73% prototype output.',
      highlights: [
        'Resistant to individual locus noise and overfitting',
        'Deterministic synthetic demonstration dataset',
        '238ms mean inference execution latency',
      ],
      icon: TreeDeciduous,
    },
    {
      num: 5,
      title: 'Explainable AI: TreeSHAP',
      subtitle: 'Transparent decomposition of the model output',
      content:
        'GenoSense never provides black-box scores. TreeSHAP mathematically decomposes the 73% risk output into individual positive and negative gene contributions.',
      highlights: [
        'GENE-A (+0.31) & GENE-B (+0.19) increase prototype risk',
        'GENE-D (+0.08) has moderate positive influence',
        'GENE-C (-0.07) acts as a protective genetic factor',
      ],
      icon: Sparkles,
    },
    {
      num: 6,
      title: 'The OLED Edge Screen',
      subtitle: 'Zero-latency benchtop and bedside visual readout',
      content:
        'Laboratory personnel and researchers view the returned score directly on the physical hardware screen without opening a computer or managing browser sessions.',
      highlights: [
        'Monochrome high-contrast display legible under bright lab lights',
        'Displays SCORE: 73% HIGH instantly upon API return',
        'Operates independently via I2C bus at 400 kHz',
      ],
      icon: Monitor,
      image: '/assets/hardware/oled.jpg',
    },
    {
      num: 7,
      title: 'The Synchronized Web Dashboard',
      subtitle: 'Comprehensive analytical interface for in-depth research',
      content:
        'Simultaneously, the web interface updates with identical values, presenting full pathway annotations, SHAP waterfall plots, and printable scientific dossiers.',
      highlights: [
        'One calculation powering both hardware and web interfaces',
        'Real-time SYNCED status verification indicator',
        'Full patient metadata and sample provenance audit trail',
      ],
      icon: LayoutDashboard,
    },
    {
      num: 8,
      title: 'Technical Architecture',
      subtitle: 'End-to-end integration: From VCF file to physical display',
      content:
        'The complete architecture integrates bioinformatic marker extraction, Scikit-Learn inference, TreeSHAP explainability, Flask REST endpoints, and physical I2C driver integration.',
      highlights: [
        'VCF → Marker Extraction → Feature Vector [0, 1, 2]',
        'Random Forest (200 trees) → SHAP Explainer → Flask REST API',
        'React TypeScript Frontend + Raspberry Pi Python Edge Client',
      ],
      icon: Layers,
    },
  ];

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'Space') {
        setCurrentSlide((prev) => Math.min(prev + 1, slides.length - 1));
      } else if (e.key === 'ArrowLeft') {
        setCurrentSlide((prev) => Math.max(prev - 1, 0));
      } else if (e.key === 'Escape') {
        setCurrentSlide(0);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [slides.length]);

  const slide = slides[currentSlide];
  const Icon = slide.icon;

  return (
    <div className="min-h-[calc(100vh-140px)] flex flex-col justify-between py-6 max-w-5xl mx-auto text-left">
      {/* Presentation Top Control Bar */}
      <div className="flex items-center justify-between pb-6 border-b border-[var(--border-color)]">
        <div className="flex items-center gap-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--bg-surface)] border border-[var(--border-color)] text-xs font-mono text-[var(--primary)] uppercase font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--primary)] animate-pulse" />
            <span>PRESENTATION MODE</span>
          </div>
          <span className="text-xs font-mono text-[var(--text-secondary)]">
            SLIDE {slide.num} OF {slides.length}
          </span>
        </div>

        {/* Navigation Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentSlide(0)}
            className="p-2 rounded-lg bg-[var(--bg-secondary)] hover:bg-[var(--bg-surface)] border border-[var(--border-color)] text-xs font-mono text-[var(--text-secondary)] hover:text-[var(--text-main)] transition-colors cursor-pointer"
            title="Restart Presentation (Esc)"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          <button
            onClick={() => setCurrentSlide(slides.length - 1)}
            className="p-2 rounded-lg bg-[var(--bg-secondary)] hover:bg-[var(--bg-surface)] border border-[var(--border-color)] text-xs font-mono text-[var(--text-secondary)] hover:text-[var(--text-main)] transition-colors cursor-pointer"
            title="Skip to End"
          >
            <FastForward className="w-4 h-4" />
          </button>

          <button
            onClick={() => setCurrentSlide((prev) => Math.max(prev - 1, 0))}
            disabled={currentSlide === 0}
            className="btn-secondary-product flex items-center gap-1.5 py-2 px-3 text-xs cursor-pointer disabled:opacity-30"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>BACK</span>
          </button>

          <button
            onClick={() => setCurrentSlide((prev) => Math.min(prev + 1, slides.length - 1))}
            disabled={currentSlide === slides.length - 1}
            className="btn-primary-product flex items-center gap-1.5 py-2 px-4 text-xs cursor-pointer shadow-md disabled:opacity-30"
          >
            <span>NEXT</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Slide Progression Indicator Line */}
      <div className="w-full h-1 bg-[var(--bg-secondary)] rounded-full overflow-hidden my-4 border border-[var(--border-color)]">
        <div
          className="h-full bg-[var(--primary)] transition-all duration-300 rounded-full"
          style={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
        />
      </div>

      {/* Main Slide Content Canvas */}
      <div className="flex-1 flex flex-col justify-center py-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={slide.num}
            initial={{ opacity: 0, x: 25 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -25 }}
            transition={{ duration: 0.3 }}
            className="product-card p-8 sm:p-12 shadow-2xl space-y-8"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Left Column: Slide Description & Highlights */}
              <div className="lg:col-span-7 space-y-6">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs font-mono text-[var(--primary)] uppercase font-semibold">
                    <Icon className="w-4 h-4" />
                    <span>PHASE 0{slide.num} • {slide.subtitle}</span>
                  </div>
                  <h2 className="text-3xl sm:text-5xl font-display font-bold text-[var(--text-main)] tracking-tight">
                    {slide.title}
                  </h2>
                </div>

                <p className="text-base sm:text-lg text-[var(--text-secondary)] font-sans leading-relaxed">
                  {slide.content}
                </p>

                {/* Key Bullet Points */}
                <div className="space-y-3 pt-2 font-mono text-xs">
                  {slide.highlights.map((h, i) => (
                    <div
                      key={i}
                      className="p-3.5 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-color)] flex items-center gap-3 text-[var(--text-main)]"
                    >
                      <ArrowRight className="w-4 h-4 text-[var(--primary)] flex-shrink-0" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column: Visual Feature or Reference Photo */}
              <div className="lg:col-span-5 flex flex-col items-center justify-center">
                {slide.image ? (
                  <div className="w-full h-72 rounded-2xl overflow-hidden bg-[#050C16] border border-[var(--border-color)] relative shadow-lg group">
                    <img
                      src={slide.image}
                      alt={slide.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#06111D] via-transparent to-transparent pointer-events-none" />
                    <div className="absolute bottom-4 left-4 inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#06111D]/80 backdrop-blur-md border border-[var(--border-color)] text-[10px] font-mono text-[var(--primary)]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[var(--primary)] animate-pulse" />
                      <span>REAL VISUAL REFERENCE</span>
                    </div>
                  </div>
                ) : (
                  <div className="w-full h-72 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-color)] flex flex-col items-center justify-center p-8 text-center space-y-4 shadow-inner">
                    <div className="p-5 rounded-2xl bg-[var(--bg-surface)] text-[var(--primary)] border border-[var(--primary)]/30 shadow-md">
                      <Icon className="w-12 h-12" />
                    </div>
                    <div className="space-y-1">
                      <span className="text-xs font-mono text-[var(--text-secondary)] uppercase tracking-wider block">
                        EXPLAINABLE AI CORE
                      </span>
                      <span className="text-xl font-display font-bold text-[var(--text-main)]">
                        {slide.title}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Footer Instructions & Navigation */}
      <div className="flex items-center justify-between pt-4 border-t border-[var(--border-color)] text-xs font-mono text-[var(--text-secondary)]">
        <div className="flex items-center gap-4">
          <span className="hidden sm:inline">Use [←] and [→] keys or Space to navigate</span>
          <span>•</span>
          <button
            onClick={() => navigate('/demo')}
            className="text-[var(--primary)] hover:underline font-semibold cursor-pointer"
          >
            Launch Live Interactive Demo &rarr;
          </button>
        </div>

        <div className="flex items-center gap-2 text-[10px]">
          <ShieldCheck className="w-3.5 h-3.5 text-[var(--primary)]" />
          <span>RESEARCH & EDUCATIONAL PROTOTYPE</span>
        </div>
      </div>
    </div>
  );
};

export default PresentationModePage;
