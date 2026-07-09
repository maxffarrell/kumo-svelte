import type { PropRow } from '../prop-types';

const rows: PropRow[] = [
  {
    "prop": "class",
    "type": "string",
    "required": false,
    "description": "Additional classes merged onto the dialog content."
  },
  {
    "prop": "children",
    "type": "Snippet",
    "required": false,
    "description": "Dialog content, typically title, description, close, and action buttons."
  },
  {
    "prop": "container",
    "type": "HTMLElement | string",
    "required": false,
    "default": "document.body",
    "description": "Portal container for custom roots or Shadow DOM."
  },
  {
    "prop": "description",
    "type": "string",
    "required": false,
    "description": "Description rendered under the dialog title."
  },
  {
    "prop": "disablePointerDismissal",
    "type": "boolean",
    "required": false,
    "default": "false",
    "description": "When true, prevents the dialog from being dismissed by clicking outside."
  },
  {
    "prop": "open",
    "type": "boolean",
    "required": false,
    "default": "false",
    "description": "Controlled open state. Supports bind:open."
  },
  {
    "prop": "role",
    "type": "'dialog' | 'alertdialog'",
    "required": false,
    "default": "\"dialog\"",
    "description": "ARIA role for the dialog."
  },
  {
    "prop": "size",
    "type": "'sm' | 'base' | 'lg' | 'xl'",
    "required": false,
    "default": "\"base\"",
    "description": "Fixed dialog width preset: sm (288px), base (384px), lg (512px), or xl (768px)."
  },
  {
    "prop": "style",
    "type": "string",
    "required": false,
    "description": "Inline styles for the dialog content."
  },
  {
    "prop": "title",
    "type": "string",
    "required": false,
    "description": "Title rendered as the accessible dialog heading."
  },
  {
    "prop": "trigger",
    "type": "Snippet<[Record<string, unknown>]>",
    "required": false,
    "description": "Trigger snippet that receives props for opening the dialog."
  }
];

export default rows;
