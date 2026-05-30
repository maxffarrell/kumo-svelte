<script lang="ts">
  import type { Snippet } from 'svelte';
  import { getContext } from 'svelte';
  import { cn } from '$lib/utils/cn';
  interface CollapsibleContext { get open(): boolean; get contentId(): string; toggle(): void; }
  interface Props { children?: Snippet; class?: string; [key: string]: unknown; }
  let { children, class: className, ...rest }: Props = $props();
  const collapsible = getContext<CollapsibleContext>('kumo-sidebar-collapsible');
</script>

<button
  type="button"
  class={cn('contents', className)}
  aria-expanded={collapsible?.open}
  aria-controls={collapsible?.contentId}
  onclick={() => collapsible?.toggle()}
  {...rest}
>
  {@render children?.()}
</button>
