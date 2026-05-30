<script lang="ts" module>
  import { cn } from '$lib/utils/cn';

  export const KUMO_LINK_VARIANTS = {
    variant: {
      inline: {
        classes:
          'text-kumo-link underline underline-offset-[0.15em] decoration-[0.0625em] link-current transition-colors',
        description: 'Inline text link that flows with content'
      },
      current: {
        classes:
          'text-current underline underline-offset-[0.15em] decoration-[0.0625em] link-current transition-colors',
        description: 'Link that inherits color from parent text'
      },
      plain: {
        classes: 'text-kumo-link hover:text-kumo-link/70 transition-colors',
        description: 'Link without underline decoration'
      }
    }
  } as const;

  export const KUMO_LINK_DEFAULT_VARIANTS = {
    variant: 'inline'
  } as const;

  export type KumoLinkVariant = keyof typeof KUMO_LINK_VARIANTS.variant;

  export function linkVariants({
    variant = KUMO_LINK_DEFAULT_VARIANTS.variant
  }: {
    variant?: KumoLinkVariant;
  } = {}) {
    return cn(KUMO_LINK_VARIANTS.variant[variant].classes);
  }
</script>

<script lang="ts">
  import { DEV } from 'esm-env';
  import type { Snippet } from 'svelte';

  interface Props {
    children?: Snippet;
    class?: string;
    href?: string;
    to?: string;
    variant?: KumoLinkVariant;
    [key: string]: unknown;
  }

  let { children, class: className, href, to, variant = 'inline', ...rest }: Props = $props();

  $effect(() => {
    if (DEV && to !== undefined) {
      console.warn(
        '[kumo] Link: The `to` prop is deprecated. Use `href` instead.\n\n' +
          'Migration example:\n' +
          '  Before: <Link to="/page">...</Link>\n' +
          '  After:  <Link href="/page">...</Link>'
      );
    }
  });

  let resolvedHref = $derived(href ?? to);
</script>

<a
  class={cn(linkVariants({ variant }), 'group/link inline-flex items-center gap-[0.1875em]', className)}
  data-kumo-component="Link"
  data-kumo-part="link"
  href={resolvedHref}
  {...rest}
>
  {@render children?.()}
</a>
