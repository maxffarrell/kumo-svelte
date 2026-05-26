<script lang="ts">
  import { Checkbox } from '$lib';
</script>

<div class="flex min-h-24 w-full items-center justify-center">
<div class="grid gap-3">
      <p class={'text-sm font-medium text-kumo-default'}>{'Email preferences'}</p>
      <p class="-mt-2 text-sm text-kumo-subtle">Choose how you'd like to receive updates</p>
      <Checkbox checked={true}>Email notifications</Checkbox>
      <Checkbox>SMS notifications</Checkbox>
      <Checkbox>Push notifications</Checkbox>
    </div>
</div>
