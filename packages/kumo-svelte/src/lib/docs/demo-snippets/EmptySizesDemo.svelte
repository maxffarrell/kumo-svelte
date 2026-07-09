<script lang="ts">
  import Database from 'phosphor-svelte/lib/Database';
  import { Empty } from 'kumo-svelte/components/empty';
</script>

<div class="flex flex-col gap-8">
  <div>
    <p class="mb-2 text-sm text-kumo-subtle">Small</p>
    <Empty size="sm" title="No data available" description="There is no data to display.">
      {#snippet icon()}<Database class="size-8 text-kumo-inactive" />{/snippet}
    </Empty>
  </div>
  <div>
    <p class="mb-2 text-sm text-kumo-subtle">Base</p>
    <Empty size="base" title="No data available" description="There is no data to display.">
      {#snippet icon()}<Database class="size-12 text-kumo-inactive" />{/snippet}
    </Empty>
  </div>
  <div>
    <p class="mb-2 text-sm text-kumo-subtle">Large</p>
    <Empty size="lg" title="No data available" description="There is no data to display.">
      {#snippet icon()}<Database class="size-16 text-kumo-inactive" />{/snippet}
    </Empty>
  </div>
</div>
