import TableOfContentsRoot from "./TableOfContents.svelte";
import TableOfContentsTitle from "./TableOfContentsTitle.svelte";
import TableOfContentsList from "./TableOfContentsList.svelte";
import TableOfContentsItem from "./TableOfContentsItem.svelte";
import TableOfContentsGroup from "./TableOfContentsGroup.svelte";

export const TableOfContents = Object.assign(TableOfContentsRoot, {
  Title: TableOfContentsTitle,
  List: TableOfContentsList,
  Item: TableOfContentsItem,
  Group: TableOfContentsGroup,
}) as typeof TableOfContentsRoot & {
  Title: typeof TableOfContentsTitle;
  List: typeof TableOfContentsList;
  Item: typeof TableOfContentsItem;
  Group: typeof TableOfContentsGroup;
};

export {
  TableOfContentsRoot,
  TableOfContentsTitle,
  TableOfContentsList,
  TableOfContentsItem,
  TableOfContentsGroup,
};
export { useTableOfContentsActiveId } from "./use-table-of-contents-active-id.svelte";
export type {
  UseTableOfContentsActiveIdOptions,
  UseTableOfContentsActiveIdResult,
} from "./use-table-of-contents-active-id.svelte";
