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
  export type KumoDropdownPart =
    | 'root'
    | 'trigger'
    | 'content'
    | 'item'
    | 'checkbox-item'
    | 'label'
    | 'radio-item'
    | 'radio-item-indicator'
    | 'separator'
    | 'shortcut'
    | 'sub-content'
    | 'sub-trigger';
</script>

<script lang="ts">
  import { DropdownMenu as DropdownMenuPrimitive } from 'bits-ui';
  import type { Component, Snippet } from 'svelte';
  import { CaretRight, Check } from 'phosphor-svelte';
  import { cn } from '$lib/utils/cn';

  interface Props {
    __part?: KumoDropdownPart;
    children?: Snippet;
    child?: Snippet<[{ props: Record<string, unknown> }]>;
    class?: string;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    checked?: boolean;
    onCheckedChange?: (checked: boolean) => void;
    sideOffset?: number;
    side?: 'top' | 'right' | 'bottom' | 'left';
    align?: 'start' | 'center' | 'end';
    container?: HTMLElement | string;
    inset?: boolean;
    icon?: Component;
    selected?: boolean;
    variant?: KumoDropdownVariant;
    href?: string;
    target?: string;
    rel?: string;
    disabled?: boolean;
    type?: 'button' | 'submit' | 'reset';
    value?: string;
    [key: string]: unknown;
  }

  let {
    __part = 'root',
    children,
    child: renderChild,
    class: className,
    open = $bindable(false),
    onOpenChange,
    checked = $bindable(false),
    onCheckedChange,
    sideOffset = 8,
    side,
    align,
    container,
    inset = false,
    icon: Icon,
    selected = false,
    variant = KUMO_DROPDOWN_DEFAULT_VARIANTS.variant,
    href,
    target,
    rel,
    disabled,
    type = 'button',
    value,
    ...rest
  }: Props = $props();

  const panelClasses = $derived(
    cn(
      'z-50 overflow-hidden bg-kumo-control text-kumo-default',
      'rounded-lg shadow-lg ring ring-kumo-line',
      'min-w-36 p-1.5',
      'data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95',
      'data-[side=bottom]:slide-in-from-top-2',
      'data-[side=left]:slide-in-from-right-2',
      'data-[side=right]:slide-in-from-left-2',
      'data-[side=top]:slide-in-from-bottom-2',
      'data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95',
      className
    )
  );

  const itemClasses = $derived(
    cn(
      'relative flex cursor-default items-center rounded-md px-2 py-1.5 text-base outline-hidden select-none focus:text-kumo-default focus:ring-kumo-focus/50 focus-visible:ring-2 focus-visible:ring-kumo-brand data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[highlighted]:bg-kumo-overlay',
      inset && 'pl-8',
      KUMO_DROPDOWN_VARIANTS.variant[variant].classes,
      className
    )
  );
</script>

{#snippet defaultTriggerChild({ props }: { props: Record<string, unknown> })}
  <span {...props} class={cn('inline-flex', className, props.class as string | undefined)}>
    {@render children?.()}
  </span>
{/snippet}

{#snippet itemContents()}
  {#if Icon}<Icon class="mr-2 h-4 w-4" />{/if}
  {@render children?.()}
  {#if selected}<span class="inline-flex"><Check class="h-4 w-4" /></span>{/if}
{/snippet}

{#if __part === 'root'}
  <DropdownMenuPrimitive.Root bind:open {onOpenChange} {...rest}>
    {@render children?.()}
  </DropdownMenuPrimitive.Root>
{:else if __part === 'trigger'}
  <DropdownMenuPrimitive.Trigger {type} {...rest} child={renderChild ?? defaultTriggerChild} />
{:else if __part === 'content'}
  <DropdownMenuPrimitive.Portal to={container}>
    <DropdownMenuPrimitive.Content class={panelClasses} {sideOffset} {side} {align} {...rest}>
      {@render children?.()}
    </DropdownMenuPrimitive.Content>
  </DropdownMenuPrimitive.Portal>
{:else if __part === 'sub-content'}
  <DropdownMenuPrimitive.Portal to={container}>
    <DropdownMenuPrimitive.SubContent class={panelClasses} {sideOffset} {side} {align} {...rest}>
      {@render children?.()}
    </DropdownMenuPrimitive.SubContent>
  </DropdownMenuPrimitive.Portal>
{:else if __part === 'item'}
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
          {@render itemContents()}
        </a>
      {/snippet}
    {:else}
      {@render itemContents()}
    {/if}
  </DropdownMenuPrimitive.Item>
{:else if __part === 'checkbox-item'}
  <DropdownMenuPrimitive.CheckboxItem
    bind:checked
    {onCheckedChange}
    data-kumo-component="DropdownMenu"
    data-kumo-part="checkbox-item"
    class={cn(
      'relative flex cursor-default items-center rounded-sm py-1.5 pr-2 pl-8 text-base outline-hidden transition-colors select-none focus:bg-kumo-tint focus:text-kumo-default focus:ring-kumo-focus/50 focus-visible:ring-2 focus-visible:ring-kumo-brand data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
      className
    )}
    {...rest}
  >
    {#snippet child({ checked }: { checked: boolean })}
      <span class="absolute left-2 flex h-3.5 w-3.5 items-center justify-center text-inherit">
        {#if checked}<Check class="h-3 w-3 stroke-[3]" />{/if}
      </span>
      {@render children?.()}
    {/snippet}
  </DropdownMenuPrimitive.CheckboxItem>
{:else if __part === 'label'}
  <DropdownMenuPrimitive.GroupHeading class={cn('px-2 py-1.5 text-base font-semibold', inset && 'pl-8', className)} {...rest}>
    {@render children?.()}
  </DropdownMenuPrimitive.GroupHeading>
{:else if __part === 'radio-item'}
  <DropdownMenuPrimitive.RadioItem
    value={String(value)}
    data-kumo-component="DropdownMenu"
    data-kumo-part="radio-item"
    class={cn(
      'relative flex cursor-default items-center rounded-md px-2 py-1.5 text-base outline-hidden select-none',
      'data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[highlighted]:bg-kumo-tint',
      inset && 'pl-8',
      className
    )}
    {...rest}
  >
    {#if Icon}<Icon class="mr-2 h-4 w-4" />{/if}
    {@render children?.()}
  </DropdownMenuPrimitive.RadioItem>
{:else if __part === 'radio-item-indicator'}
  <span class={cn('ml-auto', className)} {...rest}>
    {#if children}
      {@render children()}
    {:else}
      <Check class="h-4 w-4" />
    {/if}
  </span>
{:else if __part === 'separator'}
  <DropdownMenuPrimitive.Separator class={cn('-mx-1 my-1 h-px bg-kumo-hairline', className)} {...rest} />
{:else if __part === 'shortcut'}
  <span class={cn('ml-auto text-xs tracking-widest opacity-60', className)} {...rest}>
    {@render children?.()}
  </span>
{:else if __part === 'sub-trigger'}
  <DropdownMenuPrimitive.SubTrigger
    data-kumo-component="DropdownMenu"
    data-kumo-part="submenu-trigger"
    class={cn(
      'flex cursor-default items-center rounded-sm text-base outline-hidden select-none',
      'px-2 py-1.5',
      'focus:bg-kumo-tint focus:ring-kumo-focus/50 focus-visible:ring-2 focus-visible:ring-kumo-brand',
      'data-[state=open]:bg-kumo-tint',
      inset && 'pl-8',
      className
    )}
    {...rest}
  >
    {#if Icon}<Icon class="mr-2 h-4 w-4" />{/if}
    {@render children?.()}
    <CaretRight class="ml-auto h-4 w-4" />
  </DropdownMenuPrimitive.SubTrigger>
{/if}
