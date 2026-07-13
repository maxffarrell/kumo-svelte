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
          title: "Settings saved",
          description: "",
          variant: "default"
        })}
    >
      Title only
    </Button>
  {/snippet}
</Toasty>
