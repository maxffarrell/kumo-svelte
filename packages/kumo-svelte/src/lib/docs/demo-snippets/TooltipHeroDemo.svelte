<script lang="ts">
  import { Button, Tooltip, TooltipProvider } from '$lib';
  import { Plus } from 'phosphor-svelte';
</script>

<div class="flex min-h-24 w-full items-center justify-center">
  <TooltipProvider>
    <Tooltip content="Add new item">
      <Button shape="square" aria-label="Add new item"><Plus class="size-4" /></Button>
    </Tooltip>
  </TooltipProvider>
</div>
