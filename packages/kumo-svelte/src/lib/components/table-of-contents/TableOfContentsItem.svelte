<script lang="ts">
  import type { Snippet } from 'svelte';
  import { cn } from '$lib/utils/cn';

  const ITEM_BASE = 'block w-full truncate border-l-2 border-transparent py-0.5 pl-4 text-left text-sm no-underline';

  interface Props {
    children?: Snippet;
    active?: boolean;
    href?: string;
    as?: 'a' | 'button';
    class?: string;
    [key: string]: unknown;
  }

  let { children, active = false, href, as = 'a', class: className, ...rest }: Props = $props();

  const itemClass = $derived(
    cn(
      ITEM_BASE,
      active
        ? 'border-kumo-brand font-medium text-kumo-default'
        : 'text-kumo-subtle hover:border-kumo-line hover:font-medium hover:text-kumo-default',
      className
    )
  );
</script>

<li class="-ml-0.5">
  {#if as === 'button'}
    <button
      aria-current={active ? 'true' : undefined}
      data-kumo-component="TableOfContents"
      data-kumo-part="item"
      class={itemClass}
      {...rest}
    >
      <span class="block min-w-0 leading-5">{@render children?.()}</span>
    </button>
  {:else}
    <a
      {href}
      aria-current={active ? 'true' : undefined}
      data-kumo-component="TableOfContents"
      data-kumo-part="item"
      class={itemClass}
      {...rest}
    >
      <span class="block min-w-0 leading-5">{@render children?.()}</span>
    </a>
  {/if}
</li>
