<script lang="ts">
  import { onMount } from 'svelte';
  import { ChartPalette, LayerCard, Table } from 'kumo-svelte';
  import { categoricalColorIndices, getIsDarkMode } from './chart-color-demo-data';

  let isDarkMode = $state(false);

  const colorFor = (colorIndex: number) => ChartPalette.categorical(colorIndex, isDarkMode);

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
    <Table layout="fixed" class="!m-0 !p-0">
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
    <Table layout="fixed" class="!m-0 !p-0">
      <Table.Body>
        <Table.Row>
          {#each categoricalColorIndices as colorIndex}
            <Table.Cell class="w-1/6">
              <div class="flex items-center gap-2">
                <div style:background-color={colorFor(colorIndex)} class="size-5 rounded"></div>
                <span class="font-mono text-xs">{colorFor(colorIndex)}</span>
              </div>
            </Table.Cell>
          {/each}
        </Table.Row>
      </Table.Body>
    </Table>
  </LayerCard.Primary>
</LayerCard>
