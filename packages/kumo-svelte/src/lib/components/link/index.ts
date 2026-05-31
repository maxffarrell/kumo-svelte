import LinkRoot from './Link.svelte';

const LinkExternalIcon = ((anchor, props = {}) =>
  LinkRoot(anchor, {
    ...props,
    __part: 'external-icon'
  })) as typeof LinkRoot;

export { LinkRoot as Link, LinkExternalIcon };
export {
  KUMO_LINK_DEFAULT_VARIANTS,
  KUMO_LINK_VARIANTS,
  linkVariants
} from './Link.svelte';
export type { KumoLinkVariant } from './Link.svelte';
