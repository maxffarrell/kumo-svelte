<script lang="ts">
  import { Button, LayerCard } from '$lib';
  import { ArrowRight } from 'phosphor-svelte';
</script>

<div class="flex min-h-24 w-full items-center justify-center">

      <LayerCard><LayerCard.Secondary class="flex items-center justify-between"><div>Next Steps</div><Button variant="ghost" size="sm" shape="square" aria-label="Go to next steps"><ArrowRight class="size-4" /></Button></LayerCard.Secondary><LayerCard.Primary>Get started with Kumo</LayerCard.Primary></LayerCard>
    
</div>
