import { AnalysisResult } from '../types/genomics';
import { SCIENTIFIC_SAFETY_DISCLAIMER } from '../data/demoVariants';

export interface GenoSenseReportDocument {
  reportTitle: string;
  generatedAt: string;
  sampleId: string;
  age: number;
  sex: string;
  variantCount: number;
  matchedMarkerCount: number;
  engine: string;
  dataset: string;
  deviceStatus: string;
  results: {
    condition: string;
    score: number;
    category: string;
    matchedCount: number;
    totalCatalogCount: number;
  }[];
  featureContributions: {
    gene: string;
    variant: string;
    condition: string;
    contribution: string;
  }[];
  disclaimer: string;
}

export function buildReportDocument(
  analysisResult: AnalysisResult
): GenoSenseReportDocument {
  return {
    reportTitle: 'GENOSENSE ANALYSIS REPORT',
    generatedAt: new Date(analysisResult.timestamp).toLocaleString(),
    sampleId: analysisResult.sample.sampleId,
    age: analysisResult.sample.age,
    sex: analysisResult.sample.sex,
    variantCount: analysisResult.sample.variants.length,
    matchedMarkerCount: analysisResult.matchedMarkers.length,
    engine: 'Weighted Marker Matching',
    dataset: 'Synthetic Demonstration Data',
    deviceStatus: 'Simulated',
    results: analysisResult.conditions.map((c) => ({
      condition: c.conditionTitle,
      score: c.score,
      category: c.category,
      matchedCount: c.matchedMarkers.length,
      totalCatalogCount: c.totalApplicableMarkers,
    })),
    featureContributions: analysisResult.featureContributions.map((fc) => ({
      gene: fc.gene,
      variant: fc.variant,
      condition: fc.condition,
      contribution: fc.formattedContribution,
    })),
    disclaimer: SCIENTIFIC_SAFETY_DISCLAIMER,
  };
}

export function triggerPrintReport(): void {
  if (typeof window !== 'undefined') {
    window.print();
  }
}
