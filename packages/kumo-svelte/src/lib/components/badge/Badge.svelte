<script lang="ts" module>
  export const KUMO_BADGE_BASE_STYLES = 'inline-flex w-fit flex-none shrink-0 items-center justify-self-start rounded-full px-2 py-0.5 text-xs font-medium whitespace-nowrap';
  export const KUMO_BADGE_VARIANTS = {
    primary: 'bg-kumo-badge-inverted text-kumo-badge-inverted',
    secondary: 'bg-kumo-fill text-kumo-badge-neutral-subtle',
    error: 'bg-kumo-danger-tint/60 text-kumo-danger',
    warning: 'bg-kumo-warning-tint/70 text-kumo-warning',
    success: 'bg-kumo-success-tint/70 text-kumo-success',
    destructive: 'bg-kumo-badge-red text-white',
    info: 'bg-kumo-info-tint/70 text-kumo-info',
    beta: 'border border-dashed border-kumo-brand bg-transparent text-kumo-link',
    outline: 'border border-kumo-fill bg-transparent text-kumo-default',
    red: 'bg-kumo-badge-red text-white',
    green: 'bg-kumo-badge-green text-white',
    neutral: 'bg-kumo-badge-neutral text-white',
    orange: 'bg-kumo-badge-orange text-black',
    purple: 'bg-kumo-badge-purple text-white',
    teal: 'bg-kumo-badge-teal text-white',
    'teal-subtle': 'bg-kumo-badge-teal-subtle text-kumo-badge-teal-subtle',
    blue: 'bg-kumo-badge-blue text-white'
  } as const;

  export const KUMO_BADGE_APPEARANCES = {
    filled: '',
    dot: 'gap-1.5 bg-transparent text-kumo-default ring ring-kumo-hairline'
  } as const;

  export const KUMO_BADGE_DOT_COLORS = {
    success: 'bg-kumo-success',
    warning: 'bg-kumo-badge-orange',
    error: 'bg-kumo-badge-red',
    neutral: 'bg-kumo-badge-neutral'
  } as const;

  export type BadgeVariant = keyof typeof KUMO_BADGE_VARIANTS;
  export type BadgeAppearance = keyof typeof KUMO_BADGE_APPEARANCES;
</script>

<script lang="ts">
  import type { Snippet } from 'svelte';
  import { cn } from '$lib/utils/cn';

  interface Props {
    children?: Snippet;
    class?: string;
    variant?: BadgeVariant;
    appearance?: BadgeAppearance;
    [key: string]: unknown;
  }

  let {
    children,
    class: className,
    variant = 'primary',
    appearance = 'filled',
    ...rest
  }: Props = $props();

  const dotColor = $derived(appearance === 'dot' ? KUMO_BADGE_DOT_COLORS[variant as keyof typeof KUMO_BADGE_DOT_COLORS] : undefined);
</script>

<span
  class={cn(
    KUMO_BADGE_BASE_STYLES,
    appearance === 'dot' ? undefined : KUMO_BADGE_VARIANTS[variant],
    KUMO_BADGE_APPEARANCES[appearance],
    className
  )}
  {...rest}
>
  {#if dotColor}
    <span aria-hidden="true" class={cn('size-1.75 shrink-0 rounded-full', dotColor)}></span>
  {/if}
  {@render children?.()}
</span>
