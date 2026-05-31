<script lang="ts">
  import { Autocomplete } from 'kumo-svelte';

  const servers = [
    {
      label: 'North America',
      value: 'North America',
      items: [
        { label: 'US East (Virginia)', value: 'us-east-1' },
        { label: 'US West (Oregon)', value: 'us-west-2' },
        { label: 'Canada (Central)', value: 'ca-central-1' }
      ]
    },
    {
      label: 'Europe',
      value: 'Europe',
      items: [
        { label: 'EU West (Ireland)', value: 'eu-west-1' },
        { label: 'EU Central (Frankfurt)', value: 'eu-central-1' },
        { label: 'EU North (Stockholm)', value: 'eu-north-1' }
      ]
    },
    {
      label: 'Asia Pacific',
      value: 'Asia Pacific',
      items: [
        { label: 'AP Southeast (Singapore)', value: 'ap-southeast-1' },
        { label: 'AP Northeast (Tokyo)', value: 'ap-northeast-1' },
        { label: 'AP South (Mumbai)', value: 'ap-south-1' }
      ]
    }
  ];
</script>

<Autocomplete items={servers}>
  <Autocomplete.InputGroup placeholder="Select region…" />
  <Autocomplete.Content>
    <Autocomplete.List>
      {#snippet children(group: any)}
        <Autocomplete.Group items={group.items}>
          <Autocomplete.GroupLabel>{group.label}</Autocomplete.GroupLabel>
          <Autocomplete.Collection>
            {#snippet children(item: any)}
              <Autocomplete.Item value={item}>{item.label}</Autocomplete.Item>
            {/snippet}
          </Autocomplete.Collection>
        </Autocomplete.Group>
      {/snippet}
    </Autocomplete.List>
  </Autocomplete.Content>
</Autocomplete>
