<script lang="ts">
  import { onMount } from 'svelte';
  import { ChartPalette, LayerCard, Table } from 'kumo-svelte';
  import { getIsDarkMode } from './chart-color-demo-data';

  let isDarkMode = $state(false);
  const scale = $derived(ChartPalette.sequential('blues', isDarkMode));

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
          {#each scale as _, index}
            <Table.Cell class={index === 0 ? 'w-1/5 whitespace-nowrap !pl-6' : 'w-1/5 whitespace-nowrap'}>Step {index + 1}</Table.Cell>
          {/each}
        </Table.Row>
      </Table.Body>
    </Table>
  </LayerCard.Secondary>
  <LayerCard.Primary class="!m-0 !p-0">
    <Table layout="fixed" class="!m-0 !p-0">
      <Table.Body>
        <Table.Row>
          {#each scale as hex, index}
            <Table.Cell class={index === 0 ? 'w-1/5 !pl-6' : 'w-1/5'}>
              <div class="flex items-center gap-2">
                <div style:background-color={hex} class="size-5 rounded"></div>
                <span class="font-mono text-xs">{hex}</span>
              </div>
            </Table.Cell>
          {/each}
        </Table.Row>
      </Table.Body>
    </Table>
  </LayerCard.Primary>
</LayerCard>
