import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, FileText, Download, AlertTriangle, Cpu, Activity, Share2 } from 'lucide-react';
import { useGenoSenseDemo } from '../../hooks/useGenoSenseDemo';

export const ReportModal: React.FC = () => {
  const {
    isReportModalOpen,
    setReportModalOpen,
    sampleId,
    sampleLoaded,
    totalMarkers,
    totalFeatures,
    randomForestTrees,
    riskScore,
    riskLevel,
    processingTimeMs,
    predictionReady,
    topFeatures,
    shapAttributions,
    oledStatus,
    hardwareConnected,
  } = useGenoSenseDemo();

  if (!isReportModalOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleExportJson = () => {
    const reportData = {
      project: 'GenoSense',
      tagline: 'From Genomic Data to Explainable AI',
      generatedAt: new Date().toISOString(),
      disclaimer: 'Research Prototype — Not for Clinical Use.',
      sample: {
        id: sampleLoaded ? sampleId : 'GS-DEMO-001',
        markersCount: totalMarkers || 24,
        featuresCount: totalFeatures || 24,
      },
      model: {
        name: 'RandomForestClassifier',
        estimators: randomForestTrees,
        inferenceLatencyMs: processingTimeMs || 42,
      },
      output: {
        prototypeRiskScore: predictionReady ? `${riskScore}%` : '73%',
        riskLevel: predictionReady ? riskLevel : 'HIGH',
        topFeatures,
      },
      shapAttributions: shapAttributions.slice(0, 5),
      hardware: {
        edgeDevice: 'Raspberry Pi 4 Model B',
        oledDisplay: 'SSD1306 128x64 OLED (I2C 0x3C)',
        status: oledStatus,
        hardwareConnected,
      },
    };

    const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `genosense-report-${sampleLoaded ? sampleId : 'GS-DEMO-001'}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-sm font-sans">
        <motion.div
          initial={{ opacity: 0, scale: 0.98, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.98, y: 10 }}
          transition={{ duration: 0.15 }}
          className="relative w-full max-w-4xl max-h-[90vh] flex flex-col bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-[4px] shadow-2xl overflow-hidden text-[var(--text-main)]"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--border-color)] bg-[var(--bg-secondary)]">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-[2px] bg-[var(--bg-surface)] border border-[var(--border-color)] text-[var(--primary)]">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-base font-display font-bold text-[var(--text-main)] tracking-wide flex items-center gap-2">
                  GENOSENSE SYNTHETIC ANALYSIS DOSSIER
                  <span className="text-[10px] px-2 py-0.5 rounded-[2px] bg-[var(--bg-surface)] text-[var(--primary)] border border-[var(--border-color)] font-mono">
                    v1.2-LAB
                  </span>
                </h2>
                <p className="text-xs font-mono text-[var(--text-secondary)]">
                  Genomic Marker Extraction &amp; Explainable AI Prototype Dossier
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrint}
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono rounded-[2px] bg-[var(--bg-surface)] hover:bg-[var(--bg-elevated)] text-[var(--text-secondary)] hover:text-[var(--text-main)] border border-[var(--border-color)] transition-colors"
                title="Print Report"
              >
                <Share2 className="w-3.5 h-3.5" />
                PRINT
              </button>
              <button
                onClick={handleExportJson}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono rounded-[2px] bg-[var(--primary)]/10 hover:bg-[var(--primary)]/20 text-[var(--primary)] border border-[var(--primary)]/40 transition-colors"
                title="Export JSON"
              >
                <Download className="w-3.5 h-3.5" />
                EXPORT JSON
              </button>
              <button
                onClick={() => setReportModalOpen(false)}
                className="p-1.5 rounded-[2px] hover:bg-[var(--bg-elevated)] text-[var(--text-secondary)] hover:text-[var(--text-main)] transition-colors"
                aria-label="Close Dossier"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Research Prototype Alert Notice */}
          <div className="px-6 py-2 bg-[var(--bg-elevated)] border-b border-[var(--border-color)] flex items-center gap-2.5 text-[var(--warning)] text-xs font-mono">
            <AlertTriangle className="w-3.5 h-3.5 flex-shrink-0" />
            <span>
              <strong className="uppercase">Research Prototype — Not for Clinical Use:</strong> All markers, risk scores, and attributions are
              derived from synthetic demonstration pipelines for educational evaluation only.
            </span>
          </div>

          {/* Body Content */}
          <div className="p-6 overflow-y-auto space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 font-mono">
              <div className="p-3 rounded-[2px] bg-[var(--bg-secondary)] border border-[var(--border-color)]">
                <span className="text-[10px] text-[var(--text-secondary)] uppercase tracking-wider">Sample ID</span>
                <p className="text-sm font-bold text-[var(--text-main)] mt-0.5">
                  {sampleLoaded ? sampleId : 'GS-DEMO-001'}
                </p>
                <span className="text-[10px] text-[var(--primary)]">Ref: GRCh38.p13</span>
              </div>
              <div className="p-3 rounded-[2px] bg-[var(--bg-secondary)] border border-[var(--border-color)]">
                <span className="text-[10px] text-[var(--text-secondary)] uppercase tracking-wider">Genomic Features</span>
                <p className="text-sm font-bold text-[var(--text-main)] mt-0.5">
                  {totalMarkers || 24} Markers / {totalFeatures || 24} Features
                </p>
                <span className="text-[10px] text-[var(--secondary)]">18 Variants Identified</span>
              </div>
              <div className="p-3 rounded-[2px] bg-[var(--bg-secondary)] border border-[var(--border-color)]">
                <span className="text-[10px] text-[var(--text-secondary)] uppercase tracking-wider">ML Engine</span>
                <p className="text-sm font-bold text-[var(--text-main)] mt-0.5">Random Forest</p>
                <span className="text-[10px] text-[var(--text-secondary)]">200 Trees • Bagging</span>
              </div>
              <div className="p-3 rounded-[2px] bg-[var(--bg-secondary)] border border-[var(--primary)]">
                <span className="text-[10px] text-[var(--primary)] uppercase tracking-wider font-semibold">Prototype Output</span>
                <div className="flex items-baseline gap-2 mt-0.5">
                  <span className="text-xl font-display font-black text-[var(--text-main)]">
                    {predictionReady ? `${riskScore}%` : '73%'}
                  </span>
                  <span className="px-1.5 py-0.2 rounded-[2px] bg-[var(--bg-surface)] border border-[var(--danger)]/50 text-[var(--danger)] text-[10px] font-bold">
                    {predictionReady ? riskLevel : 'HIGH'}
                  </span>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-[2px] bg-[var(--bg-secondary)] border border-[var(--border-color)] space-y-3 font-mono text-xs">
              <h3 className="text-xs font-bold text-[var(--text-main)] uppercase tracking-wider flex items-center gap-2">
                <Activity className="w-3.5 h-3.5 text-[var(--primary)]" />
                Explainable AI (TreeSHAP Attribution Summary)
              </h3>
              <p className="text-[var(--text-secondary)] text-[11px] leading-relaxed">
                Feature contributions calculated using TreeSHAP attribution on the synthetic 24-dimensional feature vector.
                Positive values denote features driving output toward elevated prototype risk classification.
              </p>

              <div className="space-y-2">
                {shapAttributions.slice(0, 4).map((item) => (
                  <div
                    key={item.gene}
                    className="flex flex-col sm:flex-row sm:items-center justify-between p-2.5 rounded-[2px] bg-[var(--bg-surface)] border border-[var(--border-color)] text-xs gap-2"
                  >
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-[var(--primary)]">{item.gene}</span>
                      <span className="text-[10px] text-[var(--text-secondary)]">({item.rsId})</span>
                      <span className="text-[var(--text-main)] truncate max-w-xs">{item.biologicalContext}</span>
                    </div>
                    <div className="flex items-center gap-3 flex-shrink-0 self-end sm:self-auto">
                      <span className="text-[var(--text-secondary)]">Val: {item.featureValue}</span>
                      <span
                        className={`font-display font-bold px-2 py-0.5 rounded-[2px] ${
                          item.value > 0 ? 'text-[var(--primary)]' : 'text-[var(--text-secondary)]'
                        }`}
                      >
                        {item.value > 0 ? `+${item.value.toFixed(2)}` : item.value.toFixed(2)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
              <div className="p-4 rounded-[2px] bg-[var(--bg-secondary)] border border-[var(--border-color)] space-y-2">
                <h4 className="text-[11px] font-bold text-[var(--text-main)] uppercase tracking-wider">
                  Top Contributing Markers
                </h4>
                <div className="flex flex-wrap gap-2">
                  {topFeatures.map((gene) => (
                    <span
                      key={gene}
                      className="px-2 py-0.5 rounded-[2px] bg-[var(--bg-surface)] border border-[var(--border-color)] text-[var(--primary)] font-bold"
                    >
                      {gene}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-4 rounded-[2px] bg-[var(--bg-secondary)] border border-[var(--border-color)] space-y-1.5">
                <h4 className="text-[11px] font-bold text-[var(--text-main)] uppercase tracking-wider flex items-center gap-2">
                  <Cpu className="w-3.5 h-3.5 text-[var(--primary)]" />
                  Edge Deployment Status
                </h4>
                <div className="flex justify-between text-[var(--text-secondary)]">
                  <span>Device:</span>
                  <span className="text-[var(--text-main)]">Raspberry Pi 4 Model B</span>
                </div>
                <div className="flex justify-between text-[var(--text-secondary)]">
                  <span>Display:</span>
                  <span className="text-[var(--primary)]">SSD1306 OLED (I2C: 0x3C)</span>
                </div>
                <div className="flex justify-between text-[var(--text-secondary)]">
                  <span>OLED State:</span>
                  <span className="text-[var(--primary)] font-bold">{oledStatus}</span>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-[var(--border-color)] text-[10px] text-[var(--text-secondary)] flex flex-col sm:flex-row items-center justify-between gap-2 font-mono">
              <span>Timestamp: {new Date().toISOString()}</span>
              <span>GenoSense Research Prototype • Non-Clinical Architecture</span>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
