import type { PropRow } from "../prop-types";
const rows: PropRow[] = [
  {
    prop: "appearance",
    type: "'default' | 'card' | 'segmented'",
    description:
      "Joined card appearance; Radio also supports compact segmented groups.",
  },
  {
    prop: "orientation",
    type: "'vertical' | 'horizontal'",
    description: "Layout direction (segmented groups remain horizontal).",
  },
];
export default rows;
