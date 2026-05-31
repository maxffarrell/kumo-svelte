<script module lang="ts">
  export type KumoCollapsiblePart =
    | 'collapsible'
    | 'root'
    | 'trigger'
    | 'panel'
    | 'default-trigger'
    | 'default-panel';
</script>

<script lang="ts">
  import { Collapsible as CollapsiblePrimitive } from 'bits-ui';
  import { CaretDown } from 'phosphor-svelte';
  import type { Snippet } from 'svelte';
  import { cn } from '$lib/utils/cn';

  export interface Props {
    __part?: KumoCollapsiblePart;
    trigger?: Snippet;
    children?: Snippet;
    class?: string;
    open?: boolean;
    defaultOpen?: boolean;
    title?: string;
    disabled?: boolean;
    onOpenChange?: (open: boolean) => void;
    onOpenChangeComplete?: (open: boolean) => void;
    keepMounted?: boolean;
    forceMount?: boolean;
    hiddenUntilFound?: boolean;
    type?: 'button' | 'submit' | 'reset';
    [key: string]: unknown;
  }

  let {
    __part = 'collapsible',
    trigger,
    children,
    class: className,
    defaultOpen = false,
    open = $bindable(defaultOpen),
    title,
    disabled = false,
    onOpenChange,
    onOpenChangeComplete,
    keepMounted = false,
    forceMount = false,
    hiddenUntilFound = true,
    type = 'button',
    ...rest
  }: Props = $props();

  let shouldForceMount = $derived(forceMount || keepMounted);
</script>

{#snippet defaultTriggerContent()}
  {@render children?.()}
  <CaretDown class="h-4 w-4 transition-transform group-data-[state=open]:rotate-180" />
{/snippet}

{#snippet defaultPanelContent()}
  {@render children?.()}
{/snippet}

{#if __part === 'collapsible'}
  <CollapsiblePrimitive.Root
    bind:open
    class={className}
    {disabled}
    {onOpenChange}
    {onOpenChangeComplete}
    {...rest}
  >
    {#if trigger}
      <CollapsiblePrimitive.Trigger
        data-kumo-component="Collapsible"
        data-kumo-part="trigger"
        class="group m-0 flex cursor-pointer items-center gap-1 border-none bg-transparent p-0 text-sm text-kumo-link shadow-none select-none"
        {disabled}
        {type}
      >
        {@render trigger()}
        <CaretDown class="h-4 w-4 transition-transform group-data-[state=open]:rotate-180" />
      </CollapsiblePrimitive.Trigger>
    {:else if title}
      <CollapsiblePrimitive.Trigger
        data-kumo-component="Collapsible"
        data-kumo-part="trigger"
        class="group m-0 flex cursor-pointer items-center gap-1 border-none bg-transparent p-0 text-sm text-kumo-link shadow-none select-none"
        {disabled}
        {type}
      >
        {title}
        <CaretDown class="h-4 w-4 transition-transform group-data-[state=open]:rotate-180" />
      </CollapsiblePrimitive.Trigger>
    {/if}
    <CollapsiblePrimitive.Content
      class="my-2 space-y-4 border-l-2 border-kumo-fill pl-4"
      forceMount={shouldForceMount}
      {hiddenUntilFound}
    >
      {@render children?.()}
    </CollapsiblePrimitive.Content>
  </CollapsiblePrimitive.Root>
{:else if __part === 'root'}
  <CollapsiblePrimitive.Root
    bind:open
    class={className}
    {disabled}
    {onOpenChange}
    {onOpenChangeComplete}
    {...rest}
  >
    {@render children?.()}
  </CollapsiblePrimitive.Root>
{:else if __part === 'trigger'}
  <CollapsiblePrimitive.Trigger
    data-kumo-component="Collapsible"
    data-kumo-part="trigger"
    class={cn('cursor-pointer', className)}
    {disabled}
    {type}
    {...rest}
  >
    {@render children?.()}
  </CollapsiblePrimitive.Trigger>
{:else if __part === 'panel'}
  <CollapsiblePrimitive.Content
    class={className}
    forceMount={shouldForceMount}
    {hiddenUntilFound}
    {...rest}
  >
    {@render children?.()}
  </CollapsiblePrimitive.Content>
{:else if __part === 'default-trigger'}
  <CollapsiblePrimitive.Trigger
    data-kumo-component="Collapsible"
    data-kumo-part="trigger"
    class={cn(
      'group m-0 flex cursor-pointer items-center gap-1 border-none bg-transparent p-0 text-sm text-kumo-link shadow-none select-none',
      className
    )}
    {disabled}
    {type}
    {...rest}
  >
    {@render defaultTriggerContent()}
  </CollapsiblePrimitive.Trigger>
{:else if __part === 'default-panel'}
  <CollapsiblePrimitive.Content
    class={cn('my-2 space-y-4 border-l-2 border-kumo-fill pl-4', className)}
    forceMount={shouldForceMount}
    {hiddenUntilFound}
    {...rest}
  >
    {@render defaultPanelContent()}
  </CollapsiblePrimitive.Content>
{/if}
