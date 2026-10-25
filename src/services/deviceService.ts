import { AnalysisResult, DeviceHotspot, OledDisplayStep } from '../types/genomics';

export const DEVICE_HOTSPOTS: DeviceHotspot[] = [
  {
    id: 'oled',
    label: 'OLED',
    shortTitle: '0.96" I2C Monochrome OLED Display',
    description: 'Displays real-time GenoSense system status and calculated risk profile output.',
    details:
      'Communicates over I2C (0x3C) with the Raspberry Pi 4 edge compute module. Shows deterministic variant match scores and live pipeline telemetry.',
    anchor: [-0.005, 0.22, 0.505],
    position: [0.0, 0.56, 0.42],
  },
  {
    id: 'button',
    label: 'ANALYZE BUTTON',
    shortTitle: 'Tactile Physical Analyze Switch',
    description: 'Triggers the on-device genomic variant matching engine.',
    details:
      'Hardware tactile push switch with chrome bezel and purple actuator, wired to GPIO Pin 17 for instant single-touch pipeline execution.',
    anchor: [-0.178, -0.134, 0.774],
    position: [-0.54, -0.32, 0.85],
  },
  {
    id: 'led',
    label: 'STATUS LIGHT',
    shortTitle: '3-State System Status Indicators',
    description: 'Triple indicator LEDs indicating Ready, Processing, and Error states.',
    details:
      'Green LED indicates system readiness, middle LED pulses during active variant matching, and red LED flags errors.',
    anchor: [0.26, -0.134, 0.774],
    position: [0.54, -0.32, 0.85],
  },
  {
    id: 'rpi',
    label: 'RASPBERRY PI',
    shortTitle: 'Raspberry Pi 4 Edge Compute Module',
    description: 'Acts as the edge-side compute client inside the protective enclosure.',
    details:
      'Internal 4GB quad-core SBC that handles local I/O interrupts, executes deterministic variant matching, and drives the I2C OLED display.',
    anchor: [0.046, -0.318, -0.147],
    position: [-0.74, 0.22, 0.2],
  },
  {
    id: 'connectivity',
    label: 'CONNECTIVITY',
    shortTitle: 'Telemetry & Power Interface',
    description: 'Synchronizes edge analysis state with the web dashboard.',
    details:
      'Includes 5V 3A DC buck power regulation, Wi-Fi telemetry sync, and external I/O ports along the matte black side panel.',
    anchor: [0.58, -0.18, 0.0],
    position: [0.86, -0.1, 0.0],
  },
];

export interface OledScreenContent {
  line1: string;
  line2: string;
  line3: string;
  isBusy: boolean;
}

export function getOledScreenContent(
  step: OledDisplayStep,
  result: AnalysisResult | null
): OledScreenContent {
  switch (step) {
    case 'READY':
      return {
        line1: 'GENOSENSE',
        line2: 'READY',
        line3: 'PRESS TO ANALYZE',
        isBusy: false,
      };
    case 'ANALYZING...':
      return {
        line1: 'GENOSENSE',
        line2: 'ANALYZING...',
        line3: 'STARTING ENGINE',
        isBusy: true,
      };
    case 'READING SAMPLE...':
      return {
        line1: 'GENOSENSE',
        line2: 'READING SAMPLE...',
        line3: '20 VARIANTS',
        isBusy: true,
      };
    case 'MATCHING MARKERS...':
      return {
        line1: 'GENOSENSE',
        line2: 'MATCHING MARKERS...',
        line3: '13 CATALOG LOCI',
        isBusy: true,
      };
    case 'CALCULATING...':
      return {
        line1: 'GENOSENSE',
        line2: 'CALCULATING...',
        line3: 'WEIGHTED SCORE',
        isBusy: true,
      };
    case 'RESULT READY':
      return {
        line1: 'GENOSENSE',
        line2: 'RESULT READY',
        line3: 'SYNCING OUTPUT',
        isBusy: false,
      };
    case 'FINAL_SCORE': {
      const score = result ? result.primaryScore : 72;
      const category = result ? result.primaryCategory : 'HIGHER MATCH';
      return {
        line1: 'GENOSENSE',
        line2: `${score}%`,
        line3: category,
        isBusy: false,
      };
    }
  }
}
