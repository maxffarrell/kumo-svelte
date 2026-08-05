import type { Snippet } from "svelte";
import { getContext, setContext } from "svelte";

export type AutocompleteSize = "xs" | "sm" | "base" | "lg";
export type AutocompleteValue = string | number | string[];

export type AutocompleteItem = unknown;

export type NormalizedAutocompleteItem = {
  label: string;
  value: string | number;
  disabled?: boolean;
  group?: string;
  raw: AutocompleteItem;
};

export type AutocompleteContext = {
  get items(): NormalizedAutocompleteItem[];
  get filteredItems(): NormalizedAutocompleteItem[];
  get query(): string;
  set query(value: string);
  get value(): AutocompleteValue;
  set value(value: AutocompleteValue);
  get open(): boolean;
  set open(value: boolean);
  get hasTypedSinceFocus(): boolean;
  get size(): AutocompleteSize;
  get invalid(): boolean;
  markInputTyped(): void;
  resetInputInteraction(): void;
  isSelected(item: NormalizedAutocompleteItem): boolean;
  select(item: NormalizedAutocompleteItem): void;
  serializeValue(value: unknown): string;
};

export type AutocompleteGroupContext = {
  get items(): NormalizedAutocompleteItem[];
};

const AUTOCOMPLETE_CONTEXT = Symbol("kumo-autocomplete");
const AUTOCOMPLETE_GROUP_CONTEXT = Symbol("kumo-autocomplete-group");

export function setAutocompleteContext(context: AutocompleteContext) {
  setContext(AUTOCOMPLETE_CONTEXT, context);
}

export function getAutocompleteContext(component: string) {
  const context = getContext<AutocompleteContext | undefined>(
    AUTOCOMPLETE_CONTEXT,
  );
  if (!context)
    throw new Error(`${component} must be used inside <Autocomplete>.`);
  return context;
}

export function setAutocompleteGroupContext(context: AutocompleteGroupContext) {
  setContext(AUTOCOMPLETE_GROUP_CONTEXT, context);
}

export function getAutocompleteGroupContext() {
  return getContext<AutocompleteGroupContext | undefined>(
    AUTOCOMPLETE_GROUP_CONTEXT,
  );
}

export function normalizeAutocompleteItem(
  item: AutocompleteItem,
): NormalizedAutocompleteItem {
  if (typeof item === "string" || typeof item === "number") {
    return { label: String(item), value: item, raw: item };
  }

  if (item && typeof item === "object" && "label" in item && "value" in item) {
    const option = item as {
      label: unknown;
      value: unknown;
      disabled?: unknown;
      group?: unknown;
    };

    return {
      label: String(option.label),
      value:
        typeof option.value === "number" ? option.value : String(option.value),
      disabled:
        typeof option.disabled === "boolean" ? option.disabled : undefined,
      group: typeof option.group === "string" ? option.group : undefined,
      raw: item,
    };
  }

  return {
    label: String(item),
    value: String(item),
    raw: item,
  };
}

export type ItemSnippet = Snippet<[any]>;
