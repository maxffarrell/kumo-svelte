<script lang="ts">
  import { Button } from 'kumo-svelte/components/button';
  import { Toasty } from 'kumo-svelte/components/toasty';
</script>

<Toasty>
  {#snippet children(toastManager)}
    <Button
      variant="primary"
      onclick={() =>
        toastManager.add({
          title: "Deployed successfully",
          description: "Your Worker is now live.",
          variant: "success"
        })}
    >
      Deploy Worker
    </Button>
  {/snippet}
</Toasty>
