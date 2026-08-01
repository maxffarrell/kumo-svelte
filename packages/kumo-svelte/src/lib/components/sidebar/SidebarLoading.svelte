<script lang="ts">
  import { SkeletonLine } from '$lib/components/loader';
  import { cn } from '$lib/utils/cn';

  interface Props { class?: string; label?: string; [key: string]: unknown; }
  let { class: className, label = 'Loading', ...rest }: Props = $props();
  const groups = [['w-28', 'w-40', 'w-24'], ['w-24', 'w-36', 'w-32']];
</script>

<div
  data-sidebar="loading"
  data-kumo-component="Sidebar"
  data-kumo-part="loading"
  role="status"
  aria-label={label}
  class={cn('flex min-h-0 w-full flex-1 flex-col gap-4 px-2 py-3', className)}
  {...rest}
>
  {#each groups as widths}
    <div class="flex flex-col gap-0.5">
      <SkeletonLine class="mb-1 ml-2 h-2 w-16 rounded-full group-data-[state=collapsed]/sidebar:hidden" />
      {#each widths as width}
        <div class="flex min-h-8.5 items-center gap-3 rounded-lg px-3 group-data-[state=collapsed]/sidebar:justify-center group-data-[state=collapsed]/sidebar:px-0">
          <SkeletonLine class="size-4.5 shrink-0 rounded-md" />
          <SkeletonLine class={cn('h-2.5 rounded-full group-data-[state=collapsed]/sidebar:hidden', width)} />
        </div>
      {/each}
    </div>
  {/each}
</div>
