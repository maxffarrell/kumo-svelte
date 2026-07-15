<script lang="ts">
  import { LayerCard } from '$lib/components/layer-card';

  interface Props {
    layered?: boolean;
    class?: string;
  }

  let { layered = false, class: className }: Props = $props();
</script>

{#if layered}
  <LayerCard class={className} data-testid="layer-card-root">
    <LayerCard.Secondary data-testid="layer-card-secondary" aria-label="secondary section">
      Header
    </LayerCard.Secondary>
    <LayerCard.Primary data-testid="layer-card-primary" aria-label="primary section">
      Content
    </LayerCard.Primary>
  </LayerCard>
{:else}
  <LayerCard class={className} data-testid="layer-card-root">Simple card</LayerCard>
{/if}
