<script lang="ts">
  import { Button, Tooltip, TooltipProvider } from '$lib';

  const longContent =
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.';
</script>

<div class="flex min-h-24 w-full items-center justify-center">
  <TooltipProvider>
    <div class="flex w-full justify-between">
      <Tooltip content={longContent} side="bottom">
        <Button variant="secondary">Near left edge</Button>
      </Tooltip>
      <Tooltip content={longContent} side="bottom">
        <Button variant="secondary">Centered</Button>
      </Tooltip>
      <Tooltip content={longContent} side="bottom">
        <Button variant="secondary">Near right edge</Button>
      </Tooltip>
    </div>
  </TooltipProvider>
</div>
