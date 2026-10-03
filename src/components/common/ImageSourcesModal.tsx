import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShieldCheck, Image as ImageIcon } from 'lucide-react';

interface ImageSourceItem {
  asset: string;
  category: string;
  component: string;
  source: string;
  originalUrl: string;
  author: string;
  license: string;
  notes: string;
}

export const ImageSourcesModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const sources: ImageSourceItem[] = [
    {
      asset: 'public/assets/hardware/raspberry-pi.jpg',
      category: 'Hardware',
      component: 'Raspberry Pi 4 Model B Single-Board Computer',
      source: 'Wikimedia Commons',
      originalUrl: 'https://commons.wikimedia.org/wiki/File:Raspberry_Pi_4_Model_B_-_Side.jpg',
      author: 'Michael Henzler',
      license: 'Creative Commons Attribution-ShareAlike 4.0 International (CC BY-SA 4.0)',
      notes: 'Used exclusively as a reference for the internal computing core and hardware component breakdown. Distinguished from the custom GenoSense enclosure.',
    },
    {
      asset: 'public/assets/hardware/oled.jpg',
      category: 'Hardware',
      component: '0.96" Monochrome I2C OLED Display Module (SSD1306)',
      source: 'Wikimedia Commons',
      originalUrl: 'https://commons.wikimedia.org/wiki/File:MicroSD_card_connected_to_Arduino_nano_with_OLED_display.jpg',
      author: 'Turbospok',
      license: 'Creative Commons Attribution-ShareAlike 4.0 International (CC BY-SA 4.0)',
      notes: 'Physical reference for the 128x64 pixel monochrome screen mounted in the front bezel.',
    },
    {
      asset: 'public/assets/hardware/button.jpg',
      category: 'Hardware',
      component: 'Tactile Momentary Push Button Switch',
      source: 'Wikimedia Commons',
      originalUrl: 'https://commons.wikimedia.org/wiki/File:Tactile_switches.jpg',
      author: 'Wikimedia Commons contributor',
      license: 'Creative Commons Attribution-ShareAlike 3.0 Unported (CC BY-SA 3.0)',
      notes: 'Component reference for the physical GPIO hardware trigger on the enclosure.',
    },
    {
      asset: 'public/assets/hardware/device-reference.jpg',
      category: 'Hardware Concept',
      component: 'GenoSense Prototype Device Enclosure Concept',
      source: 'GenoSense Industrial Design Laboratory',
      originalUrl: 'Internal Prototype Concept',
      author: 'GenoSense Project Team',
      license: 'Project Educational & Demonstration License',
      notes: 'Custom matte dark enclosure concept showcasing how the Raspberry Pi 4, I2C OLED, and tactile GPIO button assemble into a compact edge instrument.',
    },
    {
      asset: 'public/assets/biology/dna.jpg',
      category: 'Biology',
      component: 'DNA Double Helix Molecular Context',
      source: 'Unsplash',
      originalUrl: 'https://unsplash.com/photos/94d3c16cda28',
      author: 'Warren Umoh',
      license: 'Unsplash Free Commercial License',
      notes: 'Subtle supporting context for DNA genomic sequence processing.',
    },
    {
      asset: 'public/assets/biology/laboratory.jpg',
      category: 'Biology',
      component: 'Modern Biotechnology Laboratory Environment',
      source: 'Unsplash',
      originalUrl: 'https://unsplash.com/photos/01588f351e67',
      author: 'National Cancer Institute',
      license: 'Unsplash Free Commercial License',
      notes: 'Used as a low-opacity atmospheric background layer behind product sections.',
    },
    {
      asset: 'public/assets/biology/genomics.jpg',
      category: 'Biology',
      component: 'Genomic Sequencing Instrumentation',
      source: 'Unsplash',
      originalUrl: 'https://unsplash.com/photos/abf9dbad1b69',
      author: 'Louis Reed',
      license: 'Unsplash Free Commercial License',
      notes: 'Supporting context for genomic marker extraction and sequencing workflow.',
    },
  ];

  return (
    <>
      {/* Footer Trigger Link */}
      <button
        onClick={() => setIsOpen(true)}
        className="text-[11px] font-mono text-[var(--text-secondary)] hover:text-[var(--primary)] hover:underline transition-colors cursor-pointer flex items-center gap-1"
      >
        <ImageIcon className="w-3 h-3" />
        <span>Image sources & licenses</span>
      </button>

      {/* Modal Dialog */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-3xl max-h-[85vh] overflow-y-auto product-card p-6 sm:p-8 space-y-6 shadow-2xl text-left bg-[var(--bg-primary)] border border-[var(--border-color)]"
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b border-[var(--border-color)] pb-4">
                <div className="flex items-center gap-2.5">
                  <ShieldCheck className="w-5 h-5 text-[var(--primary)]" />
                  <h3 className="font-display font-bold text-lg text-[var(--text-main)]">
                    Image Sources & Provenance Licenses
                  </h3>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 rounded-md text-[var(--text-secondary)] hover:text-[var(--text-main)] hover:bg-[var(--bg-secondary)] cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Disclaimer */}
              <p className="text-xs text-[var(--text-secondary)] font-sans leading-relaxed">
                All visual photographic resources are curated from open educational repositories under their respective Creative Commons or Unsplash free licenses. No endorsement by the Raspberry Pi Foundation, Adafruit, Unsplash, or Wikimedia is implied.
              </p>

              {/* Sources Table */}
              <div className="space-y-3 font-mono text-xs">
                {sources.map((item) => (
                  <div
                    key={item.component}
                    className="p-4 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-color)] space-y-2"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                      <span className="font-bold text-[var(--text-main)] text-sm font-display">
                        {item.component}
                      </span>
                      <span className="text-[10px] text-[var(--primary)] uppercase font-semibold">
                        {item.category} • {item.source}
                      </span>
                    </div>

                    <div className="text-[11px] text-[var(--text-secondary)] space-y-0.5">
                      <div>
                        <strong>Author / Contributor:</strong> {item.author}
                      </div>
                      <div>
                        <strong>License:</strong> {item.license}
                      </div>
                      <div className="text-[10px] text-[var(--text-muted)] italic pt-1">
                        {item.notes}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Close Button */}
              <div className="pt-2 flex justify-end">
                <button
                  onClick={() => setIsOpen(false)}
                  className="btn-primary-product text-xs py-2 px-5 cursor-pointer"
                >
                  CLOSE
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
