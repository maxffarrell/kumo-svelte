<script lang="ts">
  import ArrowRight from 'phosphor-svelte/lib/ArrowRight';
  import { Button } from 'kumo-svelte/components/button';
  import { LayerCard } from 'kumo-svelte/components/layer-card';
</script>

<LayerCard>
  <LayerCard.Secondary class="flex items-center justify-between">
    <div>Next Steps</div>
    <Button variant="ghost" size="sm" shape="square" aria-label="Go to next steps">
      <ArrowRight class="size-4" />
    </Button>
  </LayerCard.Secondary>

  <LayerCard.Primary>Get started with Kumo</LayerCard.Primary>
</LayerCard>
