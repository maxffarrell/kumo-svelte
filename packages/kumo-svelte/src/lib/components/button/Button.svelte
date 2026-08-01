<script lang="ts">
  import type { Component, Snippet } from 'svelte';
  import { cn } from '$lib/utils/cn';
  import { Loader } from '$lib/components/loader';
  import { Tooltip, TooltipProvider } from '$lib/components/tooltip';

  export const KUMO_BUTTON_VARIANTS = {
    shape: {
      base: {
        classes: '',
        description: 'Default rectangular button shape'
      },
      square: {
        classes: 'items-center justify-center p-0',
        description: 'Square button for icon-only actions'
      },
      circle: {
        classes: 'items-center justify-center p-0 rounded-full',
        description: 'Circular button for icon-only actions'
      }
    },
    size: {
      xs: {
        classes: 'h-5 gap-1 rounded-sm px-1.5 text-xs',
        description: 'Extra small button for compact UIs'
      },
      sm: {
        classes: 'h-6.5 gap-1 rounded-md px-2 text-xs',
        description: 'Small button for secondary actions'
      },
      base: {
        classes: 'h-9 gap-1.5 rounded-lg px-3 text-base',
        description: 'Default button size'
      },
      lg: {
        classes: 'h-10 gap-2 rounded-lg px-4 text-base',
        description: 'Large button for primary CTAs'
      }
    },
    compactSize: {
      xs: { classes: 'size-3.5' },
      sm: { classes: 'size-6.5' },
      base: { classes: 'size-9' },
      lg: { classes: 'size-10' }
    },
    variant: {
      primary: {
        classes:
          'relative overflow-hidden bg-(--kumo-button-emphasis-bg) !text-white ring ring-(--kumo-button-emphasis-ring) focus:ring-(--kumo-button-emphasis-ring) focus-visible:ring-(--kumo-button-emphasis-ring) active:ring-(--kumo-button-emphasis-ring) disabled:opacity-50',
        description: 'High-emphasis button for primary actions'
      },
      secondary: {
        classes:
          'bg-kumo-base !text-kumo-default ring not-disabled:hover:bg-kumo-tint disabled:bg-kumo-base/50 disabled:!text-kumo-default/70 ring-kumo-line data-[state=open]:bg-kumo-base',
        description: 'Default button style for most actions'
      },
      ghost: {
        classes: 'text-kumo-default hover:bg-kumo-tint shadow-none bg-inherit',
        description: 'Minimal button with no background'
      },
      destructive: {
        classes:
          'relative overflow-hidden bg-(--kumo-button-emphasis-bg) !text-white ring ring-(--kumo-button-emphasis-ring) focus:ring-(--kumo-button-emphasis-ring) focus-visible:ring-(--kumo-button-emphasis-ring) active:ring-(--kumo-button-emphasis-ring) disabled:opacity-50',
        description: 'Danger button for destructive actions like delete'
      },
      'secondary-destructive': {
        classes:
          'bg-kumo-base !text-kumo-danger ring not-disabled:hover:!text-kumo-danger not-disabled:hover:ring-kumo-danger/30 disabled:bg-kumo-base/50 disabled:!text-kumo-danger/70 ring-kumo-line data-[state=open]:bg-kumo-base',
        description: 'Secondary button with destructive text for less prominent dangerous actions'
      },
      outline: {
        classes:
          'bg-transparent text-kumo-default ring ring-kumo-line transition-colors not-disabled:hover:text-kumo-strong not-disabled:hover:ring-kumo-focus/25',
        description: 'Bordered button with transparent background'
      }
    }
  } as const;

  export const KUMO_BUTTON_DEFAULT_VARIANTS = {
    shape: 'base',
    size: 'base',
    variant: 'secondary'
  } as const;

  type Shape = keyof typeof KUMO_BUTTON_VARIANTS.shape;
  type Size = keyof typeof KUMO_BUTTON_VARIANTS.size;
  type Variant = keyof typeof KUMO_BUTTON_VARIANTS.variant;

  export function buttonVariants({
    variant = KUMO_BUTTON_DEFAULT_VARIANTS.variant,
    size = KUMO_BUTTON_DEFAULT_VARIANTS.size,
    shape = KUMO_BUTTON_DEFAULT_VARIANTS.shape
  }: {
    shape?: Shape;
    size?: Size;
    variant?: Variant;
  } = {}) {
    const isCompactShape = shape === 'square' || shape === 'circle';

    return cn(
      'group flex w-max shrink-0 items-center font-medium select-none',
      'border-0 shadow-xs',
      'focus:outline-none focus:ring-kumo-focus/50 focus-visible:ring-2 focus-visible:ring-kumo-brand',
      'cursor-pointer',
      'disabled:cursor-not-allowed disabled:text-kumo-subtle',
      KUMO_BUTTON_VARIANTS.size[size].classes,
      KUMO_BUTTON_VARIANTS.shape[shape].classes,
      isCompactShape && KUMO_BUTTON_VARIANTS.compactSize[size].classes,
      KUMO_BUTTON_VARIANTS.variant[variant].classes
    );
  }

  interface Props {
    children?: Snippet;
    class?: string;
    icon?: Component;
    href?: string;
    external?: boolean;
    type?: 'button' | 'submit' | 'reset';
    disabled?: boolean;
    shape?: Shape;
    size?: Size;
    variant?: Variant;
    loading?: boolean;
    title?: string | number;
    componentName?: 'Button' | 'LinkButton' | 'Toolbar.Button';
    [key: string]: unknown;
  }

  let {
    children,
    class: className,
    icon: IconComponent,
    href,
    external = false,
    type = 'button',
    disabled = false,
    shape = 'base',
    size = 'base',
    variant = 'secondary',
    loading = false,
    title,
    componentName = 'Button',
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledby,
    ...rest
  }: Props = $props();

  let classes = $derived(
    cn(
      buttonVariants({ variant, size, shape }),
      disabled && 'cursor-not-allowed opacity-50',
      href && 'flex items-center no-underline!',
      className
    )
  );

  const loaderSize = $derived(size === 'lg' ? 16 : 14);
  const externalProps = $derived(external ? { target: '_blank', rel: 'noopener noreferrer' } : {});
  const emphasisToken = $derived(
    variant === 'primary'
      ? 'var(--color-kumo-brand)'
      : variant === 'destructive'
        ? 'var(--color-kumo-danger)'
        : undefined
  );
  const emphasisRing = $derived(emphasisToken ? `color-mix(in oklch, ${emphasisToken}, black 10%)` : undefined);
  const emphasisBg = $derived(emphasisToken ? `color-mix(in oklch, ${emphasisToken}, white 30%)` : undefined);
  const emphasisGradientStart = $derived(
    emphasisToken ? `color-mix(in oklch, ${emphasisToken}, white 15%)` : undefined
  );
  const emphasisGradientEnd = $derived(emphasisToken);
  const titleLabel = $derived(
    typeof title === 'string'
      ? title.trim() ? title : undefined
      : title !== undefined ? String(title) : undefined
  );
  const resolvedAriaLabel = $derived(
    ariaLabel ?? (!children && !ariaLabelledby ? titleLabel : undefined)
  );
  const rendersAsButton = $derived(!href || disabled || loading);
  const renderedExternalProps = $derived(rendersAsButton ? {} : externalProps);
</script>

{#snippet buttonElement(triggerProps: Record<string, unknown> = {})}
  <svelte:element
    this={rendersAsButton ? 'button' : 'a'}
    class={classes}
    href={rendersAsButton ? undefined : href}
    type={rendersAsButton ? type : undefined}
    disabled={rendersAsButton ? disabled || loading : undefined}
    aria-busy={loading || undefined}
    data-kumo-component={componentName}
    data-kumo-part={rendersAsButton ? 'button' : 'link-button'}
    aria-label={resolvedAriaLabel}
    aria-labelledby={ariaLabelledby}
    style:--kumo-button-emphasis-ring={emphasisRing}
    style:--kumo-button-emphasis-bg={emphasisBg}
    style:--kumo-button-emphasis-gradient-start={emphasisGradientStart}
    style:--kumo-button-emphasis-gradient-end={emphasisGradientEnd}
    {...rest}
    {...renderedExternalProps}
    {...triggerProps}
  >
    {#if emphasisToken}
      <span
        aria-hidden="true"
        class="absolute inset-0 rounded-[inherit] bg-linear-to-b from-(--kumo-button-emphasis-gradient-start) to-(--kumo-button-emphasis-gradient-end) shadow-[inset_0_1px_0_0_var(--kumo-button-emphasis-bg)] group-hover:from-(--kumo-button-emphasis-bg)"
      ></span>
      <span class="relative flex items-center gap-1.5">
        {#if loading}
          <Loader size={loaderSize} />
        {:else if IconComponent}
          <IconComponent />
        {/if}
        {#if children}
          <span class="contents">{@render children()}</span>
        {/if}
      </span>
    {:else}
      {#if loading}
        <Loader size={loaderSize} />
      {:else if IconComponent}
        <IconComponent />
      {/if}
      {#if children}
        <span class="contents">{@render children()}</span>
      {/if}
    {/if}
  </svelte:element>
{/snippet}

{#if title}
  <TooltipProvider>
    {#if rendersAsButton && (href || disabled || loading)}
      {#snippet disabledTrigger(triggerProps: Record<string, unknown>)}
        <span {...triggerProps} class="inline-flex">
          {@render buttonElement({})}
        </span>
      {/snippet}
      <Tooltip trigger={disabledTrigger}>{title}</Tooltip>
    {:else}
      <Tooltip trigger={buttonElement}>{title}</Tooltip>
    {/if}
  </TooltipProvider>
{:else}
  {@render buttonElement({})}
{/if}
