<script lang="ts">
  import CheckCircle from 'phosphor-svelte/lib/CheckCircle';
  import Info from 'phosphor-svelte/lib/Info';
  import Warning from 'phosphor-svelte/lib/Warning';
  import WarningOctagon from 'phosphor-svelte/lib/WarningOctagon';
  import X from 'phosphor-svelte/lib/X';
  import { Button } from '$lib/components/button';
  import { cn } from '$lib/utils/cn';
  import type { KumoToastObject, KumoToastVariant } from './manager.svelte';

  interface Props {
    toast: KumoToastObject;
    behind?: boolean;
    expanded?: boolean;
    onClose?: () => void;
  }

  const { toast, behind = false, expanded = false, onClose }: Props = $props();

  const backgroundClasses: Partial<Record<KumoToastVariant, string>> = {
    success: 'bg-kumo-success-tint/20',
    error: 'bg-kumo-danger-tint/50',
    warning: 'bg-kumo-warning-tint/50',
    info: 'bg-kumo-info-tint/50'
  };

  const closeClasses: Partial<Record<KumoToastVariant, string>> = {
    success: 'text-kumo-success',
    error: 'text-kumo-danger',
    warning: 'text-kumo-warning',
    info: 'text-kumo-info'
  };

  function iconForVariant(variant: KumoToastVariant = 'default') {
    if (variant === 'success') return CheckCircle;
    if (variant === 'error') return WarningOctagon;
    if (variant === 'warning') return Warning;
    if (variant === 'info') return Info;
    return undefined;
  }

  const Icon = $derived(iconForVariant(toast.variant));
</script>

<div class={cn('absolute inset-0 rounded-xl bg-kumo-base/90', toast.variant && backgroundClasses[toast.variant])}></div>
<div
  class="isolate flex flex-col gap-1 transition-opacity [transition-duration:250ms] data-[behind]:pointer-events-none data-[behind]:opacity-0 data-[expanded]:pointer-events-auto data-[expanded]:opacity-100"
  data-behind={behind ? '' : undefined}
  data-expanded={expanded ? '' : undefined}
>
  {#if toast.content}
    {@render toast.content()}
  {:else}
    <div class="flex items-start gap-2 pr-5">
      {#if Icon}
        <Icon data-toast-icon class="mt-0.5 h-4 w-4 shrink-0" weight="fill" />
      {/if}
      <div class="flex min-w-0 flex-col gap-1 overflow-hidden">
        {#if toast.title}
          <div data-toast-title class="text-[0.975rem] leading-5 font-medium text-kumo-default">
            {toast.title}
          </div>
        {/if}
        {#if toast.description}
          <div class="text-[0.925rem] leading-5 text-kumo-subtle">{toast.description}</div>
        {/if}
        {#if toast.actions}
          <div class="mt-2 flex min-w-0 flex-nowrap gap-2 overflow-x-auto p-px">
            {#each toast.actions as action, actionIndex (actionIndex)}
              <Button size="sm" variant={action.variant ?? 'secondary'} onclick={action.onClick}>
                {action.children}
              </Button>
            {/each}
          </div>
        {/if}
      </div>
    </div>
  {/if}
  <Button
    data-kumo-component="Toast"
    data-kumo-part="close"
    class={cn('absolute top-2 right-2 size-5 rounded text-kumo-subtle hover:bg-current/15', toast.variant && closeClasses[toast.variant])}
    aria-label="Close"
    variant="ghost"
    size="sm"
    shape="square"
    onclick={onClose}
  >
    <X class="h-3 w-3" />
  </Button>
</div>
