import {
  AnalysisResult,
  SampleProfile,
  ValidationResult,
  VariantRecord,
} from '../types/genomics';
import { DEMO_MARKER_CATALOG } from '../data/demoMarkers';
import {
  calculateConditionScores,
  generateFeatureContributions,
  matchVariantsAgainstCatalog,
  normalizeVariants,
} from './matchingEngine';

const REQUIRED_CSV_HEADERS = ['sample_id', 'gene', 'variant', 'allele', 'genotype'];

export function validateAndParseVariantFile(
  fileName: string,
  rawContent: string
): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];
  const parsedVariants: VariantRecord[] = [];

  const lowerName = fileName.toLowerCase().trim();
  if (!lowerName.endsWith('.csv') && !lowerName.endsWith('.vcf')) {
    return {
      valid: false,
      errors: [
        `Unsupported file format "${fileName}". Please upload a .csv or prototype .vcf file.`,
      ],
      warnings: [],
      parsedVariants: [],
      sampleId: '',
    };
  }

  const trimmed = rawContent.trim();
  if (!trimmed) {
    return {
      valid: false,
      errors: ['The uploaded file is empty. Please select a file containing variant records.'],
      warnings: [],
      parsedVariants: [],
      sampleId: '',
    };
  }

  if (lowerName.endsWith('.vcf')) {
    return parsePrototypeVcf(trimmed);
  }

  // Parse CSV
  const lines = trimmed
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter((l) => l.length > 0);

  if (lines.length < 2) {
    return {
      valid: false,
      errors: [
        'CSV file must include a header row and at least one variant record row.',
      ],
      warnings: [],
      parsedVariants: [],
      sampleId: '',
    };
  }

  const headers = lines[0]
    .split(',')
    .map((h) => h.trim().toLowerCase());

  const missingHeaders = REQUIRED_CSV_HEADERS.filter(
    (req) => !headers.includes(req)
  );

  if (missingHeaders.length > 0) {
    return {
      valid: false,
      errors: [
        `Missing required CSV column(s): ${missingHeaders.join(', ')}. Expected format: sample_id,gene,variant,allele,genotype`,
      ],
      warnings: [],
      parsedVariants: [],
      sampleId: '',
    };
  }

  const sampleIdx = headers.indexOf('sample_id');
  const geneIdx = headers.indexOf('gene');
  const variantIdx = headers.indexOf('variant');
  const alleleIdx = headers.indexOf('allele');
  const genotypeIdx = headers.indexOf('genotype');

  for (let i = 1; i < lines.length; i++) {
    const rowNumber = i + 1;
    const cols = lines[i].split(',').map((c) => c.trim());

    if (cols.length < REQUIRED_CSV_HEADERS.length) {
      errors.push(
        `Row ${rowNumber} is malformed: expected ${REQUIRED_CSV_HEADERS.length} columns but found ${cols.length}.`
      );
      continue;
    }

    const sample_id = cols[sampleIdx];
    const gene = cols[geneIdx];
    const variant = cols[variantIdx];
    const allele = cols[alleleIdx];
    const genotypeNum = Number(cols[genotypeIdx]);

    if (!variant) {
      errors.push(`Row ${rowNumber} is missing a required variant ID.`);
      continue;
    }

    if (!gene) {
      errors.push(`Row ${rowNumber} (${variant}) is missing a gene symbol.`);
      continue;
    }

    if (!allele) {
      errors.push(`Row ${rowNumber} (${variant}) is missing an allele value.`);
      continue;
    }

    if (!Number.isFinite(genotypeNum) || genotypeNum < 0 || genotypeNum > 2) {
      errors.push(
        `Row ${rowNumber} (${variant}) has an invalid genotype "${cols[genotypeIdx]}". Expected 0, 1, or 2.`
      );
      continue;
    }

    parsedVariants.push({
      sample_id: sample_id || 'UPLOADED-SAMPLE',
      gene,
      variant,
      allele,
      genotype: genotypeNum,
    });
  }

  if (errors.length > 0) {
    return {
      valid: false,
      errors,
      warnings,
      parsedVariants: [],
      sampleId: '',
    };
  }

  const detectedSampleId = parsedVariants[0]?.sample_id || 'CUSTOM-CSV-001';

  return {
    valid: true,
    errors: [],
    warnings,
    parsedVariants,
    sampleId: detectedSampleId,
  };
}

function parsePrototypeVcf(content: string): ValidationResult {
  const lines = content
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter((l) => l.length > 0 && !l.startsWith('##'));

  const dataLines = lines.filter((l) => !l.startsWith('#'));
  if (dataLines.length === 0) {
    return {
      valid: false,
      errors: [
        'No variant records found in VCF file. Try the provided demo sample or upload a valid CSV.',
      ],
      warnings: [],
      parsedVariants: [],
      sampleId: '',
    };
  }

  const parsedVariants: VariantRecord[] = [];
  for (let i = 0; i < dataLines.length; i++) {
    const parts = dataLines[i].split(/\t|\s+/);
    if (parts.length < 5) {
      return {
        valid: false,
        errors: [
          `Malformed VCF row ${i + 1}. Expected tab-separated CHROM POS ID REF ALT columns.`,
        ],
        warnings: [],
        parsedVariants: [],
        sampleId: '',
      };
    }
    const id = parts[2];
    const alt = parts[4];
    const info = parts[7] || '';
    const geneMatch = info.match(/GENE=([A-Za-z0-9-_]+)/i);
    const gene = geneMatch ? geneMatch[1] : `LOCUS-${i + 1}`;

    parsedVariants.push({
      sample_id: 'VCF-PROTOTYPE-001',
      gene,
      variant: id,
      allele: alt,
      genotype: 1,
    });
  }

  return {
    valid: true,
    errors: [],
    warnings: ['Parsed using controlled Phase-1 VCF prototype reader.'],
    parsedVariants,
    sampleId: 'VCF-PROTOTYPE-001',
  };
}

export function executeSampleAnalysis(sample: SampleProfile): AnalysisResult {
  const normalized = normalizeVariants(sample.variants);
  const matchedMarkers = matchVariantsAgainstCatalog(
    normalized,
    DEMO_MARKER_CATALOG
  );
  const conditions = calculateConditionScores(
    matchedMarkers,
    DEMO_MARKER_CATALOG
  );
  const featureContributions = generateFeatureContributions(matchedMarkers);

  // Sort copy to find highest scoring primary profile while keeping consistent display order
  const sortedByScore = [...conditions].sort((a, b) => b.score - a.score);
  const primaryCondition = sortedByScore[0] || conditions[0];

  return {
    sample: {
      ...sample,
      variants: normalized,
    },
    timestamp: new Date().toISOString(),
    primaryScore: primaryCondition.score,
    primaryCategory: primaryCondition.category,
    primaryCondition,
    conditions,
    matchedMarkers,
    featureContributions,
    engineName: 'Weighted Marker Matching Engine',
    datasetLabel: 'Synthetic Demonstration Data',
    deviceMode: 'Simulated',
  };
}
