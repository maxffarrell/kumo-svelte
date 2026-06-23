<script lang="ts">
  import Input from '$lib/components/input/Input.svelte';
  import { getToolbarContext, toolbarControlClassName } from './context';

  export interface Props {
    class?: string;
    value?: string | number;
    onValueChange?: (value: string) => void;
    [key: string]: unknown;
  }

  let { class: className, value = $bindable(''), onValueChange, ...rest }: Props = $props();

  const toolbar = getToolbarContext();
  const size = $derived(toolbar?.size ?? 'base');
</script>

<Input bind:value {onValueChange} class={toolbarControlClassName(className)} {size} {...rest} />
