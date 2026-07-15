<script lang="ts">
  import { Autocomplete } from '$lib/components/autocomplete';
  import Scenario from '$lib/vrt/Scenario.svelte';

  const countries = [
    { label: 'United States', value: 'us' },
    { label: 'United Kingdom', value: 'gb' },
    { label: 'Germany', value: 'de' },
    { label: 'France', value: 'fr' },
    { label: 'Japan', value: 'jp' }
  ];

  let value = $state('');
</script>

<Scenario id="default" label="default">
  <Autocomplete bind:value items={countries} class="w-[220px]">
    <Autocomplete.InputGroup placeholder="Search countries…" />
    <Autocomplete.Content>
      <Autocomplete.List>
        {#snippet children(item)}
          <Autocomplete.Item value={item}>{item.label}</Autocomplete.Item>
        {/snippet}
      </Autocomplete.List>
    </Autocomplete.Content>
  </Autocomplete>
</Scenario>

<Scenario id="disabled" label="disabled">
  <Autocomplete items={countries} class="w-[220px]">
    <Autocomplete.InputGroup placeholder="Search countries…" disabled />
    <Autocomplete.Content>
      <Autocomplete.List>
        {#snippet children(item)}
          <Autocomplete.Item value={item}>{item.label}</Autocomplete.Item>
        {/snippet}
      </Autocomplete.List>
    </Autocomplete.Content>
  </Autocomplete>
</Scenario>

<Scenario
  id="open"
  label="open"
  interact={[{ type: 'click' }, { type: 'press', key: 'a' }]}
  capture="page"
>
  <div class="flex h-[600px] w-[400px] items-start justify-start pt-4 pl-4">
    <Autocomplete bind:value items={countries} class="w-[220px]">
      <Autocomplete.InputGroup placeholder="Search countries…" />
      <Autocomplete.Content>
        <Autocomplete.List>
          {#snippet children(item)}
            <Autocomplete.Item value={item}>{item.label}</Autocomplete.Item>
          {/snippet}
        </Autocomplete.List>
      </Autocomplete.Content>
    </Autocomplete>
  </div>
</Scenario>

<Scenario
  id="open-highlighted"
  label="open highlighted"
  interact={[{ type: 'click' }, { type: 'press', key: 'a' }, { type: 'press', key: 'ArrowDown' }]}
  capture="page"
>
  <div class="flex h-[600px] w-[400px] items-start justify-start pt-4 pl-4">
    <Autocomplete bind:value items={countries} class="w-[220px]">
      <Autocomplete.InputGroup placeholder="Search countries…" />
      <Autocomplete.Content>
        <Autocomplete.List>
          {#snippet children(item)}
            <Autocomplete.Item value={item}>{item.label}</Autocomplete.Item>
          {/snippet}
        </Autocomplete.List>
      </Autocomplete.Content>
    </Autocomplete>
  </div>
</Scenario>

<Scenario id="with-value" label="with value">
  <Autocomplete value="Germany" items={countries} class="w-[220px]">
    <Autocomplete.InputGroup placeholder="Search countries…" />
    <Autocomplete.Content>
      <Autocomplete.List>
        {#snippet children(item)}
          <Autocomplete.Item value={item}>{item.label}</Autocomplete.Item>
        {/snippet}
      </Autocomplete.List>
    </Autocomplete.Content>
  </Autocomplete>
</Scenario>
