<script lang="ts">
  import { Button, Toasty } from 'kumo-svelte';
</script>

<Toasty>
  {#snippet children(toastManager: any)}
    <Button
      variant="secondary"
      onclick={() =>
        toastManager.add({
          title: "Settings saved",
          description: "",
          variant: "default"
        })}
    >
      Title only
    </Button>
  {/snippet}
</Toasty>
