<script lang="ts">
  import { InputGroup } from 'kumo-svelte/components/input-group';
  import { Toolbar } from 'kumo-svelte/components/toolbar';
</script>

<Toolbar class="w-full max-w-lg">
  <Toolbar.InputGroup aria-label="Worker subdomain" class="flex-1">
    <InputGroup.Input placeholder="my-worker" />
    <InputGroup.Suffix>.workers.dev</InputGroup.Suffix>
  </Toolbar.InputGroup>
  <Toolbar.Button>Visit</Toolbar.Button>
</Toolbar>
