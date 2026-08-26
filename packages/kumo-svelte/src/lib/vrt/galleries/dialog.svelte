<script lang="ts">
  import { Button } from '$lib/components/button';
  import { Dialog } from '$lib/components/dialog';
  import Scenario from '$lib/vrt/Scenario.svelte';

  const sizes = ['sm', 'base', 'lg', 'xl'] as const;
</script>

{#snippet dialogActions()}
  <div class="flex justify-end gap-2">
    <Button variant="secondary">Cancel</Button>
    <Button variant="primary">Save changes</Button>
  </div>
{/snippet}

{#snippet dialogTrigger(props: Record<string, unknown>)}
  <Button {...props}>Open dialog</Button>
{/snippet}

<Scenario id="default" label="default">
  <div class="flex items-start">
    <Dialog title="Edit profile" description="Make changes to your profile and save when you are done.">
      {#snippet trigger(props)}
        {@render dialogTrigger(props)}
      {/snippet}
      {@render dialogActions()}
    </Dialog>
  </div>
</Scenario>

{#each sizes as size (size)}
  <Scenario id={`size-${size}`} label={`size ${size}`}>
    <div class="flex items-start">
      <Dialog {size} title="Dialog title" description="Sized dialog panel.">
        {#snippet trigger(props)}
          <Button {...props}>Open</Button>
        {/snippet}
        {@render dialogActions()}
      </Dialog>
    </div>
  </Scenario>
{/each}

<Scenario id="alertdialog" label="alertdialog">
  <div class="flex items-start">
    <Dialog role="alertdialog" title="Delete project?" description="This action cannot be undone.">
      {#snippet trigger(props)}
        <Button variant="destructive" {...props}>Delete</Button>
      {/snippet}
      <div class="flex justify-end gap-2">
        <Button variant="secondary">Cancel</Button>
        <Button variant="destructive">Delete</Button>
      </div>
    </Dialog>
  </div>
</Scenario>

<Scenario id="open" label="open" interact={[{ type: 'click' }]} capture="page">
  <div class="flex items-start">
    <Dialog title="Edit profile" description="Make changes to your profile and save when you are done.">
      {#snippet trigger(props)}
        <Button {...props}>Open dialog</Button>
      {/snippet}
      {@render dialogActions()}
    </Dialog>
  </div>
</Scenario>
