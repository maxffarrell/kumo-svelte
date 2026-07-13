<script lang="ts">
  import { Button } from 'kumo-svelte/components/button';
  import { Link } from 'kumo-svelte/components/link';
  import { Toasty } from 'kumo-svelte/components/toasty';
  import CheckCircle from 'phosphor-svelte/lib/CheckCircle';
</script>

<Toasty>
  {#snippet children(toastManager)}
    {#snippet content()}
      <div class="flex items-center gap-2">
        <CheckCircle class="size-4" />
        <Link href="/">my-first-worker</Link> created!
      </div>
    {/snippet}

    <Button onclick={() => toastManager.add({ content })}>Show custom content</Button>
  {/snippet}
</Toasty>
