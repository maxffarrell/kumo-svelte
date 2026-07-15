<script lang="ts">
  import { Select } from '$lib/components/select';
  import Scenario from '$lib/vrt/Scenario.svelte';

  const sizes = ['xs', 'sm', 'base', 'lg'] as const;

  const fruits = [
    { label: 'Apple', value: 'apple' },
    { label: 'Banana', value: 'banana' },
    { label: 'Cherry', value: 'cherry' },
    { label: 'Dragonfruit', value: 'dragonfruit' },
    { label: 'Elderberry', value: 'elderberry' }
  ];
</script>

<Scenario id="default" label="default">
  <Select aria-label="Favorite fruit" options={fruits} placeholder="Select a fruit..." />
</Scenario>

<Scenario id="with-label" label="with label">
  <Select label="Favorite fruit" options={fruits} placeholder="Select a fruit..." class="w-[220px]" />
</Scenario>

<Scenario id="disabled" label="disabled">
  <Select aria-label="Favorite fruit" options={fruits} disabled placeholder="Select a fruit..." />
</Scenario>

<Scenario id="with-value" label="with value">
  <Select aria-label="Favorite fruit" options={fruits} value="banana" class="w-[220px]" />
</Scenario>

{#each sizes as size (size)}
  <Scenario id={`size-${size}`} label={`size ${size}`}>
    <Select aria-label="Favorite fruit" {size} options={fruits} class="w-[220px]" />
  </Scenario>
{/each}

<Scenario id="open" label="open" interact={[{ type: 'click' }]} capture="page">
  <div class="flex h-[600px] w-[400px] items-start justify-start pt-4 pl-4">
    <Select aria-label="Favorite fruit" options={fruits} placeholder="Select a fruit..." class="w-[220px]" />
  </div>
</Scenario>

<Scenario
  id="open-selected"
  label="open with selection"
  interact={[{ type: 'click' }]}
  capture="page"
>
  <div class="flex h-[600px] w-[400px] items-start justify-start pt-4 pl-4">
    <Select
      aria-label="Favorite fruit"
      options={fruits}
      value="cherry"
      placeholder="Select a fruit..."
      class="w-[220px]"
    />
  </div>
</Scenario>

<Scenario
  id="open-highlighted"
  label="open highlighted"
  interact={[{ type: 'click' }, { type: 'press', key: 'ArrowDown' }]}
  capture="page"
>
  <div class="flex h-[600px] w-[400px] items-start justify-start pt-4 pl-4">
    <Select aria-label="Favorite fruit" options={fruits} placeholder="Select a fruit..." class="w-[220px]" />
  </div>
</Scenario>

<Scenario id="with-groups" label="with groups">
  <Select aria-label="Timezone" class="w-[260px]" placeholder="Select timezone...">
    <Select.Group>
      <Select.GroupLabel>North America</Select.GroupLabel>
      <Select.Option value="est" label="Eastern (EST)" />
      <Select.Option value="cst" label="Central (CST)" />
      <Select.Option value="pst" label="Pacific (PST)" />
    </Select.Group>
    <Select.Separator />
    <Select.Group>
      <Select.GroupLabel>Europe</Select.GroupLabel>
      <Select.Option value="gmt" label="GMT" />
      <Select.Option value="cet" label="Central European (CET)" />
    </Select.Group>
  </Select>
</Scenario>
