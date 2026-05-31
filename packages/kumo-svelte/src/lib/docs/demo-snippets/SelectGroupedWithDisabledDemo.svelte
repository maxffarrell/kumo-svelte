<script lang="ts">
  import { Select } from '$lib';

  const serverRegions = {
    available: [
      { value: 'wnam', label: 'Western North America' },
      { value: 'enam', label: 'Eastern North America' },
      { value: 'weur', label: 'Western Europe' }
    ],
    unavailable: [
      { value: 'eeur', label: 'Eastern Europe' },
      { value: 'apac', label: 'Asia Pacific' }
    ]
  };

  let value = $state('');
</script>

<div class="flex min-h-24 w-full items-center justify-center">
  <div class="w-full max-w-xs space-y-2">
    <Select
      class="w-[260px]"
      label="Server Region"
      placeholder="Select a region..."
      bind:value
    >
      <Select.Group>
        <Select.GroupLabel>Available</Select.GroupLabel>
        {#each serverRegions.available as region (region.value)}
          <Select.Option value={region.value}>{region.label}</Select.Option>
        {/each}
      </Select.Group>
      <Select.Separator />
      <Select.Group>
        <Select.GroupLabel>Unavailable</Select.GroupLabel>
        {#each serverRegions.unavailable as region (region.value)}
          <Select.Option value={region.value} disabled>{region.label}</Select.Option>
        {/each}
      </Select.Group>
    </Select>
  </div>
</div>
