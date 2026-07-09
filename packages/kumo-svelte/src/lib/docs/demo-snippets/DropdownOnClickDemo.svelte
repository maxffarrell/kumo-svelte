<script lang="ts">
  import Copy from 'phosphor-svelte/lib/Copy';
  import PencilSimple from 'phosphor-svelte/lib/PencilSimple';
  import Trash from 'phosphor-svelte/lib/Trash';
  import { Button } from 'kumo-svelte/components/button';
  import { DropdownMenu } from 'kumo-svelte/components/dropdown-menu';

  let lastAction = $state<string | null>(null);
</script>

<div class="flex flex-col items-start gap-2">
  <DropdownMenu>
    <DropdownMenu.Trigger>
      <Button>Actions</Button>
    </DropdownMenu.Trigger>
    <DropdownMenu.Content>
      <DropdownMenu.Item icon={Copy} onSelect={() => (lastAction = 'Duplicated')}>
        Duplicate
      </DropdownMenu.Item>
      <DropdownMenu.Item icon={PencilSimple} onSelect={() => (lastAction = 'Renamed')}>
        Rename
      </DropdownMenu.Item>
      <DropdownMenu.Separator />
      <DropdownMenu.Item icon={Trash} variant="danger" onSelect={() => (lastAction = 'Deleted')}>
        Delete
      </DropdownMenu.Item>
    </DropdownMenu.Content>
  </DropdownMenu>
  {#if lastAction}
    <p class="text-sm text-kumo-subtle">
      Last action: <span class="text-kumo-default">{lastAction}</span>
    </p>
  {/if}
</div>
