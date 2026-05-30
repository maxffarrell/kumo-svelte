<script lang="ts">
  import type { Snippet } from 'svelte';
  import { setContext } from 'svelte';
  import { cn } from '$lib/utils/cn';
  interface Props { children?: Snippet; class?: string; activeKey: string; direction?: 'left' | 'right'; [key: string]: unknown; }
  let { children, class: className, activeKey, direction = 'left', ...rest }: Props = $props();
  setContext('kumo-sidebar-sliding-view', {
    get activeKey() {
      return activeKey;
    },
    get direction() {
      return direction;
    }
  });
</script>

<div data-sidebar="sliding-views" data-direction={direction} class={cn('relative min-h-0 flex-1 overflow-hidden', className)} {...rest}>
  {@render children?.()}
</div>
