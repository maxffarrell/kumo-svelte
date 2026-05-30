<script lang="ts">
  import type { Snippet } from 'svelte';
  import { getComboboxContext } from './context';
  import { cn } from '$lib/utils/cn';

  export interface Props {
    children?: Snippet;
    class?: string;
    [key: string]: unknown;
  }

  let { children, class: className, ...rest }: Props = $props();
  const context = getComboboxContext('Combobox.Trigger');
</script>

<button
  type="button"
  class={cn('inline-flex items-center gap-2', className)}
  disabled={context.disabled}
  data-kumo-component="Combobox"
  data-kumo-part="trigger"
  onclick={() => (context.open = !context.open)}
  {...rest}
>
  {@render children?.()}
</button>
