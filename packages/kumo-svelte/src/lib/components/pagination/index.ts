import Root, {
  PaginationControls,
  PaginationInfo,
  PaginationPageSize,
  PaginationSeparator,
} from "./Pagination.svelte";

type PaginationPart = typeof Root;

const Info = PaginationInfo as unknown as PaginationPart;
const PageSize = PaginationPageSize as unknown as PaginationPart;
const Controls = PaginationControls as unknown as PaginationPart;
const Separator = PaginationSeparator as unknown as PaginationPart;

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
