<script lang="ts">
  import { SkeletonLine } from 'kumo-svelte/components/loader';
</script>

<div class="w-64 rounded-lg p-4 ring ring-kumo-hairline">
  <div class="mb-4 h-4">
    <SkeletonLine minWidth={40} maxWidth={60} />
  </div>
  <div class="flex flex-col gap-2">
    <SkeletonLine />
    <SkeletonLine />
    <SkeletonLine minWidth={50} maxWidth={70} />
  </div>
</div>
