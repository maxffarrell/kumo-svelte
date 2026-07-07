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
