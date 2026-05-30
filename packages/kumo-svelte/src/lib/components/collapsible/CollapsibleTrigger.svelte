<script lang="ts">
  import { Collapsible as CollapsiblePrimitive } from 'bits-ui';
  import type { Snippet } from 'svelte';
  import { cn } from '$lib/utils/cn';

  interface Props {
    children?: Snippet;
    class?: string;
    disabled?: boolean;
    type?: 'button' | 'submit' | 'reset';
    [key: string]: unknown;
  }

  let {
    children,
    class: className,
    disabled = false,
    type = 'button',
    ...rest
  }: Props = $props();
</script>

<CollapsiblePrimitive.Trigger
  data-kumo-component="Collapsible"
  data-kumo-part="trigger"
  class={cn('cursor-pointer', className)}
  {disabled}
  {type}
  {...rest}
>
  {@render children?.()}
</CollapsiblePrimitive.Trigger>
