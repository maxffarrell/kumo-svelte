<script lang="ts">
  import { Button } from '#lib/components/button/index.js';
  import { Tooltip, TooltipProvider } from '#lib/components/tooltip/index.js';
  import Plus from 'phosphor-svelte/lib/Plus';
</script>

<div class="flex min-h-24 w-full items-center justify-center">
  <TooltipProvider>
    <Tooltip content="Add"><Button shape="square" aria-label="Add"><Plus class="size-4" /></Button></Tooltip>
  </TooltipProvider>
</div>
