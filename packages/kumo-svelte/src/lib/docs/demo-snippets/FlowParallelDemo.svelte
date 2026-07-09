<script lang="ts">
  import { Flow } from 'kumo-svelte/components/flow';
</script>

<Flow>
  <Flow.Node>Start</Flow.Node>
  <Flow.Parallel>
    <Flow.Node>Branch A</Flow.Node>
    <Flow.Node>Branch B</Flow.Node>
    <Flow.Node>Branch C</Flow.Node>
  </Flow.Parallel>
  <Flow.Node>End</Flow.Node>
</Flow>
