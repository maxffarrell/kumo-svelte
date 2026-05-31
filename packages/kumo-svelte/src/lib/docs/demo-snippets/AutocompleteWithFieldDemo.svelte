<script lang="ts">
  import { Autocomplete } from 'kumo-svelte';

  const countries = [
  { label: 'United States', value: 'us' },
  { label: 'United Kingdom', value: 'gb' },
  { label: 'Germany', value: 'de' },
  { label: 'France', value: 'fr' },
  { label: 'Japan', value: 'jp' },
  { label: 'China', value: 'cn' },
  { label: 'India', value: 'in' },
  { label: 'Brazil', value: 'br' },
  { label: 'Canada', value: 'ca' },
  { label: 'Australia', value: 'au' }
];
</script>

<div class="w-80">
  <Autocomplete
    items={countries}
    label="Country"
    description="Start typing to filter countries"
  >
    <Autocomplete.InputGroup placeholder="Search countries…" />
    <Autocomplete.Content>
      <Autocomplete.List>
        {#snippet children(item: any)}
          <Autocomplete.Item value={item}>{item.label}</Autocomplete.Item>
        {/snippet}
      </Autocomplete.List>
    </Autocomplete.Content>
  </Autocomplete>
</div>
