<script lang="ts">
  import { Select } from '$lib';

  let value = $state('');
</script>

<div class="flex min-h-24 w-full items-center justify-center">
  <div class="w-full max-w-xs space-y-2">
    <Select
      class="w-[280px]"
      label="Issue Type"
      description="Choose the category that best describes your issue"
      error={!value ? 'Please select an issue type' : undefined}
      bind:value
      items={{ bug: 'Bug', documentation: 'Documentation', feature: 'Feature' }}
    />
  </div>
</div>
