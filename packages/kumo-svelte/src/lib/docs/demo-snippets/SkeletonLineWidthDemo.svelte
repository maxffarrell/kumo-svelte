<script lang="ts">
  import { SkeletonLine } from 'kumo-svelte/components/loader';
</script>

<div class="flex w-64 flex-col gap-3">
  <SkeletonLine minWidth={80} maxWidth={100} />
  <SkeletonLine minWidth={60} maxWidth={80} />
  <SkeletonLine minWidth={40} maxWidth={60} />
</div>
