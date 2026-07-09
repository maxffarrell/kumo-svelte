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
          title: "New version available",
          description: "Kumo v4.2 includes performance improvements.",
          variant: "info"
        })}
    >
      Show info toast
    </Button>
  {/snippet}
</Toasty>
