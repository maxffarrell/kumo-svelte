<script module lang="ts">
  import type { Component, Snippet } from 'svelte';
  import { ArrowClockwise } from 'phosphor-svelte';
  import { cn } from '$lib/utils/cn';
  import { Loader } from '$lib/components/loader';
  import { Tooltip } from '$lib/components/tooltip';

  export { LinkButton, RefreshButton };

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
        classes: 'bg-kumo-brand !text-white hover:bg-kumo-brand-hover disabled:bg-kumo-brand/50',
        description: 'High-emphasis button for primary actions'
      },
      secondary: {
        classes:
          'bg-kumo-base !text-kumo-default ring not-disabled:hover:bg-kumo-tint disabled:bg-kumo-base/50 disabled:!text-kumo-default/70 ring-kumo-hairline data-[state=open]:bg-kumo-base',
        description: 'Default button style for most actions'
      },
      ghost: {
        classes: 'text-kumo-default hover:bg-kumo-tint shadow-none bg-inherit',
        description: 'Minimal button with no background'
      },
      destructive: {
        classes: 'bg-kumo-danger !text-white hover:bg-kumo-danger/70',
        description: 'Danger button for destructive actions like delete'
      },
      'secondary-destructive': {
        classes:
          'bg-kumo-base !text-kumo-danger ring not-disabled:hover:bg-kumo-base disabled:bg-kumo-base/50 disabled:!text-kumo-danger/70 ring-kumo-hairline data-[state=open]:bg-kumo-base',
        description: 'Secondary button with destructive text for less prominent dangerous actions'
      },
      outline: {
        classes: 'bg-transparent text-kumo-default ring ring-kumo-hairline',
        description: 'Bordered button with transparent background'
      }
    }
  } as const;

  export const KUMO_BUTTON_DEFAULT_VARIANTS = {
    shape: 'base',
    size: 'base',
    variant: 'secondary'
  } as const;

  export type ButtonShape = keyof typeof KUMO_BUTTON_VARIANTS.shape;
  export type ButtonSize = keyof typeof KUMO_BUTTON_VARIANTS.size;
  export type ButtonVariant = keyof typeof KUMO_BUTTON_VARIANTS.variant;

  export function buttonVariants({
    variant = KUMO_BUTTON_DEFAULT_VARIANTS.variant,
    size = KUMO_BUTTON_DEFAULT_VARIANTS.size,
    shape = KUMO_BUTTON_DEFAULT_VARIANTS.shape
  }: {
    shape?: ButtonShape;
    size?: ButtonSize;
    variant?: ButtonVariant;
  } = {}) {
    const isCompactShape = shape === 'square' || shape === 'circle';

    return cn(
      'group flex w-max shrink-0 items-center font-medium select-none',
      'border-0 shadow-xs',
      'focus:outline-none focus:ring-kumo-focus/50 focus-visible:ring-2 focus-visible:ring-kumo-brand',
      'cursor-pointer',
      'disabled:cursor-not-allowed disabled:text-kumo-subtle',
      KUMO_BUTTON_VARIANTS.variant[variant].classes,
      KUMO_BUTTON_VARIANTS.size[size].classes,
      KUMO_BUTTON_VARIANTS.shape[shape].classes,
      isCompactShape && KUMO_BUTTON_VARIANTS.compactSize[size].classes
    );
  }

  export interface ButtonProps {
    children?: Snippet;
    class?: string;
    icon?: Component;
    href?: string;
    external?: boolean;
    type?: 'button' | 'submit' | 'reset';
    disabled?: boolean;
    shape?: ButtonShape;
    size?: ButtonSize;
    variant?: ButtonVariant;
    loading?: boolean;
    title?: string;
    [key: string]: unknown;
  }

  export interface LinkButtonProps extends Omit<ButtonProps, 'type' | 'disabled' | 'loading' | 'title'> {
    external?: boolean;
    linksExternal?: boolean;
    variant?: ButtonVariant;
  }

  export interface RefreshButtonProps {
    class?: string;
    loading?: boolean;
    size?: ButtonSize;
    variant?: ButtonVariant;
    'aria-label'?: string;
    [key: string]: unknown;
  }
</script>

<script lang="ts">
  let props: ButtonProps = $props();
</script>

{#snippet ButtonElement(props: ButtonProps)}
  {@const {
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
    ...rest
  } = props}
  {@const classes = cn(
    buttonVariants({ variant, size, shape }),
    disabled && 'cursor-not-allowed opacity-50',
    href && 'flex items-center no-underline!',
    className
  )}
  {@const loaderSize = size === 'lg' ? 16 : 14}
  {@const externalProps = external ? { target: '_blank', rel: 'noopener noreferrer' } : {}}

  <svelte:element
    this={href ? 'a' : 'button'}
    class={classes}
    href={href}
    type={href ? undefined : type}
    disabled={href ? undefined : disabled || loading}
    aria-busy={loading || undefined}
    data-kumo-component="Button"
    data-kumo-part={href ? 'link-button' : 'button'}
    {...externalProps}
    {...rest}
  >
    {#if loading}
      <Loader size={loaderSize} />
    {:else if IconComponent}
      <IconComponent />
    {/if}
    {#if children}
      <span class="contents">{@render children()}</span>
    {/if}
  </svelte:element>
{/snippet}

{#snippet ButtonSnippet(props: ButtonProps)}
  {@const { title } = props}

  {#if title}
    {#snippet trigger()}
      {@render ButtonElement(props)}
    {/snippet}
    <Tooltip trigger={trigger}>{title}</Tooltip>
  {:else}
    {@render ButtonElement(props)}
  {/if}
{/snippet}

{#snippet LinkButton(props: LinkButtonProps)}
  {@const {
    class: className,
    external = false,
    linksExternal,
    shape = 'base',
    size = 'base',
    variant = 'ghost',
    ...rest
  } = props}

  {@render ButtonSnippet({
    ...rest,
    external,
    shape: shape as ButtonShape,
    size: size as ButtonSize,
    variant: variant as ButtonVariant,
    class: className as string | undefined
  })}
{/snippet}

{#snippet RefreshButton(props: RefreshButtonProps)}
  {@const {
    class: className,
    loading = false,
    size = 'base',
    variant = 'secondary',
    'aria-label': ariaLabel = 'Refresh',
    ...rest
  } = props}

  {#snippet refreshIcon()}
    <ArrowClockwise
      class={cn({
        'animate-refresh': loading,
        'size-4.5': size === 'base',
        'size-4': size === 'sm' || size === 'xs',
        'size-5': size === 'lg'
      })}
    />
  {/snippet}

  {@render ButtonSnippet({
    ...rest,
    shape: 'square',
    size,
    variant,
    'aria-label': ariaLabel,
    class: className,
    children: refreshIcon
  })}
{/snippet}

{@render ButtonSnippet(props)}
