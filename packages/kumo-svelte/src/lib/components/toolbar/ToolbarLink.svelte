<script lang="ts">
  import type { Component, Snippet } from 'svelte';
  import LinkButton from '$lib/components/button/LinkButton.svelte';
  import { getToolbarContext, toolbarControlClassName } from './context';

  export interface Props {
    children?: Snippet;
    class?: string;
    icon?: Component;
    href?: string;
    external?: boolean;
    linksExternal?: boolean;
    shape?: 'base' | 'square' | 'circle';
    size?: never;
    variant?: never;
    disabled?: boolean;
    title?: string | number;
    'aria-label'?: string;
    'aria-labelledby'?: string;
    [key: string]: unknown;
  }

  let {
    children,
    class: className,
    icon,
    shape,
    size: _ignoredSize,
    variant: _ignoredVariant,
    ...rest
  }: Props = $props();
  const toolbar = getToolbarContext();
  const size = $derived(toolbar?.size ?? 'base');
  const resolvedShape = $derived(shape ?? (!children && icon ? 'square' : 'base'));
</script>

<LinkButton
  class={toolbarControlClassName(className)}
  {icon}
  shape={resolvedShape}
  {size}
  variant="ghost"
  componentName="Toolbar.Link"
  data-kumo-toolbar-control=""
  {...rest}
>
  {@render children?.()}
</LinkButton>
