<script module lang="ts">
  import type { Snippet } from 'svelte';

  export const KUMO_TABS_VARIANTS = {
    variant: ['segmented', 'underline'],
    size: ['base', 'sm']
  } as const;

  export const KUMO_TABS_DEFAULT_VARIANTS = {
    variant: 'segmented',
    size: 'base'
  } as const;

  export const KUMO_TABS_STYLING = {
    container: {
      height: 34,
      borderRadius: 8,
      background: 'color-accent',
      padding: 1
    },
    tab: {
      paddingX: 10,
      verticalMargin: 1,
      fontSize: 16,
      fontWeight: 500,
      borderRadius: 8,
      activeColor: 'text-color-surface',
      inactiveColor: 'text-color-label'
    },
    indicator: {
      background: 'color-surface-secondary',
      ring: 'color-color-2',
      borderRadius: 6,
      shadow: 'shadow-sm'
    }
  } as const;

  export type TabsVariant = (typeof KUMO_TABS_VARIANTS.variant)[number];
  export type TabsSize = (typeof KUMO_TABS_VARIANTS.size)[number];

  export type TabsItem = {
    value: string;
    label: string | Snippet;
    disabled?: boolean;
    class?: string;
    className?: string;
    content?: Snippet;
  };
</script>

<script lang="ts">
  import { onMount, tick } from 'svelte';
  import { Tabs as TabsPrimitive } from 'bits-ui';
  import { cn } from '$lib/utils/cn';

  interface Props {
    tabs?: TabsItem[];
    items?: TabsItem[];
    value?: string;
    selectedValue?: string;
    onValueChange?: (value: string) => void;
    activateOnFocus?: boolean;
    variant?: TabsVariant;
    size?: TabsSize;
    class?: string;
    className?: string;
    listClassName?: string;
    indicatorClassName?: string;
    listClass?: string;
    triggerClass?: string;
    contentClass?: string;
    [key: string]: unknown;
  }

  let {
    tabs,
    items,
    value = $bindable(),
    selectedValue,
    onValueChange,
    activateOnFocus = false,
    variant = KUMO_TABS_DEFAULT_VARIANTS.variant,
    size = KUMO_TABS_DEFAULT_VARIANTS.size,
    class: className,
    className: classNameAlias,
    listClassName,
    indicatorClassName,
    listClass,
    triggerClass,
    contentClass,
    ...rest
  }: Props = $props();

  let listEl: HTMLDivElement | null = $state(null);
  let isOverflowing = $state(false);
  let activeLeft = $state(0);
  let activeTop = $state(0);
  let activeWidth = $state(0);
  let activeHeight = $state(0);
  let indicatorRendered = $state(false);
  let dragState: { pointerId: number; startX: number; scrollLeft: number; dragging: boolean } | null = null;
  let shouldSuppressClick = false;

  const normalizedItems = $derived(tabs ?? items ?? []);
  const isSegmented = $derived(variant === 'segmented');
  const isUnderline = $derived(variant === 'underline');
  const isSm = $derived(size === 'sm');
  const activationMode = $derived(activateOnFocus ? 'automatic' : 'manual');

  function renderLabel(label: TabsItem['label']) {
    return typeof label === 'function' ? label : undefined;
  }

  function updateOverflow() {
    if (!listEl || !isSegmented) {
      isOverflowing = false;
      return;
    }
    isOverflowing = listEl.scrollWidth > listEl.clientWidth;
  }

  function updateIndicator() {
    if (!listEl) return;

    const activeTab = listEl.querySelector<HTMLElement>('[data-state="active"], [aria-selected="true"]');
    if (!activeTab) {
      indicatorRendered = false;
      return;
    }

    const listRect = listEl.getBoundingClientRect();
    const tabRect = activeTab.getBoundingClientRect();
    activeLeft = tabRect.left - listRect.left + listEl.scrollLeft;
    activeTop = tabRect.top - listRect.top;
    activeWidth = tabRect.width;
    activeHeight = tabRect.height;
    indicatorRendered = true;
  }

  async function syncMeasurements() {
    await tick();
    updateOverflow();
    updateIndicator();
  }

  function handleValueChange(nextValue: string) {
    value = String(nextValue);
    onValueChange?.(value);
    void syncMeasurements();
  }

  function handlePointerDownCapture(event: PointerEvent) {
    if (!listEl || !isOverflowing || event.pointerType !== 'mouse' || event.button !== 0) return;

    dragState = {
      pointerId: event.pointerId,
      startX: event.clientX,
      scrollLeft: listEl.scrollLeft,
      dragging: false
    };
    shouldSuppressClick = false;
  }

  function handlePointerMoveCapture(event: PointerEvent) {
    if (!listEl || !isOverflowing || !dragState || dragState.pointerId !== event.pointerId) return;

    const movementX = event.clientX - dragState.startX;
    if (!dragState.dragging) {
      if (Math.abs(movementX) <= 3) return;
      dragState.dragging = true;
      shouldSuppressClick = true;
      listEl.setPointerCapture(event.pointerId);
    }

    event.preventDefault();
    listEl.scrollLeft = dragState.scrollLeft - movementX;
    updateIndicator();
  }

  function endDrag(event: PointerEvent) {
    if (!listEl || !dragState || dragState.pointerId !== event.pointerId) return;

    dragState = null;
    if (listEl.hasPointerCapture(event.pointerId)) {
      listEl.releasePointerCapture(event.pointerId);
    }
    if (shouldSuppressClick) {
      window.setTimeout(() => {
        shouldSuppressClick = false;
      }, 0);
    }
  }

  function handleClickCapture(event: MouseEvent) {
    if (!shouldSuppressClick) return;

    event.preventDefault();
    event.stopPropagation();
    shouldSuppressClick = false;
  }

  function handleTriggerClick(event: MouseEvent) {
    const trigger = event.currentTarget;
    if (!(trigger instanceof HTMLElement)) return;

    trigger.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'nearest'
    });
  }

  $effect(() => {
    if (normalizedItems.length === 0) return;
    value ??= selectedValue ?? normalizedItems[0]?.value;
  });

  $effect(() => {
    value;
    variant;
    size;
    normalizedItems;
    void syncMeasurements();
  });

  onMount(() => {
    const resizeObserver = new ResizeObserver(() => {
      updateOverflow();
      updateIndicator();
    });

    if (listEl) {
      resizeObserver.observe(listEl);
    }

    void syncMeasurements();

    return () => resizeObserver.disconnect();
  });
</script>

{#if normalizedItems.length > 0}
  <TabsPrimitive.Root
    bind:value
    onValueChange={handleValueChange}
    {activationMode}
    class={cn(
      'relative isolate min-w-0 font-medium',
      isSegmented && (isSm ? 'rounded-md' : 'rounded-lg') + ' ring ring-kumo-hairline/70',
      className,
      classNameAlias
    )}
    {...rest}
  >
    {#if isSegmented}
      <div class={cn('absolute inset-x-0 top-1/2 z-0 -translate-y-1/2 rounded-lg bg-kumo-recessed', isSm ? 'h-6.5' : 'h-9')}></div>
    {/if}
    <TabsPrimitive.List
      bind:ref={listEl}
      data-overflowing={isOverflowing ? '' : undefined}
      onpointerdowncapture={handlePointerDownCapture}
      onpointermovecapture={handlePointerMoveCapture}
      onpointerupcapture={endDrag}
      onpointercancelcapture={endDrag}
      onclickcapture={handleClickCapture}
      class={cn(
        'relative flex min-w-0 shrink items-stretch',
        isSegmented &&
          'kumo-tabs-list overflow-x-auto rounded-lg bg-kumo-recessed px-0.5 [--scroll-fade-width:3rem] scroll-px-(--scroll-fade-width)',
        isSegmented && (isSm ? 'h-6.5 rounded-md' : 'h-9'),
        isOverflowing && 'cursor-grab active:cursor-grabbing',
        isUnderline && 'gap-4 border-b border-kumo-hairline pb-2',
        isUnderline && (isSm ? 'h-6.5' : 'h-7.5'),
        listClassName,
        listClass
      )}
    >
      {#each normalizedItems as tab (tab.value)}
        <TabsPrimitive.Trigger
          value={tab.value}
          disabled={tab.disabled}
          data-kumo-component="Tabs"
          data-kumo-part="tab"
          onclick={handleTriggerClick}
          class={cn(
            'relative z-2 flex items-center rounded bg-transparent whitespace-nowrap focus:outline-none focus:ring-kumo-focus/50 focus-visible:ring-2 focus-visible:ring-kumo-brand',
            isOverflowing ? 'cursor-grab active:cursor-grabbing' : 'cursor-pointer',
            isSm ? 'text-xs' : 'text-base',
            isSegmented &&
              'my-0.5 text-kumo-subtle hover:text-kumo-default data-[state=active]:text-kumo-default focus-visible:ring-inset',
            isSegmented && (isSm ? 'px-2 rounded-sm' : 'px-2.5 rounded-md'),
            isUnderline &&
              'text-kumo-subtle hover:bg-kumo-tint hover:text-kumo-default data-[state=active]:hover:bg-kumo-tint data-[state=active]:font-medium data-[state=active]:text-kumo-default',
            isUnderline && (isSm ? 'px-1.5 py-2.5' : 'px-2 py-3'),
            tab.className,
            tab.class,
            triggerClass
          )}
        >
          {#if renderLabel(tab.label)}
            {@render renderLabel(tab.label)?.()}
          {:else}
            {tab.label}
          {/if}
        </TabsPrimitive.Trigger>
      {/each}
      <div
        aria-hidden="true"
        data-rendered={indicatorRendered}
        class={cn(
          'absolute z-1 left-0 transition-all duration-200 data-[rendered=false]:scale-90 data-[rendered=false]:opacity-0',
          isSegmented && cn('bg-kumo-base shadow-sm ring ring-kumo-line', isSm ? 'rounded' : 'rounded-md'),
          isUnderline && 'bottom-0 h-0.5 bg-kumo-brand',
          indicatorClassName
        )}
        style:width={`${activeWidth}px`}
        style:height={isUnderline ? undefined : `${activeHeight}px`}
        style:transform={`translate(${activeLeft}px, ${isUnderline ? 0 : activeTop}px)`}
      ></div>
    </TabsPrimitive.List>

    {#each normalizedItems as tab (tab.value)}
      {#if tab.content}
        <TabsPrimitive.Content value={tab.value} class={cn('mt-3 outline-none', contentClass)}>
          {@render tab.content()}
        </TabsPrimitive.Content>
      {/if}
    {/each}
  </TabsPrimitive.Root>
{/if}
