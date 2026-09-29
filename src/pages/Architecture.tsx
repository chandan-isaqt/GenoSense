import React from 'react';
import { LaboratoryArchitectureSection } from '../components/architecture/LaboratoryArchitectureSection';
import { ScientificPipelineSection } from '../components/dashboard/ScientificPipelineSection';

export const Architecture: React.FC = () => {
  return (
    <div className="space-y-12 animate-fadeIn">
      <LaboratoryArchitectureSection />
      <ScientificPipelineSection />
    </div>
  );
};
