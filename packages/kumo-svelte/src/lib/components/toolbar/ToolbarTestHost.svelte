<script lang="ts">
  import { Input } from '$lib/components/input';
  import { InputGroup } from '$lib/components/input-group';
  import { Combobox } from '$lib/components/combobox';
  import { Select } from '$lib/components/select';
  import { Toolbar } from './index';
</script>

<Toolbar size="sm">
  <Toolbar.Input aria-label="Toolbar input" />
  <Input aria-label="Direct input" size="lg" />
</Toolbar>

<Toolbar size="sm">
  <Toolbar.InputGroup aria-label="Hostname">
    <InputGroup.Input placeholder="example" aria-label="Hostname" />
    <InputGroup.Suffix>.workers.dev</InputGroup.Suffix>
  </Toolbar.InputGroup>
  <InputGroup>
    <InputGroup.Input placeholder="plain" aria-label="Plain" />
  </InputGroup>
</Toolbar>

<Toolbar>
  <Toolbar.Button>Before link</Toolbar.Button>
  <Toolbar.Link href="#docs" external>Documentation</Toolbar.Link>
  <Toolbar.Button>After link</Toolbar.Button>
</Toolbar>

<Toolbar>
  <Toolbar.InputGroup aria-label="Search DNS records">
    <InputGroup.Input placeholder="Search DNS records" />
  </Toolbar.InputGroup>
  <Toolbar.Button aria-label="Filter">Filter</Toolbar.Button>
  <Toolbar.Button aria-label="Settings">Settings</Toolbar.Button>
</Toolbar>

<Toolbar>
  <Toolbar.InputGroup aria-label="Worker subdomain">
    <InputGroup.Input placeholder="my-worker" />
    <InputGroup.Suffix>.workers.dev</InputGroup.Suffix>
  </Toolbar.InputGroup>
  <Toolbar.Button>Visit</Toolbar.Button>
</Toolbar>

<Toolbar>
  <Select aria-label="Sort records" value="name" items={{ name: 'Name', created: 'Created date' }}>
    {#snippet trigger({ props, value })}
      <Toolbar.Button {...props}>{value}</Toolbar.Button>
    {/snippet}
  </Select>
  <Toolbar.Button>After select</Toolbar.Button>
</Toolbar>

<Toolbar>
  <Combobox items={['All records', 'Active', 'Paused']}>
    <Combobox.TriggerInput aria-label="Filter status" placeholder="Filter status…" class="flex-1">
      {#snippet child({ props })}
        <Toolbar.Input {...props} />
      {/snippet}
    </Combobox.TriggerInput>
    <Combobox.Content>
      <Combobox.List>
        {#snippet children(item)}
          <Combobox.Item value={item}>{item}</Combobox.Item>
        {/snippet}
      </Combobox.List>
      <Combobox.Empty>No matching statuses.</Combobox.Empty>
    </Combobox.Content>
  </Combobox>
  <Toolbar.Button>After combobox</Toolbar.Button>
</Toolbar>
