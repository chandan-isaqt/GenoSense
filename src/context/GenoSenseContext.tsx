import React, { createContext, useContext, useState, useCallback } from 'react';
import {
  GenoSenseDemoState,
  GenoSenseContextType,
  ApiActivity,
} from '../types';
import {
  DEMO_SAMPLE_ID,
  TOTAL_MARKERS,
  TOTAL_VARIANTS,
  TOTAL_FEATURES,
  RANDOM_FOREST_TREES,
  DEMO_RISK_SCORE,
  DEMO_RISK_LEVEL,
  DEMO_PROCESSING_TIME,
  DEMO_GENETIC_MARKERS,
  DEMO_DISEASE_SCORES,
  DEMO_SHAP_ATTRIBUTIONS,
  INITIAL_API_ACTIVITIES,
} from '../data/demoData';
import { apiService } from '../services/api';

const initialState: GenoSenseDemoState = {
  sampleLoaded: false,
  markersExtracted: false,
  featuresGenerated: false,
  modelRunning: false,
  predictionReady: false,
  shapReady: false,
  apiCalled: false,
  hardwareConnected: true,
  oledStatus: 'READY',

  sampleId: 'GS-STANDBY',
  totalMarkers: 0,
  totalVariants: 0,
  totalFeatures: 0,
  randomForestTrees: RANDOM_FOREST_TREES,
  riskScore: 0,
  riskLevel: 'LOW',
  processingTimeMs: 0,
  selectedGene: 'GENE-A',

  topFeatures: ['GENE-A', 'GENE-B', 'GENE-D'],
  markers: [],
  diseaseScores: DEMO_DISEASE_SCORES,
  shapAttributions: DEMO_SHAP_ATTRIBUTIONS,
  apiActivities: INITIAL_API_ACTIVITIES,

  isRunningFullDemo: false,
  fullDemoStep: 0,
  extractionProgress: 0,
  predictionProgress: 0,
  extractionStepName: 'Idle',
  predictionStepName: 'Idle',

  isReportModalOpen: false,
};

const GenoSenseContext = createContext<GenoSenseContextType | undefined>(undefined);

export const GenoSenseProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<GenoSenseDemoState>(initialState);

  const addApiLog = useCallback(
    (method: 'GET' | 'POST', endpoint: string, status: number, responseTimeMs: number, details: string) => {
      const now = new Date();
      const timeStr = now.toTimeString().split(' ')[0];
      const newLog: ApiActivity = {
        id: `act-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
        timestamp: timeStr,
        method,
        endpoint,
        status,
        responseTimeMs,
        details,
      };
      setState((prev) => ({
        ...prev,
        apiActivities: [newLog, ...prev.apiActivities].slice(0, 15),
      }));
    },
    []
  );

  const loadDemoSample = useCallback(() => {
    setState((prev) => ({
      ...prev,
      sampleLoaded: true,
      sampleId: DEMO_SAMPLE_ID,
      totalMarkers: TOTAL_MARKERS,
      totalVariants: TOTAL_VARIANTS,
      totalFeatures: TOTAL_FEATURES,
      markers: DEMO_GENETIC_MARKERS,
    }));
    addApiLog('GET', `/api/v1/samples/${DEMO_SAMPLE_ID}`, 200, 12, 'Loaded synthetic demo sample metadata');
  }, [addApiLog]);

  const loadCustomVcf = useCallback(
    async (filename: string): Promise<boolean> => {
      if (!filename.toLowerCase().endsWith('.vcf')) {
        return false;
      }
      setState((prev) => ({
        ...prev,
        sampleLoaded: true,
        sampleId: filename.replace(/\.vcf$/i, '').toUpperCase() || 'CUSTOM-VCF-001',
        totalMarkers: 24,
        totalVariants: 18,
        totalFeatures: 24,
        markers: DEMO_GENETIC_MARKERS,
      }));
      addApiLog('POST', '/api/v1/vcf/upload', 200, 48, `Uploaded & parsed ${filename} (GRCh38 reference)`);
      return true;
    },
    [addApiLog]
  );

  const extractMarkers = useCallback(async () => {
    setState((prev) => ({
      ...prev,
      extractionProgress: 10,
      extractionStepName: 'Reading VCF data...',
    }));

    await new Promise((r) => setTimeout(r, 450));
    setState((prev) => ({
      ...prev,
      extractionProgress: 35,
      extractionStepName: 'Locating genetic markers across reference chromosomes...',
    }));

    await new Promise((r) => setTimeout(r, 550));
    setState((prev) => ({
      ...prev,
      extractionProgress: 70,
      extractionStepName: 'Encoding homozygous/heterozygous genotypes (0, 1, 2)...',
    }));

    await new Promise((r) => setTimeout(r, 500));
    setState((prev) => ({
      ...prev,
      extractionProgress: 95,
      extractionStepName: 'Building normalized 24-feature vector for Random Forest...',
    }));

    await new Promise((r) => setTimeout(r, 400));
    setState((prev) => ({
      ...prev,
      markersExtracted: true,
      featuresGenerated: true,
      extractionProgress: 100,
      extractionStepName: '24 genomic features extracted successfully.',
      markers: DEMO_GENETIC_MARKERS,
      totalMarkers: TOTAL_MARKERS,
      totalVariants: TOTAL_VARIANTS,
      totalFeatures: TOTAL_FEATURES,
    }));
    addApiLog('POST', '/api/v1/extract-markers', 200, 68, 'Engineered 24 genomic features from 18 variants');
  }, [addApiLog]);

  const runAiPrediction = useCallback(async () => {
    setState((prev) => ({
      ...prev,
      modelRunning: true,
      predictionProgress: 15,
      predictionStepName: 'Preparing 24-dimensional feature vector...',
    }));

    await new Promise((r) => setTimeout(r, 400));
    setState((prev) => ({
      ...prev,
      predictionProgress: 40,
      predictionStepName: 'Loading Random Forest ensemble (200 estimators)...',
    }));

    await new Promise((r) => setTimeout(r, 500));
    setState((prev) => ({
      ...prev,
      predictionProgress: 65,
      predictionStepName: 'Evaluating decision trees & bagging splits...',
    }));

    await new Promise((r) => setTimeout(r, 450));
    setState((prev) => ({
      ...prev,
      predictionProgress: 85,
      predictionStepName: 'Aggregating tree votes & calibrating probabilities...',
    }));

    await new Promise((r) => setTimeout(r, 400));
    setState((prev) => ({
      ...prev,
      modelRunning: false,
      predictionReady: true,
      shapReady: true,
      apiCalled: true,
      predictionProgress: 100,
      predictionStepName: 'Inference complete. Prototype risk score generated.',
      riskScore: DEMO_RISK_SCORE,
      riskLevel: DEMO_RISK_LEVEL,
      processingTimeMs: DEMO_PROCESSING_TIME,
      oledStatus: 'RESULT READY',
    }));
    addApiLog('POST', '/api/v1/predict', 200, 42, 'RandomForest inference: 73% prototype score, HIGH risk');
    addApiLog('POST', '/api/v1/shap/tree-explainer', 200, 31, 'Generated SHAP attribution values for top features');
  }, [addApiLog]);

  const runShapAnalysis = useCallback(async () => {
    setState((prev) => ({
      ...prev,
      shapReady: true,
    }));
    addApiLog('GET', '/api/v1/shap/summary', 200, 18, 'SHAP TreeExplainer retrieved 7 primary attributions');
  }, [addApiLog]);

  const triggerHardwareAnalyzeButton = useCallback(async () => {
    setState((prev) => ({
      ...prev,
      oledStatus: 'ANALYZING...',
    }));
    addApiLog('POST', '/api/v1/hardware/gpio/button-pressed', 200, 4, 'Physical GPIO Pin 17 interrupt triggered');

    await new Promise((r) => setTimeout(r, 800));

    setState((prev) => ({
      ...prev,
      oledStatus: 'CONNECTING API...',
    }));
    addApiLog('POST', '/api/v1/hardware/edge-pi/sync', 200, 32, 'I2C bus #1 synced with Flask inference server');

    await new Promise((r) => setTimeout(r, 900));

    setState((prev) => ({
      ...prev,
      oledStatus: 'RESULT READY',
      sampleLoaded: true,
      sampleId: prev.sampleId === 'GS-STANDBY' ? DEMO_SAMPLE_ID : prev.sampleId,
      markersExtracted: true,
      featuresGenerated: true,
      predictionReady: true,
      shapReady: true,
      apiCalled: true,
      riskScore: DEMO_RISK_SCORE,
      riskLevel: DEMO_RISK_LEVEL,
      processingTimeMs: DEMO_PROCESSING_TIME,
      markers: prev.markers.length > 0 ? prev.markers : DEMO_GENETIC_MARKERS,
    }));
    addApiLog('POST', '/api/v1/hardware/oled/ssd1306', 200, 15, 'Rendered RISK: HIGH | SCORE: 73% on 128x64 OLED');
  }, [addApiLog]);

  const runFullDemo = useCallback(async () => {
    setState((prev) => ({
      ...prev,
      isRunningFullDemo: true,
      fullDemoStep: 1,
      oledStatus: 'ANALYZING...',
    }));

    loadDemoSample();
    await new Promise((r) => setTimeout(r, 600));

    setState((prev) => ({ ...prev, fullDemoStep: 2 }));
    await extractMarkers();
    await new Promise((r) => setTimeout(r, 500));

    setState((prev) => ({ ...prev, fullDemoStep: 4 }));
    await runAiPrediction();
    await new Promise((r) => setTimeout(r, 500));

    setState((prev) => ({ ...prev, fullDemoStep: 5 }));
    await runShapAnalysis();
    await new Promise((r) => setTimeout(r, 500));

    setState((prev) => ({ ...prev, fullDemoStep: 6, oledStatus: 'CONNECTING API...' }));
    await apiService.pushToOled(['GENOSENSE', 'RISK: HIGH', 'SCORE: 73%']);
    await new Promise((r) => setTimeout(r, 600));

    setState((prev) => ({
      ...prev,
      fullDemoStep: 9,
      isRunningFullDemo: false,
      oledStatus: 'RESULT READY',
    }));
    addApiLog('POST', '/api/v1/workflow/full-pipeline', 200, 95, 'Completed autonomous end-to-end GenoSense pipeline');
  }, [loadDemoSample, extractMarkers, runAiPrediction, runShapAnalysis, addApiLog]);

  const resetDemo = useCallback(() => {
    setState({
      ...initialState,
      apiActivities: [
        {
          id: `act-${Date.now()}`,
          timestamp: new Date().toTimeString().split(' ')[0],
          method: 'POST',
          endpoint: '/api/v1/system/reset',
          status: 200,
          responseTimeMs: 6,
          details: 'Global state reset to standby baseline',
        },
        ...initialState.apiActivities,
      ],
    });
  }, []);

  const selectGene = useCallback((gene: string | null) => {
    setState((prev) => ({ ...prev, selectedGene: gene }));
  }, []);

  const setReportModalOpen = useCallback((open: boolean) => {
    setState((prev) => ({ ...prev, isReportModalOpen: open }));
  }, []);

  const simulateApiFailure = useCallback(async () => {
    setState((prev) => ({
      ...prev,
      oledStatus: 'ERROR',
    }));
    addApiLog('POST', '/api/v1/predict', 503, 120, 'ERR_CONNECTION_REFUSED: Flask microservice offline');
  }, [addApiLog]);

  return (
    <GenoSenseContext.Provider
      value={{
        ...state,
        loadDemoSample,
        loadCustomVcf,
        extractMarkers,
        runAiPrediction,
        runShapAnalysis,
        triggerHardwareAnalyzeButton,
        runFullDemo,
        resetDemo,
        selectGene,
        setReportModalOpen,
        simulateApiFailure,
      }}
    >
      {children}
    </GenoSenseContext.Provider>
  );
};

export const useGenoSenseDemo = () => {
  const context = useContext(GenoSenseContext);
  if (!context) {
    throw new Error('useGenoSenseDemo must be used within a GenoSenseProvider');
  }
  return context;
};
