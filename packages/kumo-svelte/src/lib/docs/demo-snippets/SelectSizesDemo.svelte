<script lang="ts">
  import { Select } from '$lib';

  const selectSizes = ['xs', 'sm', 'base', 'lg'] as const;
</script>

<div class="flex min-h-24 w-full items-center justify-center">
  <div class="w-full max-w-xs space-y-2">
    <div class="grid gap-4">
      {#each selectSizes as selectSize (selectSize)}
        <div class="flex items-center gap-3">
          <span class="w-10 text-sm text-kumo-subtle">{selectSize}</span>
          <Select aria-label={`Select size ${selectSize}`} size={selectSize} class="w-[200px]" placeholder="Choose..." options={[{ label: 'Option A', value: 'a' }, { label: 'Option B', value: 'b' }]} />
        </div>
      {/each}
    </div>
  </div>
</div>
