<script lang="ts">
  import { Tabs } from 'kumo-svelte/components/tabs';

  const items = [
    { value: 'tab1', label: 'Tab 1' },
    { value: 'tab2', label: 'Tab 2' },
    { value: 'tab3', label: 'Tab 3' }
  ];
</script>

<div class="flex flex-col gap-6">
  <div>
    <p class="mb-2 text-sm text-kumo-subtle">Segmented (default)</p>
    <Tabs variant="segmented" {items} value="tab1" />
  </div>
  <div>
    <p class="mb-2 text-sm text-kumo-subtle">Underline</p>
    <Tabs variant="underline" {items} value="tab1" />
  </div>
</div>
