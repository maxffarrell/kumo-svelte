<script lang="ts">
  import { Button } from '$lib/components/button';
  import { Popover } from '$lib/components/popover';
  import Scenario from '$lib/vrt/Scenario.svelte';

  const sides = ['top', 'bottom', 'left', 'right'] as const;
</script>

{#snippet popoverTrigger(props: Record<string, unknown>)}
  <Button {...props}>Open popover</Button>
{/snippet}

{#snippet popoverBody()}
  <p class="m-0 text-sm text-kumo-subtle">
    Review notification settings and choose how you want to be alerted.
  </p>
  <div class="mt-3 flex gap-2">
    <Button size="sm" variant="secondary">Dismiss</Button>
    <Button size="sm" variant="primary">Save</Button>
  </div>
{/snippet}

<Scenario id="default" label="default">
  <div class="flex items-start">
    <Popover title="Notifications" description="You are all caught up.">
      {#snippet trigger(props)}
        {@render popoverTrigger(props)}
      {/snippet}
      {@render popoverBody()}
    </Popover>
  </div>
</Scenario>

{#each sides as side (side)}
  <Scenario id={`side-${side}`} label={`side ${side}`}>
    <div class="flex items-start">
      <Popover {side} title="Positioned popover" description={`Rendered on the ${side} side.`}>
        {#snippet trigger(props)}
          <Button {...props}>Open</Button>
        {/snippet}
        {@render popoverBody()}
      </Popover>
    </div>
  </Scenario>
{/each}

<Scenario id="open" label="open" interact={[{ type: 'click' }]} capture="page">
  <div class="flex items-start">
    <Popover title="Notifications" description="You are all caught up.">
      {#snippet trigger(props)}
        {@render popoverTrigger(props)}
      {/snippet}
      {@render popoverBody()}
    </Popover>
  </div>
</Scenario>
