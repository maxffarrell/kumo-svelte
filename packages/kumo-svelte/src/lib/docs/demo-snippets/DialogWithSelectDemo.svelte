<script lang="ts">
  import { Button, Dialog, Select } from '$lib';

  const regions = [
    { value: 'us-east', label: 'US East' },
    { value: 'us-west', label: 'US West' },
    { value: 'eu-west', label: 'EU West' },
    { value: 'ap-south', label: 'AP South' }
  ];
</script>

<div class="flex min-h-24 w-full items-center justify-center">
  <Dialog title="Create Resource" description="Select a region for your new resource." class="p-8">
    {#snippet trigger(props)}
      <Button {...props}>Open Form</Button>
    {/snippet}
    <Select
      class="w-full"
      placeholder="Select region..."
      options={regions}
      renderValue={(value) => regions.find((region) => region.value === value)?.label}
    />
    <div class="mt-8 flex justify-end gap-2">
      <Button variant="secondary">Cancel</Button>
      <Button variant="primary">Create</Button>
    </div>
  </Dialog>
</div>
