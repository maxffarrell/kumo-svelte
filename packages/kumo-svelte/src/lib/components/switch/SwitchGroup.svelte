<script lang="ts">
  import { setContext } from 'svelte';
  import type { Snippet } from 'svelte';
  import { cn } from '#lib/utils/cn.js';

  interface Props {
    children?: Snippet;
    legend?: string;
    description?: string;
    error?: string;
    disabled?: boolean;
    controlFirst?: boolean;
    class?: string;
  }

  let { children, legend, description, error, disabled = false, controlFirst = true, class: className }: Props = $props();
  setContext('kumo-switch-group', { get controlFirst() { return controlFirst; } });
</script>

<fieldset class={cn('flex flex-col gap-4', className)} {disabled}>
  {#if legend}
    <legend class="text-base font-medium text-kumo-default">{legend}</legend>
  {/if}
  <div class="flex flex-col gap-2">
    {@render children?.()}
  </div>
  {#if error}
    <p class="text-sm text-kumo-danger">{error}</p>
  {/if}
  {#if description}
    <p class="text-sm text-kumo-subtle">{description}</p>
  {/if}
</fieldset>
