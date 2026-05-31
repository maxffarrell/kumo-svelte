<script module lang="ts">
  import { Popover as PopoverPrimitive } from 'bits-ui';
  import type { Snippet } from 'svelte';
  import { cn } from '$lib/utils/cn';

  type PopoverSide = 'top' | 'bottom' | 'left' | 'right';
  type PopoverAlign = 'start' | 'center' | 'end';

  interface TriggerProps {
    children?: Snippet;
    child?: Snippet<[{ props: Record<string, unknown> }]>;
    class?: string;
    openOnHover?: boolean;
    openDelay?: number;
    closeDelay?: number;
    type?: 'button' | 'submit' | 'reset';
    [key: string]: unknown;
  }

  interface ContentProps {
    children?: Snippet;
    class?: string;
    side?: PopoverSide;
    align?: PopoverAlign;
    sideOffset?: number;
    alignOffset?: number;
    strategy?: 'absolute' | 'fixed';
    positionMethod?: 'absolute' | 'fixed';
    anchor?: HTMLElement | { getBoundingClientRect: () => DOMRect } | null;
    customAnchor?: HTMLElement | { getBoundingClientRect: () => DOMRect } | null;
    container?: HTMLElement | string;
    [key: string]: unknown;
  }

  interface TextProps {
    children?: Snippet;
    class?: string;
    [key: string]: unknown;
  }

  interface CloseProps {
    children?: Snippet;
    child?: Snippet<[{ props: Record<string, unknown> }]>;
    class?: string;
    type?: 'button' | 'submit' | 'reset';
    [key: string]: unknown;
  }

  // @ts-ignore Svelte declaration tags are exportable from module script.
  export { PopoverTrigger, PopoverContent, PopoverTitle, PopoverDescription, PopoverClose };
</script>

<script lang="ts">

  export interface Props {
    trigger?: Snippet<[Record<string, unknown>]>;
    children?: Snippet;
    class?: string;
    open?: boolean;
    title?: string;
    description?: string;
    side?: PopoverSide;
    align?: PopoverAlign;
    sideOffset?: number;
    alignOffset?: number;
    openOnHover?: boolean;
    delay?: number;
    [key: string]: unknown;
  }

  let {
    trigger,
    children,
    class: className,
    open = $bindable(false),
    title,
    description,
    side = 'bottom',
    align = 'center',
    sideOffset = 0,
    alignOffset = 0,
    openOnHover = false,
    delay = 700,
    ...rest
  }: Props = $props();

  let contentClass = $derived(cn('min-w-48', className));
</script>

{#snippet triggerChild({ props }: { props: Record<string, unknown> })}
  {@render trigger?.(props)}
{/snippet}

<PopoverPrimitive.Root bind:open {...rest}>
  {#if trigger}
    <PopoverPrimitive.Trigger openOnHover={openOnHover} openDelay={delay} child={triggerChild} />
    <PopoverContent class={contentClass} {side} {align} {sideOffset} {alignOffset}>
      {#if title}<PopoverTitle>{title}</PopoverTitle>{/if}
      {#if description}<PopoverDescription>{description}</PopoverDescription>{/if}
      {@render children?.()}
    </PopoverContent>
  {:else}
    {@render children?.()}
  {/if}
</PopoverPrimitive.Root>

{#snippet PopoverTrigger({
  children,
  child: renderChild,
  class: className,
  openOnHover = false,
  openDelay = 700,
  closeDelay = 300,
  type = 'button',
  ...rest
}: TriggerProps)}
  {#snippet defaultTriggerChild({ props }: { props: Record<string, unknown> })}
    <button
      {...props}
      class={cn('inline-flex', className, props.class as string | undefined)}
      {type}
      data-kumo-component="Popover"
      data-kumo-part="trigger"
    >
      {@render children?.()}
    </button>
  {/snippet}

  <PopoverPrimitive.Trigger
    {openOnHover}
    {openDelay}
    {closeDelay}
    {type}
    {...rest}
    child={renderChild ?? defaultTriggerChild}
  />
{/snippet}

{#snippet PopoverContent({
  children,
  class: className,
  side = 'bottom',
  align = 'center',
  sideOffset = 0,
  alignOffset = 0,
  strategy,
  positionMethod,
  anchor = null,
  customAnchor = null,
  container,
  ...rest
}: ContentProps)}
  <PopoverPrimitive.Portal to={container}>
    <PopoverPrimitive.Content
      class={cn(
        'kumo-popover-popup flex origin-(--bits-floating-transform-origin) flex-col rounded-lg bg-kumo-base px-4 py-3 text-sm text-kumo-default',
        'shadow-lg shadow-kumo-tip-shadow outline outline-kumo-fill',
        'transition-[transform,scale,opacity] duration-150',
        'data-starting-style:scale-90 data-starting-style:opacity-0',
        'data-ending-style:scale-90 data-ending-style:opacity-0',
        'data-instant:duration-0',
        className
      )}
      {side}
      {align}
      {sideOffset}
      {alignOffset}
      strategy={strategy ?? positionMethod ?? 'absolute'}
      customAnchor={anchor ?? customAnchor}
      {...rest}
    >
      <PopoverPrimitive.Arrow
        width={20}
        height={10}
        class={cn(
          'kumo-popover-arrow flex',
          'data-[side=bottom]:-top-2',
          'data-[side=left]:right-[-13px] data-[side=left]:rotate-90',
          'data-[side=right]:left-[-13px] data-[side=right]:-rotate-90',
          'data-[side=top]:-bottom-2 data-[side=top]:rotate-180'
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
            d="M10.3333 3.34539L5.47654 7.71648C4.55842 8.54279 3.36693 9 2.13172 9H0V8H2.13172C3.11989 8 4.07308 7.63423 4.80758 6.97318L9.66437 2.60207C10.0447 2.25979 10.622 2.2598 11.0023 2.60207L15.8591 6.97318C16.5936 7.63423 17.5468 8 18.5349 8H20V9H18.5349C17.2998 9 16.1083 8.54278 15.1901 7.71648L10.3333 3.34539Z"
            class="fill-kumo-tip-stroke"
          />
        </svg>
      </PopoverPrimitive.Arrow>
      {@render children?.()}
    </PopoverPrimitive.Content>
  </PopoverPrimitive.Portal>
{/snippet}

{#snippet PopoverTitle({ children, class: className, ...rest }: TextProps)}
  <h2 class={cn('m-0 text-base leading-6 font-medium', className)} {...rest}>
    {@render children?.()}
  </h2>
{/snippet}

{#snippet PopoverDescription({ children, class: className, ...rest }: TextProps)}
  <p class={cn('m-0 text-base leading-6 text-kumo-subtle', className)} {...rest}>
    {@render children?.()}
  </p>
{/snippet}

{#snippet PopoverClose({
  children,
  child: renderChild,
  class: className,
  type = 'button',
  ...rest
}: CloseProps)}
  {#snippet defaultCloseChild({ props }: { props: Record<string, unknown> })}
    <button {...props} class={cn(className, props.class as string | undefined)} {type}>
      {@render children?.()}
    </button>
  {/snippet}

  <PopoverPrimitive.Close
    {type}
    {...rest}
    child={renderChild ?? defaultCloseChild}
  />
{/snippet}

<style>
  :global(.kumo-popover-arrow[data-side='top']) {
    top: auto !important;
    bottom: -8px !important;
    transform: none !important;
  }

  :global(.kumo-popover-arrow[data-side='bottom']) {
    top: -8px !important;
    bottom: auto !important;
    transform: none !important;
  }

  :global(.kumo-popover-arrow[data-side='left']) {
    right: -13px !important;
    left: auto !important;
    transform: none !important;
  }

  :global(.kumo-popover-arrow[data-side='right']) {
    right: auto !important;
    left: -13px !important;
  }
</style>
