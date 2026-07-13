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
          title: "Rate limit warning",
          description: "You're approaching your API quota.",
          variant: "warning"
        })}
    >
      Show warning toast
    </Button>
  {/snippet}
</Toasty>
