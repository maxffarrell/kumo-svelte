<script lang="ts">
  import type { Snippet } from 'svelte';
  import { cn } from '$lib/utils/cn';
  import { getInputGroupContext, INPUT_GROUP_SIZE, setInputGroupAddonContext } from './context';

  interface Props {
    children?: Snippet;
    class?: string;
    align?: 'start' | 'end';
    containsButton?: boolean;
  }

  let { children, class: className, align = 'start', containsButton = false }: Props = $props();

  const context = getInputGroupContext();
  const size = $derived(context?.size ?? 'base');
  const tokens = $derived(INPUT_GROUP_SIZE[size]);

  setInputGroupAddonContext(true);
</script>

<div
  data-slot={align === 'start' ? 'input-group-addon-start' : 'input-group-addon-end'}
  class={cn(
    'relative z-[1] pointer-events-none flex shrink-0 items-center gap-1.5 text-kumo-subtle',
    '*:pointer-events-auto',
    tokens.fontSize,
    tokens.addonIconSize,
    tokens.addonLoaderSize,
    '[&>svg]:shrink-0',
    align === 'start'
      ? cn('-order-1 pr-0', containsButton ? tokens.addonButtonOuterStart : tokens.addonOuterStart)
      : cn('order-1 pl-0', containsButton ? tokens.addonButtonOuterEnd : tokens.addonOuterEnd),
    className
  )}
>
  {@render children?.()}
</div>
