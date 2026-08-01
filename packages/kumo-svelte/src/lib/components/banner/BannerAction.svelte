<script lang="ts">
  import type { Component, Snippet } from 'svelte';
  import { Button } from '$lib/components/button';
  import { cn } from '$lib/utils/cn';
  import { getBannerActionContext } from './context';

  type ActionVariant = 'primary' | 'secondary' | 'ghost';

  interface Props {
    children?: Snippet;
    class?: string;
    icon?: Component;
    variant?: ActionVariant;
    style?: string;
    [key: string]: unknown;
  }

  let {
    children,
    class: className,
    icon,
    variant = 'primary',
    style,
    ...rest
  }: Props = $props();

  const banner = getBannerActionContext();
  const buttonVariant = $derived(variant === 'secondary' ? 'outline' : variant);
  const accents = {
    default: { token: 'var(--color-kumo-info)', secondary: 'ring-kumo-info/50 fill-kumo-info hover:!ring-kumo-info/50 hover:bg-kumo-info/10', ghost: 'fill-kumo-info hover:bg-kumo-info/10' },
    alert: { token: 'var(--color-kumo-warning)', secondary: 'ring-kumo-warning/50 fill-kumo-warning hover:!ring-kumo-warning/50 hover:bg-kumo-warning/10', ghost: 'fill-kumo-warning hover:bg-kumo-warning/10' },
    error: { token: 'var(--color-kumo-danger)', secondary: 'ring-kumo-danger/50 fill-kumo-danger hover:!ring-kumo-danger/10 hover:bg-kumo-danger/10', ghost: 'fill-kumo-danger hover:bg-kumo-danger/10' },
    secondary: { token: 'var(--color-neutral-700, oklch(37.1% 0 0))', secondary: 'ring-kumo-focus/20 fill-kumo-subtle hover:bg-kumo-contrast/10', ghost: 'fill-kumo-subtle hover:bg-kumo-contrast/10' }
  } as const;
  const accent = accents[banner.variant];
  const actionClass = $derived(cn(variant !== 'primary' && [
    'text-inherit',
    variant === 'secondary' ? accent.secondary : accent.ghost,
    variant === 'secondary' && 'hover:!text-inherit'
  ], className));
  const actionStyle = $derived(
    variant === 'primary'
      ? [
          `--kumo-button-emphasis-ring: color-mix(in oklch, ${accent.token}, black 10%)`,
          `--kumo-button-emphasis-bg: color-mix(in oklch, ${accent.token}, white 30%)`,
          `--kumo-button-emphasis-gradient-start: color-mix(in oklch, ${accent.token}, white 15%)`,
          `--kumo-button-emphasis-gradient-end: ${accent.token}`,
          style
        ].filter(Boolean).join('; ')
      : style
  );
</script>

<Button
  variant={buttonVariant}
  size={banner.size === 'xs' ? 'xs' : 'sm'}
  {icon}
  class={actionClass}
  style={actionStyle}
  data-kumo-component="Banner.Action"
  {...rest}
>
  {@render children?.()}
</Button>
