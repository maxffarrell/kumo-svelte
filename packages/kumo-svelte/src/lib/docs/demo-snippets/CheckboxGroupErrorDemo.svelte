<script lang="ts">
  import { Checkbox } from '$lib';
</script>

<div class="flex min-h-24 w-full items-center justify-center">
<div class="grid gap-3">
      <p class="text-sm font-medium text-kumo-default">Required preferences</p>
      <Checkbox class="ring-kumo-danger">Email</Checkbox>
      <Checkbox class="ring-kumo-danger">SMS</Checkbox>
      <p class="text-sm text-kumo-danger">Please select at least one notification method</p>
    </div>
</div>
