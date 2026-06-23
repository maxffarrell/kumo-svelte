<script lang="ts">
  import type { Component, Snippet } from 'svelte';
  import Button from '$lib/components/button/Button.svelte';
  import { getToolbarContext, toolbarControlClassName } from './context';

  export interface Props {
    children?: Snippet;
    class?: string;
    disabled?: boolean;
    loading?: boolean;
    icon?: Component;
    shape?: 'base' | 'square' | 'circle';
    type?: 'button' | 'submit' | 'reset';
    [key: string]: unknown;
  }

  let {
    children,
    class: className,
    disabled = false,
    loading = false,
    icon,
    shape,
    type = 'button',
    ...rest
  }: Props = $props();

  const toolbar = getToolbarContext();
  const size = $derived(toolbar?.size ?? 'base');
  const resolvedShape = $derived(shape ?? (!children && icon ? 'square' : 'base'));
</script>

<Button
  class={toolbarControlClassName(className)}
  {disabled}
  {icon}
  {loading}
  shape={resolvedShape}
  {size}
  {type}
  variant="ghost"
  componentName="Toolbar.Button"
  {...rest}
>
  {@render children?.()}
</Button>
