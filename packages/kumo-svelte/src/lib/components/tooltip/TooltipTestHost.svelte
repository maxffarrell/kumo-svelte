<script lang="ts">
  import { Button } from '#lib/components/button/index.js';
  import { TooltipProvider } from '#lib/components/tooltip/index.js';
  import Tooltip from './Tooltip.svelte';
  let { disabled = false }: { disabled?: boolean } = $props();
  import { Text } from '#lib/components/text/index.js';
</script>

<TooltipProvider>
  <Tooltip {disabled} content="Save your changes before leaving." delay={0}>
    {#snippet trigger(props)}
      <Button {...props}>Hover for help</Button>
    {/snippet}
  </Tooltip>
  <Tooltip {disabled} content="Nested text" delay={0}>
    <Text as="span" size="sm">Trigger label</Text>
  </Tooltip>
</TooltipProvider>
