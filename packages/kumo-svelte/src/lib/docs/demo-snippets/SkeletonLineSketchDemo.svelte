<script lang="ts">
  import { SkeletonLine } from 'kumo-svelte';
</script>

<div class="flex w-full max-w-sm flex-col gap-4 p-4">
  <SkeletonLine variant="sketch" minWidth={85} maxWidth={85} />
  <SkeletonLine variant="sketch" minWidth={70} maxWidth={70} />
  <SkeletonLine variant="sketch" minWidth={55} maxWidth={55} />
</div>
