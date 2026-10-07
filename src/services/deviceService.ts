import { AnalysisResult, DeviceHotspot, OledDisplayStep } from '../types/genomics';

export const DEVICE_HOTSPOTS: DeviceHotspot[] = [
  {
    id: 'oled',
    label: 'OLED',
    shortTitle: '128×64 Monochrome OLED Display',
    description: 'Displays the prototype model output.',
    details:
      'Communicates over I2C (0x3C) to show live processing steps and the final calculated prototype marker-match score.',
    position: [-0.45, 0.22, 0.92],
  },
  {
    id: 'button',
    label: 'ANALYZE BUTTON',
    shortTitle: 'Physical Tactile Analyze Switch',
    description: 'Starts the analysis workflow.',
    details:
      'Wired to GPIO Pin 17 in the planned hardware build, allowing one-touch execution of the variant matching pipeline.',
    position: [0.68, 0.08, 0.92],
  },
  {
    id: 'rpi',
    label: 'RASPBERRY PI',
    shortTitle: 'Internal Single-Board Computer',
    description: 'Acts as the edge-side client in the planned hardware implementation.',
    details:
      'Mounted inside the matte protective enclosure; handles local I/O, button interrupts, and API synchronization.',
    position: [0.0, -0.15, 0.0],
  },
  {
    id: 'led',
    label: 'STATUS LIGHT',
    shortTitle: 'Multi-State Status LED',
    description: 'Indicates system readiness and active analysis.',
    details:
      'Pulses amber during variant matching and illuminates steady teal when the result is synchronized.',
    position: [0.68, 0.42, 0.92],
  },
  {
    id: 'connectivity',
    label: 'CONNECTIVITY',
    shortTitle: 'Wi-Fi & USB-C Telemetry Interface',
    description: 'Synchronizes the edge device with the web interface.',
    details:
      'Ensures that both the physical OLED display and the web application reflect the exact same analysis output.',
    position: [-0.95, -0.1, -0.6],
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
        line3: 'WAITING FOR INPUT',
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
