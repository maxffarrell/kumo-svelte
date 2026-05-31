<script lang="ts">
  import { Select } from '$lib';

  let value = $state('');
</script>

<div class="flex min-h-24 w-full items-center justify-center">
  <div class="w-full max-w-xs space-y-2">
    <Select
      class="w-[200px]"
      label="Category"
      placeholder="Choose a category..."
      bind:value
      items={{ bug: 'Bug', documentation: 'Documentation', feature: 'Feature' }}
    />
  </div>
</div>
