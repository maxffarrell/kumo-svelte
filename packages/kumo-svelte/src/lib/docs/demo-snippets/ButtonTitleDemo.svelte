<script lang="ts">
  import { Button } from 'kumo-svelte/components/button';
  import Plus from 'phosphor-svelte/lib/Plus';
</script>

<div class="flex flex-wrap items-center gap-3">
  <Button variant="secondary" title="Create a new Worker">Create Worker</Button>
  <Button variant="secondary" shape="square" aria-label="Add item" title="Add item">
    <Plus class="size-4" />
  </Button>
</div>
