<script lang="ts">
  import { Tooltip } from '$lib';
  import { Question as HelpCircle } from 'phosphor-svelte';
</script>

<div class="flex min-h-24 w-full items-center justify-center">
  <Tooltip content="Click to learn more">
    <span class="inline-flex items-center gap-1.5 rounded-full bg-kumo-brand px-3 py-1.5 text-sm font-medium text-white shadow-md transition-transform hover:scale-105 active:scale-95"><HelpCircle class="size-4" />Help</span>
  </Tooltip>
</div>
