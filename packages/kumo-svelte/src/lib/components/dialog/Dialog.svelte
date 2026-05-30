<script lang="ts">
  import { AlertDialog, Dialog as DialogPrimitive } from 'bits-ui';
  import type { Snippet } from 'svelte';
  import { cn } from '$lib/utils/cn';

  export const KUMO_DIALOG_VARIANTS = {
    size: {
      base: {
        classes: 'sm:min-w-96',
        description: 'Default dialog width'
      },
      sm: {
        classes: 'min-w-72',
        description: 'Small dialog for simple confirmations'
      },
      lg: {
        classes: 'min-w-[32rem]',
        description: 'Large dialog for complex content'
      },
      xl: {
        classes: 'min-w-[48rem]',
        description: 'Extra large dialog for detailed views'
      }
    },
    role: {
      dialog: {
        classes: '',
        description: 'Standard dialog for general-purpose modals'
      },
      alertdialog: {
        classes: '',
        description: 'Alert dialog for confirmation flows requiring explicit user acknowledgment'
      }
    }
  } as const;

  export const KUMO_DIALOG_DEFAULT_VARIANTS = {
    size: 'base',
    role: 'dialog'
  } as const;

  export const KUMO_DIALOG_STYLING = {
    dimensions: {
      sm: {
        width: 350,
        titleSize: 20,
        descSize: 16,
        padding: 16,
        gap: 8,
        buttonSize: 'sm'
      },
      base: {
        width: 384,
        titleSize: 20,
        descSize: 16,
        padding: 24,
        gap: 16,
        buttonSize: 'base'
      },
      lg: {
        width: 512,
        titleSize: 20,
        descSize: 16,
        padding: 24,
        gap: 16,
        buttonSize: 'base'
      },
      xl: {
        width: 768,
        titleSize: 20,
        descSize: 16,
        padding: 24,
        gap: 16,
        buttonSize: 'base'
      }
    },
    baseTokens: {
      background: 'color-surface',
      text: 'text-color-surface',
      borderRadius: 12,
      shadow: 'shadow-m'
    },
    backdrop: {
      background: 'color-surface-secondary',
      opacity: 0.8
    },
    header: {
      title: { fontWeight: 600, color: 'text-color-surface' },
      closeIcon: { name: 'ph-x', size: 20, color: 'text-color-muted' }
    },
    description: {
      fontWeight: 400,
      color: 'text-color-muted'
    },
    buttons: {
      primary: { background: 'color-primary', text: 'white' },
      secondary: { ring: 'color-border', text: 'text-color-surface' }
    }
  } as const;

  type DialogSize = keyof typeof KUMO_DIALOG_VARIANTS.size;
  type DialogRole = keyof typeof KUMO_DIALOG_VARIANTS.role;

  interface Props {
    trigger?: Snippet<[Record<string, unknown>]>;
    children?: Snippet;
    title?: string;
    description?: string;
    class?: string;
    open?: boolean;
    size?: DialogSize;
    role?: DialogRole;
    disablePointerDismissal?: boolean;
    style?: string;
    container?: HTMLElement | string;
    [key: string]: unknown;
  }

  let {
    trigger,
    children,
    title,
    description,
    class: className,
    open = $bindable(false),
    size = KUMO_DIALOG_DEFAULT_VARIANTS.size,
    role = KUMO_DIALOG_DEFAULT_VARIANTS.role,
    disablePointerDismissal = false,
    style,
    container,
    ...rest
  }: Props = $props();

  const backdropClasses =
    'fixed inset-0 bg-kumo-recessed opacity-80 transition-all duration-150 data-ending-style:opacity-0 data-starting-style:opacity-0';

  let contentClasses = $derived(
    cn(
      'shadow-m ring ring-kumo-line fixed top-1/2 left-1/2 w-full sm:w-auto max-w-[calc(100vw-2rem)] sm:max-w-[calc(100vw-3rem)] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-xl bg-kumo-base text-kumo-default duration-150 data-ending-style:scale-90 data-ending-style:opacity-0 data-starting-style:scale-90 data-starting-style:opacity-0',
      KUMO_DIALOG_VARIANTS.size[size].classes,
      className
    )
  );

  const contentStyle = $derived(
    `transition-property: scale, opacity; transition-timing-function: var(--default-transition-timing-function); --tw-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.03), 0 8px 10px -6px rgb(0 0 0 / 0.03);${style ? ` ${style}` : ''}`
  );

  function handleInteractOutside(event: Event) {
    if (disablePointerDismissal) event.preventDefault();
  }
</script>

{#snippet triggerChild({ props }: { props: Record<string, unknown> })}
  {@render trigger?.({ ...props, 'data-kumo-component': 'Dialog', 'data-kumo-part': 'trigger' })}
{/snippet}

{#if role === 'alertdialog'}
  <AlertDialog.Root bind:open {...rest}>
    {#if trigger}
      <AlertDialog.Trigger child={triggerChild} />
    {/if}
    <AlertDialog.Portal to={container}>
      <AlertDialog.Overlay class={backdropClasses} />
      <AlertDialog.Content class={contentClasses} style={contentStyle}>
        {#if title}<AlertDialog.Title class="text-lg font-semibold">{title}</AlertDialog.Title>{/if}
        {#if description}<AlertDialog.Description class="mt-1 text-sm text-kumo-subtle">{description}</AlertDialog.Description>{/if}
        <div class={title || description ? 'mt-4' : undefined}>{@render children?.()}</div>
      </AlertDialog.Content>
    </AlertDialog.Portal>
  </AlertDialog.Root>
{:else}
  <DialogPrimitive.Root bind:open {...rest}>
    {#if trigger}
      <DialogPrimitive.Trigger child={triggerChild} />
    {/if}
    <DialogPrimitive.Portal to={container}>
      <DialogPrimitive.Overlay class={backdropClasses} />
      <DialogPrimitive.Content class={contentClasses} style={contentStyle} onInteractOutside={handleInteractOutside}>
        {#if title}<DialogPrimitive.Title class="text-lg font-semibold">{title}</DialogPrimitive.Title>{/if}
        {#if description}<DialogPrimitive.Description class="mt-1 text-sm text-kumo-subtle">{description}</DialogPrimitive.Description>{/if}
        <div class={title || description ? 'mt-4' : undefined}>{@render children?.()}</div>
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  </DialogPrimitive.Root>
{/if}
