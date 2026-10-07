import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { GenoSenseProvider } from './context/GenoSenseContext';
import { Layout } from './components/layout/Layout';
import { Home } from './pages/Home';
import { Analyze } from './pages/Analyze';
import { Results } from './pages/Results';
import { Device } from './pages/Device';
import { HowItWorks } from './pages/HowItWorks';
import { Technical } from './pages/Technical';
import { Report } from './pages/Report';
import { DemoMode } from './pages/DemoMode';

export const App: React.FC = () => {
  return (
    <ThemeProvider>
      <GenoSenseProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="analyze" element={<Analyze />} />
              <Route path="results" element={<Results />} />
              <Route path="device" element={<Device />} />
              <Route path="how-it-works" element={<HowItWorks />} />
              <Route path="technical" element={<Technical />} />
              <Route path="report" element={<Report />} />
              <Route path="demo" element={<DemoMode />} />
              {/* Fallback */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </GenoSenseProvider>
    </ThemeProvider>
  );
};

export default App;
