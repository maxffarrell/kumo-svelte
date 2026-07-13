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
          title: "Toast created",
          description: "This is a toast notification.",
          variant: "default"
        })}
    >
      Show with actions
    </Button>
  {/snippet}
</Toasty>
