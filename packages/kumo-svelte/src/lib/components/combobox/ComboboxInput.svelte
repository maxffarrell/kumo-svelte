<script lang="ts">
  import { cn } from '$lib/utils/cn';
  import { getComboboxContext, inputStyles } from './context';

  export interface Props {
    class?: string;
    placeholder?: string;
    [key: string]: unknown;
  }

  let { class: className, placeholder, ...rest }: Props = $props();
  const context = getComboboxContext('Combobox.Input');
</script>

<input
  class={cn(inputStyles[context.size], 'mx-0 -mt-1.5 w-full shrink-0 rounded-b-none first:mb-2 border-0 bg-kumo-control text-kumo-default ring ring-kumo-line outline-none placeholder:text-kumo-muted focus:ring-kumo-focus/50 focus:ring-[1.5px]', className)}
  value={context.query}
  {placeholder}
  disabled={context.disabled}
  oninput={(event) => {
    context.query = (event.currentTarget as HTMLInputElement).value;
    context.open = true;
  }}
  {...rest}
/>
