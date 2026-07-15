<script lang="ts">
  import { MenuBar } from '$lib/components/menu-bar';
  import Scenario from '$lib/vrt/Scenario.svelte';
  import { List, SquaresFour } from 'phosphor-svelte';

  const options = [
    { icon: List, id: 'list', tooltip: 'List view', onClick: () => {} },
    { icon: SquaresFour, id: 'grid', tooltip: 'Grid view', onClick: () => {} }
  ];
</script>

<Scenario id="default" label="default">
  <MenuBar isActive={undefined} {options} optionIds />
</Scenario>

<Scenario id="active-list" label="active: list">
  <MenuBar isActive="list" {options} optionIds />
</Scenario>

<Scenario id="active-grid" label="active: grid">
  <MenuBar isActive="grid" {options} optionIds />
</Scenario>
