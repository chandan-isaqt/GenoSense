import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { GenoSenseProvider } from './context/GenoSenseContext';
import { Layout } from './components/layout/Layout';
import { Overview } from './pages/Overview';
import { GenomicAnalysis } from './pages/GenomicAnalysis';
import { AIPrediction } from './pages/AIPrediction';
import { Explainability } from './pages/Explainability';
import { Hardware } from './pages/Hardware';
import { Architecture } from './pages/Architecture';
import { DemoGuide } from './pages/DemoGuide';

export const App: React.FC = () => {
  return (
    <GenoSenseProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Overview />} />
            <Route path="genomic-analysis" element={<GenomicAnalysis />} />
            <Route path="ai-prediction" element={<AIPrediction />} />
            <Route path="explainability" element={<Explainability />} />
            <Route path="hardware" element={<Hardware />} />
            <Route path="architecture" element={<Architecture />} />
            <Route path="demo-guide" element={<DemoGuide />} />
            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </GenoSenseProvider>
  );
};

export default App;
