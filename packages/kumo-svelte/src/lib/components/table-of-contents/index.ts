import TableOfContentsRoot, { Group, Item, List, Title } from './TableOfContents.svelte';
import type { Component, Snippet } from 'svelte';

type BaseProps = {
  children?: Snippet;
  class?: string;
  [key: string]: unknown;
};

type ItemProps = BaseProps & {
  active?: boolean;
  href?: string;
  as?: 'a' | 'button';
};

type GroupProps = BaseProps & {
  label: string;
  href?: string;
  active?: boolean;
};

const TableOfContentsTitle = Title as unknown as Component<BaseProps>;
const TableOfContentsList = List as unknown as Component<BaseProps>;
const TableOfContentsItem = Item as unknown as Component<ItemProps>;
const TableOfContentsGroup = Group as unknown as Component<GroupProps>;

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
