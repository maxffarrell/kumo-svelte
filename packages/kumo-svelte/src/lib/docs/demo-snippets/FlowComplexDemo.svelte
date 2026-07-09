<script lang="ts">
  import { Flow } from 'kumo-svelte/components/flow';
</script>

<Flow>
  <Flow.Parallel>
    <Flow.Node>HTTP Trigger</Flow.Node>
    <Flow.Node>Cron Trigger</Flow.Node>
  </Flow.Parallel>
  <Flow.Node>Process Request</Flow.Node>
  <Flow.Parallel>
    <Flow.Node>Log Analytics</Flow.Node>
    <Flow.Node>Update Cache</Flow.Node>
    <Flow.Node>Send Notification</Flow.Node>
  </Flow.Parallel>
  <Flow.Node>Complete</Flow.Node>
</Flow>
