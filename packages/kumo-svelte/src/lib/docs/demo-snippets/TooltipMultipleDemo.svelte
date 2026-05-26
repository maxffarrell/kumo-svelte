<script lang="ts">
  import { Button, Tooltip } from '$lib';
  import { Globe, Plus } from 'phosphor-svelte';
</script>

<div class="flex min-h-24 w-full items-center justify-center">
  <div class="flex gap-2">
    <Tooltip content="Add"><Button shape="square" aria-label="Add"><Plus class="size-4" /></Button></Tooltip>
    <Tooltip content="Change language"><Button shape="square" aria-label="Change language"><Globe class="size-4" /></Button></Tooltip>
  </div>
</div>
