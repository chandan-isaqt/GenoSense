import React from 'react';
import { VcfLaboratoryWorkspace } from '../components/genomic/VcfLaboratoryWorkspace';
import { MarkerTable } from '../components/genomic/MarkerTable';

export const GenomicAnalysis: React.FC = () => {
  return (
    <div className="space-y-8 animate-fadeIn">
      {/* VCF Ingestion & Real-Time Extraction Pipeline */}
      <VcfLaboratoryWorkspace />

      {/* 24-Marker Genomic Dosage Matrix Table */}
      <MarkerTable />
    </div>
  );
};
