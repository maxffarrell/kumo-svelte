import type { Snippet } from 'svelte';
import { getContext, setContext } from 'svelte';

export type ComboboxSize = 'xs' | 'sm' | 'base' | 'lg';
export type ComboboxInputSide = 'right' | 'top';
export type ComboboxItem = string | {
  label?: string;
  value?: unknown;
  disabled?: boolean;
  [key: string]: unknown;
};

export type NormalizedComboboxItem = {
  label: string;
  value: unknown;
  disabled?: boolean;
  raw: ComboboxItem;
};

export type ComboboxContext = {
  get items(): NormalizedComboboxItem[];
  get filteredItems(): NormalizedComboboxItem[];
  get query(): string;
  set query(value: string);
  get value(): unknown;
  set value(value: unknown);
  get open(): boolean;
  set open(value: boolean);
  get multiple(): boolean;
  get disabled(): boolean;
  get size(): ComboboxSize;
  get invalid(): boolean;
  isSelected(item: NormalizedComboboxItem): boolean;
  isHighlighted(item: NormalizedComboboxItem): boolean;
  select(item: NormalizedComboboxItem): void;
  remove(item: unknown): void;
  labelFor(value: unknown): string;
  handleListKeydown(event: KeyboardEvent): void;
};

export type ComboboxGroupContext = {
  get items(): NormalizedComboboxItem[];
};

const COMBOBOX_CONTEXT = Symbol('kumo-combobox');
const COMBOBOX_GROUP_CONTEXT = Symbol('kumo-combobox-group');

export const inputStyles: Record<ComboboxSize, string> = {
  xs: 'h-5 rounded-sm px-1.5 text-xs',
  sm: 'h-6.5 rounded-md px-2 text-xs',
  base: 'h-9 rounded-lg px-3 text-base',
  lg: 'h-10 rounded-lg px-4 text-base'
};

export const embeddedInputStyles: Record<ComboboxSize, string> = {
  xs: 'h-4 text-xs',
  sm: 'h-4.5 text-xs',
  base: 'h-6 text-base',
  lg: 'h-6 text-base'
};

export const iconSizes: Record<ComboboxSize, number> = {
  xs: 12,
  sm: 14,
  base: 16,
  lg: 18
};

export type ItemSnippet = Snippet<[any]>;

export function setComboboxContext(context: ComboboxContext) {
  setContext(COMBOBOX_CONTEXT, context);
}

export function getComboboxContext(component: string) {
  const context = getContext<ComboboxContext | undefined>(COMBOBOX_CONTEXT);
  if (!context) throw new Error(`${component} must be used inside <Combobox>.`);
  return context;
}

export function setComboboxGroupContext(context: ComboboxGroupContext) {
  setContext(COMBOBOX_GROUP_CONTEXT, context);
}

export function getComboboxGroupContext() {
  return getContext<ComboboxGroupContext | undefined>(COMBOBOX_GROUP_CONTEXT);
}

export function normalizeComboboxItem(item: ComboboxItem): NormalizedComboboxItem {
  if (typeof item === 'string') return { label: item, value: item, raw: item };

  const value = item;
  return {
    label: String(item.label ?? item.value ?? ''),
    value,
    disabled: item.disabled,
    raw: item
  };
}
