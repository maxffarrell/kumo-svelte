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

  function buttonElementClasses(props: ButtonProps) {
    return cn(
      buttonVariants({
        variant: props.variant ?? 'secondary',
        size: props.size ?? 'base',
        shape: props.shape ?? 'base'
      }),
      (props.disabled ?? false) && 'cursor-not-allowed opacity-50',
      props.href && 'flex items-center no-underline!',
      props.class
    );
  }

  function buttonExternalProps(props: ButtonProps) {
    return props.external ? { target: '_blank', rel: 'noopener noreferrer' } : {};
  }

  function buttonRestProps({
    children,
    class: className,
    icon,
    href,
    external,
    type,
    disabled,
    shape,
    size,
    variant,
    loading,
    title,
    ...rest
  }: ButtonProps) {
    void children;
    void className;
    void icon;
    void href;
    void external;
    void type;
    void disabled;
    void shape;
    void size;
    void variant;
    void loading;
    void title;
    return rest;
  }

  function linkButtonProps({
    class: className,
    external = false,
    linksExternal = false,
    shape = 'base',
    size = 'base',
    variant = 'ghost',
    ...rest
  }: LinkButtonProps): ButtonProps {
    return {
      ...rest,
      external: external || linksExternal,
      shape: shape as ButtonShape,
      size: size as ButtonSize,
      variant: variant as ButtonVariant,
      class: className as string | undefined
    };
  }

  function refreshIconClass(loading: boolean, size: ButtonSize) {
    return cn({
      'animate-refresh': loading,
      'size-4.5': size === 'base',
      'size-4': size === 'sm' || size === 'xs',
      'size-5': size === 'lg'
    });
  }
</script>

<script lang="ts">
  let props: ButtonProps = $props();
</script>

{#snippet ButtonElement(props: ButtonProps)}
  <svelte:element
    this={props.href ? 'a' : 'button'}
    class={buttonElementClasses(props)}
    href={props.href}
    type={props.href ? undefined : (props.type ?? 'button')}
    disabled={props.href ? undefined : (props.disabled ?? false) || (props.loading ?? false)}
    aria-busy={props.loading || undefined}
    data-kumo-component="Button"
    data-kumo-part={props.href ? 'link-button' : 'button'}
    {...buttonExternalProps(props)}
    {...buttonRestProps(props)}
  >
    {#if props.loading}
      <Loader size={props.size === 'lg' ? 16 : 14} />
    {:else if props.icon}
      <props.icon />
    {/if}
    {#if props.children}
      <span class="contents">{@render props.children()}</span>
    {/if}
  </svelte:element>
{/snippet}

{#snippet ButtonSnippet(props: ButtonProps)}
  {#if props.title}
    {#snippet trigger()}
      {@render ButtonElement(props)}
    {/snippet}
    <Tooltip trigger={trigger}>{props.title}</Tooltip>
  {:else}
    {@render ButtonElement(props)}
  {/if}
{/snippet}

{#snippet LinkButton(props: LinkButtonProps)}
  {@render ButtonSnippet(linkButtonProps(props))}
{/snippet}

{#snippet RefreshButton(props: RefreshButtonProps)}
  {#snippet refreshIcon({ loading, size }: { loading: boolean; size: ButtonSize })}
    <ArrowClockwise
      class={refreshIconClass(loading, size)}
    />
  {/snippet}

  {@render ButtonSnippet({
    ...props,
    shape: 'square',
    size: props.size ?? 'base',
    variant: props.variant ?? 'secondary',
    'aria-label': props['aria-label'] ?? 'Refresh',
    class: props.class,
    children: () => refreshIcon({
      loading: props.loading ?? false,
      size: props.size ?? 'base'
    })
  })}
{/snippet}

{@render ButtonSnippet(props)}
