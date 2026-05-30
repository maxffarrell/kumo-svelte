<script lang="ts">
  import { DropdownMenu as DropdownMenuPrimitive } from 'bits-ui';
  import type { Snippet } from 'svelte';
  import { Check } from 'phosphor-svelte';
  import { cn } from '$lib/utils/cn';

  interface Props {
    children?: Snippet;
    class?: string;
    checked?: boolean;
    onCheckedChange?: (checked: boolean) => void;
    [key: string]: unknown;
  }

  let { children, class: className, checked = $bindable(false), onCheckedChange, ...rest }: Props = $props();
</script>

<DropdownMenuPrimitive.CheckboxItem
  bind:checked
  {onCheckedChange}
  data-kumo-component="DropdownMenu"
  data-kumo-part="checkbox-item"
  class={cn(
    'relative flex cursor-default items-center rounded-sm py-1.5 pr-2 pl-8 text-base outline-hidden transition-colors select-none focus:bg-kumo-tint focus:text-kumo-default focus:ring-kumo-focus/50 focus-visible:ring-2 focus-visible:ring-kumo-brand data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
    className
  )}
  {...rest}
>
  {#snippet child({ checked }: { checked: boolean })}
    <span class="absolute left-2 flex h-3.5 w-3.5 items-center justify-center text-inherit">
      {#if checked}<Check class="h-3 w-3 stroke-[3]" />{/if}
    </span>
    {@render children?.()}
  {/snippet}
</DropdownMenuPrimitive.CheckboxItem>
