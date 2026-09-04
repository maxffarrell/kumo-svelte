<script lang="ts">
  import { Button } from '$lib/components/button';
  import { TooltipProvider } from '$lib/components/tooltip';
  import Tooltip from './Tooltip.svelte';
  import { Text } from '$lib/components/text';
</script>

<TooltipProvider>
  <Tooltip content="Save your changes before leaving." delay={0}>
    {#snippet trigger(props)}
      <Button {...props}>Hover for help</Button>
    {/snippet}
  </Tooltip>
  <Tooltip content="Nested text" delay={0}>
    <Text as="span" size="sm">Trigger label</Text>
  </Tooltip>
</TooltipProvider>
