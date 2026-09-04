import { cn } from '$lib/utils/cn';

/** Select variant definitions. */
export const KUMO_SELECT_VARIANTS = {
  size: {
    xs: {
      classes: 'h-5 gap-1 rounded-sm px-1.5 text-xs',
      description: 'Extra small for compact UIs'
    },
    sm: {
      classes: 'h-6.5 gap-1 rounded-md px-2 text-xs',
      description: 'Small for secondary fields'
    },
    base: {
      classes: 'h-9 gap-1.5 rounded-lg px-3 text-base',
      description: 'Default size'
    },
    lg: {
      classes: 'h-10 gap-2 rounded-lg px-4 text-base',
      description: 'Large for prominent fields'
    }
  }
} as const;

export const KUMO_SELECT_DEFAULT_VARIANTS = {
  size: 'base'
} as const;

export const KUMO_SELECT_STYLING = {
  trigger: {
    height: 36,
    paddingX: 12,
    borderRadius: 8,
    background: 'bg-kumo-control',
    text: 'text-color-surface',
    ring: 'color-border',
    fontSize: 16,
    fontWeight: 400
  },
  stateTokens: {
    focus: { ring: 'color-active' },
    disabled: { opacity: 0.5 }
  },
  icons: {
    caret: { name: 'ph-caret-up-down', size: 20 },
    check: { name: 'ph-check', size: 20 }
  },
  popup: {
    background: 'bg-kumo-base',
    ring: 'border-kumo-line',
    borderRadius: 8,
    padding: 6
  },
  option: {
    paddingX: 8,
    paddingY: 6,
    borderRadius: 4,
    fontSize: 16,
    highlightBackground: 'color-surface-secondary'
  }
} as const;

export type KumoSelectSize = keyof typeof KUMO_SELECT_VARIANTS.size;

export function selectVariants({
  size = KUMO_SELECT_DEFAULT_VARIANTS.size
}: { size?: KumoSelectSize } = {}) {
  const buttonSize = KUMO_SELECT_VARIANTS.size[size].classes;
  return cn(
    'group flex w-full items-center select-none border-0 shadow-xs focus:outline-none focus:ring-kumo-focus/50 focus-visible:ring-2 focus-visible:ring-kumo-brand cursor-pointer disabled:cursor-not-allowed disabled:text-kumo-subtle',
    'bg-kumo-control !text-kumo-default ring not-disabled:hover:bg-kumo-tint disabled:bg-kumo-control/50 disabled:!text-kumo-default/70 ring-kumo-line data-[state=open]:bg-kumo-control',
    buttonSize,
    'justify-between font-normal',
    'focus:opacity-100 focus:ring-kumo-focus/50 focus-visible:ring-inset *:in-focus:opacity-100'
  );
}

export const triggerIconStyles: Record<
  KumoSelectSize,
  { iconSize: number; className: string }
> = {
  xs: { iconSize: 12, className: 'text-kumo-subtle' },
  sm: { iconSize: 14, className: 'text-kumo-subtle' },
  base: { iconSize: 16, className: 'text-kumo-subtle' },
  lg: { iconSize: 18, className: 'text-kumo-subtle' }
};

export const KUMO_SELECT_LABEL_CLASSES = 'm-0 select-none text-base font-medium text-kumo-default';

export const KUMO_SELECT_CONTENT_CLASSES = cn(
  'flex flex-col',
  'max-h-[var(--available-height)] bg-kumo-base text-kumo-default',
  'rounded-lg shadow-lg ring ring-kumo-line',
  'min-w-[calc(var(--anchor-width)+3px)] py-1.5'
);

export const KUMO_SELECT_VIEWPORT_CLASSES =
  'min-h-0 flex-1 overflow-y-auto overscroll-none scroll-pt-2 scroll-pb-2';

export const KUMO_SELECT_OPTION_CLASSES = cn(
  'group mx-1.5 flex cursor-pointer items-center justify-between gap-2 rounded px-2 py-1.5 text-base outline-none',
  'focus-visible:z-50 focus-visible:ring-2 focus-visible:ring-kumo-brand focus-visible:ring-inset',
  'data-highlighted:bg-kumo-tint',
  'data-[disabled]:pointer-events-none data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50'
);

export const KUMO_SELECT_GROUP_LABEL_CLASSES =
  'px-3.5 py-1.5 text-sm font-semibold text-kumo-subtle';

export const KUMO_SELECT_SEPARATOR_CLASSES = '-mx-1 my-1 h-px bg-kumo-hairline';
