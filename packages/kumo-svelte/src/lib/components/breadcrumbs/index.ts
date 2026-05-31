import Root from './Breadcrumbs.svelte';
import type { KumoBreadcrumbsPart } from './Breadcrumbs.svelte';

const part = (part: KumoBreadcrumbsPart) =>
  ((anchor, props = {}) =>
    Root(anchor, {
      ...props,
      __part: part
    })) as typeof Root;

const Link = part('link');
const Current = part('current');
const Separator = part('separator');
const Clipboard = part('clipboard');

export const Breadcrumbs = Object.assign(Root, {
  Link,
  Current,
  Separator,
  Clipboard
}) as typeof Root & {
  Link: typeof Link;
  Current: typeof Current;
  Separator: typeof Separator;
  Clipboard: typeof Clipboard;
};

export {
  Root as BreadcrumbsRoot,
  Link as BreadcrumbsLink,
  Current as BreadcrumbsCurrent,
  Separator as BreadcrumbsSeparator,
  Clipboard as BreadcrumbsClipboard
};

export {
  breadcrumbsVariants,
  KUMO_BREADCRUMBS_VARIANTS,
  KUMO_BREADCRUMBS_DEFAULT_VARIANTS,
  type BreadcrumbsItem,
  type BreadcrumbsCurrentSnippetProps,
  type BreadcrumbsLinkSnippetProps,
  type BreadcrumbsSeparatorSnippetProps,
  type KumoBreadcrumbsPart,
  type KumoBreadcrumbsSize,
  type KumoBreadcrumbsVariantsProps
} from './Breadcrumbs.svelte';
