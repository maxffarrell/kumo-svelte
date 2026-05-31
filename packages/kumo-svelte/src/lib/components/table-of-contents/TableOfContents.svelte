<script lang="ts" module>
  import type { Snippet } from 'svelte';
  import { cn } from '$lib/utils/cn';

  export { Group, Item, List, Title };

  const ITEM_BASE = 'block w-full truncate border-l-2 border-transparent py-0.5 pl-4 text-left text-sm no-underline';
  const NESTED_UL_CLASSES = 'flex flex-col gap-2 border-l-2 border-kumo-hairline [&>li>a]:pl-7 [&>li>button]:pl-7';

  interface TocItem { title: string; href: string; depth?: number; }
  interface Props { class?: string; items?: TocItem[]; children?: Snippet; 'aria-label'?: string; [key: string]: unknown; }

  interface BaseProps {
    children?: Snippet;
    class?: string;
    [key: string]: unknown;
  }

  interface ItemProps extends BaseProps {
    active?: boolean;
    href?: string;
    as?: 'a' | 'button';
  }

  interface GroupProps extends BaseProps {
    label: string;
    href?: string;
    active?: boolean;
  }
</script>

<script lang="ts">
  let { class: className, items = [], children, 'aria-label': ariaLabel = 'Table of contents', ...rest }: Props = $props();
</script>

{#snippet Title({ children, class: className, ...rest }: BaseProps)}
  <p class={cn('mb-3 text-xs font-semibold tracking-wide text-kumo-subtle uppercase', className)} {...rest}>
    {@render children?.()}
  </p>
{/snippet}

{#snippet List({ children, class: className, ...rest }: BaseProps)}
  <ul class={cn('flex flex-col gap-2 border-l-2 border-kumo-hairline', className)} {...rest}>
    {@render children?.()}
  </ul>
{/snippet}

{#snippet Item({ children, active = false, href, as = 'a', class: className, ...rest }: ItemProps)}
  <li class="-ml-0.5">
    {#if as === 'button'}
      <button
        aria-current={active ? 'true' : undefined}
        data-kumo-component="TableOfContents"
        data-kumo-part="item"
        class={cn(
          ITEM_BASE,
          active
            ? 'border-kumo-brand font-medium text-kumo-default'
            : 'text-kumo-subtle hover:border-kumo-line hover:font-medium hover:text-kumo-default',
          className
        )}
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
        class={cn(
          ITEM_BASE,
          active
            ? 'border-kumo-brand font-medium text-kumo-default'
            : 'text-kumo-subtle hover:border-kumo-line hover:font-medium hover:text-kumo-default',
          className
        )}
        {...rest}
      >
        <span class="block min-w-0 leading-5">{@render children?.()}</span>
      </a>
    {/if}
  </li>
{/snippet}

{#snippet Group({ children, label, href, active = false, class: className, ...rest }: GroupProps)}
  <li class={cn('-ml-0.5 flex flex-col gap-2', className)} {...rest}>
    {#if href}
      <a
        {href}
        aria-current={active ? 'true' : undefined}
        data-kumo-component="TableOfContents"
        data-kumo-part="group-link"
        class={cn(
          ITEM_BASE,
          active
            ? 'border-kumo-brand font-medium text-kumo-default'
            : 'text-kumo-subtle hover:border-kumo-line hover:font-medium hover:text-kumo-default'
        )}
      >
        <span class="block min-w-0 leading-5">{label}</span>
      </a>
    {:else}
      <p class="py-0.5 pl-4 text-sm leading-5 font-medium text-kumo-subtle">{label}</p>
    {/if}
    <ul class={NESTED_UL_CLASSES}>
      {@render children?.()}
    </ul>
  </li>
{/snippet}

<nav class={className} aria-label={ariaLabel} {...rest}>
  {#if children}
    {@render children()}
  {:else}
    <ul class="flex flex-col gap-2 border-l-2 border-kumo-hairline">
      {#each items as item (item.href)}
        <li class="-ml-0.5">
          <a
            class="block w-full truncate border-l-2 border-transparent py-0.5 pl-4 text-left text-sm text-kumo-subtle no-underline hover:border-kumo-line hover:font-medium hover:text-kumo-default"
            style={`padding-left: ${(item.depth ?? 1) * 0.5 + 0.5}rem`}
            href={item.href}
          >
            <span class="block min-w-0 leading-5">{item.title}</span>
          </a>
        </li>
      {/each}
    </ul>
  {/if}
</nav>
