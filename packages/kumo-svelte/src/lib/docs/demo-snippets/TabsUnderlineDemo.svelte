<script lang="ts">
  import { Tabs } from 'kumo-svelte/components/tabs';

  const items = [
    { value: 'tab1', label: 'Tab 1' },
    { value: 'tab2', label: 'Tab 2' },
    { value: 'tab3', label: 'Tab 3' }
  ];
</script>

<Tabs variant="underline" {items} value="tab1" />
