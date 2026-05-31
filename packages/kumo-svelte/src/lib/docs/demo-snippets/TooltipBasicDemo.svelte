<script lang="ts">
  import { Button, Tooltip, TooltipProvider } from '$lib';
  import { Plus } from 'phosphor-svelte';
</script>

<div class="flex min-h-24 w-full items-center justify-center">
  <TooltipProvider>
    <Tooltip content="Add">
      <Button shape="square" icon={Plus} aria-label="Add" />
    </Tooltip>
  </TooltipProvider>
</div>
