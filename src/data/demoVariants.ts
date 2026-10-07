import { SampleProfile, VariantRecord } from '../types/genomics';

export const DEMO_VARIANTS: VariantRecord[] = [
  { sample_id: 'GS-DEMO-001', gene: 'GENE-A', variant: 'VAR-001', allele: 'A', genotype: 2 },
  { sample_id: 'GS-DEMO-001', gene: 'GENE-B', variant: 'VAR-002', allele: 'G', genotype: 2 },
  { sample_id: 'GS-DEMO-001', gene: 'GENE-C', variant: 'VAR-003', allele: 'G', genotype: 1 },
  { sample_id: 'GS-DEMO-001', gene: 'GENE-D', variant: 'VAR-004', allele: 'T', genotype: 1 },
  { sample_id: 'GS-DEMO-001', gene: 'GENE-E', variant: 'VAR-005', allele: 'T', genotype: 0 },
  { sample_id: 'GS-DEMO-001', gene: 'GENE-F', variant: 'VAR-006', allele: 'A', genotype: 0 },
  { sample_id: 'GS-DEMO-001', gene: 'GENE-G', variant: 'VAR-007', allele: 'C', genotype: 2 },
  { sample_id: 'GS-DEMO-001', gene: 'GENE-H', variant: 'VAR-008', allele: 'A', genotype: 1 },
  { sample_id: 'GS-DEMO-001', gene: 'GENE-I', variant: 'VAR-009', allele: 'C', genotype: 0 },
  { sample_id: 'GS-DEMO-001', gene: 'GENE-J', variant: 'VAR-010', allele: 'A', genotype: 0 },
  { sample_id: 'GS-DEMO-001', gene: 'GENE-K', variant: 'VAR-011', allele: 'G', genotype: 0 },
  { sample_id: 'GS-DEMO-001', gene: 'GENE-L', variant: 'VAR-012', allele: 'T', genotype: 0 },
  { sample_id: 'GS-DEMO-001', gene: 'GENE-M', variant: 'VAR-013', allele: 'C', genotype: 0 },
  { sample_id: 'GS-DEMO-001', gene: 'GENE-N', variant: 'VAR-014', allele: 'G', genotype: 1 },
  { sample_id: 'GS-DEMO-001', gene: 'GENE-O', variant: 'VAR-015', allele: 'A', genotype: 0 },
  { sample_id: 'GS-DEMO-001', gene: 'GENE-P', variant: 'VAR-016', allele: 'T', genotype: 1 },
  { sample_id: 'GS-DEMO-001', gene: 'GENE-Q', variant: 'VAR-017', allele: 'C', genotype: 0 },
  { sample_id: 'GS-DEMO-001', gene: 'GENE-R', variant: 'VAR-018', allele: 'G', genotype: 0 },
  { sample_id: 'GS-DEMO-001', gene: 'GENE-S', variant: 'VAR-019', allele: 'A', genotype: 1 },
  { sample_id: 'GS-DEMO-001', gene: 'GENE-T', variant: 'VAR-020', allele: 'C', genotype: 0 },
];

export const DEMO_SAMPLE_PROFILE: SampleProfile = {
  sampleId: 'GS-DEMO-001',
  age: 10,
  sex: 'Male',
  dataType: 'Synthetic Demo Profile',
  variants: DEMO_VARIANTS,
};

export const DEMO_CSV_CONTENT = [
  'sample_id,gene,variant,allele,genotype',
  ...DEMO_VARIANTS.map(
    (v) => `${v.sample_id},${v.gene},${v.variant},${v.allele},${v.genotype}`
  ),
].join('\n');

export const SCIENTIFIC_SAFETY_DISCLAIMER =
  'GenoSense is a research and educational proof-of-concept. This demonstration uses synthetic data and is not clinically validated. It must not be used for diagnosis, treatment, or medical decision-making.';
