<script module lang="ts">
  import { cn } from '#lib/utils/cn.js';

  export const KUMO_PAGE_HEADER_VARIANTS = {
    spacing: {
      compact: {
        classes: 'gap-1',
        description: 'Compact spacing between header elements'
      },
      base: {
        classes: 'gap-2',
        description: 'Default spacing between header elements'
      },
      relaxed: {
        classes: 'gap-4',
        description: 'Relaxed spacing for more prominent headers'
      }
    }
  } as const;

  export const KUMO_PAGE_HEADER_DEFAULT_VARIANTS = {
    spacing: 'base'
  } as const;

  type PageHeaderSpacing = keyof typeof KUMO_PAGE_HEADER_VARIANTS.spacing;

  export function pageHeaderVariants({
    spacing = KUMO_PAGE_HEADER_DEFAULT_VARIANTS.spacing
  }: {
    spacing?: PageHeaderSpacing;
  } = {}) {
    return cn('flex flex-col', KUMO_PAGE_HEADER_VARIANTS.spacing[spacing].classes);
  }
</script>

<script lang="ts">
  import type { Snippet } from 'svelte';
  import { Breadcrumbs, type BreadcrumbsItem } from '#lib/components/breadcrumbs/index.js';
  import { Tabs, type TabsItem } from '#lib/components/tabs/index.js';

  interface Props {
    breadcrumbs?: BreadcrumbsItem[];
    breadcrumbContent?: Snippet;
    title?: string;
    description?: string;
    tabs?: TabsItem[];
    activeTab?: string;
    defaultTab?: string;
    onTabChange?: (value: string) => void;
    onValueChange?: (value: string) => void;
    actions?: Snippet;
    children?: Snippet;
    spacing?: PageHeaderSpacing;
    class?: string;
    className?: string;
    [key: string]: unknown;
  }

  let {
    breadcrumbs = [],
    breadcrumbContent,
    title,
    description,
    tabs = [],
    activeTab = $bindable(),
    defaultTab,
    onTabChange,
    onValueChange,
    actions,
    children,
    spacing = KUMO_PAGE_HEADER_DEFAULT_VARIANTS.spacing,
    class: className,
    className: classNameAlias,
    ...rest
  }: Props = $props();

  function getInitialTab() {
    return activeTab ?? defaultTab ?? tabs[0]?.value ?? '';
  }

  let currentTab = $state(getInitialTab());

  $effect(() => {
    currentTab = getInitialTab();
  });

  function handleTabChange(value: string) {
    currentTab = value;
    activeTab = value;
    onTabChange?.(value);
    onValueChange?.(value);
  }
</script>

<div class={cn(pageHeaderVariants({ spacing }), className, classNameAlias)} {...rest}>
  <div class="border-b border-kumo-line">
    {#if breadcrumbContent}
      {@render breadcrumbContent()}
    {:else if breadcrumbs.length > 0}
      <Breadcrumbs items={breadcrumbs} />
    {/if}
  </div>

  {#if title || description}
    <div class="flex flex-col gap-2 py-3 pl-3">
      {#if title}
        <h1 class="font-heading text-3xl font-semibold text-kumo-default">{title}</h1>
      {/if}
      {#if description}
        <p class="max-w-prose text-base text-kumo-subtle">{description}</p>
      {/if}
    </div>
  {/if}

  {#if tabs.length > 0}
    <div class="flex w-full items-center justify-between border-b border-kumo-line pt-1 pb-3 pl-3">
      <Tabs bind:value={currentTab} selectedValue={defaultTab} items={tabs} onValueChange={handleTabChange} />

      <div class="flex items-center gap-2">
        {#if actions}
          {@render actions()}
        {:else}
          {@render children?.()}
        {/if}
      </div>
    </div>
  {/if}
</div>
