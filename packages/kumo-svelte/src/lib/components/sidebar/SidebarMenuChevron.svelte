<script lang="ts">
  import { CaretRight } from 'phosphor-svelte';
  import { cn } from '$lib/utils/cn';
  interface Props { class?: string; open?: boolean; [key: string]: unknown; }
  let { class: className, open = false, ...rest }: Props = $props();
</script>

<CaretRight data-sidebar="menu-chevron" class={cn('ml-auto size-4 shrink-0 text-kumo-subtle transition-transform duration-200 group-data-[state=collapsed]/sidebar:hidden', open && 'rotate-90', className)} {...rest} />
