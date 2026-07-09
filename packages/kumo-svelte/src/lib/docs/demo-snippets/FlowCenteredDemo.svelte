<script lang="ts">
  import { Flow } from 'kumo-svelte/components/flow';
</script>

<Flow align="center">
  <Flow.Node bare class="size-4 rounded-full bg-kumo-hairline" />
  <Flow.Node>my-worker</Flow.Node>
  <Flow.Node class="px-3 py-6">Taller node</Flow.Node>
</Flow>
