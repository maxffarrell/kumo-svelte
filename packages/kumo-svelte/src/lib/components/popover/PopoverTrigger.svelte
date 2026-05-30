<script lang="ts">
  import { Popover as PopoverPrimitive } from 'bits-ui';
  import type { Snippet } from 'svelte';
  import { cn } from '$lib/utils/cn';

  interface Props {
    children?: Snippet;
    child?: Snippet<[{ props: Record<string, unknown> }]>;
    class?: string;
    openOnHover?: boolean;
    openDelay?: number;
    closeDelay?: number;
    type?: 'button' | 'submit' | 'reset';
    [key: string]: unknown;
  }

  let {
    children,
    child: renderChild,
    class: className,
    openOnHover = false,
    openDelay = 700,
    closeDelay = 300,
    type = 'button',
    ...rest
  }: Props = $props();
</script>

{#snippet defaultTriggerChild({ props }: { props: Record<string, unknown> })}
  <button {...props} class={cn('inline-flex', className, props.class as string | undefined)} {type} data-kumo-component="Popover" data-kumo-part="trigger">
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
