<script lang="ts">
  import { Button, Toasty } from 'kumo-svelte';
</script>

<Toasty>
  {#snippet children(toastManager: any)}
    <Button
      variant="secondary"
      onclick={() =>
        toastManager.add({
          title: "Toast created",
          description: "This is a toast notification.",
          variant: "default"
        })}
    >
      Show multiple toasts
    </Button>
  {/snippet}
</Toasty>
