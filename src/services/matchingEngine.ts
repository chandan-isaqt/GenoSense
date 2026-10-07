import {
  ConditionId,
  ConditionScoreResult,
  FeatureContribution,
  MarkerRecord,
  MatchCategory,
  MatchedMarker,
  VariantRecord,
} from '../types/genomics';
import { DEMO_MARKER_CATALOG } from '../data/demoMarkers';

export function normalizeVariantId(raw: string): string {
  return raw.trim().toUpperCase().replace(/_/g, '-');
}

export function normalizeGeneSymbol(raw: string): string {
  return raw.trim().toUpperCase();
}

export function normalizeAllele(raw: string): string {
  return raw.trim().toUpperCase();
}

export function normalizeVariants(variants: VariantRecord[]): VariantRecord[] {
  return variants.map((v) => ({
    sample_id: v.sample_id.trim() || 'CUSTOM-SAMPLE',
    gene: normalizeGeneSymbol(v.gene),
    variant: normalizeVariantId(v.variant),
    allele: normalizeAllele(v.allele),
    genotype: Number.isFinite(Number(v.genotype)) ? Math.max(0, Math.min(2, Number(v.genotype))) : 0,
  }));
}

export function classifyMatchScore(score: number): MatchCategory {
  const clamped = Math.max(0, Math.min(100, Math.round(score)));
  if (clamped <= 24) return 'LOWER MATCH';
  if (clamped <= 49) return 'MODERATE MATCH';
  if (clamped <= 74) return 'HIGHER MATCH';
  return 'STRONGER MATCH';
}

export function matchVariantsAgainstCatalog(
  normalizedVariants: VariantRecord[],
  catalog: MarkerRecord[] = DEMO_MARKER_CATALOG
): MatchedMarker[] {
  const matched: MatchedMarker[] = [];

  for (const inputVar of normalizedVariants) {
    const catalogHit = catalog.find(
      (m) => normalizeVariantId(m.variant) === inputVar.variant
    );

    if (catalogHit) {
      const alleleMatches =
        normalizeAllele(catalogHit.riskAllele) === inputVar.allele;
      const hasRiskDosage = inputVar.genotype > 0;

      if (alleleMatches && hasRiskDosage) {
        matched.push({
          marker: catalogHit,
          inputVariant: inputVar,
          effectiveWeight: catalogHit.weight,
        });
      }
    }
  }

  return matched;
}

const CONDITION_METADATA: Record<
  ConditionId,
  { title: string; researchSubtitle: string }
> = {
  ALLERGY: {
    title: 'ALLERGY-RELATED PROFILE',
    researchSubtitle: 'Allergy-related research profile (non-diagnostic)',
  },
  DENGUE: {
    title: 'DENGUE SUSCEPTIBILITY PROFILE',
    researchSubtitle: 'Dengue susceptibility research profile (does not detect active infection)',
  },
  TYPHOID: {
    title: 'TYPHOID-RELATED PROFILE',
    researchSubtitle: 'Typhoid-related research profile (does not detect active infection)',
  },
};

export function calculateConditionScores(
  matchedMarkers: MatchedMarker[],
  catalog: MarkerRecord[] = DEMO_MARKER_CATALOG
): ConditionScoreResult[] {
  const conditionOrder: ConditionId[] = ['ALLERGY', 'DENGUE', 'TYPHOID'];

  return conditionOrder.map((condId) => {
    const applicableCatalogMarkers = catalog.filter((m) => m.conditionId === condId);
    const conditionMatches = matchedMarkers.filter(
      (mm) => mm.marker.conditionId === condId
    );

    const totalApplicableWeightSum = Number(
      applicableCatalogMarkers.reduce((acc, m) => acc + m.weight, 0).toFixed(4)
    );
    const matchedWeightSum = Number(
      conditionMatches.reduce((acc, mm) => acc + mm.effectiveWeight, 0).toFixed(4)
    );

    const rawRatio =
      totalApplicableWeightSum > 0
        ? (matchedWeightSum / totalApplicableWeightSum) * 100
        : 0;

    const score = Math.max(0, Math.min(100, Math.round(rawRatio)));
    const category = classifyMatchScore(score);
    const strongWeightCount = conditionMatches.filter(
      (mm) => mm.effectiveWeight >= 0.2
    ).length;

    const meta = CONDITION_METADATA[condId];

    const explanationSummary =
      conditionMatches.length > 0
        ? `${conditionMatches.length} of ${applicableCatalogMarkers.length} catalog markers matched (${matchedWeightSum.toFixed(2)} / ${totalApplicableWeightSum.toFixed(2)} weight sum) → ${score} (${category}).`
        : `0 of ${applicableCatalogMarkers.length} catalog markers matched in this profile → 0 (LOWER MATCH).`;

    return {
      conditionId: condId,
      conditionTitle: meta.title,
      researchSubtitle: meta.researchSubtitle,
      score,
      category,
      matchedMarkers: conditionMatches,
      totalApplicableMarkers: applicableCatalogMarkers.length,
      matchedWeightSum,
      totalApplicableWeightSum,
      explanationSummary,
      strongWeightCount,
    };
  });
}

export function generateFeatureContributions(
  matchedMarkers: MatchedMarker[]
): FeatureContribution[] {
  return [...matchedMarkers]
    .sort((a, b) => b.effectiveWeight - a.effectiveWeight)
    .map((mm) => ({
      markerId: mm.marker.markerId,
      gene: mm.marker.gene,
      variant: mm.marker.variant,
      condition: mm.marker.condition,
      weight: mm.effectiveWeight,
      formattedContribution: `+${mm.effectiveWeight.toFixed(2)}`,
      allele: mm.inputVariant.allele,
      genotype: mm.inputVariant.genotype,
      explanation: `${mm.marker.gene} (${mm.marker.variant}) matched risk allele ${mm.marker.riskAllele} with prototype weight +${mm.effectiveWeight.toFixed(2)} for ${mm.marker.condition}.`,
    }));
}
