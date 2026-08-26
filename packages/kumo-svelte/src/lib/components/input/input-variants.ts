import { cn } from '$lib/utils/cn';
import { resolveVariant } from '$lib/utils/variants';

/** Input size and variant definitions mapping names to their Tailwind classes. */
export const KUMO_INPUT_VARIANTS = {
  size: {
    xs: {
      classes: 'h-5 gap-1 rounded-sm px-1.5 text-xs',
      description: 'Extra small input for compact UIs'
    },
    sm: {
      classes: 'h-6.5 gap-1 rounded-md px-2 text-xs',
      description: 'Small input for secondary fields'
    },
    base: {
      classes: 'h-9 gap-1.5 rounded-lg px-3 text-base',
      description: 'Default input size'
    },
    lg: {
      classes: 'h-10 gap-2 rounded-lg px-4 text-base',
      description: 'Large input for prominent fields'
    }
  },
  variant: {
    default: {
      classes: 'focus:ring-kumo-focus/50 focus:ring-[1.5px]',
      description: 'Default input appearance'
    },
    error: {
      classes: '!ring-kumo-danger focus:ring-kumo-danger/50 focus:ring-[1.5px]',
      description: 'Error state for validation failures'
    }
  }
} as const;

export const KUMO_INPUT_DEFAULT_VARIANTS = {
  size: 'base',
  variant: 'default'
} as const;

export const KUMO_INPUT_STYLING = {
  dimensions: {
    xs: { height: 20, paddingX: 6, fontSize: 12, borderRadius: 2, width: 160 },
    sm: { height: 26, paddingX: 8, fontSize: 12, borderRadius: 6, width: 200 },
    base: {
      height: 36,
      paddingX: 12,
      fontSize: 16,
      borderRadius: 8,
      width: 280
    },
    lg: { height: 40, paddingX: 16, fontSize: 16, borderRadius: 8, width: 320 }
  },
  baseTokens: {
    background: 'color-secondary',
    text: 'text-color-surface',
    placeholder: 'text-color-muted',
    ring: 'color-border'
  },
  stateTokens: {
    focus: { ring: 'color-active' },
    error: { ring: 'color-error' },
    disabled: { opacity: 0.5, text: 'text-color-muted' }
  }
} as const;

export type KumoInputSize = keyof typeof KUMO_INPUT_VARIANTS.size;
export type KumoInputVariant = keyof typeof KUMO_INPUT_VARIANTS.variant;

export interface KumoInputVariantsProps {
  size?: KumoInputSize;
  variant?: KumoInputVariant;
  parentFocusIndicator?: boolean;
  focusIndicator?: boolean;
}

/** Mirrors upstream dev a11y warning tokens for fidelity parity. */
export const KUMO_INPUT_A11Y_DEV_WARN_LINE_1 = "  - label prop: <Input label='Email' />";
export const KUMO_INPUT_A11Y_DEV_WARN_LINE_2 = "  - aria-label: <Input aria-label='Email address' />";
export const KUMO_INPUT_A11Y_DEV_WARN_LINE_3 = "  - aria-labelledby for custom label association";

export const KUMO_INPUT_PASSWORD_MANAGER_ATTRS = {
  'data-1p-ignore': 'true',
  'data-bwignore': 'true',
  'data-form-type': 'other',
  'data-lpignore': 'true'
} as const;

export function inputVariants({
  variant = KUMO_INPUT_DEFAULT_VARIANTS.variant,
  size = KUMO_INPUT_DEFAULT_VARIANTS.size,
  parentFocusIndicator = false,
  focusIndicator = false
}: KumoInputVariantsProps = {}) {
  return cn(
    'border-0 bg-kumo-control text-kumo-default ring ring-kumo-line outline-none focus:outline-none',
    'kumo-input-placeholder disabled:text-kumo-disabled',
    resolveVariant(
      KUMO_INPUT_VARIANTS,
      { size, variant },
      KUMO_INPUT_DEFAULT_VARIANTS
    ),
    parentFocusIndicator &&
      (variant === 'error'
        ? 'focus-within:ring-kumo-danger/50 focus-within:ring-[1.5px]'
        : 'focus-within:ring-kumo-focus/50 focus-within:ring-[1.5px]'),
    focusIndicator &&
      (variant === 'error'
        ? 'focus:ring-kumo-danger/50 focus:ring-[1.5px]'
        : 'focus:ring-kumo-focus/50 focus:ring-[1.5px]')
  );
}
