<script lang="ts">
  import Code from 'phosphor-svelte/lib/Code';
  import Globe from 'phosphor-svelte/lib/Globe';
  import Package from 'phosphor-svelte/lib/Package';
  import { Button } from 'kumo-svelte/components/button';
  import { Empty } from 'kumo-svelte/components/empty';
</script>

<Empty
  title="No packages found"
  description="Get started by installing your first package."
  commandLine="npm install kumo-svelte"
>
  {#snippet icon()}<Package class="size-12" />{/snippet}
  <div class="flex items-center gap-2">
    <Button icon={Code}>See examples</Button>
    <Button icon={Globe} variant="primary">View documentation</Button>
  </div>
</Empty>
