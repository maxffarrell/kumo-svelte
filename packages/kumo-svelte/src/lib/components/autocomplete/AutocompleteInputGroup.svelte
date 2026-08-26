<script lang="ts">
  import { getAutocompleteContext, type AutocompleteSize } from './context';
  import { cn } from '$lib/utils/cn';
  import { Combobox as ComboboxPrimitive } from 'bits-ui';

  export interface Props {
    class?: string;
    placeholder?: string;
    size?: AutocompleteSize;
    [key: string]: unknown;
  }

  let { class: className, placeholder, size, ...rest }: Props = $props();
  const context = getAutocompleteContext('Autocomplete.InputGroup');

  const sizes: Record<AutocompleteSize, string> = {
    xs: 'h-5 rounded-sm px-1.5 text-xs',
    sm: 'h-6.5 rounded-md px-2 text-xs',
    base: 'h-9 rounded-lg px-3 text-base',
    lg: 'h-10 rounded-lg px-4 text-base'
  };

  function isUserTextEdit(event: InputEvent) {
    return (
      (event.inputType === 'insertText' && event.data) ||
      event.inputType === 'deleteContentBackward' ||
      event.inputType === 'deleteContentForward'
    );
  }
</script>

<ComboboxPrimitive.Input
  class={cn(
    'w-full border-0 bg-kumo-control text-kumo-default shadow-xs ring ring-kumo-line outline-none focus:outline-none',
    'placeholder:text-kumo-placeholder disabled:text-kumo-disabled',
    context.invalid
      ? 'ring-kumo-danger! focus:ring-kumo-danger/50 focus:ring-[1.5px]'
      : 'focus:ring-kumo-focus/50 focus:ring-[1.5px]',
    sizes[size ?? context.size],
    className
  )}
  {placeholder}
  aria-invalid={context.invalid || undefined}
  onbeforeinput={(event) => {
    if (isUserTextEdit(event)) {
      context.markInputTyped();
    }
  }}
  oninput={(event) => {
    const inputEvent = event as unknown as InputEvent;
    if (isUserTextEdit(inputEvent)) {
      context.markInputTyped();
    }
    context.query = (event.currentTarget as HTMLInputElement).value;
    if (context.hasTypedSinceFocus) context.open = true;
  }}
  onfocus={() => context.resetInputInteraction()}
  onkeydown={(event) => {
    if (event.key.length === 1 && !event.metaKey && !event.ctrlKey && !event.altKey) {
      context.markInputTyped();
    }
    if (event.key === 'Escape') context.open = false;
  }}
  {...rest}
/>
