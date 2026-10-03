import React from 'react';
import { CinematicDeviceHero } from '../components/futuristic/CinematicDeviceHero';
import { WhatIsGenoSenseSection } from '../components/futuristic/WhatIsGenoSenseSection';
import { DeviceStorySection } from '../components/futuristic/DeviceStorySection';
import { RealHardwareReferenceSection } from '../components/futuristic/RealHardwareReferenceSection';
import { DeviceInternalViewSection } from '../components/futuristic/DeviceInternalViewSection';
import { InteractiveButtonExperience } from '../components/futuristic/InteractiveButtonExperience';
import { TheSimpleStorySequence } from '../components/futuristic/TheSimpleStorySequence';
import { InsideIntelligenceSection } from '../components/futuristic/InsideIntelligenceSection';
import { ShapExplanationSection } from '../components/futuristic/ShapExplanationSection';
import { WebDeviceSyncSection } from '../components/futuristic/WebDeviceSyncSection';
import { FuturisticLiveDemoArea } from '../components/futuristic/FuturisticLiveDemoArea';
import { TechnicalModeSection } from '../components/futuristic/TechnicalModeSection';
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
    <div className="space-y-16 animate-fadeIn pb-16">
      {/* 01: Hero Product Introduction */}
      <CinematicDeviceHero
        onExperienceDemo={() => scrollToSection('demo')}
        onExploreHowItWorks={() => scrollToSection('how-it-works')}
      />

      {/* 02: What is GenoSense? (DNA -> GENOSENSE -> AI -> DEVICE -> WEB) */}
      <WhatIsGenoSenseSection />

      {/* 03: What does the device look like? (Enclosure Showcase + WHAT YOU SEE pointers) */}
      <DeviceStorySection />

      {/* 04: What does each part do? (Built with real components: RPi 4 + OLED + Button + Enclosure) */}
      <RealHardwareReferenceSection />

      {/* 05: What is inside? (Interactive Cutaway: OLED -> RPi -> GPIO -> Button -> Wi-Fi) */}
      <DeviceInternalViewSection />

      {/* 06: What happens when I press analyze? (Press Analyze. Watch what happens. 7 stages) */}
      <InteractiveButtonExperience />

      {/* 07: How does the data reach the AI? (6-Chapter Simple Story Sequence) */}
      <TheSimpleStorySequence />

      {/* 08: How does AI produce the model output? (200 Trees Convergence -> 73% Output) */}
      <InsideIntelligenceSection />

      {/* 09: How does SHAP explain it? (Why did the model produce this output?) */}
      <ShapExplanationSection />

      {/* 10: How does the result reach the device & web? (One result. Two interfaces. SYNCED) */}
      <WebDeviceSyncSection />

      {/* 11: Try the live demo (Now, try GenoSense yourself) */}
      <FuturisticLiveDemoArea onSeeWhy={() => scrollToSection('shap')} />

      {/* 12: Technical Architecture (Expandable Complete Pipeline View) */}
      <TechnicalModeSection />

      {/* 13: Limitations & Research Disclaimer */}
      <ResearchDisclaimerSection />

      {/* Floating Interactive Help Modal */}
      <FirstTimeUserGuideModal
        onStartDemo={() => scrollToSection('demo')}
      />
    </div>
  );
};

export default Overview;
