<script lang="ts">
  import { cn } from '$lib/utils/cn';
  import { getInputGroupContext, INPUT_GROUP_SIZE } from './context';

  interface Props {
    class?: string;
    value?: string | number;
    onValueChange?: (value: string) => void;
    oninput?: (event: Event) => void;
    id?: string;
    disabled?: boolean;
    [key: string]: unknown;
  }

  let {
    class: className,
    value = $bindable(''),
    onValueChange,
    oninput,
    id,
    disabled,
    ...rest
  }: Props = $props();

  const context = getInputGroupContext();
  const size = $derived(context?.size ?? 'base');
  const tokens = $derived(INPUT_GROUP_SIZE[size]);
  const isIndividual = $derived(context?.focusMode === 'individual');
  const inputId = $derived(id ?? context?.inputId);
  const isDisabled = $derived(disabled ?? context?.disabled);
  const hasError = $derived(Boolean(context?.error));
  const describedBy = $derived(context?.describedBy);

  function handleInput(event: Event) {
    value = (event.currentTarget as HTMLInputElement).value;
    onValueChange?.(String(value));
    oninput?.(event);
  }
</script>

<input
  bind:value
  id={inputId}
  disabled={isDisabled}
  aria-invalid={hasError || undefined}
  aria-describedby={describedBy}
  class={cn(
    'flex h-full min-w-0 grow items-center rounded-none border-0 bg-transparent font-sans',
    tokens.inputOuter,
    'text-ellipsis text-kumo-default outline-none',
    'placeholder:text-kumo-muted disabled:text-kumo-disabled',
    isIndividual
      ? [
          'relative ring-0 border border-kumo-line',
          'first:rounded-l-[inherit] last:rounded-r-[inherit]',
          'not-first:-ml-px',
          'hover:z-1 hover:border-kumo-line',
          'focus:z-2 focus:border-kumo-focus/50'
        ]
      : 'relative z-[1] ring-0! shadow-none focus:ring-0! focus:outline-none',
    className
  )}
  oninput={handleInput}
  {...rest}
/>
