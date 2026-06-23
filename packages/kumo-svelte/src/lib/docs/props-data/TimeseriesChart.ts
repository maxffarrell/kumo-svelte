import type { PropRow } from '../prop-types';

const rows: PropRow[] = [
  {
    prop: 'echarts',
    type: 'any',
    required: true,
    description: 'The ECharts core instance imported by the consumer.'
  },
  {
    prop: 'type',
    type: "'line' | 'bar'",
    required: false,
    default: '"line"',
    description: 'Visual style of each series.'
  },
  {
    prop: 'data',
    type: 'TimeseriesData[]',
    required: true,
    description: 'Array of time series data to display on the chart.'
  },
  {
    prop: 'xAxisName',
    type: 'string',
    required: false,
    description: 'Label for the x-axis.'
  },
  {
    prop: 'xAxisTickCount',
    type: 'number',
    required: false,
    description: 'Number of ticks to display on the x-axis.'
  },
  {
    prop: 'xAxisTickFormat',
    type: '(value: number) => string',
    required: false,
    description: 'Custom formatter for x-axis tick labels.'
  },
  {
    prop: 'yAxisTickFormat',
    type: '(value: number) => string',
    required: false,
    description: 'Custom formatter for y-axis tick labels.'
  },
  {
    prop: 'yAxisTickLabelFormat',
    type: '(value: number) => string',
    required: false,
    description:
      'Deprecated: use tooltipValueFormat instead. Formats tooltip values, not y-axis tick labels.'
  },
  {
    prop: 'yAxisName',
    type: 'string',
    required: false,
    description: 'Label for the y-axis.'
  },
  {
    prop: 'yAxisTickCount',
    type: 'number',
    required: false,
    description: 'Number of ticks to display on the y-axis.'
  },
  {
    prop: 'tooltipValueFormat',
    type: '(value: number) => string',
    required: false,
    description:
      'Custom formatter for tooltip values. Takes precedence over yAxisTickLabelFormat.'
  },
  {
    prop: 'tooltipMode',
    type: "'all' | 'single'",
    required: false,
    default: '"all"',
    description:
      'Controls whether the native tooltip lists all series at the active timestamp or only the nearest series.'
  },
  {
    prop: 'tooltipMaxItems',
    type: 'number',
    required: false,
    default: '10',
    description:
      "Maximum number of series rows shown when tooltipMode is 'all'."
  },
  {
    prop: 'tooltipBoundary',
    type: "'clipping-ancestors' | Element | Element[]",
    required: false,
    description:
      'Constrains tooltip placement to the chart container when provided.'
  },
  {
    prop: 'tooltipFollowCursor',
    type: "'both' | 'x'",
    required: false,
    default: '"both"',
    description:
      'Controls whether the tooltip follows both cursor axes or locks to the chart top while following x.'
  },
  {
    prop: 'incomplete',
    type: '{ before?: number; after?: number }',
    required: false,
    description:
      'Indicates incomplete data periods with optional before/after timestamps in milliseconds.'
  },
  {
    prop: 'enableLegendSelection',
    type: 'boolean',
    required: false,
    default: 'false',
    description:
      'Adds a hidden ECharts legend so custom controls can drive series visibility through legendSelect, legendUnSelect, and legendToggleSelect actions.'
  },
  {
    prop: 'height',
    type: 'number',
    required: false,
    default: '350',
    description: 'Chart height in pixels.'
  },
  {
    prop: 'onTimeRangeChange',
    type: '(from: number, to: number) => void',
    required: false,
    description:
      'Callback fired when the user selects a time range via brush selection.'
  },
  {
    prop: 'isDarkMode',
    type: 'boolean',
    required: false,
    description: "When true, switches the chart to ECharts' dark theme."
  },
  {
    prop: 'gradient',
    type: 'boolean',
    required: false,
    default: 'false',
    description:
      'Renders a vertical gradient fill beneath line series. Has no effect for bars.'
  },
  {
    prop: 'loading',
    type: 'boolean',
    required: false,
    default: 'false',
    description: 'Hides the chart and displays an animated sine-wave skeleton.'
  },
  {
    prop: 'ariaDescription',
    type: 'string',
    required: false,
    description:
      'Accessible description passed to ECharts aria.label.description.'
  },
  {
    prop: 'optionUpdateBehavior',
    type: 'SetOptionOpts',
    required: false,
    description:
      'Additional options passed as the second argument to chart.setOption().'
  }
];

export default rows;
