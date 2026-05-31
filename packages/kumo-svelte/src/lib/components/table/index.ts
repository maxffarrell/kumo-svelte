import Root, { Body, Cell, CheckCell, CheckHead, Footer, Head, Header, ResizeHandle, Row } from './Table.svelte';

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
