<script lang="ts">
  import X from 'phosphor-svelte/lib/X';
  import { Button } from 'kumo-svelte/components/button';
  import { Dialog } from 'kumo-svelte/components/dialog';
  import { Select } from 'kumo-svelte/components/select';

  const regions = [
    { value: 'us-east', label: 'US East' },
    { value: 'us-west', label: 'US West' },
    { value: 'eu-west', label: 'EU West' },
    { value: 'ap-south', label: 'AP South' }
  ];

  let open = $state(false);
</script>

<div class="flex min-h-24 w-full items-center justify-center">
  <Dialog bind:open class="p-8">
    {#snippet trigger(props)}
      <Button {...props}>Open Form</Button>
    {/snippet}
    <div class="mb-4 flex items-start justify-between gap-4">
      <h2 class="text-2xl font-semibold">Create Resource</h2>
      <Button variant="secondary" shape="square" aria-label="Close" onclick={() => (open = false)}>
        <X />
      </Button>
    </div>
    <p class="mb-4 text-kumo-subtle">Select a region for your new resource.</p>
    <Select
      class="w-full"
      placeholder="Select region..."
      options={regions}
      renderValue={(value) => regions.find((region) => region.value === value)?.label}
    />
    <div class="mt-8 flex justify-end gap-2">
      <Button variant="secondary" onclick={() => (open = false)}>Cancel</Button>
      <Button variant="primary">Create</Button>
    </div>
  </Dialog>
</div>
