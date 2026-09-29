import React from 'react';
import { LaboratoryHardwareBench } from '../components/hardware/LaboratoryHardwareBench';

export const Hardware: React.FC = () => {
  return (
    <div className="space-y-8 animate-fadeIn">
      <LaboratoryHardwareBench />
    </div>
  );
};
