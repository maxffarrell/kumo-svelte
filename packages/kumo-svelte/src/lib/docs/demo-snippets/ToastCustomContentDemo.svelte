<script lang="ts">
  import { Button, Link, Toasty } from 'kumo-svelte';
  import { CheckCircle } from 'phosphor-svelte';
</script>

<Toasty>
  {#snippet children(toastManager: any)}
    {#snippet content()}
      <div class="flex items-center gap-2">
        <CheckCircle class="size-4" />
        <Link href="/">my-first-worker</Link> created!
      </div>
    {/snippet}

    <Button onclick={() => toastManager.add({ content })}>Show custom content</Button>
  {/snippet}
</Toasty>
