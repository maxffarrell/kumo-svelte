<script lang="ts">
  import { Combobox } from '$lib/components/combobox';
  import Scenario from '$lib/vrt/Scenario.svelte';

  const fruits = ['Apple', 'Banana', 'Cherry', 'Dragonfruit', 'Elderberry'];

  let value = $state<string | null>(null);
  let multipleValue = $state<{ value: string; label: string }[]>([]);

  const bots = [
    { value: 'googlebot', label: 'Googlebot' },
    { value: 'bingbot', label: 'Bingbot' },
    { value: 'duckduckbot', label: 'DuckDuckBot' }
  ];
</script>

<Scenario id="default" label="default">
  <Combobox bind:value items={fruits} class="w-[220px]">
    <Combobox.TriggerInput placeholder="Select a fruit…" />
    <Combobox.Content>
      <Combobox.Empty />
      <Combobox.List>
        {#snippet children(item)}
          <Combobox.Item value={item}>{item}</Combobox.Item>
        {/snippet}
      </Combobox.List>
    </Combobox.Content>
  </Combobox>
</Scenario>

<Scenario id="disabled" label="disabled">
  <Combobox items={fruits} disabled class="w-[220px]">
    <Combobox.TriggerInput placeholder="Select a fruit…" />
    <Combobox.Content>
      <Combobox.Empty />
      <Combobox.List>
        {#snippet children(item)}
          <Combobox.Item value={item}>{item}</Combobox.Item>
        {/snippet}
      </Combobox.List>
    </Combobox.Content>
  </Combobox>
</Scenario>

<Scenario id="trigger-value" label="trigger value">
  <Combobox value="Banana" items={fruits} class="w-[220px]">
    <Combobox.TriggerValue placeholder="Select a fruit…" />
    <Combobox.Content>
      <Combobox.List>
        {#snippet children(item)}
          <Combobox.Item value={item}>{item}</Combobox.Item>
        {/snippet}
      </Combobox.List>
    </Combobox.Content>
  </Combobox>
</Scenario>

<Scenario id="open" label="open" interact={[{ type: 'click' }]} capture="page">
  <div class="flex h-[600px] w-[400px] items-start justify-start pt-4 pl-4">
    <Combobox bind:value items={fruits} class="w-[220px]">
      <Combobox.TriggerInput placeholder="Select a fruit…" />
      <Combobox.Content>
        <Combobox.Empty />
        <Combobox.List>
          {#snippet children(item)}
            <Combobox.Item value={item}>{item}</Combobox.Item>
          {/snippet}
        </Combobox.List>
      </Combobox.Content>
    </Combobox>
  </div>
</Scenario>

<Scenario
  id="open-highlighted"
  label="open highlighted"
  interact={[{ type: 'click' }, { type: 'press', key: 'ArrowDown' }]}
  capture="page"
>
  <div class="flex h-[600px] w-[400px] items-start justify-start pt-4 pl-4">
    <Combobox bind:value items={fruits} class="w-[220px]">
      <Combobox.TriggerInput placeholder="Select a fruit…" />
      <Combobox.Content>
        <Combobox.Empty />
        <Combobox.List>
          {#snippet children(item)}
            <Combobox.Item value={item}>{item}</Combobox.Item>
          {/snippet}
        </Combobox.List>
      </Combobox.Content>
    </Combobox>
  </div>
</Scenario>

<Scenario id="multiple" label="multiple chips">
  <Combobox bind:value={multipleValue} items={bots} multiple class="w-[320px]">
    <Combobox.TriggerMultipleWithInput placeholder="Add bot…">
      {#snippet children(selected)}
        <Combobox.Chip value={selected}>{selected.label}</Combobox.Chip>
      {/snippet}
    </Combobox.TriggerMultipleWithInput>
    <Combobox.Content>
      <Combobox.Empty />
      <Combobox.List>
        {#snippet children(item)}
          <Combobox.Item value={item}>{item.label}</Combobox.Item>
        {/snippet}
      </Combobox.List>
    </Combobox.Content>
  </Combobox>
</Scenario>

<Scenario
  id="multiple-open"
  label="multiple open"
  interact={[{ type: 'click', selector: 'input' }]}
  capture="page"
>
  <div class="flex h-[600px] w-[400px] items-start justify-start pt-4 pl-4">
    <Combobox bind:value={multipleValue} items={bots} multiple class="w-[320px]">
      <Combobox.TriggerMultipleWithInput placeholder="Add bot…">
        {#snippet children(selected)}
          <Combobox.Chip value={selected}>{selected.label}</Combobox.Chip>
        {/snippet}
      </Combobox.TriggerMultipleWithInput>
      <Combobox.Content>
        <Combobox.Empty />
        <Combobox.List>
          {#snippet children(item)}
            <Combobox.Item value={item}>{item.label}</Combobox.Item>
          {/snippet}
        </Combobox.List>
      </Combobox.Content>
    </Combobox>
  </div>
</Scenario>
