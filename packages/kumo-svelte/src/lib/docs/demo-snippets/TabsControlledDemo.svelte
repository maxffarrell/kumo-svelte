<script lang="ts">
  import { Tabs } from 'kumo-svelte/components/tabs';

  const items = [
    { value: 'tab1', label: 'Tab 1' },
    { value: 'tab2', label: 'Tab 2' },
    { value: 'tab3', label: 'Tab 3' }
  ];
  let value = $state('tab1');
</script>

<div class="space-y-4">
  <Tabs {items} bind:value />
  <p class="text-sm text-kumo-subtle">
    Active tab: <code class="text-sm">{value}</code>
  </p>
</div>
