<script lang="ts">
  import { Button, Tooltip, TooltipProvider } from '$lib';
  import { Plus } from 'phosphor-svelte';
</script>

<div class="flex min-h-24 w-full items-center justify-center">
  <TooltipProvider>
    <Tooltip content="Add new item">
      <Button shape="square" icon={Plus} aria-label="Add new item" />
    </Tooltip>
  </TooltipProvider>
</div>
