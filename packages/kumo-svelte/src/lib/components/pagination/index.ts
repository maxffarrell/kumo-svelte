import Root, { type KumoPaginationPart } from "./Pagination.svelte";

export type { KumoPaginationPart };

const part = (part: KumoPaginationPart) =>
  ((anchor: Parameters<typeof Root>[0], props = {}) => Root(anchor, { ...props, __part: part })) as any;

const Info = part('info');
const PageSize = part('page-size');
const Controls = part('controls');
const Separator = part('separator');

const Pagination = Object.assign(Root, {
  Root,
  Info,
  PageSize,
  Controls,
  Separator,
}) as typeof Root & {
  Root: typeof Root;
  Info: typeof Info;
  PageSize: typeof PageSize;
  Controls: typeof Controls;
  Separator: typeof Separator;
};

export {
  Pagination,
  Info as PaginationInfo,
  PageSize as PaginationPageSize,
  Controls as PaginationControls,
  Separator as PaginationSeparator,
};
export type { PaginationLabels } from "./context";
