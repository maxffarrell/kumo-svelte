import { cn } from '$lib/utils/cn';

/** Autocomplete item classes copied verbatim from upstream Kumo. */
export const KUMO_AUTOCOMPLETE_ITEM_CLASSES = cn(
  'group mx-1.5 grid cursor-pointer grid-cols-[1fr_16px] gap-2 rounded px-2 py-1.5 text-base',
  'data-highlighted:bg-kumo-overlay data-selected:font-medium'
);

/** Selected indicator classes copied verbatim from upstream Kumo. */
export const KUMO_AUTOCOMPLETE_ITEM_INDICATOR_CLASSES = 'col-start-2 hidden items-center group-data-selected:flex';
