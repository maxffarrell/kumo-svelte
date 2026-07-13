<script lang="ts">
  import { SkeletonLine } from 'kumo-svelte/components/loader';
</script>

<div class="flex w-64 flex-col gap-1">
  {#each [32, 48, 64] as blockHeight (blockHeight)}
    <div class="relative">
      <div class="absolute top-0 bottom-0 right-full mr-2 flex items-center border-r-2 border-kumo-fill pr-2 text-sm">
        {blockHeight}px
      </div>
      <SkeletonLine {blockHeight} />
    </div>
  {/each}
</div>
