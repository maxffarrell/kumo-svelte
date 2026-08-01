<script module lang="ts">
  import { cn } from '$lib/utils/cn';

  export const KUMO_BANNER_BASE_STYLES = 'flex w-full';

  export const KUMO_BANNER_VARIANTS = {
    variant: {
      default: {
        classes: 'bg-kumo-info-tint text-kumo-info',
        iconClasses: 'fill-kumo-info',
        description: 'Informational banner for general messages'
      },
      alert: {
        classes: 'bg-kumo-warning-tint text-kumo-warning',
        iconClasses: 'fill-kumo-warning',
        description: 'Warning banner for cautionary messages'
      },
      error: {
        classes: 'bg-kumo-danger-tint text-kumo-danger',
        iconClasses: 'fill-kumo-danger',
        description: 'Error banner for critical issues'
      },
      secondary: {
        classes: 'bg-kumo-contrast/5 text-kumo-default/70',
        iconClasses: 'fill-kumo-interact',
        description: 'Neutral banner for secondary messages'
      }
    },
    size: {
      base: { classes: 'items-start gap-3 rounded-lg px-4 py-3 text-base', description: 'Default banner size' },
      sm: { classes: 'items-center gap-2 rounded-md px-3 py-2 text-sm', description: 'Compact banner for dialogs and tight spaces' }
    }
  } as const;

  export const KUMO_BANNER_DEFAULT_VARIANTS = {
    variant: 'default',
    size: 'base'
  } as const;

  type Variant = keyof typeof KUMO_BANNER_VARIANTS.variant;
  type Size = keyof typeof KUMO_BANNER_VARIANTS.size;
  export type BannerVariant = Variant;
  export type KumoBannerSize = Size;

  export function bannerVariants({
    variant = KUMO_BANNER_DEFAULT_VARIANTS.variant,
    size = KUMO_BANNER_DEFAULT_VARIANTS.size
  }: {
    variant?: Variant;
    size?: Size;
  } = {}) {
    const variantConfig =
      KUMO_BANNER_VARIANTS.variant[variant] ??
      KUMO_BANNER_VARIANTS.variant[KUMO_BANNER_DEFAULT_VARIANTS.variant];

    return cn(KUMO_BANNER_BASE_STYLES, variantConfig.classes, KUMO_BANNER_VARIANTS.size[size]?.classes ?? KUMO_BANNER_VARIANTS.size.base.classes);
  }
</script>

<script lang="ts">
  import type { Component, Snippet } from 'svelte';
  import { setBannerActionContext } from './context';

  interface Props {
    children?: Snippet;
    action?: Snippet;
    class?: string;
    icon?: Component;
    variant?: Variant;
    size?: Size;
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
    size = 'base',
    title,
    description,
    text,
    ...rest
  }: Props = $props();

  const variantConfig = $derived(
    KUMO_BANNER_VARIANTS.variant[variant] ??
      KUMO_BANNER_VARIANTS.variant[KUMO_BANNER_DEFAULT_VARIANTS.variant]
  );
  const classes = $derived(cn(bannerVariants({ variant, size }), className));
  let actionElement = $state<HTMLSpanElement>();
  let actionIsInlineLink = $state(false);
  let observedAction = $state<Snippet>();

  $effect(() => {
    if (action !== observedAction) {
      observedAction = action;
      actionIsInlineLink = false;
    }
  });

  $effect(() => {
    if (size !== 'sm') {
      actionIsInlineLink = false;
      return;
    }
    if (!actionElement) return;

    actionIsInlineLink = Boolean(actionElement.querySelector('[data-kumo-component="Link"]'));
  });

  setBannerActionContext({
    get variant() {
      return variant;
    },
    get size() {
      return size === 'sm' ? 'xs' : 'sm';
    }
  });
</script>

<div class={classes} {...rest}>
  {#if title || description}
    {#if IconComponent}
      <span class={cn('shrink-0 flex items-center h-[1.375em]', variantConfig.iconClasses)}>
        <IconComponent weight="fill" />
      </span>
    {/if}
    <div class={cn('flex min-w-0 flex-1 items-center justify-between', size === 'sm' ? 'gap-2' : 'gap-3', !title && 'pt-px')}>
      {#if size === 'sm'}
        <div class="flex min-w-0 flex-wrap items-baseline gap-x-1.5">
          {#if title}
            <span class="font-medium leading-snug">
              {title}
              {#if action && actionIsInlineLink && !description}
                <span class="banner-compact-action ml-1.5 contents">{@render action()}</span>
              {/if}
            </span>
          {/if}
          {#if description}
            <span class="text-sm leading-snug">
              {#if typeof description === 'function'}{@render description()}{:else}{description}{/if}
              {#if action && actionIsInlineLink}
                <span class="banner-compact-action ml-1.5 contents">{@render action()}</span>
              {/if}
            </span>
          {/if}
          {#if action && !actionIsInlineLink}
            <span
              bind:this={actionElement}
              class="banner-compact-action ml-auto flex shrink-0 items-center gap-2"
            >
              {@render action()}
            </span>
          {/if}
        </div>
      {:else}
        <div class="flex flex-col gap-0.5">
          {#if title}<p class="font-medium leading-snug">{title}</p>{/if}
          {#if description}
            <div class="text-sm leading-snug">
              {#if typeof description === 'function'}{@render description()}{:else}<p>{description}</p>{/if}
            </div>
          {/if}
        </div>
      {/if}
      {#if action && size !== 'sm'}<div class="flex shrink-0 items-center gap-2">{@render action()}</div>{/if}
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

<style>
  :global(.banner-compact-action > [data-kumo-component='Link']) {
    margin-left: 0.375rem;
  }
</style>
