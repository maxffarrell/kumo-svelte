<script lang="ts">
  import { Collapsible } from '$lib/components/collapsible';

  type Variant = 'compound' | 'default' | 'shorthand';

  interface Props {
    variant?: Variant;
    open?: boolean;
    defaultOpen?: boolean;
    disabled?: boolean;
    keepMounted?: boolean;
    forceMount?: boolean;
    rootClass?: string;
    triggerClass?: string;
    panelClass?: string;
    title?: string;
    onOpenChange?: (open: boolean) => void;
  }

  let {
    variant = 'compound',
    open = $bindable(defaultOpen),
    defaultOpen,
    disabled = false,
    keepMounted = false,
    forceMount = false,
    rootClass,
    triggerClass,
    panelClass,
    title = 'Show details',
    onOpenChange
  }: Props = $props();
</script>

{#snippet shorthandTrigger()}
  {title}
{/snippet}

{#if variant === 'shorthand'}
  <Collapsible
    bind:open
    {defaultOpen}
    {disabled}
    {keepMounted}
    {forceMount}
    trigger={shorthandTrigger}
    {onOpenChange}
    class={rootClass}
    data-testid="collapsible-root"
  >
    Panel content
  </Collapsible>
{:else if variant === 'default'}
  <Collapsible.Root
    bind:open
    {defaultOpen}
    {disabled}
    {onOpenChange}
    class={rootClass}
    data-testid="collapsible-root"
  >
    <Collapsible.DefaultTrigger {disabled} class={triggerClass} data-testid="collapsible-trigger">
      {open ? 'Hide details' : 'Show details'}
    </Collapsible.DefaultTrigger>
    <Collapsible.DefaultPanel
      {keepMounted}
      {forceMount}
      class={panelClass}
      data-testid="collapsible-panel"
    >
      Panel content
    </Collapsible.DefaultPanel>
  </Collapsible.Root>
{:else}
  <Collapsible.Root
    bind:open
    {defaultOpen}
    {disabled}
    {onOpenChange}
    class={rootClass}
    data-testid="collapsible-root"
  >
    <Collapsible.Trigger {disabled} class={triggerClass} data-testid="collapsible-trigger">
      {open ? 'Hide details' : 'Show details'}
    </Collapsible.Trigger>
    <Collapsible.Panel {keepMounted} {forceMount} class={panelClass} data-testid="collapsible-panel">
      Panel content
    </Collapsible.Panel>
  </Collapsible.Root>
{/if}
