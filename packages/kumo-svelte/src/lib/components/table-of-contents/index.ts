import TableOfContentsRoot, { type KumoTableOfContentsPart } from './TableOfContents.svelte';
export type { KumoTableOfContentsPart };

const part = (part: KumoTableOfContentsPart) =>
  ((anchor: Parameters<typeof TableOfContentsRoot>[0], props = {}) =>
    TableOfContentsRoot(anchor, {
      ...props,
      __part: part
    })) as any;

const TableOfContentsTitle = part('title') as any;
const TableOfContentsList = part('list') as any;
const TableOfContentsItem = part('item') as any;
const TableOfContentsGroup = part('group') as any;

export const TableOfContents = Object.assign(TableOfContentsRoot, {
  Title: TableOfContentsTitle,
  List: TableOfContentsList,
  Item: TableOfContentsItem,
  Group: TableOfContentsGroup
}) as typeof TableOfContentsRoot & {
  Title: typeof TableOfContentsTitle;
  List: typeof TableOfContentsList;
  Item: typeof TableOfContentsItem;
  Group: typeof TableOfContentsGroup;
};

export { TableOfContentsRoot, TableOfContentsTitle, TableOfContentsList, TableOfContentsItem, TableOfContentsGroup };
