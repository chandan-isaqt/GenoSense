import React, { createContext, useCallback, useState } from 'react';
import {
  AnalysisResult,
  AnalysisStage,
  MarkerRecord,
  MatchedMarker,
  OledDisplayStep,
  SampleProfile,
} from '../types/genomics';
import { DEMO_MARKER_CATALOG } from '../data/demoMarkers';
import { DEMO_SAMPLE_PROFILE } from '../data/demoVariants';
import { analyzeDemo, uploadVariants } from '../services/api';

export const ORDERED_ANALYSIS_STAGES: AnalysisStage[] = [
  'READING VARIANTS',
  'NORMALIZING VARIANTS',
  'SEARCHING MARKER CATALOG',
  'MATCHING VARIANTS',
  'CALCULATING SCORES',
  'BUILDING EXPLANATION',
  'RESULT READY',
];

export interface GenoSenseContextValue {
  loadedSample: SampleProfile | null;
  sampleLoadedMessage: string | null;
  validationErrors: string[];
  validationWarnings: string[];
  isAnalyzing: boolean;
  analysisStage: AnalysisStage;
  completedStages: AnalysisStage[];
  progressStep: 1 | 2 | 3 | 4 | 5;
  analysisResult: AnalysisResult | null;
  oledStep: OledDisplayStep;
  selectedMatchedMarker: MatchedMarker | null;
  setSelectedMatchedMarker: (marker: MatchedMarker | null) => void;
  markerCatalog: MarkerRecord[];
  loadDemoSample: () => void;
  handleFileUpload: (fileName: string, content: string) => Promise<boolean>;
  runSampleAnalysis: (overrideProfile?: SampleProfile) => Promise<AnalysisResult | null>;
  triggerDeviceAnalyze: () => Promise<AnalysisResult | null>;
  resetDemo: () => void;
}

export const GenoSenseContext = createContext<GenoSenseContextValue | undefined>(
  undefined
);

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

export const GenoSenseProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [loadedSample, setLoadedSample] = useState<SampleProfile | null>(null);
  const [sampleLoadedMessage, setSampleLoadedMessage] = useState<string | null>(
    null
  );
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const [validationWarnings, setValidationWarnings] = useState<string[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [analysisStage, setAnalysisStage] = useState<AnalysisStage>('IDLE');
  const [completedStages, setCompletedStages] = useState<AnalysisStage[]>([]);
  const [progressStep, setProgressStep] = useState<1 | 2 | 3 | 4 | 5>(1);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(
    null
  );
  const [oledStep, setOledStep] = useState<OledDisplayStep>('READY');
  const [selectedMatchedMarker, setSelectedMatchedMarker] =
    useState<MatchedMarker | null>(null);

  const loadDemoSample = useCallback(() => {
    setValidationErrors([]);
    setValidationWarnings([]);
    setLoadedSample(DEMO_SAMPLE_PROFILE);
    setSampleLoadedMessage(
      `Sample loaded successfully. ${DEMO_SAMPLE_PROFILE.sampleId} • ${DEMO_SAMPLE_PROFILE.variants.length} variants`
    );
    setAnalysisResult(null);
    setAnalysisStage('IDLE');
    setCompletedStages([]);
    setProgressStep(1);
    setOledStep('READY');
    setSelectedMatchedMarker(null);
  }, []);

  const handleFileUpload = useCallback(
    async (fileName: string, content: string): Promise<boolean> => {
      setValidationErrors([]);
      setValidationWarnings([]);
      setSampleLoadedMessage(null);

      const validation = await uploadVariants(fileName, content);
      if (!validation.valid) {
        setValidationErrors(validation.errors);
        setLoadedSample(null);
        return false;
      }

      const customProfile: SampleProfile = {
        sampleId: validation.sampleId,
        age: 10,
        sex: 'Male',
        dataType: `Uploaded File (${fileName})`,
        variants: validation.parsedVariants,
      };

      setLoadedSample(customProfile);
      setValidationWarnings(validation.warnings);
      setSampleLoadedMessage(
        `Sample loaded successfully. ${customProfile.sampleId} • ${customProfile.variants.length} variants`
      );
      setAnalysisResult(null);
      setAnalysisStage('IDLE');
      setCompletedStages([]);
      setProgressStep(1);
      setOledStep('READY');
      setSelectedMatchedMarker(null);
      return true;
    },
    []
  );

  const runSampleAnalysis = useCallback(
    async (overrideProfile?: SampleProfile): Promise<AnalysisResult | null> => {
      const targetSample = overrideProfile || loadedSample;
      if (!targetSample || isAnalyzing) return null;

      setIsAnalyzing(true);
      setValidationErrors([]);
      setCompletedStages([]);
      setSelectedMatchedMarker(null);

      // Step 1: Reading Variants
      setProgressStep(2);
      setAnalysisStage('READING VARIANTS');
      setOledStep('ANALYZING...');
      await delay(280);
      setCompletedStages((prev) => [...prev, 'READING VARIANTS']);

      // Step 2: Normalizing Variants
      setAnalysisStage('NORMALIZING VARIANTS');
      setOledStep('READING SAMPLE...');
      await delay(280);
      setCompletedStages((prev) => [...prev, 'NORMALIZING VARIANTS']);

      // Step 3: Searching Marker Catalog
      setProgressStep(3);
      setAnalysisStage('SEARCHING MARKER CATALOG');
      setOledStep('MATCHING MARKERS...');
      await delay(300);
      setCompletedStages((prev) => [...prev, 'SEARCHING MARKER CATALOG']);

      // Step 4: Matching Variants (Execute real matching engine)
      setAnalysisStage('MATCHING VARIANTS');
      const computedResult = await analyzeDemo(targetSample);
      await delay(300);
      setCompletedStages((prev) => [...prev, 'MATCHING VARIANTS']);

      // Step 5: Calculating Weighted Scores
      setProgressStep(4);
      setAnalysisStage('CALCULATING SCORES');
      setOledStep('CALCULATING...');
      await delay(300);
      setCompletedStages((prev) => [...prev, 'CALCULATING SCORES']);

      // Step 6: Building Explanation
      setAnalysisStage('BUILDING EXPLANATION');
      setOledStep('RESULT READY');
      await delay(260);
      setCompletedStages((prev) => [...prev, 'BUILDING EXPLANATION']);

      // Step 7: Result Ready
      setProgressStep(5);
      setAnalysisStage('RESULT READY');
      setCompletedStages((prev) => [...prev, 'RESULT READY']);
      setAnalysisResult(computedResult);
      setOledStep('FINAL_SCORE');
      if (computedResult.matchedMarkers.length > 0) {
        setSelectedMatchedMarker(computedResult.matchedMarkers[0]);
      }
      setIsAnalyzing(false);

      return computedResult;
    },
    [loadedSample, isAnalyzing]
  );

  const triggerDeviceAnalyze = useCallback(async (): Promise<AnalysisResult | null> => {
    if (isAnalyzing) return null;
    const sampleToUse = loadedSample || DEMO_SAMPLE_PROFILE;
    if (!loadedSample) {
      setLoadedSample(DEMO_SAMPLE_PROFILE);
      setSampleLoadedMessage(
        `Sample loaded successfully. ${DEMO_SAMPLE_PROFILE.sampleId} • ${DEMO_SAMPLE_PROFILE.variants.length} variants`
      );
    }
    return runSampleAnalysis(sampleToUse);
  }, [isAnalyzing, loadedSample, runSampleAnalysis]);

  const resetDemo = useCallback(() => {
    setLoadedSample(null);
    setSampleLoadedMessage(null);
    setValidationErrors([]);
    setValidationWarnings([]);
    setIsAnalyzing(false);
    setAnalysisStage('IDLE');
    setCompletedStages([]);
    setProgressStep(1);
    setAnalysisResult(null);
    setOledStep('READY');
    setSelectedMatchedMarker(null);
  }, []);

  return (
    <GenoSenseContext.Provider
      value={{
        loadedSample,
        sampleLoadedMessage,
        validationErrors,
        validationWarnings,
        isAnalyzing,
        analysisStage,
        completedStages,
        progressStep,
        analysisResult,
        oledStep,
        selectedMatchedMarker,
        setSelectedMatchedMarker,
        markerCatalog: DEMO_MARKER_CATALOG,
        loadDemoSample,
        handleFileUpload,
        runSampleAnalysis,
        triggerDeviceAnalyze,
        resetDemo,
      }}
    >
      {children}
    </GenoSenseContext.Provider>
  );
};
