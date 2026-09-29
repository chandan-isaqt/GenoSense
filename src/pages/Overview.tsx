import React from 'react';
import { HeroProductIntro } from '../components/presentation/HeroProductIntro';
import { ProblemSection } from '../components/presentation/ProblemSection';
import { MeetTheDeviceSection } from '../components/presentation/MeetTheDeviceSection';
import { ButtonFlowSection } from '../components/presentation/ButtonFlowSection';
import { LiveDeviceSimulation } from '../components/presentation/LiveDeviceSimulation';
import { SimpleHowItWorks } from '../components/presentation/SimpleHowItWorks';
import { WebDashboardResultSection } from '../components/presentation/WebDashboardResultSection';
import { ResultExplanationSection } from '../components/presentation/ResultExplanationSection';
import { TechnicalArchitectureSection } from '../components/presentation/TechnicalArchitectureSection';
import { FullSystemDemoSection } from '../components/presentation/FullSystemDemoSection';
import { ResearchDisclaimerSection } from '../components/presentation/ResearchDisclaimerSection';
import { FirstTimeUserGuideModal } from '../components/presentation/FirstTimeUserGuideModal';

export const Overview: React.FC = () => {
  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="space-y-16 animate-fadeIn pb-12">
      {/* 01: What is GenoSense? (Cinematic Product Introduction) */}
      <HeroProductIntro
        onExploreHowItWorks={() => scrollToSection('how-it-works')}
        onTryGenoSense={() => scrollToSection('full-demo')}
      />

      {/* 02: What problem does it address? (The Challenge in Modern Genomics) */}
      <ProblemSection />

      {/* 03: Meet the device (Meet the GenoSense Edge Device & Component Cards) */}
      <MeetTheDeviceSection />

      {/* 04: What happens when the button is pressed? (6-Stage Interactive Sequence) */}
      <ButtonFlowSection />

      {/* 05: Try the device (Live Device Simulation & Synchronized Split-Screen) */}
      <LiveDeviceSimulation />

      {/* 06: How the AI pipeline works (Simple 5-Step Story) */}
      <SimpleHowItWorks />

      {/* 07: Analysis result (Web Dashboard Result Experience: 73% HIGH + Features) */}
      <WebDashboardResultSection />

      {/* 08: Why the model produced the result (Plain-Language Explanation & Progressive Disclosure) */}
      <ResultExplanationSection />

      {/* 09: Technical architecture (Under the Hood - Optional Expandable Details) */}
      <TechnicalArchitectureSection />

      {/* 10: Full system demo (See GenoSense in Action - Step-by-Step Guided Demo) */}
      <FullSystemDemoSection />

      {/* 11: Limitations / research disclaimer (Research Prototype Disclaimer) */}
      <ResearchDisclaimerSection />

      {/* First-Time User Guide Floating Control & Modal */}
      <FirstTimeUserGuideModal
        onStartDemo={() => scrollToSection('full-demo')}
      />
    </div>
  );
};

export default Overview;
