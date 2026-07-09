<script lang="ts">
  import { Button } from '$lib/components/button';
  import { Tooltip, TooltipProvider } from '$lib/components/tooltip';
  import Plus from 'phosphor-svelte/lib/Plus';
  import Translate from 'phosphor-svelte/lib/Translate';
</script>

<div class="flex min-h-24 w-full items-center justify-center">
  <TooltipProvider>
    <div class="flex gap-2">
      <Tooltip content="Add"><Button shape="square" aria-label="Add"><Plus class="size-4" /></Button></Tooltip>
      <Tooltip content="Change language"><Button shape="square" aria-label="Change language"><Translate class="size-4" /></Button></Tooltip>
    </div>
  </TooltipProvider>
</div>
