# GenoSense — “From Genomic Data to Explainable AI”

**GenoSense** is an interactive biotechnology + AI + hardware proof-of-concept demonstrating:
```
VCF/DNA Demo Data 
  → Genetic Marker Extraction 
  → Feature Engineering 
  → Random Forest Simulation 
  → Prototype Risk Score 
  → SHAP-style Explanation 
  → Flask API Simulation 
  → Raspberry Pi Simulation 
  → OLED Display 
  → Interactive Web Dashboard
```

> **IMPORTANT DISCLAIMER:**
> GenoSense is a research and educational proof-of-concept. Demonstration outputs use synthetic/demo data and are not clinically validated. This system must not be used for diagnosis, treatment, or medical decision-making.

---

## 🛠️ Technology Stack

- **Frontend:** React 18, Vite, TypeScript
- **Styling & Theme:** Tailwind CSS (Dark navy / biotech palette, glassmorphism, scanline OLED effects)
- **Routing:** React Router v6
- **Data Visualization:** Recharts (horizontal SHAP attribution & multi-disease prototype charts)
- **Animations:** Framer Motion (animated DNA double helix, sequential pipeline nodes, tactile 3D GPIO buttons)
- **Icons:** Lucide React

---

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Run the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) (or the active port displayed in your terminal).

### 3. Build for Production
```bash
npm run build
```

---

## 📁 Project Architecture & Folder Structure

```
src/
├── components/
│   ├── layout/
│   │   ├── Sidebar.tsx             # Persistent desktop sidebar & mobile drawer navigation
│   │   ├── Header.tsx              # Research prototype badges, quick action triggers, score counter
│   │   ├── Layout.tsx              # Main shell with layout wrappers & modal triggers
│   │   └── DisclaimerBanner.tsx    # Persistent compliance disclaimer
│   ├── dashboard/
│   │   ├── HeroSection.tsx         # Hero with animated 3D-CSS DNA double helix
│   │   ├── TechStackSection.tsx    # 6-tier modular stack overview
│   │   ├── SystemStatusCard.tsx    # Real-time health monitor (API, ML Model, SHAP, Pi, OLED)
│   │   └── FullDemoProgressCard.tsx# 9-step automated pipeline timeline with completion dossier
│   ├── genomic/
│   │   ├── VcfDropzone.tsx         # Drag-and-drop .vcf upload & demo sample selector
│   │   ├── ExtractionPipelineProgress.tsx # Sequential 4-step marker extraction pipeline
│   │   └── MarkerTable.tsx         # 24-marker genotype matrix with search & category filters
│   ├── ai/
│   │   ├── RandomForestCard.tsx    # 200-tree bagging ensemble execution panel
│   │   ├── ScoreCounter.tsx        # Animated risk score counter & non-clinical metrics
│   │   └── DiseaseComparisonChart.tsx # Multi-disease comparison bar chart (Recharts)
│   ├── shap/
│   │   ├── ShapBarChart.tsx        # Horizontal bar chart of TreeSHAP attributions
│   │   └── FeatureDetailsPanel.tsx # Granular gene attribution & biological context
│   ├── hardware/
│   │   ├── OledDisplay.tsx         # Emulated 128x64 SSD1306 OLED screen with hardware bezel
│   │   ├── GpioButtonControl.tsx   # Tactile 3D pressable GPIO button (Pin 17 interrupt)
│   │   ├── EdgeDeviceCard.tsx      # Raspberry Pi 4 Model B specs & status badges
│   │   └── ApiMonitor.tsx          # Real-time Flask API HTTP telemetry log
│   ├── architecture/
│   │   └── ArchitecturePipeline.tsx# Full animated topology with "✓ COMPLETE" node states
│   └── common/
│       ├── DnaAnimation.tsx        # Framer Motion animated double helix
│       └── ReportModal.tsx         # Comprehensive printable/exportable analysis dossier
│
├── pages/
│   ├── Overview.tsx                # Hero, 9-step full demo, tech stack, and system health
│   ├── GenomicAnalysis.tsx         # VCF upload, marker extraction, and marker matrix
│   ├── AIPrediction.tsx            # Random Forest ensemble and prototype risk score
│   ├── Explainability.tsx          # SHAP attribution bar chart & feature breakdown
│   ├── Hardware.tsx                # Raspberry Pi edge SBC, OLED screen, and GPIO controls
│   ├── Architecture.tsx            # End-to-end interactive system architecture
│   └── DemoGuide.tsx               # 30-second judge track, walkthrough, and raw VCF download
│
├── services/
│   └── api.ts                      # Simulated Flask API gateway with pluggable endpoints
├── data/
│   └── demoData.ts                 # 24 genetic markers, disease scores, SHAP values, sample VCF
├── context/
│   └── GenoSenseContext.tsx        # Centralized state provider shared across the entire application
├── hooks/
│   └── useGenoSenseDemo.ts         # Hook interface for accessing shared demo state
├── types/
│   └── index.ts                    # TypeScript interface definitions
├── App.tsx                         # App router configuration
└── main.tsx                        # Application mount point
```

---

## 🔌 Connecting a Real Flask Backend

The API layer in [`src/services/api.ts`](file:///Users/chandandas/GenoSense/src/services/api.ts) is pre-structured with endpoint stubs and comments:
```typescript
const API_BASE_URL = 'http://localhost:5000/api/v1';

// Replace simulated delays with live HTTP fetch:
const response = await fetch(`${API_BASE_URL}/predict`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ sampleId, features }),
});
return response.json();
```
