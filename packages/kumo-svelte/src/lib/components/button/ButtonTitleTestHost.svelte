<script lang="ts">
  import { TooltipProvider } from '#lib/components/tooltip/index.js';
  import Button from './Button.svelte';

  let { onclick }: { onclick?: (event: MouseEvent) => void } = $props();
</script>

<TooltipProvider>
  <Button title="Create a new Worker" aria-label="Create Worker" {onclick} />
</TooltipProvider>
