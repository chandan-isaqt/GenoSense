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
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-4xl max-h-[90vh] flex flex-col bg-navy-900 border border-cyan-500/30 rounded-2xl shadow-2xl overflow-hidden text-slate-200"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-navy-950/70">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-white tracking-wide flex items-center gap-2">
                  GENOSENSE SYNTHETIC ANALYSIS REPORT
                  <span className="text-xs px-2 py-0.5 rounded bg-cyan-950 text-cyan-400 border border-cyan-800 font-mono">
                    v1.2-EDU
                  </span>
                </h2>
                <p className="text-xs text-slate-400">Genomic Marker Extraction &amp; Explainable AI Prototype Dossier</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrint}
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                title="Print Report"
              >
                <Share2 className="w-3.5 h-3.5" />
                Print / PDF
              </button>
              <button
                onClick={handleExportJson}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-cyan-600/20 hover:bg-cyan-600/30 text-cyan-300 border border-cyan-500/30 transition-colors"
                title="Export JSON"
              >
                <Download className="w-3.5 h-3.5" />
                Export JSON
              </button>
              <button
                onClick={() => setReportModalOpen(false)}
                className="p-2 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Research Prototype Alert Notice */}
          <div className="px-6 py-2.5 bg-amber-500/10 border-b border-amber-500/20 flex items-center gap-3 text-amber-300 text-xs">
            <AlertTriangle className="w-4 h-4 flex-shrink-0 text-amber-400" />
            <span>
              <strong>RESEARCH PROTOTYPE — NOT FOR CLINICAL USE:</strong> All markers, risk scores, and attributions are
              derived from synthetic demonstration pipelines for educational evaluation only.
            </span>
          </div>

          {/* Body Content */}
          <div className="p-6 overflow-y-auto space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-3.5 rounded-xl bg-navy-950/60 border border-slate-800">
                <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400">Sample ID</span>
                <p className="text-base font-bold text-white font-mono mt-1">
                  {sampleLoaded ? sampleId : 'GS-DEMO-001'}
                </p>
                <span className="text-[10px] text-cyan-400">Ref: GRCh38 / synthetic</span>
              </div>
              <div className="p-3.5 rounded-xl bg-navy-950/60 border border-slate-800">
                <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400">Genomic Features</span>
                <p className="text-base font-bold text-white font-mono mt-1">
                  {totalMarkers || 24} Markers / {totalFeatures || 24} Features
                </p>
                <span className="text-[10px] text-emerald-400">18 Identified Variants</span>
              </div>
              <div className="p-3.5 rounded-xl bg-navy-950/60 border border-slate-800">
                <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400">ML Engine</span>
                <p className="text-base font-bold text-white font-mono mt-1">Random Forest</p>
                <span className="text-[10px] text-slate-400">200 Estimators • Bagging</span>
              </div>
              <div className="p-3.5 rounded-xl bg-navy-950/60 border border-cyan-500/30 bg-cyan-950/20">
                <span className="text-[11px] font-mono uppercase tracking-wider text-cyan-300">Prototype Risk Score</span>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-2xl font-black text-cyan-400 font-mono">
                    {predictionReady ? `${riskScore}%` : '73%'}
                  </span>
                  <span className="px-1.5 py-0.5 text-[10px] font-bold rounded bg-rose-500/20 text-rose-300 border border-rose-500/30">
                    {predictionReady ? riskLevel : 'HIGH'}
                  </span>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-navy-950/60 border border-slate-800 space-y-4">
              <h3 className="text-sm font-semibold text-slate-200 uppercase tracking-wider font-mono flex items-center gap-2">
                <Activity className="w-4 h-4 text-cyan-400" />
                Explainable AI (SHAP Tree Explainer Summary)
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Feature contributions calculated using TreeSHAP attribution on the synthetic 24-dimensional feature vector.
                Positive values denote features driving output toward elevated prototype risk classification.
              </p>

              <div className="space-y-2">
                {shapAttributions.slice(0, 4).map((item) => (
                  <div
                    key={item.gene}
                    className="flex flex-col sm:flex-row sm:items-center justify-between p-2.5 rounded-lg bg-navy-900 border border-slate-800/80 text-xs gap-2"
                  >
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-cyan-300">{item.gene}</span>
                      <span className="text-[11px] text-slate-500 font-mono">({item.rsId})</span>
                      <span className="text-slate-300 truncate max-w-xs">{item.biologicalContext}</span>
                    </div>
                    <div className="flex items-center gap-3 flex-shrink-0 self-end sm:self-auto">
                      <span className="font-mono font-bold text-slate-300">Val: {item.featureValue}</span>
                      <span
                        className={`font-mono font-bold px-2 py-0.5 rounded text-xs ${
                          item.value > 0
                            ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                            : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                        }`}
                      >
                        {item.value > 0 ? `+${item.value.toFixed(2)}` : item.value.toFixed(2)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-navy-950/60 border border-slate-800 space-y-2.5">
                <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider font-mono">
                  Primary Biomarker Attributions
                </h4>
                <div className="flex flex-wrap gap-2">
                  {topFeatures.map((gene) => (
                    <span
                      key={gene}
                      className="px-2.5 py-1 rounded-lg bg-cyan-950/40 border border-cyan-500/30 text-cyan-300 text-xs font-mono font-medium"
                    >
                      ★ {gene}
                    </span>
                  ))}
                </div>
                <p className="text-[11px] text-slate-400 mt-2">
                  These genes exhibited the highest Shapley attributions in our synthetic random forest ensemble splits.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-navy-950/60 border border-slate-800 space-y-2.5">
                <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider font-mono flex items-center gap-2">
                  <Cpu className="w-3.5 h-3.5 text-emerald-400" />
                  Edge Hardware Deployment Status
                </h4>
                <div className="space-y-1.5 text-xs">
                  <div className="flex justify-between text-slate-400">
                    <span>Edge SBC:</span>
                    <span className="text-slate-200 font-mono">
                      Raspberry Pi 4 Model B ({hardwareConnected ? 'Connected' : 'Offline'})
                    </span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Display Terminal:</span>
                    <span className="text-slate-200 font-mono">SSD1306 128x64 OLED</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>OLED State:</span>
                    <span className="text-emerald-400 font-mono font-bold">
                      {oledStatus}
                    </span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Flask API Gateway:</span>
                    <span className="text-cyan-400 font-mono">ONLINE (HTTP 200 OK)</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 text-[11px] text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-2 font-mono">
              <span>Report Generated: {new Date().toLocaleDateString()} {new Date().toLocaleTimeString()}</span>
              <span>GenoSense • Research &amp; Educational Sandbox</span>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
