<script lang="ts">
  import { Button, Combobox, Dialog } from '$lib';

  const regions = [
    { value: 'us-east', label: 'US East' },
    { value: 'us-west', label: 'US West' },
    { value: 'eu-west', label: 'EU West' },
    { value: 'ap-south', label: 'AP South' }
  ];

  let value = $state<(typeof regions)[number] | null>(null);
</script>

<div class="flex min-h-24 w-full items-center justify-center">
  <Dialog
    title="Create Resource"
    description="Search and select a region for your new resource."
    class="p-8"
  >
    {#snippet trigger(props)}
      <Button {...props}>Open Form</Button>
    {/snippet}
    <Combobox bind:value items={regions}>
      <Combobox.TriggerInput class="w-full" placeholder="Search regions..." />
      <Combobox.Content>
        <Combobox.Empty>No regions found</Combobox.Empty>
        <Combobox.List>
          {#snippet children(item)}
            <Combobox.Item value={item}>{item.label}</Combobox.Item>
          {/snippet}
        </Combobox.List>
      </Combobox.Content>
    </Combobox>
    <div class="mt-8 flex justify-end gap-2">
      <Button variant="secondary">Cancel</Button>
      <Button variant="primary">Create</Button>
    </div>
  </Dialog>
</div>
