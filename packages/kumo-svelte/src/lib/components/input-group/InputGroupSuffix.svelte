<script lang="ts">
  import type { Snippet } from 'svelte';
  import { cn } from '#lib/utils/cn.js';
  import { getInputGroupContext, INPUT_GROUP_SIZE } from './context';

  interface Props {
    children?: Snippet;
    class?: string;
  }

  let { children, class: className }: Props = $props();

  const context = getInputGroupContext();
  const size = $derived(context?.size ?? 'base');
  const tokens = $derived(INPUT_GROUP_SIZE[size]);
</script>

<div
  data-slot="input-group-suffix"
  class={cn(
    'pointer-events-none flex min-w-0 grow select-none items-center text-kumo-subtle',
    tokens.fontSize,
    tokens.suffixPad,
    className
  )}
>
  <span class="truncate">{@render children?.()}</span>
</div>
