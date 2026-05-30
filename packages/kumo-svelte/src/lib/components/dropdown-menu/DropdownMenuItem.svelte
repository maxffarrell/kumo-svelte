<script module lang="ts">
  export const KUMO_DROPDOWN_VARIANTS = {
    variant: {
      default: {
        classes: '',
        description: 'Default dropdown item appearance'
      },
      danger: {
        classes: 'text-kumo-danger data-[highlighted]:bg-kumo-danger/5 data-[highlighted]:text-kumo-danger',
        description: 'Destructive action item'
      }
    }
  } as const;

  export const KUMO_DROPDOWN_DEFAULT_VARIANTS = {
    variant: 'default'
  } as const;

  export type KumoDropdownVariant = keyof typeof KUMO_DROPDOWN_VARIANTS.variant;
</script>

<script lang="ts">
  import { DropdownMenu as DropdownMenuPrimitive } from 'bits-ui';
  import type { Component, Snippet } from 'svelte';
  import { Check } from 'phosphor-svelte';
  import { cn } from '$lib/utils/cn';

  interface Props {
    children?: Snippet;
    class?: string;
    inset?: boolean;
    icon?: Component;
    selected?: boolean;
    variant?: KumoDropdownVariant;
    href?: string;
    target?: string;
    rel?: string;
    disabled?: boolean;
    [key: string]: unknown;
  }

  let {
    children,
    class: className,
    inset = false,
    icon: Icon,
    selected = false,
    variant = KUMO_DROPDOWN_DEFAULT_VARIANTS.variant,
    href,
    target,
    rel,
    disabled,
    ...rest
  }: Props = $props();

  const itemClasses = $derived(
    cn(
      'relative flex cursor-default items-center rounded-md px-2 py-1.5 text-base outline-hidden select-none focus:text-kumo-default focus:ring-kumo-focus/50 focus-visible:ring-2 focus-visible:ring-kumo-brand data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[highlighted]:bg-kumo-overlay',
      inset && 'pl-8',
      KUMO_DROPDOWN_VARIANTS.variant[variant].classes,
      className
    )
  );
</script>

<DropdownMenuPrimitive.Item class={itemClasses} {disabled} data-kumo-component="DropdownMenu" data-kumo-part="item" {...rest}>
  {#if href}
    {#snippet child({ props }: { props: Record<string, unknown> })}
      <a
        {...props}
        {href}
        {target}
        rel={rel ?? (target === '_blank' ? 'noreferrer' : undefined)}
        data-kumo-component="DropdownMenu"
        data-kumo-part="link-item"
        class={cn('flex w-full items-center text-inherit no-underline', props.class as string | undefined)}
      >
        {#if Icon}<Icon class="mr-2 h-4 w-4" />{/if}
        {@render children?.()}
        {#if selected}<span class="inline-flex"><Check class="h-4 w-4" /></span>{/if}
      </a>
    {/snippet}
  {:else}
    {#if Icon}<Icon class="mr-2 h-4 w-4" />{/if}
    {@render children?.()}
    {#if selected}<span class="inline-flex"><Check class="h-4 w-4" /></span>{/if}
  {/if}
</DropdownMenuPrimitive.Item>
