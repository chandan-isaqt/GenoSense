import React from 'react';
import { HeroSection } from '../components/dashboard/HeroSection';
import { TechStackSection } from '../components/dashboard/TechStackSection';
import { SystemStatusCard } from '../components/dashboard/SystemStatusCard';
import { FullDemoProgressCard } from '../components/dashboard/FullDemoProgressCard';

export const Overview: React.FC = () => {
  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Hero Section with DNA animation & CTA triggers */}
      <HeroSection />

      {/* 9-Step Full Demo Execution Timeline */}
      <FullDemoProgressCard />

      {/* Technology Stack 6-Tier Architecture */}
      <TechStackSection />

      {/* Real-time Subsystem Status Panel */}
      <SystemStatusCard />
    </div>
  );
};
