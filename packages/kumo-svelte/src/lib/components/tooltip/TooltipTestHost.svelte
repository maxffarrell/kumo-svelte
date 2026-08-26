<script lang="ts">
  import { Button } from '$lib/components/button';
  import { TooltipProvider } from '$lib/components/tooltip';
  import Tooltip from './Tooltip.svelte';
</script>

<TooltipProvider>
  <Tooltip content="Save your changes before leaving." delay={0}>
    {#snippet trigger(props)}
      <Button {...props}>Hover for help</Button>
    {/snippet}
  </Tooltip>
</TooltipProvider>
