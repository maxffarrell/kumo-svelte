<script lang="ts">
  import { Button, Toasty } from 'kumo-svelte';
</script>

<Toasty>
  {#snippet children(toastManager: any)}
    <Button
      variant="secondary"
      onclick={() =>
        toastManager.add({
          title: "Deployment failed",
          description: "Unable to connect to the server.",
          variant: "error"
        })}
    >
      Show error toast
    </Button>
  {/snippet}
</Toasty>
