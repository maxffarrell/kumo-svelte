<script lang="ts">
  import Tabs from './Tabs.svelte';

  interface Props {
    variant?: 'segmented' | 'underline';
    size?: 'base' | 'sm';
    value?: string;
  }

  let {
    variant = 'segmented',
    size = 'base',
    value = $bindable('tab1')
  }: Props = $props();

  const tabs = [
    { value: 'tab1', label: 'Tab 1' },
    { value: 'tab2', label: 'Tab 2' },
    { value: 'tab3', label: 'Tab 3' }
  ];
</script>

<Tabs {tabs} {variant} {size} bind:value />
