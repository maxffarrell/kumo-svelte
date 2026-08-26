import type { PropRow } from '../prop-types';

const rows: PropRow[] = [
  {
    "prop": "children",
    "type": "Snippet",
    "required": false,
    "description": "Child snippet rendered by the component."
  },
  {
    "prop": "class",
    "type": "string",
    "required": false,
    "description": "Additional classes merged onto the root element."
  },
  {
    "prop": "align",
    "type": "'start' | 'center' | 'end'",
    "required": false,
    "default": "\"start\"",
    "description": "Alignment of the popup relative to the trigger."
  },
  {
    "prop": "alignOffset",
    "type": "number | string",
    "required": false,
    "description": "Offset along the alignment axis."
  },
  {
    "prop": "side",
    "type": "'top' | 'right' | 'bottom' | 'left'",
    "required": false,
    "default": "\"bottom\"",
    "description": "Side of the trigger where the popup is placed."
  },
  {
    "prop": "sideOffset",
    "type": "number | string",
    "required": false,
    "default": "4",
    "description": "Offset between the popup and the trigger."
  },
  {
    "prop": "customAnchor",
    "type": "string | HTMLElement | Measurable | null",
    "required": false,
    "description": "Custom element or virtual anchor used to position the popup."
  },
  {
    "prop": "strategy",
    "type": "'absolute' | 'fixed'",
    "required": false,
    "description": "CSS positioning strategy used by the floating content."
  },
  {
    "prop": "avoidCollisions",
    "type": "boolean",
    "required": false,
    "default": "true",
    "description": "Adjust placement to avoid crossing collision boundaries."
  },
  {
    "prop": "collisionBoundary",
    "type": "Boundary | Boundary[]",
    "required": false,
    "description": "Boundary elements used for collision detection."
  },
  {
    "prop": "collisionPadding",
    "type": "number | Partial<Record<Side, number>>",
    "required": false,
    "default": "8",
    "description": "Padding kept between the popup and collision boundaries."
  },
  {
    "prop": "sticky",
    "type": "'partial' | 'always'",
    "required": false,
    "description": "How the popup remains attached when its anchor approaches a boundary."
  },
  {
    "prop": "hideWhenDetached",
    "type": "boolean",
    "required": false,
    "description": "Hide the popup when its anchor is fully clipped."
  },
  {
    "prop": "updatePositionStrategy",
    "type": "'optimized' | 'always'",
    "required": false,
    "default": "'optimized'",
    "description": "How frequently floating position updates are calculated."
  },
  {
    "prop": "container",
    "type": "HTMLElement | string",
    "required": false,
    "description": "Portal target for the popup content."
  }
];

export default rows;
