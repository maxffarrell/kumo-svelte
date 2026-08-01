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
    href,
    external = false,
    linksExternal,
    shape = 'base',
    size = 'base',
    variant = 'ghost',
    disabled = false,
    title,
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledby,
    ...rest
  }: Props = $props();

  const disabledRest = $derived(
    Object.fromEntries(
      Object.entries(rest).filter(
        ([key]) =>
          !key.startsWith('on') &&
          ![
            'href',
            'target',
            'rel',
            'download',
            'hreflang',
            'media',
            'ping',
            'referrerpolicy'
          ].includes(key.toLowerCase())
      )
    )
  );
</script>

<Button
  href={disabled ? undefined : href}
  {external}
  {icon}
  {shape}
  {size}
  {variant}
  {disabled}
  {title}
  aria-label={ariaLabel}
  aria-labelledby={ariaLabelledby}
  componentName="LinkButton"
  class={className}
  {...(disabled ? disabledRest : rest)}
>
  {@render children?.()}
</Button>
