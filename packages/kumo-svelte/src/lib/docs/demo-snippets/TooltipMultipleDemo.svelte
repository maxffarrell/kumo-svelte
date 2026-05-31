<script lang="ts">
  import { Button, Tooltip, TooltipProvider } from '$lib';
  import { Plus, Translate } from 'phosphor-svelte';
</script>

<div class="flex min-h-24 w-full items-center justify-center">
  <TooltipProvider>
    <div class="flex gap-2">
      <Tooltip content="Add">
        <Button shape="square" icon={Plus} aria-label="Add" />
      </Tooltip>
      <Tooltip content="Change language">
        <Button shape="square" icon={Translate} aria-label="Change language" />
      </Tooltip>
    </div>
  </TooltipProvider>
</div>
