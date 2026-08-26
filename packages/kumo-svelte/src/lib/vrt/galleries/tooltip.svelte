<script lang="ts">
  import { Button } from '$lib/components/button';
  import { Tooltip, TooltipProvider } from '$lib/components/tooltip';
  import Scenario from '$lib/vrt/Scenario.svelte';
  import { Gear } from 'phosphor-svelte';

  const sides = ['top', 'bottom', 'left', 'right'] as const;
</script>

{#snippet tooltipTrigger(props: Record<string, unknown>)}
  <Button {...props}>Hover for help</Button>
{/snippet}

<Scenario id="default" label="default">
  <div class="flex items-start">
    <TooltipProvider>
      <Tooltip content="Save your changes before leaving this page.">
        {#snippet trigger(props)}
          {@render tooltipTrigger(props)}
        {/snippet}
      </Tooltip>
    </TooltipProvider>
  </div>
</Scenario>

<Scenario id="icon-trigger" label="icon trigger">
  <div class="flex items-start">
    <TooltipProvider>
      <Tooltip content="Open settings" delay={0}>
        <Button shape="square" aria-label="Settings"><Gear class="size-4" /></Button>
      </Tooltip>
    </TooltipProvider>
  </div>
</Scenario>

{#each sides as side (side)}
  <Scenario id={`side-${side}`} label={`side ${side}`}>
    <div class="flex items-start">
      <TooltipProvider>
        <Tooltip {side} content={`Tooltip on the ${side} side.`} delay={0}>
          {#snippet trigger(props)}
            <Button {...props}>Hover</Button>
          {/snippet}
        </Tooltip>
      </TooltipProvider>
    </div>
  </Scenario>
{/each}

<Scenario id="open" label="open" interact={[{ type: 'hover' }]} capture="page">
  <div class="flex items-start">
    <TooltipProvider>
      <Tooltip content="Save your changes before leaving this page." delay={0}>
        {#snippet trigger(props)}
          {@render tooltipTrigger(props)}
        {/snippet}
      </Tooltip>
    </TooltipProvider>
  </div>
</Scenario>

<Scenario id="open-focus" label="open focus" interact={[{ type: 'focus' }]} capture="page">
  <div class="flex items-start">
    <TooltipProvider>
      <Tooltip content="Keyboard-accessible tooltip content." delay={0}>
        {#snippet trigger(props)}
          <Button {...props}>Focus me</Button>
        {/snippet}
      </Tooltip>
    </TooltipProvider>
  </div>
</Scenario>
