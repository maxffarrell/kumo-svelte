<script lang="ts">
  import { Banner } from '$lib/components/banner';
  import { Button } from '$lib/components/button';
  import Info from 'phosphor-svelte/lib/Info';
  import X from 'phosphor-svelte/lib/X';
</script>

<div class="w-full space-y-3">
  <Banner icon={Info} title="Update available" description="A new version is ready to install.">
    {#snippet action()}
      <Button size="sm" variant="primary">Update now</Button>
    {/snippet}
  </Banner>
  <Banner icon={Info} title="Update available" description="A new version is ready to install.">
    {#snippet action()}
      <Button size="sm" variant="ghost" shape="square" aria-label="Dismiss">
        <X class="size-4" />
      </Button>
    {/snippet}
  </Banner>
</div>
