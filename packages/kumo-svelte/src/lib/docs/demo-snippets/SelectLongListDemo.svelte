<script lang="ts">
  import { Select } from '$lib';

  const longListItems = Array.from({ length: 50 }, (_, index) => ({
    value: `option-${index + 1}`,
    label: `Option ${index + 1}`
  }));

  let value = $state('');
</script>

<div class="flex min-h-24 w-full items-center justify-center">
  <div class="w-full max-w-xs space-y-2">
    <Select
      class="w-[220px]"
      label="Long List Select"
      description="Tests scrolling behavior with many options"
      placeholder="Choose an option..."
      bind:value
      options={longListItems}
    />
  </div>
</div>
