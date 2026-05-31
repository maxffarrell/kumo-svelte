<script lang="ts">
  import { Button, Toasty } from 'kumo-svelte';
</script>

<Toasty>
  {#snippet children(toastManager: any)}
    <Button
      variant="secondary"
      onclick={() =>
        toastManager.add({
          title: "New version available",
          description: "Kumo v4.2 includes performance improvements.",
          variant: "info"
        })}
    >
      Show info toast
    </Button>
  {/snippet}
</Toasty>
