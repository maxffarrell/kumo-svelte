<script lang="ts">
  import { Select } from '$lib';

  let value = $state('');
</script>

<div class="flex min-h-24 w-full items-center justify-center">
  <div class="w-full max-w-xs space-y-2">
    <Select
      class="w-[200px]"
      label="Priority"
      labelTooltip="Higher priority issues are addressed first"
      placeholder="Select priority"
      bind:value
      items={{ low: 'Low', medium: 'Medium', high: 'High', critical: 'Critical' }}
    />
  </div>
</div>
