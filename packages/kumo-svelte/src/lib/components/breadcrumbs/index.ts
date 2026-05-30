import Root from './Breadcrumbs.svelte';
import Link from './BreadcrumbsLink.svelte';
import Current from './BreadcrumbsCurrent.svelte';
import Separator from './BreadcrumbsSeparator.svelte';
import Clipboard from './BreadcrumbsClipboard.svelte';

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
  type KumoBreadcrumbsSize,
  type KumoBreadcrumbsVariantsProps
} from './Breadcrumbs.svelte';
