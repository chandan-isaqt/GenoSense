import React from 'react';
import { useGenoSenseDemo } from '../../hooks/useGenoSenseDemo';

export const HeroDataStrip: React.FC = () => {
  const { totalMarkers, randomForestTrees } = useGenoSenseDemo();

  return (
    <div className="w-full border-y border-[#182532] bg-[#080D14]/80 py-4 px-4 sm:px-8 my-6">
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 divide-y md:divide-y-0 md:divide-x divide-[#182532]">
        {/* Metric 01 */}
        <div className="flex flex-col items-center justify-center text-center p-2">
          <span className="text-2xl sm:text-3xl font-display font-bold text-[#F4F7FA] tracking-tight">
            {totalMarkers || 24}
          </span>
          <span className="text-[11px] font-mono uppercase tracking-widest text-[#8B9AAA] mt-0.5">
            MARKERS
          </span>
        </div>

        {/* Metric 02 */}
        <div className="flex flex-col items-center justify-center text-center p-2">
          <span className="text-2xl sm:text-3xl font-display font-bold text-[#35D6C7] tracking-tight">
            {randomForestTrees || 200}
          </span>
          <span className="text-[11px] font-mono uppercase tracking-widest text-[#8B9AAA] mt-0.5">
            RF TREES
          </span>
        </div>

        {/* Metric 03 */}
        <div className="flex flex-col items-center justify-center text-center p-2">
          <span className="text-2xl sm:text-3xl font-display font-bold text-[#4DA3FF] tracking-tight">
            SHAP
          </span>
          <span className="text-[11px] font-mono uppercase tracking-widest text-[#8B9AAA] mt-0.5">
            EXPLAINABILITY
          </span>
        </div>

        {/* Metric 04 */}
        <div className="flex flex-col items-center justify-center text-center p-2">
          <span className="text-2xl sm:text-3xl font-display font-bold text-[#F4F7FA] tracking-tight">
            RASPBERRY PI
          </span>
          <span className="text-[11px] font-mono uppercase tracking-widest text-[#8B9AAA] mt-0.5">
            EDGE DEVICE
          </span>
        </div>
      </div>
    </div>
  );
};
