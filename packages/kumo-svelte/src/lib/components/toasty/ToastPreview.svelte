<script lang="ts">
  import { cn } from '$lib/utils/cn';
  import KumoToastContent from './KumoToastContent.svelte';
  import { toastRootClass, type KumoToastAction, type KumoToastVariant } from './manager.svelte';

  interface Props {
    variant?: KumoToastVariant;
    title?: string;
    description?: string;
    actions?: KumoToastAction[];
    class?: string;
  }

  let {
    variant = 'default',
    title = 'Toast title',
    description = 'Toast description text.',
    actions,
    class: className
  }: Props = $props();

  const toast = $derived({
    id: 'preview',
    variant,
    title,
    description,
    actions
  });
</script>

<div class={cn('relative w-[340px]', className)} data-kumo-component="Toast">
  <div class={toastRootClass(variant)}>
    <KumoToastContent {toast} expanded={true} onClose={() => {}} />
  </div>
</div>
