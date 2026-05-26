<script lang="ts">
  import { Button, Tooltip } from '$lib';
  import { Plus } from 'phosphor-svelte';
</script>

<div class="flex min-h-24 w-full items-center justify-center">
  <Tooltip content="Add"><Button shape="square" aria-label="Add"><Plus class="size-4" /></Button></Tooltip>
</div>
