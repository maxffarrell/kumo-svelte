import Root, { type KumoTablePart } from './Table.svelte';

export type { KumoTablePart };

const part = (part: KumoTablePart) =>
  ((anchor: Parameters<typeof Root>[0], props = {}) =>
    Root(anchor, {
      ...props,
      __part: part
    })) as any;

const Body = part('body');
const Cell = part('cell');
const CheckCell = part('check-cell');
const CheckHead = part('check-head');
const Footer = part('footer');
const Head = part('head');
const Header = part('header');
const ResizeHandle = part('resize-handle');
const Row = part('row');

const Table = Object.assign(Root, {
  Root,
  Body,
  Cell,
  CheckCell,
  CheckHead,
  Footer,
  Head,
  Header,
  ResizeHandle,
  Row
}) as typeof Root & {
  Root: typeof Root;
  Body: typeof Body;
  Cell: typeof Cell;
  CheckCell: typeof CheckCell;
  CheckHead: typeof CheckHead;
  Footer: typeof Footer;
  Head: typeof Head;
  Header: typeof Header;
  ResizeHandle: typeof ResizeHandle;
  Row: typeof Row;
};

export {
  Table,
  Body as TableBody,
  Cell as TableCell,
  CheckCell as TableCheckCell,
  CheckHead as TableCheckHead,
  Footer as TableFooter,
  Head as TableHead,
  Header as TableHeader,
  ResizeHandle as TableResizeHandle,
  Row as TableRow
};
export {
  KUMO_TABLE_DEFAULT_VARIANTS,
  KUMO_TABLE_VARIANTS,
  tableStickyColumnClasses
} from './Table.svelte';
export type { KumoTableLayout, KumoTableRowVariant, KumoTableStickyColumn } from './Table.svelte';
