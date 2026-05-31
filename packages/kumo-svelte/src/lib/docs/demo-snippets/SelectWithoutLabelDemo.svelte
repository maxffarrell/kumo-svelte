<script lang="ts">
  import { Select } from '$lib';

  let value = $state('apple');
</script>

<div class="flex min-h-24 w-full items-center justify-center">
  <div class="w-full max-w-xs space-y-2">
    <Select
      class="w-[200px]"
      aria-label="Select a fruit"
      bind:value
      items={{ apple: 'Apple', banana: 'Banana', cherry: 'Cherry' }}
    />
  </div>
</div>
