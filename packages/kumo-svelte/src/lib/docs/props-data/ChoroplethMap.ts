import type { PropRow } from "../prop-types";

const rows: PropRow[] = [
  {
    prop: "echarts",
    type: "any",
    required: true,
    description: "The ECharts core instance imported by the consumer.",
  },
  {
    prop: "geoJson",
    type: "MapGeoJson",
    required: true,
    description: "GeoJSON FeatureCollection whose regions are shaded by value.",
  },
  {
    prop: "mapName",
    type: "string",
    required: false,
    description:
      "Stable ECharts map registry name. Invalid characters are replaced with dashes.",
  },
  {
    prop: "data",
    type: "T[]",
    required: true,
    description: "Rows joined to GeoJSON features.",
  },
  {
    prop: "name",
    type: "MapAccessor<T, string>",
    required: true,
    description: "Region key accessor used to join rows to GeoJSON features.",
  },
  {
    prop: "value",
    type: "MapAccessor<T, number>",
    required: true,
    description: "Numeric value accessor used for the region fill scale.",
  },
  {
    prop: "nameProperty",
    type: "string",
    required: false,
    default: '"name"',
    description: "GeoJSON feature property used for the data join.",
  },
  {
    prop: "colorRange",
    type: "string[]",
    required: false,
    description: "Sequential color ramp from low to high values.",
  },
  {
    prop: "min",
    type: "number",
    required: false,
    description: "Lower bound for the continuous scale.",
  },
  {
    prop: "max",
    type: "number",
    required: false,
    description: "Upper bound for the continuous scale.",
  },
  {
    prop: "noDataColor",
    type: "string",
    required: false,
    description: "Fill color for GeoJSON regions without a matching data row.",
  },
  {
    prop: "showLegend",
    type: "boolean",
    required: false,
    default: "false",
    description: "Whether to show the ECharts visualMap legend.",
  },
  {
    prop: "showTooltip",
    type: "boolean",
    required: false,
    default: "true",
    description: "Whether to show the default map tooltip.",
  },
  {
    prop: "valueFormat",
    type: "(value: number) => string",
    required: false,
    description: "Formats values in the default tooltip.",
  },
  {
    prop: "tooltipFormatter",
    type: "(row: T) => string",
    required: false,
    description:
      "Custom HTML tooltip formatter. Escape user-provided strings before returning.",
  },
  {
    prop: "center",
    type: "[number, number]",
    required: false,
    description: "Map center as [longitude, latitude]. Defaults to auto-fit.",
  },
  {
    prop: "zoom",
    type: "number",
    required: false,
    default: "1.25",
    description: "Zoom level as a multiple of the auto-fit scale.",
  },
  {
    prop: "roam",
    type: "boolean",
    required: false,
    default: "false",
    description: "Enables drag-to-pan and scroll-to-zoom.",
  },
  {
    prop: "projection",
    type: "MapProjection | null",
    required: false,
    description:
      "Geographic projection. Defaults to latitude-clamped Mercator; use null for raw coordinates.",
  },
  {
    prop: "aspectRatio",
    type: "number | string",
    required: false,
    description:
      "Container aspect ratio. Defaults to the projected map window.",
  },
  {
    prop: "height",
    type: "number",
    required: false,
    description: "Fixed chart height in pixels. Overrides aspectRatio.",
  },
  {
    prop: "class",
    type: "string",
    required: false,
    description: "Additional classes merged onto the chart element.",
  },
  {
    prop: "isDarkMode",
    type: "boolean",
    required: false,
    description:
      "When true, switches map and region palette choices for dark mode.",
  },
  {
    prop: "chartRef",
    type: "EChartsType | null",
    required: false,
    description: "Bindable chart instance reference.",
  },
  {
    prop: "onRegionHover",
    type: "(row: T | undefined) => void",
    required: false,
    description:
      "Callback fired as the pointer enters or leaves a region with data.",
  },
  {
    prop: "onRegionClick",
    type: "(row: T) => void",
    required: false,
    description: "Callback fired when a region with data is clicked.",
  },
];

export default rows;
