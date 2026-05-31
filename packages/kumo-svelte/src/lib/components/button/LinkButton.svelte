<script lang="ts">
  import type { Component, Snippet } from 'svelte';
  import Button from './Button.svelte';

  interface Props {
    children?: Snippet;
    class?: string;
    icon?: Component;
    href?: string;
    external?: boolean;
    linksExternal?: boolean;
    shape?: 'base' | 'square' | 'circle';
    size?: 'xs' | 'sm' | 'base' | 'lg';
    variant?: 'primary' | 'secondary' | 'ghost' | 'destructive' | 'secondary-destructive' | 'outline';
    [key: string]: unknown;
  }

  let {
    children,
    class: className,
    icon,
    href,
    external = false,
    linksExternal,
    shape = 'base',
    size = 'base',
    variant = 'ghost',
    ...rest
  }: Props = $props();
</script>

<Button
  {href}
  {external}
  {icon}
  {shape}
  {size}
  {variant}
  componentName="LinkButton"
  class={className}
  {...rest}
>
  {@render children?.()}
</Button>
