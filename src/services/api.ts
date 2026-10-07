import {
  AnalysisResult,
  MarkerRecord,
  SampleProfile,
  ValidationResult,
} from '../types/genomics';
import { DEMO_MARKER_CATALOG } from '../data/demoMarkers';
import { DEMO_SAMPLE_PROFILE } from '../data/demoVariants';
import {
  executeSampleAnalysis,
  validateAndParseVariantFile,
} from './analysisService';
import { buildReportDocument, GenoSenseReportDocument } from './reportService';

/**
 * Phase-1 API Abstraction Layer
 * Currently executes local deterministic matching functions.
 * Designed to be replaced transparently in Phase 5 with:
 * - POST /analyze
 * - POST /predict
 * - GET /markers
 * - GET /report/:id
 */

let lastStoredResult: AnalysisResult | null = null;

export async function analyzeDemo(
  profile: SampleProfile = DEMO_SAMPLE_PROFILE
): Promise<AnalysisResult> {
  const result = executeSampleAnalysis(profile);
  lastStoredResult = result;
  return result;
}

export async function uploadVariants(
  fileName: string,
  fileContent: string
): Promise<ValidationResult> {
  return validateAndParseVariantFile(fileName, fileContent);
}

export async function getMarkers(): Promise<MarkerRecord[]> {
  return DEMO_MARKER_CATALOG;
}

export async function getResult(): Promise<AnalysisResult | null> {
  return lastStoredResult;
}

export async function generateReport(
  result?: AnalysisResult
): Promise<GenoSenseReportDocument | null> {
  const target = result || lastStoredResult;
  if (!target) return null;
  return buildReportDocument(target);
}
