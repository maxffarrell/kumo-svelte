<script lang="ts">
  import CaretDown from 'phosphor-svelte/lib/CaretDown';
  import type { Snippet } from 'svelte';
  import { cn } from '$lib/utils/cn';
  import CollapsibleTrigger from './CollapsibleTrigger.svelte';

  interface Props {
    children?: Snippet;
    class?: string;
    disabled?: boolean;
    [key: string]: unknown;
  }

  let { children, class: className, disabled = false, ...rest }: Props = $props();
</script>

<CollapsibleTrigger
  data-kumo-component="Collapsible"
  data-kumo-part="default-trigger"
  class={cn(
    'group m-0 flex cursor-pointer items-center gap-1 border-none bg-transparent p-0 text-base font-medium text-kumo-default shadow-none select-none',
    className
  )}
  {disabled}
  {...rest}
>
  {@render children?.()}
  <CaretDown class="h-4 w-4 transition-transform [[data-panel-open]_&]:rotate-180" />
</CollapsibleTrigger>
