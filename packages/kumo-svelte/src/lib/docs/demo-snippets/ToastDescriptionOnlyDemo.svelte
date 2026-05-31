<script lang="ts">
  import { Button, Toasty } from 'kumo-svelte';
</script>

<Toasty>
  {#snippet children(toastManager: any)}
    <Button
      variant="secondary"
      onclick={() =>
        toastManager.add({
          title: "",
          description: "Your changes have been saved successfully.",
          variant: "default"
        })}
    >
      Description only
    </Button>
  {/snippet}
</Toasty>
