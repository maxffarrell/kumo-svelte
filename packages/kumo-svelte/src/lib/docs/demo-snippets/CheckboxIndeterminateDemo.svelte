<script lang="ts">
  import { Checkbox } from '$lib/components/checkbox';

  let indeterminate = $state(true);
</script>

<div class="flex min-h-24 w-full items-center justify-center">
  <Checkbox label="Select all" bind:indeterminate />
</div>
