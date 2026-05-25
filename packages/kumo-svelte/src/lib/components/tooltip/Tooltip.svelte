<script lang="ts">
  import { Tooltip as TooltipPrimitive } from 'bits-ui';
  import type { Snippet } from 'svelte';
  import { cn } from '$lib/utils/cn';

  export const KUMO_TOOLTIP_VARIANTS = {
    side: {
      top: {
        classes: '',
        description: 'Tooltip appears above the trigger'
      },
      bottom: {
        classes: '',
        description: 'Tooltip appears below the trigger'
      },
      left: {
        classes: '',
        description: 'Tooltip appears to the left of the trigger'
      },
      right: {
        classes: '',
        description: 'Tooltip appears to the right of the trigger'
      }
    }
  } as const;

  export const KUMO_TOOLTIP_DEFAULT_VARIANTS = {
    side: 'top'
  } as const;

  type TooltipSide = keyof typeof KUMO_TOOLTIP_VARIANTS.side;
  type TooltipAlign = 'start' | 'center' | 'end';

  interface Props {
    trigger?: Snippet<[Record<string, unknown>]>;
    children?: Snippet;
    content?: string | Snippet;
    class?: string;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    side?: TooltipSide;
    align?: TooltipAlign;
    sideOffset?: number;
    delay?: number;
    closeDelay?: number;
    disabled?: boolean;
    container?: HTMLElement | string;
    [key: string]: unknown;
  }

  let {
    trigger,
    children,
    content,
    class: className,
    open = $bindable(),
    onOpenChange,
    side = KUMO_TOOLTIP_DEFAULT_VARIANTS.side,
    align,
    sideOffset = 1,
    delay = 600,
    closeDelay,
    disabled,
    container,
    ...rest
  }: Props = $props();

  let internalOpen = $state(false);

  function tooltipVariants({ side = KUMO_TOOLTIP_DEFAULT_VARIANTS.side }: { side?: TooltipSide } = {}) {
    return cn(
      'flex origin-(--bits-floating-transform-origin) flex-col rounded-md bg-kumo-base px-2.5 py-1.5 text-sm text-kumo-default',
      'shadow-lg shadow-kumo-tip-shadow outline outline-kumo-fill',
      'transition-[transform,scale,opacity] duration-150',
      'data-[starting-style]:scale-90 data-[starting-style]:opacity-0',
      'data-[ending-style]:scale-90 data-[ending-style]:opacity-0',
      'data-[instant]:duration-0',
      KUMO_TOOLTIP_VARIANTS.side[side].classes
    );
  }

  let popupClass = $derived(cn(tooltipVariants({ side }), 'kumo-tooltip-popup', className));
  const isControlledOpen = $derived(open !== undefined);

  function handleOpenChange(nextOpen: boolean) {
    onOpenChange?.(nextOpen);
  }
</script>

{#snippet triggerChild({ props }: { props: Record<string, unknown> })}
  {@render trigger?.(props)}
{/snippet}

{#snippet defaultTriggerChild({ props }: { props: Record<string, unknown> })}
  <span
    {...props}
    class={cn(
      'inline-flex h-auto min-h-0 items-center border-none bg-transparent p-0 leading-[0] shadow-none',
      'm-0 cursor-default'
    )}
  >
    {@render children?.()}
  </span>
{/snippet}

{#snippet tooltipBody()}
  {#if trigger}
    <TooltipPrimitive.Trigger class="cursor-default" child={triggerChild} />
  {:else}
    <TooltipPrimitive.Trigger child={defaultTriggerChild} />
  {/if}

  <TooltipPrimitive.Portal to={container}>
    <TooltipPrimitive.Content
      class={cn('max-w-[var(--bits-floating-available-width)]', popupClass)}
      {side}
      {align}
      {sideOffset}
    >
      <TooltipPrimitive.Arrow
        width={20}
        height={10}
        class={cn(
          'kumo-tooltip-arrow flex',
          'data-[side=bottom]:top-[-8px]',
          'data-[side=left]:right-[-13px] data-[side=left]:rotate-90',
          'data-[side=right]:left-[-13px] data-[side=right]:-rotate-90',
          'data-[side=top]:bottom-[-8px] data-[side=top]:rotate-180'
        )}
      >
        <svg width="20" height="10" viewBox="0 0 20 10" fill="none">
          <path
            d="M9.66437 2.60207L4.80758 6.97318C4.07308 7.63423 3.11989 8 2.13172 8H0V10H20V8H18.5349C17.5468 8 16.5936 7.63423 15.8591 6.97318L11.0023 2.60207C10.622 2.2598 10.0447 2.25979 9.66437 2.60207Z"
            class="fill-kumo-base"
          />
          <path
            d="M8.99542 1.85876C9.75604 1.17425 10.9106 1.17422 11.6713 1.85878L16.5281 6.22989C17.0789 6.72568 17.7938 7.00001 18.5349 7.00001L15.89 7L11.0023 2.60207C10.622 2.2598 10.0447 2.2598 9.66436 2.60207L4.77734 7L2.13171 7.00001C2.87284 7.00001 3.58774 6.72568 4.13861 6.22989L8.99542 1.85876Z"
            class="fill-kumo-tip-shadow"
          />
          <path
            d="M10.3333 3.34539L5.47654 7.71648C4.55842 8.54279 3.36693 9 2.13172 9H0V8H2.13172C3.11989 8 4.07308 7.63423 4.80758 6.97318L9.66437 2.60207C10.0447 2.25979 10.622 2.2598 11.0023 2.60207L15.8591 6.97318C16.5936 7.63423 17.5468 8 18.5349 8H20V9H18.5349C17.2997 9 16.1082 8.54278 15.1901 7.71648L10.3333 3.34539Z"
            class="fill-kumo-tip-stroke"
          />
        </svg>
      </TooltipPrimitive.Arrow>
      {#if typeof content === 'function'}
        {@render content()}
      {:else if content}
        {content}
      {:else if trigger}
        {@render children?.()}
      {/if}
    </TooltipPrimitive.Content>
  </TooltipPrimitive.Portal>
{/snippet}

{#if isControlledOpen}
  <TooltipPrimitive.Root open={open ?? false} onOpenChange={handleOpenChange} delayDuration={delay} {disabled} {...rest}>
    {@render tooltipBody()}
  </TooltipPrimitive.Root>
{:else}
  <TooltipPrimitive.Root bind:open={internalOpen} onOpenChange={handleOpenChange} delayDuration={delay} {disabled} {...rest}>
    {@render tooltipBody()}
  </TooltipPrimitive.Root>
{/if}

<style>
  :global(.kumo-tooltip-arrow[data-side='top']) {
    top: auto !important;
    bottom: -8px !important;
    transform: none !important;
  }

  :global(.kumo-tooltip-arrow[data-side='bottom']) {
    top: -8px !important;
    bottom: auto !important;
    transform: none !important;
  }

  :global(.kumo-tooltip-arrow[data-side='left']) {
    right: -13px !important;
    left: auto !important;
    transform: none !important;
  }

  :global(.kumo-tooltip-arrow[data-side='right']) {
    right: auto !important;
    left: -13px !important;
    transform: none !important;
  }
</style>
