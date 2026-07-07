enum ChartCategoricalLightColors {
  Blue = "#4290F0",
  Yellow = "#F5B647",
  Pink = "#E8649D",
  Purple = "#8D58EE",
  Teal = "#50C3B6",
  Orange = "#D37536",
}

enum ChartCategoricalDarkColors {
  Blue = "#4290F0",
  Yellow = "#EEB720",
  Pink = "#E8649D",
  Purple = "#8D58EE",
  Teal = "#50C3B6",
  Orange = "#D37536",
}

enum ChartSemanticLightColors {
  Attention = "#FC574A",
  Warning = "#F8A054",
  Success = "#00A63E",
  Neutral = "#B9D6FF",
  Disabled = "#CBCBCB",
  Skeleton = "#DDDDDD",
}

enum ChartSemanticDarkColors {
  Attention = "#FC574A",
  Warning = "#F8A054",
  Success = "#00A63E",
  Neutral = "#8EC5FF",
  Disabled = "#878787",
  Skeleton = "#5C5C5C",
}

export type ChartSemanticColorName =
  | "Attention"
  | "Warning"
  | "Success"
  | "Neutral"
  | "Disabled"
  | "Skeleton";

const sequentialLight = {
  blues: ["#E1EAF4", "#8EBCF6", "#4290F0", "#0E58B4", "#03254F"],
};

const sequentialDark = {
  blues: ["#03254F", "#0E58B4", "#4290F0", "#A6BFDD", "#E1EAF4"],
};

/** Colours for GeoJSON-based map charts. */
export interface MapColors {
  /** Fill for land regions. */
  area: string;
  /** Default bubble fill (the chart palette blue). */
  bubble: string;
  /** Sequential choropleth scale. */
  scale: string[];
}

/** Neutral land fill per mode; bubbles use the shared categorical palette. */
const mapAreaByMode = {
  light: "#E5E7EB",
  dark: "#2B2C31",
} as const;

export const CHART_LIGHT_COLORS = [
  ChartCategoricalLightColors.Blue,
  ChartCategoricalLightColors.Yellow,
  ChartCategoricalLightColors.Pink,
  ChartCategoricalLightColors.Purple,
  ChartCategoricalLightColors.Teal,
  ChartCategoricalLightColors.Orange,
];

export const CHART_DARK_COLORS = [
  ChartCategoricalDarkColors.Blue,
  ChartCategoricalDarkColors.Yellow,
  ChartCategoricalDarkColors.Pink,
  ChartCategoricalDarkColors.Purple,
  ChartCategoricalDarkColors.Teal,
  ChartCategoricalDarkColors.Orange,
];

export namespace ChartPalette {
  export function semantic(
    name: ChartSemanticColorName,
    isDarkMode = false,
  ): string {
    return isDarkMode
      ? ChartSemanticDarkColors[name]
      : ChartSemanticLightColors[name];
  }

  export function categorical(index: number, isDarkMode = false): string {
    return isDarkMode
      ? CHART_DARK_COLORS[index % CHART_DARK_COLORS.length]
      : CHART_LIGHT_COLORS[index % CHART_LIGHT_COLORS.length];
  }

  export function sequential(
    palette: keyof typeof sequentialLight,
    isDarkMode = false,
  ): string[] {
    return isDarkMode
      ? [...sequentialDark[palette]]
      : [...sequentialLight[palette]];
  }

  export function text(variant: "primary" | "secondary", isDarkMode = false) {
    const colors = {
      light: { primary: "#6B7280", secondary: "#9CA3AF" },
      dark: { primary: "#9CA3AF", secondary: "#6B7280" },
    };
    return isDarkMode ? colors.dark[variant] : colors.light[variant];
  }

  /** Returns colors for GeoJSON-based map charts. */
  export function mapColors(isDarkMode = false): MapColors {
    const mode = isDarkMode ? "dark" : "light";

    return {
      area: mapAreaByMode[mode],
      bubble: categorical(0, isDarkMode),
      scale: sequential("blues", isDarkMode),
    };
  }
}
