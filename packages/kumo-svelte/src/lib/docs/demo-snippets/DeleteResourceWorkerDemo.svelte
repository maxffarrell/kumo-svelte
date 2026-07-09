<script lang="ts">
  import { Button } from 'kumo-svelte/components/button';
  import { DeleteResource } from '../../../blocks/delete-resource';

  let open = $state(false);
  let isDeleting = $state(false);
  let errorMessage = $state('');

  async function handleDelete() {
    
    isDeleting = true;
    await new Promise((resolve) => setTimeout(resolve, 2000));
    isDeleting = false;
    open = false;
  }
</script>

<Button variant="destructive" onclick={() => (open = true)}>
  Delete Worker
</Button>

<DeleteResource
  bind:open
  onOpenChange={(nextOpen: boolean) => (open = nextOpen)}
  resourceType="Worker"
  resourceName="api-gateway-worker"
  onDelete={handleDelete}
  isDeleting={isDeleting}
/>
