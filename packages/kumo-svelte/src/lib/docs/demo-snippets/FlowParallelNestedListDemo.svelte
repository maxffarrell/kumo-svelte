<script lang="ts">
  import { Flow } from 'kumo-svelte/components/flow';
</script>

<Flow>
  <Flow.Parallel>
    <Flow.List>
      <Flow.Node>Client Users</Flow.Node>
      <Flow.Node>Engineering Team Access</Flow.Node>
    </Flow.List>
    <Flow.List>
      <Flow.Parallel>
        <Flow.Node>All Authenticated Users</Flow.Node>
        <Flow.Node>Client Users</Flow.Node>
        <Flow.Node>Site Users</Flow.Node>
      </Flow.Parallel>
      <Flow.Node>Contractor Access</Flow.Node>
    </Flow.List>
  </Flow.Parallel>
  <Flow.Node>Destinations</Flow.Node>
</Flow>
