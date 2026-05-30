<script module lang="ts">
  import { cn } from '$lib/utils/cn';

  export const KUMO_BANNER_BASE_STYLES =
    'flex w-full items-start gap-3 rounded-lg px-4 py-3 text-base';

  export const KUMO_BANNER_VARIANTS = {
    variant: {
      default: {
        classes: 'bg-kumo-banner-info text-kumo-info',
        iconClasses: 'text-kumo-info',
        description: 'Informational banner for general messages'
      },
      alert: {
        classes: 'bg-kumo-banner-warning text-kumo-warning',
        iconClasses: 'text-kumo-warning',
        description: 'Warning banner for cautionary messages'
      },
      error: {
        classes: 'bg-kumo-danger-tint/60 text-kumo-danger',
        iconClasses: 'text-kumo-danger',
        description: 'Error banner for critical issues'
      },
      secondary: {
        classes: 'bg-kumo-contrast/5 text-kumo-subtle',
        iconClasses: 'text-kumo-subtle',
        description: 'Neutral banner for secondary messages'
      }
    }
  } as const;

  export const KUMO_BANNER_DEFAULT_VARIANTS = {
    variant: 'default'
  } as const;

  type Variant = keyof typeof KUMO_BANNER_VARIANTS.variant;
  export type BannerVariant = Variant;

  export function bannerVariants({
    variant = KUMO_BANNER_DEFAULT_VARIANTS.variant
  }: {
    variant?: Variant;
  } = {}) {
    const variantConfig =
      KUMO_BANNER_VARIANTS.variant[variant] ??
      KUMO_BANNER_VARIANTS.variant[KUMO_BANNER_DEFAULT_VARIANTS.variant];

    return cn(KUMO_BANNER_BASE_STYLES, variantConfig.classes);
  }
</script>

<script lang="ts">
  import type { Component, Snippet } from 'svelte';

  interface Props {
    children?: Snippet;
    action?: Snippet;
    class?: string;
    icon?: Component;
    variant?: Variant;
    title?: string;
    description?: string | Snippet;
    text?: string;
    [key: string]: unknown;
  }

  let {
    children,
    action,
    class: className,
    icon: IconComponent,
    variant = 'default',
    title,
    description,
    text,
    ...rest
  }: Props = $props();

  const variantConfig = $derived(
    KUMO_BANNER_VARIANTS.variant[variant] ??
      KUMO_BANNER_VARIANTS.variant[KUMO_BANNER_DEFAULT_VARIANTS.variant]
  );
  const classes = $derived(cn(bannerVariants({ variant }), className));
</script>

<div class={classes} {...rest}>
  {#if title || description}
    {#if IconComponent}
      <span class={cn('shrink-0 flex items-center h-[1.375em]', variantConfig.iconClasses)}>
        <IconComponent weight="fill" />
      </span>
    {/if}
    <div class={cn('flex min-w-0 flex-1 items-center justify-between gap-3', !title && 'pt-px')}>
      <div class="flex flex-col gap-0.5">
        {#if title}<p class="font-medium leading-snug">{title}</p>{/if}
        {#if description}
          <div class="text-sm leading-snug">
            {#if typeof description === 'function'}
              {@render description()}
            {:else}
              <p>{description}</p>
            {/if}
          </div>
        {/if}
      </div>
      {#if action}<div class="flex shrink-0 items-center gap-2">{@render action()}</div>{/if}
    </div>
  {:else}
    {#if IconComponent}
      <span class={cn('shrink-0', variantConfig.iconClasses)}>
        <IconComponent weight="fill" />
      </span>
    {/if}
    {#if children}
      {@render children()}
    {:else}
      <p>{text}</p>
    {/if}
  {/if}
</div>
