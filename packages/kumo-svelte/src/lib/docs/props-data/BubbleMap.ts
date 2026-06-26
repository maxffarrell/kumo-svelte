import type { PropRow } from '../prop-types';

const rows: PropRow[] = [
  {
    prop: 'echarts',
    type: 'any',
    required: true,
    description: 'The ECharts core instance imported by the consumer.'
  },
  {
    prop: 'geoJson',
    type: 'MapGeoJson',
    required: true,
    description: 'GeoJSON FeatureCollection for the map base.'
  },
  {
    prop: 'mapName',
    type: 'string',
    required: false,
    description:
      'Stable ECharts map registry name. Invalid characters are replaced with dashes.'
  },
  {
    prop: 'data',
    type: 'T[]',
    required: true,
    description: 'Rows to plot as bubbles.'
  },
  {
    prop: 'lng',
    type: 'MapAccessor<T, number>',
    required: true,
    description: 'Longitude accessor: a row key or function.'
  },
  {
    prop: 'lat',
    type: 'MapAccessor<T, number>',
    required: true,
    description: 'Latitude accessor: a row key or function.'
  },
  {
    prop: 'value',
    type: 'MapAccessor<T, number>',
    required: true,
    description: 'Numeric value accessor used to size bubbles.'
  },
  {
    prop: 'name',
    type: 'MapAccessor<T, string>',
    required: false,
    description: 'Optional label accessor used by the default tooltip.'
  },
  {
    prop: 'minRadius',
    type: 'number',
    required: false,
    default: '6',
    description: 'Smallest bubble radius in pixels.'
  },
  {
    prop: 'maxRadius',
    type: 'number',
    required: false,
    default: '26',
    description: 'Largest bubble radius in pixels.'
  },
  {
    prop: 'bubbleSize',
    type: '(value: number) => number',
    required: false,
    description:
      'Explicit bubble radius function. Overrides minRadius/maxRadius scaling.'
  },
  {
    prop: 'bubbleColor',
    type: 'MapStyle<T, string>',
    required: false,
    description: 'Bubble fill color as a constant or row function.'
  },
  {
    prop: 'bubbleBorderColor',
    type: 'MapStyle<T, string>',
    required: false,
    default: '"transparent"',
    description: 'Bubble border color as a constant or row function.'
  },
  {
    prop: 'bubbleBorderWidth',
    type: 'MapStyle<T, number>',
    required: false,
    default: '0',
    description: 'Bubble border width as a constant or row function.'
  },
  {
    prop: 'center',
    type: '[number, number]',
    required: false,
    description: 'Map center as [longitude, latitude]. Defaults to auto-fit.'
  },
  {
    prop: 'zoom',
    type: 'number',
    required: false,
    default: '1.25',
    description: 'Zoom level as a multiple of the auto-fit scale.'
  },
  {
    prop: 'roam',
    type: 'boolean',
    required: false,
    default: 'true',
    description: 'Enables drag-to-pan and scroll-to-zoom.'
  },
  {
    prop: 'showTooltip',
    type: 'boolean',
    required: false,
    default: 'true',
    description: 'Whether to show the default map tooltip.'
  },
  {
    prop: 'valueFormat',
    type: '(value: number) => string',
    required: false,
    description: 'Formats values in the default tooltip.'
  },
  {
    prop: 'tooltipFormatter',
    type: '(row: T) => string',
    required: false,
    description:
      'Custom HTML tooltip formatter. Escape user-provided strings before returning.'
  },
  {
    prop: 'onBubbleHover',
    type: '(row: T | undefined) => void',
    required: false,
    description: 'Callback fired as the pointer enters or leaves a bubble.'
  },
  {
    prop: 'onBubbleClick',
    type: '(row: T) => void',
    required: false,
    description: 'Callback fired when a bubble is clicked.'
  },
  {
    prop: 'height',
    type: 'number',
    required: false,
    default: '400',
    description: 'Chart height in pixels.'
  },
  {
    prop: 'class',
    type: 'string',
    required: false,
    description: 'Additional classes merged onto the chart element.'
  },
  {
    prop: 'isDarkMode',
    type: 'boolean',
    required: false,
    description:
      'When true, switches map and bubble palette choices for dark mode.'
  }
];

export default rows;
