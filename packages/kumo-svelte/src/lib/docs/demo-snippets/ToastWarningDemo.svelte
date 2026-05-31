<script lang="ts">
  import { Button, Toasty } from 'kumo-svelte';
</script>

<Toasty>
  {#snippet children(toastManager: any)}
    <Button
      variant="secondary"
      onclick={() =>
        toastManager.add({
          title: "Rate limit warning",
          description: "You're approaching your API quota.",
          variant: "warning"
        })}
    >
      Show warning toast
    </Button>
  {/snippet}
</Toasty>
