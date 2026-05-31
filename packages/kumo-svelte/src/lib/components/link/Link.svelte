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
    __part?: 'root' | 'external-icon';
    children?: Snippet;
    class?: string;
    href?: string;
    to?: string;
    variant?: KumoLinkVariant;
    [key: string]: unknown;
  }

  let {
    __part = 'root',
    children,
    class: className,
    href,
    to,
    variant = 'inline',
    ...rest
  }: Props = $props();

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

{#if __part === 'external-icon'}
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
    class={className ? `link-external-icon ${className}` : 'link-external-icon'}
    {...rest}
  >
    <path
      d="M9 4H8.8C7.11984 4 6.27976 4 5.63803 4.32698C5.07354 4.6146 4.6146 5.07354 4.32698 5.63803C4 6.27976 4 7.11984 4 8.8V15.2C4 16.8802 4 17.7202 4.32698 18.362C4.6146 18.9265 5.07354 19.3854 5.63803 19.673C6.27976 20 7.11984 20 8.8 20H15.2C16.8802 20 17.7202 20 18.362 19.673C18.9265 19.3854 19.3854 18.9265 19.673 18.362C20 17.7202 20 16.8802 20 15.2V15"
    />
    <path d="M14 4H20M20 4V10M20 4L11 13" />
  </svg>
{:else}
  <a
    class={cn(linkVariants({ variant }), 'group/link inline-flex items-center gap-[0.1875em]', className)}
    data-kumo-component="Link"
    data-kumo-part="link"
    href={resolvedHref}
    {...rest}
  >
    {@render children?.()}
  </a>
{/if}
