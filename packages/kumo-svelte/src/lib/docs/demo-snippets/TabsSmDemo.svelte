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
    <p class="mb-2 text-sm text-kumo-subtle">Segmented sm</p>
    <Tabs variant="segmented" size="sm" {items} value="tab1" />
  </div>
  <div>
    <p class="mb-2 text-sm text-kumo-subtle">Underline sm</p>
    <Tabs variant="underline" size="sm" {items} value="tab1" />
  </div>
</div>
