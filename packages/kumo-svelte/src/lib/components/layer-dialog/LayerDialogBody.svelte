<script lang="ts">
  import type { Snippet } from 'svelte';
  import { ScrollArea } from 'bits-ui';
  interface Props { children?: Snippet; class?: string; [key: string]: unknown; }
  let { children, class: className, ...rest }: Props = $props();
</script>

<ScrollArea.Root class="relative mt-4 flex min-h-0 flex-1 flex-col" {...rest}>
  <ScrollArea.Viewport class={['min-h-0 flex-1 overscroll-none px-4 pb-4 sm:px-4.5 sm:pb-4.5', className]}>
    {@render children?.()}
  </ScrollArea.Viewport>
  <ScrollArea.Scrollbar orientation="vertical" class="my-1.5 mr-0.5 w-2 p-px">
    <ScrollArea.Thumb class="w-full rounded-full bg-kumo-contrast opacity-10 hover:opacity-20 active:opacity-30" />
  </ScrollArea.Scrollbar>
</ScrollArea.Root>
