<script lang="ts">
  import { Button } from '$lib/components/button';
  import { Tooltip, TooltipProvider } from '$lib/components/tooltip';
  import Plus from 'phosphor-svelte/lib/Plus';
</script>

<div class="flex min-h-24 w-full items-center justify-center">
  <TooltipProvider>
    <Tooltip content="Add new item">
      <Button shape="square" aria-label="Add new item"><Plus class="size-4" /></Button>
    </Tooltip>
  </TooltipProvider>
</div>
