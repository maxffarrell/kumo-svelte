<script lang="ts">
  import { Flow } from 'kumo-svelte/components/flow';
</script>

<Flow class="max-w-full rounded-lg border border-kumo-hairline">
  <Flow.Node>Start</Flow.Node>
  <Flow.Node>Authenticate</Flow.Node>
  <Flow.Node>Validate</Flow.Node>
  <Flow.Node>Transform</Flow.Node>
  <Flow.Node>Process</Flow.Node>
  <Flow.Node>Store</Flow.Node>
  <Flow.Node>Notify</Flow.Node>
  <Flow.Node>Log</Flow.Node>
  <Flow.Node>Complete</Flow.Node>
  <Flow.Node>End</Flow.Node>
</Flow>
