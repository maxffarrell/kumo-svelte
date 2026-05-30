<script module lang="ts">
  import type { Component, Snippet } from 'svelte';
  import { SkeletonLine } from '../loader';
  import { cn } from '$lib/utils/cn';

  export { BreadcrumbsCurrent, BreadcrumbsLink, BreadcrumbsSeparator };

  export const KUMO_BREADCRUMBS_VARIANTS = {
    size: {
      sm: {
        classes: 'text-sm h-10 gap-0.5',
        description: 'Compact breadcrumbs for dense UIs'
      },
      base: {
        classes: 'text-base h-12 gap-1',
        description: 'Default breadcrumbs size'
      }
    }
  } as const;

  export const KUMO_BREADCRUMBS_DEFAULT_VARIANTS = {
    size: 'base'
  } as const;

  export type KumoBreadcrumbsSize = keyof typeof KUMO_BREADCRUMBS_VARIANTS.size;

  export interface KumoBreadcrumbsVariantsProps {
    size?: KumoBreadcrumbsSize;
  }

  export interface BreadcrumbsItem {
    label: string;
    href?: string;
    icon?: Component;
  }

  export interface BreadcrumbsLinkSnippetProps {
    children?: Snippet;
    href: string;
    icon?: Component;
    label?: string;
    props?: Record<string, unknown>;
  }

  export interface BreadcrumbsCurrentSnippetProps {
    children?: Snippet;
    icon?: Component;
    label?: string;
    loading?: boolean;
    props?: Record<string, unknown>;
  }

  export interface BreadcrumbsSeparatorSnippetProps {
    props?: Record<string, unknown>;
  }

  export function breadcrumbsVariants({
    size = KUMO_BREADCRUMBS_DEFAULT_VARIANTS.size
  }: KumoBreadcrumbsVariantsProps = {}) {
    return cn(
      'group mr-4 flex min-w-0 grow items-center overflow-hidden whitespace-nowrap',
      KUMO_BREADCRUMBS_VARIANTS.size[size]?.classes ??
        KUMO_BREADCRUMBS_VARIANTS.size[KUMO_BREADCRUMBS_DEFAULT_VARIANTS.size].classes
    );
  }

  function getMobileItems(items: BreadcrumbsItem[]) {
    if (items.length <= 2) return items;
    return items.slice(-2);
  }
</script>

<script lang="ts">
  interface Props extends KumoBreadcrumbsVariantsProps {
    children?: Snippet;
    class?: string;
    className?: string;
    items?: BreadcrumbsItem[];
    [key: string]: unknown;
  }

  let {
    children,
    class: className,
    className: classNameAlias,
    size = KUMO_BREADCRUMBS_DEFAULT_VARIANTS.size,
    items = [],
    ...rest
  }: Props = $props();

  const mobileItems = $derived(getMobileItems(items));
</script>

{#snippet BreadcrumbsLink({
  children,
  href,
  icon: Icon,
  label,
  props = {}
}: BreadcrumbsLinkSnippetProps)}
  <a
    href={href}
    data-kumo-component="Breadcrumbs"
    data-kumo-part="link"
    class="flex min-w-0 max-w-full items-center gap-1 text-kumo-subtle no-underline"
    {...props}
  >
    {#if Icon}
      <span class="flex shrink-0 items-center">
        <Icon size={16} />
      </span>
    {/if}
    <span class="truncate">
      {#if children}
        {@render children()}
      {:else}
        {label}
      {/if}
    </span>
  </a>
{/snippet}

{#snippet BreadcrumbsCurrent({
  children,
  icon: Icon,
  label,
  loading = false,
  props = {}
}: BreadcrumbsCurrentSnippetProps)}
  {#if loading}
    <div class="flex w-[125px] min-w-0 items-center gap-1" {...props}>
      {#if Icon}
        <span class="flex shrink-0 items-center">
          <Icon size={16} />
        </span>
      {/if}
      <SkeletonLine />
    </div>
  {:else}
    <div class="flex min-w-0 max-w-full items-center gap-1 font-medium" aria-current="page" {...props}>
      {#if Icon}
        <span class="flex shrink-0 items-center">
          <Icon size={16} />
        </span>
      {/if}
      <span class="truncate">
        {#if children}
          {@render children()}
        {:else}
          {label}
        {/if}
      </span>
    </div>
  {/if}
{/snippet}

{#snippet BreadcrumbsSeparator({ props = {} }: BreadcrumbsSeparatorSnippetProps = {})}
  <span class="flex shrink-0 items-center text-kumo-inactive" aria-hidden="true" {...props}>
    <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
      <path
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="1.5"
        d="M10.75 8.75L14.25 12L10.75 15.25"
      />
    </svg>
  </span>
{/snippet}

<nav class={cn(breadcrumbsVariants({ size }), className, classNameAlias)} aria-label="breadcrumb" {...rest}>
  {#if children}
    {@render children()}
  {:else if items.length > 0}
    <div class="contents sm:hidden">
      {#if items.length > 2}
        <span class="flex shrink-0 items-center text-kumo-subtle" aria-hidden="true">...</span>
        {@render BreadcrumbsSeparator()}
      {/if}
      {#each mobileItems as item, index (item.href ?? item.label)}
        {#if index > 0}
          {@render BreadcrumbsSeparator()}
        {/if}
        {#if item.href && index < mobileItems.length - 1}
          {@render BreadcrumbsLink({ href: item.href, icon: item.icon, label: item.label })}
        {:else}
          {@render BreadcrumbsCurrent({ icon: item.icon, label: item.label })}
        {/if}
      {/each}
    </div>
    <div class="hidden sm:contents">
      {#each items as item, index (item.href ?? item.label)}
        {#if index > 0}
          {@render BreadcrumbsSeparator()}
        {/if}
        {#if item.href && index < items.length - 1}
          {@render BreadcrumbsLink({ href: item.href, icon: item.icon, label: item.label })}
        {:else}
          {@render BreadcrumbsCurrent({ icon: item.icon, label: item.label })}
        {/if}
      {/each}
    </div>
  {/if}
</nav>
