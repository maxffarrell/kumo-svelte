import type { PropRow } from '../prop-types';

const rows: PropRow[] = [
  {
    "prop": "size",
    "type": "'sm' | 'base'",
    "required": false,
    "default": "\"base\"",
    "description": "Dialog size preset."
  },
  {
    "prop": "open",
    "type": "boolean",
    "required": true,
    "description": "Whether the dialog is open."
  },
  {
    "prop": "resourceType",
    "type": "string",
    "required": true,
    "description": "Type of resource being deleted, such as Zone, Worker, or KV Namespace."
  },
  {
    "prop": "resourceName",
    "type": "string",
    "required": true,
    "description": "Name of the resource users must type to confirm deletion."
  },
  {
    "prop": "isDeleting",
    "type": "boolean",
    "required": false,
    "default": "false",
    "description": "Whether the delete action is currently in progress."
  },
  {
    "prop": "caseSensitive",
    "type": "boolean",
    "required": false,
    "default": "true",
    "description": "Whether the confirmation input must match the resource name case exactly."
  },
  {
    "prop": "deleteButtonText",
    "type": "string",
    "required": false,
    "description": "Custom label for the destructive confirmation button."
  },
  {
    "prop": "class",
    "type": "string",
    "required": false,
    "description": "Additional classes merged onto the dialog content."
  },
  {
    "prop": "errorMessage",
    "type": "string",
    "required": false,
    "description": "Error message displayed above the confirmation copy."
  },
  {
    "prop": "onOpenChange",
    "type": "(open: boolean) => void",
    "required": true,
    "description": "Callback fired when the open state changes."
  },
  {
    "prop": "onDelete",
    "type": "() => void | Promise<void>",
    "required": true,
    "description": "Callback fired when the delete action is confirmed."
  }
];

export default rows;
