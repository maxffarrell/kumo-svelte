<script lang="ts">
  import { Command as CommandPrimitive } from 'bits-ui';
  import type { Snippet } from 'svelte';
  import { cn } from '#lib/utils/cn.js';

  interface Props {
    children?: Snippet;
    class?: string;
    value: unknown;
    keywords?: string[];
    disabled?: boolean;
    forceMount?: boolean;
    onSelect?: () => void;
    onclick?: (event: MouseEvent) => void;
    [key: string]: unknown;
  }

  let { children, class: className, value, keywords, disabled, forceMount, onSelect, onclick, ...rest }: Props = $props();
</script>

<CommandPrimitive.Item
  value={String(value)}
  {keywords}
  {disabled}
  {forceMount}
  {onSelect}
  {onclick}
  class={cn(
    'group flex w-full cursor-pointer select-none items-center gap-3 rounded-lg px-2 py-1.5 text-left text-base text-kumo-default outline-none transition-colors data-[disabled]:cursor-default data-[disabled]:opacity-50 data-[selected]:bg-kumo-overlay',
    className
  )}
  {...rest}
>
  {@render children?.()}
</CommandPrimitive.Item>
