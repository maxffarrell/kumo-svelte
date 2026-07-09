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
          title: "",
          description: "Your changes have been saved successfully.",
          variant: "default"
        })}
    >
      Description only
    </Button>
  {/snippet}
</Toasty>
