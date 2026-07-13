<script lang="ts">
  import CloudSlash from 'phosphor-svelte/lib/CloudSlash';
  import { Button } from 'kumo-svelte/components/button';
  import { Empty } from 'kumo-svelte/components/empty';
</script>

<Empty
  title="No connection"
  description="Unable to connect to the server. Please check your connection and try again."
>
  {#snippet icon()}<CloudSlash class="size-12 text-kumo-inactive" />{/snippet}
  <div class="flex gap-2">
    <Button variant="primary">Retry</Button>
    <Button variant="secondary">Go Back</Button>
  </div>
</Empty>
