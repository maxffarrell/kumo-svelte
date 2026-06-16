<script lang="ts">
  import { onMount } from 'svelte';
  import { ChartPalette, LayerCard, Table } from 'kumo-svelte';
  import { categoricalColorIndices, getIsDarkMode } from './chart-color-demo-data';

  let isDarkMode = $state(false);

  onMount(() => {
    const update = () => {
      isDarkMode = getIsDarkMode();
    };
    const observer = new MutationObserver(update);

    update();
    [document.documentElement, document.body].forEach((node) => {
      observer.observe(node, { attributes: true, attributeFilter: ['data-mode', 'class'] });
    });

    const mediaQuery = window.matchMedia?.('(prefers-color-scheme: dark)');
    mediaQuery?.addEventListener('change', update);

    return () => {
      observer.disconnect();
      mediaQuery?.removeEventListener('change', update);
    };
  });
</script>

<LayerCard>
  <LayerCard.Secondary class="!m-0 !p-0">
    <Table layout="fixed" class="!m-0 !p-0 [&_td]:!px-6 [&_td]:!py-6">
      <Table.Body>
        <Table.Row>
          {#each categoricalColorIndices as colorIndex}
            <Table.Cell class="w-1/6 whitespace-nowrap">{colorIndex}</Table.Cell>
          {/each}
        </Table.Row>
      </Table.Body>
    </Table>
  </LayerCard.Secondary>
  <LayerCard.Primary class="!m-0 !p-0">
    <Table layout="fixed" class="!m-0 !p-0 [&_td]:!px-6 [&_td]:!py-8">
      <Table.Body>
        <Table.Row>
          {#each categoricalColorIndices as colorIndex}
            {@const color = ChartPalette.categorical(colorIndex, isDarkMode)}
            <Table.Cell class="w-1/6">
              <div class="flex items-center gap-4">
                <div style:background-color={color} class="size-10 rounded-lg"></div>
                <span class="font-mono text-xl">{color}</span>
              </div>
            </Table.Cell>
          {/each}
        </Table.Row>
      </Table.Body>
    </Table>
  </LayerCard.Primary>
</LayerCard>
