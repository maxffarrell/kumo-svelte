<script lang="ts">
  import { Button, Toasty } from 'kumo-svelte';
</script>

<Toasty>
  {#snippet children(toastManager: any)}
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
