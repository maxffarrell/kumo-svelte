<script lang="ts">
  import { Button } from '$lib/components/button';
  import Dialog from './Dialog.svelte';

  interface Props {
    size?: 'sm' | 'base' | 'lg' | 'xl';
  }

  let { size = 'base' }: Props = $props();
</script>

<Dialog
  {size}
  title="Edit profile"
  description="Make changes to your profile."
>
  {#snippet trigger(props)}
    <Button {...props}>Open dialog</Button>
  {/snippet}
  <div class="flex justify-end gap-2">
    <Button variant="secondary">Cancel</Button>
    <Button variant="primary">Save changes</Button>
  </div>
</Dialog>
