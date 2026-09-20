import type { PropRow } from '../prop-types';

const rows: PropRow[] = [
  { prop: 'landColor', type: 'string', required: false, description: 'Stroke color for the hatched land.' },
  { prop: 'landHatchSpacing', type: 'number', required: false, default: '10', description: 'Spacing between land hatch lines in view-box pixels.' },
  { prop: 'oceanColor', type: 'string', required: false, default: 'var(--color-kumo-base)', description: 'Fill behind the land and graticule.' },
  { prop: 'markers', type: 'GlobeMapMarker[]', required: false, default: '[]', description: 'Geographic points drawn above the land.' },
  { prop: 'markerColor', type: 'string', required: false, description: 'Default marker fill.' },
  { prop: 'markerRadius', type: 'number', required: false, default: '7', description: 'Default marker radius in view-box pixels.' },
  { prop: 'onMarkerClick', type: '(marker: GlobeMapMarker) => void', required: false, description: 'Called when a visible marker is clicked.' },
  { prop: 'defaultRotation', type: '[number, number, number]', required: false, default: '[-10, -20, 0]', description: 'Initial longitude, latitude, and roll rotation.' },
  { prop: 'draggable', type: 'boolean', required: false, default: 'true', description: 'Allows pointer and keyboard rotation.' },
  { prop: 'autoRotate', type: 'boolean', required: false, default: 'false', description: 'Continuously rotates the globe horizontally.' },
  { prop: 'autoRotateSpeed', type: 'number', required: false, default: '4', description: 'Horizontal auto-rotation speed in degrees per second.' },
  { prop: 'showGraticule', type: 'boolean', required: false, default: 'false', description: 'Draws latitude and longitude guides.' },
  { prop: 'showTooltip', type: 'boolean', required: false, default: 'true', description: 'Shows the Kumo-styled marker tooltip.' },
  { prop: 'onUserRotationChange', type: '(rotation: [number, number, number]) => void', required: false, description: 'Called after pointer or keyboard rotation.' },
  { prop: 'aria-label', type: 'string', required: false, default: 'Interactive globe map', description: 'Accessible label for the visualization.' },
  { prop: 'height', type: 'number', required: false, description: 'Fixed height in pixels; otherwise uses a square aspect ratio.' },
  { prop: 'class', type: 'string', required: false, description: 'Additional classes for the container.' },
  { prop: 'isDarkMode', type: 'boolean', required: false, description: 'Overrides automatic theme detection.' }
];

export default rows;
