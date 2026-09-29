import {
  DEMO_SAMPLE_ID,
  TOTAL_MARKERS,
  TOTAL_VARIANTS,
  TOTAL_FEATURES,
  RANDOM_FOREST_TREES,
  DEMO_RISK_SCORE,
  DEMO_RISK_LEVEL,
  DEMO_PROCESSING_TIME,
  DEMO_GENETIC_MARKERS,
  DEMO_DISEASE_SCORES,
  DEMO_SHAP_ATTRIBUTIONS,
} from '../data/demoData';
import { GeneticMarker, DiseaseScore, ShapAttribution } from '../types';

export const API_BASE_URL = 'http://localhost:5000/api/v1';

export interface HealthCheckResponse {
  status: 'ok' | 'degraded' | 'error';
  timestamp: string;
  version: string;
  model: {
    name: string;
    trees: number;
    features: number;
    status: string;
  };
  hardware: {
    edge_device: string;
    display: string;
    i2c_bus: number;
    connection: string;
  };
}

export interface DemoSampleResponse {
  sampleId: string;
  totalMarkers: number;
  totalVariants: number;
  totalFeatures: number;
  markers: GeneticMarker[];
}

export interface PredictionResponse {
  sampleId: string;
  riskScore: number;
  riskLevel: 'LOW' | 'MODERATE' | 'HIGH';
  processingTimeMs: number;
  randomForestTrees: number;
  diseaseScores: DiseaseScore[];
  topFeatures: string[];
}

export interface ShapResponse {
  sampleId: string;
  attributions: ShapAttribution[];
  baseValue: number;
}

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const apiService = {
  async healthCheck(): Promise<HealthCheckResponse> {
    await delay(350);
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
      version: '1.2.0-rc',
      model: {
        name: 'RandomForestClassifier',
        trees: RANDOM_FOREST_TREES,
        features: TOTAL_FEATURES,
        status: 'READY',
      },
      hardware: {
        edge_device: 'Raspberry Pi 4 Model B (4GB)',
        display: 'SSD1306 128x64 OLED via I2C',
        i2c_bus: 1,
        connection: 'ONLINE (Wi-Fi 802.11ac)',
      },
    };
  },

  async getDemoSample(): Promise<DemoSampleResponse> {
    await delay(500);
    return {
      sampleId: DEMO_SAMPLE_ID,
      totalMarkers: TOTAL_MARKERS,
      totalVariants: TOTAL_VARIANTS,
      totalFeatures: TOTAL_FEATURES,
      markers: DEMO_GENETIC_MARKERS,
    };
  },

  async extractMarkers(_vcfSnippet?: string): Promise<{ markers: GeneticMarker[]; count: number }> {
    await delay(700);
    return {
      markers: DEMO_GENETIC_MARKERS,
      count: DEMO_GENETIC_MARKERS.length,
    };
  },

  async predict(_features?: number[]): Promise<PredictionResponse> {
    await delay(800);
    return {
      sampleId: DEMO_SAMPLE_ID,
      riskScore: DEMO_RISK_SCORE,
      riskLevel: DEMO_RISK_LEVEL,
      processingTimeMs: DEMO_PROCESSING_TIME,
      randomForestTrees: RANDOM_FOREST_TREES,
      diseaseScores: DEMO_DISEASE_SCORES,
      topFeatures: ['GENE-A', 'GENE-B', 'GENE-D'],
    };
  },

  async explainShap(): Promise<ShapResponse> {
    await delay(600);
    return {
      sampleId: DEMO_SAMPLE_ID,
      attributions: DEMO_SHAP_ATTRIBUTIONS,
      baseValue: 0.22,
    };
  },

  async pushToOled(_lines: string[]): Promise<{ status: string; i2cAck: boolean }> {
    await delay(450);
    return {
      status: 'RENDER_SUCCESS',
      i2cAck: true,
    };
  },
};
