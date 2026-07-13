import { ChartPalette, type ChartSemanticColorName } from 'kumo-svelte/components/chart';

export type ThemeMode = 'dark' | 'light';

export const semanticColorNames: ChartSemanticColorName[] = [
  'Attention',
  'Warning',
  'Success',
  'Neutral',
  'Disabled',
  'Skeleton'
];

export const categoricalColorIndices = Array.from({ length: 6 }, (_, index) => index);

export const colorSystemRows = [
  {
    system: 'Semantic',
    when: 'Data has inherent polarity — good/bad, pass/fail, blocked/allowed',
    task: 'Evaluate',
    examples: 'WAF actions, Web Vitals, error rates, TLS versions'
  },
  {
    system: 'Categorical',
    when: 'Nominal categories with no inherent order or polarity',
    task: 'Identify',
    examples: 'Countries, URLs, ASNs, worker versions, service names'
  },
  {
    system: 'Sequential',
    when: 'Single metric varying in magnitude — more = darker',
    task: 'Read magnitude',
    examples: 'Choropleth maps, heatmaps, bot score histograms'
  }
];

export const sixSeries = ['US', 'EU', 'APAC', 'LATAM', 'MEA', 'Other'];
export const regionBaselines = [4820, 3610, 2190, 1120, 640, 870];
export const lineTimestamps = (() => {
  const end = Date.now();
  const step = 6 * 60 * 60 * 1000;
  return Array.from({ length: 28 }, (_, index) => end - (27 - index) * step);
})();

export const countrySlices = [
  { name: 'United States', value: 2000 },
  { name: 'United Kingdom', value: 1500 },
  { name: 'Germany', value: 1000 },
  { name: 'France', value: 500 },
  { name: 'Japan', value: 300 },
  { name: 'Canada', value: 250 }
];

export const barLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export const cacheData = {
  Hit: [18200, 19400, 21000, 20500, 22100, 16800, 15200],
  Miss: [4200, 4800, 5100, 4900, 5300, 3900, 3600],
  Revalidated: [2800, 3100, 3300, 3200, 3500, 2600, 2400],
  Expired: [1100, 1200, 1300, 1250, 1400, 1050, 950],
  Unknown: [900, 1000, 1100, 1050, 1150, 850, 780]
};

export const heatmapHours = ['00:00', '06:00', '12:00', '18:00'];
export const heatmapDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
export const heatmapValues = [
  [4, 12, 24, 36],
  [6, 14, 26, 38],
  [8, 16, 28, 40],
  [10, 18, 30, 42],
  [12, 20, 32, 44],
  [14, 22, 34, 46],
  [16, 24, 36, 48]
];

export const lineStyleBySeries: Record<string, 'solid' | 'dashed' | 'dotted'> = {
  US: 'dashed',
  EU: 'solid',
  APAC: 'dashed',
  LATAM: 'solid',
  MEA: 'dotted',
  Other: 'solid'
};

const deuteranopiaMatrix = [
  [0.367, 0.861, -0.228],
  [0.28, 0.673, 0.047],
  [-0.012, 0.043, 0.969]
] as const;

function clampChannel(value: number) {
  return Math.max(0, Math.min(255, Math.round(value)));
}

function hexToRgb(hex: string): [number, number, number] {
  const normalized = hex.replace('#', '');
  const chunk =
    normalized.length === 3
      ? normalized
          .split('')
          .map((character) => `${character}${character}`)
          .join('')
      : normalized;

  return [
    Number.parseInt(chunk.slice(0, 2), 16),
    Number.parseInt(chunk.slice(2, 4), 16),
    Number.parseInt(chunk.slice(4, 6), 16)
  ];
}

function rgbToHex([red, green, blue]: [number, number, number]) {
  return `#${[red, green, blue]
    .map((channel) => clampChannel(channel).toString(16).padStart(2, '0'))
    .join('')
    .toUpperCase()}`;
}

function srgbToLinear(channel: number) {
  const normalized = channel / 255;
  return normalized <= 0.04045 ? normalized / 12.92 : ((normalized + 0.055) / 1.055) ** 2.4;
}

function linearToSrgb(channel: number) {
  const clamped = Math.max(0, Math.min(1, channel));
  const encoded = clamped <= 0.0031308 ? clamped * 12.92 : 1.055 * clamped ** (1 / 2.4) - 0.055;
  return encoded * 255;
}

export function simulateCvdHex(hex: string) {
  const [red, green, blue] = hexToRgb(hex);
  const linearRed = srgbToLinear(red);
  const linearGreen = srgbToLinear(green);
  const linearBlue = srgbToLinear(blue);

  return rgbToHex([
    linearToSrgb(deuteranopiaMatrix[0][0] * linearRed + deuteranopiaMatrix[0][1] * linearGreen + deuteranopiaMatrix[0][2] * linearBlue),
    linearToSrgb(deuteranopiaMatrix[1][0] * linearRed + deuteranopiaMatrix[1][1] * linearGreen + deuteranopiaMatrix[1][2] * linearBlue),
    linearToSrgb(deuteranopiaMatrix[2][0] * linearRed + deuteranopiaMatrix[2][1] * linearGreen + deuteranopiaMatrix[2][2] * linearBlue)
  ]);
}

export function getModeFromElement(element: Element | null): ThemeMode | null {
  if (!element) return null;

  const mode = element.getAttribute('data-mode');
  if (mode === 'dark' || mode === 'light') return mode;
  if (element.classList.contains('dark')) return 'dark';
  if (element.classList.contains('light')) return 'light';

  return null;
}

export function getThemeModeFromDom(): ThemeMode | null {
  return getModeFromElement(document.documentElement) ?? getModeFromElement(document.body);
}

export function getIsDarkMode() {
  if (typeof document === 'undefined') return false;
  const mode = getThemeModeFromDom();
  if (mode) return mode === 'dark';
  return window.matchMedia?.('(prefers-color-scheme: dark)')?.matches ?? false;
}

export const semantic = (name: ChartSemanticColorName, isDarkMode = false) => ChartPalette.semantic(name, isDarkMode);

export function buildSeriesData(
  seed = 0,
  points = 50,
  stepMs = 60_000,
  timeScale = 1
): [number, number][] {
  const end = Date.now();
  const start = end - (points - 1) * stepMs;

  return Array.from({ length: points }, (_, index) => {
    const timestamp = start + index * stepMs;
    const trend = index * 0.15;
    const noise = (Math.random() - 0.5) * 8;
    const value = Math.round((30 + seed * 15 + trend + noise) * timeScale * 100) / 100;
    return [timestamp, value];
  });
}
