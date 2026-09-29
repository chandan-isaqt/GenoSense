import React from 'react';
import { HeroSection } from '../components/dashboard/HeroSection';
import { HeroDataStrip } from '../components/dashboard/HeroDataStrip';
import { ScientificPipelineSection } from '../components/dashboard/ScientificPipelineSection';
import { LaboratoryFullDemoSection } from '../components/dashboard/LaboratoryFullDemoSection';
import { VcfLaboratoryWorkspace } from '../components/genomic/VcfLaboratoryWorkspace';
import { LaboratoryAiModelSection } from '../components/ai/LaboratoryAiModelSection';
import { LaboratoryXaiSection } from '../components/shap/LaboratoryXaiSection';
import { LaboratoryHardwareBench } from '../components/hardware/LaboratoryHardwareBench';
import { LaboratoryArchitectureSection } from '../components/architecture/LaboratoryArchitectureSection';

export const Overview: React.FC = () => {
  return (
    <div className="space-y-16 animate-fadeIn">
      {/* Hero Section with Space Grotesk headline & Canvas rotating DNA */}
      <HeroSection />

      {/* Scientific Instrumentation Data Strip */}
      <HeroDataStrip />

      {/* Full Demo Experience: RUN FULL GENOSENSE DEMO */}
      <LaboratoryFullDemoSection />

      {/* SECTION 01 — THE PIPELINE */}
      <ScientificPipelineSection />

      {/* SECTION 02 — GENOMIC ANALYSIS */}
      <VcfLaboratoryWorkspace />

      {/* SECTION 03 — AI MODEL (Random Forest Inference) */}
      <LaboratoryAiModelSection />

      {/* SECTION 04 — EXPLAINABLE AI (SHAP) */}
      <LaboratoryXaiSection />

      {/* SECTION 05 & 06 — RASPBERRY PI & API TRANSACTION */}
      <LaboratoryHardwareBench />

      {/* SECTION 07 — FULL SYSTEM ARCHITECTURE */}
      <LaboratoryArchitectureSection />
    </div>
  );
};
