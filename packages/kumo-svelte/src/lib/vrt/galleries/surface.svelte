<script lang="ts">
  import { Surface } from '$lib/components/surface';
  import Scenario from '$lib/vrt/Scenario.svelte';
</script>

<Scenario id="primary" label="primary">
  <Surface class="rounded-lg p-4">Primary surface content</Surface>
</Scenario>

<Scenario id="secondary" label="secondary">
  <Surface color="secondary" class="rounded-lg p-4">Secondary surface content</Surface>
</Scenario>

<Scenario id="primary-section" label="primary as section">
  <Surface as="section" class="rounded-lg p-6">Section surface</Surface>
</Scenario>
