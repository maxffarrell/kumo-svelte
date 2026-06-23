<script lang="ts">
  import type { Snippet } from 'svelte';
  import { InputGroup } from '$lib/components/input-group';
  import { getToolbarContext, toolbarControlClassName } from './context';

  export interface Props {
    children?: Snippet;
    class?: string;
    [key: string]: unknown;
  }

  let { children, class: className, ...rest }: Props = $props();

  const toolbar = getToolbarContext();
  const size = $derived(toolbar?.size ?? 'base');
</script>

<InputGroup class={toolbarControlClassName(className)} {size} {...rest}>
  {@render children?.()}
</InputGroup>
