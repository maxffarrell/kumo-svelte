<script lang="ts">
  import { Collapsible } from '$lib';
</script>

<div class="flex min-h-24 w-full items-center justify-center">
<Collapsible open={false}>
      {#snippet trigger()}Build details{/snippet}
      <p class="text-sm text-kumo-subtle">Dependencies installed, routes generated, and static assets uploaded.</p>
    </Collapsible>
</div>
