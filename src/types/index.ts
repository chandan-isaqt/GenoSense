export interface GeneticMarker {
  id: string;
  gene: string;
  rsId: string;
  position: string;
  chromosome: string;
  association: 'Allergy' | 'Dengue' | 'Typhoid' | 'Immune Response' | 'Metabolic';
  allele: string;
  genotype: string;
  featureValue: number;
  consequence: string;
  clinicalSignificance: string;
}

export interface DiseaseScore {
  name: string;
  score: number;
  riskLevel: 'LOW' | 'MODERATE' | 'HIGH';
  markerCount: number;
  topContributingGene: string;
}

export interface ShapAttribution {
  gene: string;
  rsId: string;
  value: number; // e.g. +0.31, -0.07
  featureValue: number;
  direction: 'Increased model output' | 'Decreased model output';
  dataset: string;
  biologicalContext: string;
  molecularFunction: string;
}

export interface ApiActivity {
  id: string;
  timestamp: string;
  method: 'GET' | 'POST';
  endpoint: string;
  status: number;
  responseTimeMs: number;
  details: string;
}

export type OledScreenState = 
  | 'STANDBY'
  | 'READY'
  | 'ANALYZING...'
  | 'CONNECTING API...'
  | 'RESULT READY'
  | 'ERROR';

export interface GenoSenseDemoState {
  // Demo State flags
  sampleLoaded: boolean;
  markersExtracted: boolean;
  featuresGenerated: boolean;
  modelRunning: boolean;
  predictionReady: boolean;
  shapReady: boolean;
  apiCalled: boolean;
  hardwareConnected: boolean;
  oledStatus: OledScreenState;
  
  // Results
  sampleId: string;
  totalMarkers: number;
  totalVariants: number;
  totalFeatures: number;
  randomForestTrees: number;
  riskScore: number;
  riskLevel: 'LOW' | 'MODERATE' | 'HIGH';
  processingTimeMs: number;
  selectedGene: string | null;
  
  // Collections
  topFeatures: string[];
  markers: GeneticMarker[];
  diseaseScores: DiseaseScore[];
  shapAttributions: ShapAttribution[];
  apiActivities: ApiActivity[];

  // Running workflow indicators
  isRunningFullDemo: boolean;
  fullDemoStep: number; // 1-9
  extractionProgress: number; // 0-100
  predictionProgress: number; // 0-100
  extractionStepName: string;
  predictionStepName: string;
  
  // UI Controls
  isReportModalOpen: boolean;
}

export interface GenoSenseContextType extends GenoSenseDemoState {
  // Actions
  loadDemoSample: () => void;
  loadCustomVcf: (filename: string, fileContent?: string) => Promise<boolean>;
  extractMarkers: () => Promise<void>;
  runAiPrediction: () => Promise<void>;
  runShapAnalysis: () => Promise<void>;
  triggerHardwareAnalyzeButton: () => Promise<void>;
  runFullDemo: () => Promise<void>;
  resetDemo: () => void;
  selectGene: (gene: string | null) => void;
  setReportModalOpen: (open: boolean) => void;
  simulateApiFailure: () => Promise<void>;
}
