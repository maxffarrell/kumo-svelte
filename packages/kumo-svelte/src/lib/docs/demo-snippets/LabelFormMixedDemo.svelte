<script lang="ts">
  import { Input } from 'kumo-svelte/components/input';
  import { Select } from 'kumo-svelte/components/select';

  const options = [
    { label: 'United States', value: 'us' },
    { label: 'United Kingdom', value: 'uk' },
    { label: 'Canada', value: 'ca' }
  ];
</script>

<div class="flex max-w-md flex-col gap-4">
  <Input label="Full Name" placeholder="John Doe" />
  <Input
    label="Email"
    labelTooltip="We'll send your receipt here"
    placeholder="john@example.com"
    type="email"
  />
  <Input label="Company" required={false} placeholder="Acme Inc." />
  <Select label="Country" placeholder="Select a country" {options} />
</div>
