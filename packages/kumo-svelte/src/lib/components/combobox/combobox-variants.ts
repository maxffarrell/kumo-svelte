import { cn } from '$lib/utils/cn';

/** Combobox item classes copied verbatim from upstream Kumo. */
export const KUMO_COMBOBOX_ITEM_CLASSES = cn(
  'group mx-1.5 grid grid-cols-[1fr_16px] gap-2 rounded px-2 py-1.5 text-base',
  'cursor-pointer data-highlighted:bg-kumo-tint',
  'data-[disabled]:cursor-not-allowed data-[disabled]:text-kumo-subtle data-[disabled]:opacity-60 data-[disabled]:data-highlighted:bg-transparent'
);

/** Clear button classes copied verbatim from upstream Kumo TriggerInput. */
export const KUMO_COMBOBOX_CLEAR_CLASSES = cn(
  'absolute top-1/2 flex -translate-y-1/2 cursor-pointer bg-transparent p-0',
  'data-[disabled]:pointer-events-none data-[disabled]:opacity-0'
);

/** TriggerValue trigger classes copied verbatim from upstream Kumo. */
export const KUMO_COMBOBOX_TRIGGER_VALUE_CLASSES = cn(
  'relative flex items-center',
  'data-[disabled]:opacity-50 data-[disabled]:cursor-not-allowed',
  'data-[placeholder]:text-kumo-placeholder'
);
