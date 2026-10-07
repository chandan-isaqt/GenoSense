export type ConditionId = 'ALLERGY' | 'DENGUE' | 'TYPHOID';

export type MatchCategory =
  | 'LOWER MATCH'
  | 'MODERATE MATCH'
  | 'HIGHER MATCH'
  | 'STRONGER MATCH';

export interface VariantRecord {
  sample_id: string;
  gene: string;
  variant: string;
  allele: string;
  genotype: number;
}

export interface MarkerRecord {
  markerId: string;
  gene: string;
  variant: string;
  conditionId: ConditionId;
  condition: string;
  riskAllele: string;
  weight: number;
  evidence: string;
  source: string;
  status: 'Synthetic Demo Marker';
  description: string;
}

export interface MatchedMarker {
  marker: MarkerRecord;
  inputVariant: VariantRecord;
  effectiveWeight: number;
}

export interface ConditionScoreResult {
  conditionId: ConditionId;
  conditionTitle: string;
  researchSubtitle: string;
  score: number;
  category: MatchCategory;
  matchedMarkers: MatchedMarker[];
  totalApplicableMarkers: number;
  matchedWeightSum: number;
  totalApplicableWeightSum: number;
  explanationSummary: string;
  strongWeightCount: number;
}

export interface FeatureContribution {
  markerId: string;
  gene: string;
  variant: string;
  condition: string;
  weight: number;
  formattedContribution: string;
  allele: string;
  genotype: number;
  explanation: string;
}

export interface SampleProfile {
  sampleId: string;
  age: number;
  sex: string;
  dataType: string;
  variants: VariantRecord[];
}

export interface AnalysisResult {
  sample: SampleProfile;
  timestamp: string;
  primaryScore: number;
  primaryCategory: MatchCategory;
  primaryCondition: ConditionScoreResult;
  conditions: ConditionScoreResult[];
  matchedMarkers: MatchedMarker[];
  featureContributions: FeatureContribution[];
  engineName: string;
  datasetLabel: string;
  deviceMode: string;
}

export type AnalysisStage =
  | 'IDLE'
  | 'READING VARIANTS'
  | 'NORMALIZING VARIANTS'
  | 'SEARCHING MARKER CATALOG'
  | 'MATCHING VARIANTS'
  | 'CALCULATING SCORES'
  | 'BUILDING EXPLANATION'
  | 'RESULT READY';

export type OledDisplayStep =
  | 'READY'
  | 'ANALYZING...'
  | 'READING SAMPLE...'
  | 'MATCHING MARKERS...'
  | 'CALCULATING...'
  | 'RESULT READY'
  | 'FINAL_SCORE';

export interface ValidationResult {
  valid: boolean;
  errors: string[];
  warnings: string[];
  parsedVariants: VariantRecord[];
  sampleId: string;
}

export interface DeviceHotspot {
  id: 'oled' | 'button' | 'rpi' | 'led' | 'connectivity';
  label: string;
  shortTitle: string;
  description: string;
  details: string;
  position: [number, number, number];
}
