<script lang="ts">
  import { Button } from 'kumo-svelte/components/button';
  import { Toasty } from 'kumo-svelte/components/toasty';
</script>

<Toasty>
  {#snippet children(toastManager)}
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
