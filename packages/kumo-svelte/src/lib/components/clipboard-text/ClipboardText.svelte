<script module lang="ts">
  import { cn } from '$lib/utils/cn';

  export const KUMO_CLIPBOARD_TEXT_VARIANTS = {
    size: {
      sm: { classes: 'text-xs', buttonSize: 'sm' as const, description: 'Small clipboard text' },
      base: { classes: 'text-sm', buttonSize: 'base' as const, description: 'Default clipboard text' },
      lg: { classes: 'text-sm', buttonSize: 'lg' as const, description: 'Large clipboard text' }
    }
  } as const;

  export const KUMO_CLIPBOARD_TEXT_DEFAULT_VARIANTS = { size: 'lg' } as const;
  export type KumoClipboardTextSize = keyof typeof KUMO_CLIPBOARD_TEXT_VARIANTS.size;

  export function clipboardTextVariants({
    size = KUMO_CLIPBOARD_TEXT_DEFAULT_VARIANTS.size
  }: { size?: KumoClipboardTextSize } = {}) {
    return cn(
      'flex items-center overflow-hidden bg-kumo-base px-0 font-mono',
      KUMO_CLIPBOARD_TEXT_VARIANTS.size[size].classes
    );
  }
</script>

<script lang="ts">
  import Check from 'phosphor-svelte/lib/Check';
  import Copy from 'phosphor-svelte/lib/Copy';
  import { Button } from '$lib/components/button';
  import { Tooltip } from '$lib/components/tooltip';

  type ClipboardTextSize = KumoClipboardTextSize;
  type TooltipSide = 'top' | 'bottom' | 'left' | 'right';

  const clipboardTextAnimations = {
    initial: 'pointer-events-none absolute inset-0 flex translate-y-full items-center justify-center opacity-0',
    animate: 'translate-y-0 opacity-100',
    end: 'pointer-events-none absolute inset-0 flex -translate-y-full items-center justify-center opacity-0'
  } as const;

  interface Props {
    class?: string;
    text?: string;
    value?: string;
    textToCopy?: string;
    size?: ClipboardTextSize;
    onCopy?: () => void;
    tooltip?: {
      text?: string;
      copiedText?: string;
      side?: TooltipSide;
    };
    labels?: {
      copyAction?: string;
    };
    [key: string]: unknown;
  }

  let {
    class: className,
    text,
    value,
    textToCopy,
    size = KUMO_CLIPBOARD_TEXT_DEFAULT_VARIANTS.size,
    onCopy,
    tooltip,
    labels = {},
    ...rest
  }: Props = $props();

  let copied = $state(false);
  let resetTimer: ReturnType<typeof setTimeout> | undefined;

  const sizeConfig = $derived(KUMO_CLIPBOARD_TEXT_VARIANTS.size[size] ?? KUMO_CLIPBOARD_TEXT_VARIANTS.size.lg);
  const tooltipText = $derived(tooltip?.text ?? 'Copy');
  const copiedText = $derived(tooltip?.copiedText ?? 'Copied');
  const tooltipSide = $derived(tooltip?.side ?? 'top');
  const copyAction = $derived(labels.copyAction ?? 'Copy to clipboard');
  const displayText = $derived(text ?? value ?? '');

  async function writeClipboard(value: string) {
    if (
      typeof navigator !== 'undefined' &&
      navigator.clipboard &&
      typeof navigator.clipboard.writeText === 'function'
    ) {
      await navigator.clipboard.writeText(value);
      return;
    }

    if (typeof document === 'undefined') return;

    const textarea = document.createElement('textarea');
    textarea.value = value;
    textarea.setAttribute('readonly', '');
    textarea.style.position = 'absolute';
    textarea.style.left = '-9999px';
    document.body.appendChild(textarea);

    const selection = document.getSelection();
    const previousRange = selection?.rangeCount ? selection.getRangeAt(0) : null;
    textarea.select();

    try {
      document.execCommand('copy');
    } finally {
      document.body.removeChild(textarea);
      if (previousRange) {
        selection?.removeAllRanges();
        selection?.addRange(previousRange);
      }
    }
  }

  async function copyToClipboard() {
    try {
      await writeClipboard(textToCopy ?? displayText);
      copied = true;
      onCopy?.();

      if (resetTimer) clearTimeout(resetTimer);
      resetTimer = setTimeout(() => {
        copied = false;
      }, 1500);
    } catch (error) {
      console.warn('Clipboard copy failed', error);
    }
  }
</script>

{#snippet copyButton()}
  <Button
    size={sizeConfig.buttonSize}
    variant="ghost"
    class={cn(
      'relative isolate overflow-hidden rounded-l-none rounded-r-[inherit] border-l! border-kumo-line! px-3 transition-all duration-200',
      'focus:ring-inset focus:ring-kumo-focus/50',
      'focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-kumo-brand'
    )}
    aria-label={copyAction}
    onclick={copyToClipboard}
  >
    <span
      class={cn(
        'flex items-center gap-1 transition-all duration-200',
        copied ? clipboardTextAnimations.animate : clipboardTextAnimations.initial
      )}
    >
      <Check class="size-4" aria-hidden="true" />
    </span>
    <span
      class={cn(
        'flex items-center justify-center transition-all duration-200',
        copied ? clipboardTextAnimations.end : clipboardTextAnimations.animate
      )}
    >
      <Copy class="size-4" aria-hidden="true" />
    </span>
  </Button>
{/snippet}

<div
  class={cn(
    'border-0 text-kumo-default ring ring-kumo-line outline-none focus:outline-none',
    'kumo-input-placeholder',
    KUMO_CLIPBOARD_TEXT_VARIANTS.size[size].buttonSize === 'sm' && 'h-6.5 gap-1 rounded-md px-2 text-xs',
    KUMO_CLIPBOARD_TEXT_VARIANTS.size[size].buttonSize === 'base' && 'h-9 gap-1.5 rounded-lg px-3 text-base',
    KUMO_CLIPBOARD_TEXT_VARIANTS.size[size].buttonSize === 'lg' && 'h-10 gap-2 rounded-lg px-4 text-base',
    clipboardTextVariants({ size }),
    className
  )}
  data-kumo-component="ClipboardText"
  {...rest}
>
  <span class="grow truncate ps-4 pe-2">{displayText}</span>
  {#if tooltip}
    <div class="relative">
      <Tooltip side={tooltipSide} content={tooltipText} disabled={copied} trigger={copyButton} />
      {#if copied}
        <div
          class={cn(
            'pointer-events-none absolute z-50 flex origin-(--bits-floating-transform-origin) flex-col rounded-md bg-kumo-base px-3 py-1.5 font-sans text-xs text-kumo-default',
            'shadow-lg shadow-kumo-tip-shadow outline outline-kumo-fill',
            tooltipSide === 'top' && 'bottom-[calc(100%+8px)] left-1/2 -translate-x-1/2',
            tooltipSide === 'bottom' && 'top-[calc(100%+8px)] left-1/2 -translate-x-1/2',
            tooltipSide === 'left' && 'top-1/2 right-[calc(100%+8px)] -translate-y-1/2',
            tooltipSide === 'right' && 'top-1/2 left-[calc(100%+8px)] -translate-y-1/2'
          )}
        >
          {copiedText}
        </div>
      {/if}
    </div>
  {:else}
    {@render copyButton()}
  {/if}
  <span class="sr-only" aria-live="polite">{copied ? copiedText : ''}</span>
</div>
