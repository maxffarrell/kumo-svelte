<script lang="ts">
  import { Flow } from 'kumo-svelte/components/flow';
</script>

<Flow>
  <Flow.Node>Request</Flow.Node>
  <Flow.Parallel>
    <Flow.Node>Primary Handler</Flow.Node>
    <Flow.Node disabled>Backup Handler (disabled)</Flow.Node>
  </Flow.Parallel>
  <Flow.Node>Response</Flow.Node>
</Flow>
