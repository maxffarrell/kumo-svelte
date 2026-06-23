<script lang="ts">
  import { Input } from '$lib/components/input';
  import { InputGroup } from '$lib/components/input-group';
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
  <Toolbar.InputGroup aria-label="Search DNS records">
    <InputGroup.Input placeholder="Search DNS records" />
  </Toolbar.InputGroup>
  <Toolbar.Button aria-label="Filter">Filter</Toolbar.Button>
  <Toolbar.Button aria-label="Settings">Settings</Toolbar.Button>
</Toolbar>
