<script lang="ts">
  import { Collapsible, Text } from '$lib';
  import Scenario from '$lib/vrt/Scenario.svelte';
</script>

<Scenario id="collapsed" label="collapsed">
  <Collapsible.Root open={false}>
    <Collapsible.DefaultTrigger>Show details</Collapsible.DefaultTrigger>
    <Collapsible.DefaultPanel>
      <Text>Hidden content revealed when expanded.</Text>
    </Collapsible.DefaultPanel>
  </Collapsible.Root>
</Scenario>

<Scenario id="expanded" label="expanded" interact={[{ type: 'click' }]}>
  <Collapsible.Root open={false}>
    <Collapsible.DefaultTrigger>Show details</Collapsible.DefaultTrigger>
    <Collapsible.DefaultPanel>
      <Text>Hidden content revealed when expanded.</Text>
    </Collapsible.DefaultPanel>
  </Collapsible.Root>
</Scenario>
