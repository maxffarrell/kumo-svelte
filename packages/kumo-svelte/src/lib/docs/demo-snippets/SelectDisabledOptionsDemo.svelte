<script lang="ts">
  import { Select } from '$lib';

  const regions = [
    { value: 'iad', label: 'US East (IAD)' },
    { value: 'sfo', label: 'US West (SFO)' },
    { value: 'lhr', label: 'Europe (LHR)', disabled: true },
    { value: 'sin', label: 'Asia Pacific (SIN)', disabled: true }
  ];

  let value = $state('');
</script>

<div class="flex min-h-24 w-full items-center justify-center">
  <div class="w-full max-w-xs space-y-2">
    <Select
      class="w-[250px]"
      label="Deployment Region"
      placeholder="Choose a region..."
      bind:value
      options={regions}
    />
  </div>
</div>
