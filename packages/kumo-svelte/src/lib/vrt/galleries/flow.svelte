<script lang="ts">
  import { Flow } from '$lib/components/flow';
  import Scenario from '$lib/vrt/Scenario.svelte';
</script>

<!-- Fixed dimensions keep captures stable; node ids are explicit for connector paths. -->
<Scenario id="sequential" label="sequential">
  <Flow class="h-[160px] w-[480px]" padding={{ x: 8, y: 8 }}>
    <Flow.Node id="vrt-request">Request</Flow.Node>
    <Flow.Node id="vrt-handler">Handler</Flow.Node>
    <Flow.Node id="vrt-response">Response</Flow.Node>
  </Flow>
</Scenario>

<Scenario id="parallel" label="parallel branches">
  <Flow class="h-[220px] w-[520px]" padding={{ x: 8, y: 8 }}>
    <Flow.Node id="vrt-start">Start</Flow.Node>
    <Flow.Parallel>
      <Flow.Node id="vrt-branch-a">Branch A</Flow.Node>
      <Flow.Node id="vrt-branch-b">Branch B</Flow.Node>
    </Flow.Parallel>
    <Flow.Node id="vrt-end">End</Flow.Node>
  </Flow>
</Scenario>

<Scenario id="disabled" label="disabled branch">
  <Flow class="h-[220px] w-[520px]" padding={{ x: 8, y: 8 }}>
    <Flow.Node id="vrt-in">Input</Flow.Node>
    <Flow.Parallel>
      <Flow.Node id="vrt-primary">Primary</Flow.Node>
      <Flow.Node id="vrt-backup" disabled>Backup</Flow.Node>
    </Flow.Parallel>
    <Flow.Node id="vrt-out">Output</Flow.Node>
  </Flow>
</Scenario>

<Scenario id="no-canvas" label="no canvas">
  <Flow canvas={false} class="w-[480px]">
    <Flow.Node id="vrt-a">Step A</Flow.Node>
    <Flow.Node id="vrt-b">Step B</Flow.Node>
  </Flow>
</Scenario>

<Scenario id="align-center" label="align center">
  <Flow align="center" class="h-[160px] w-[480px]" padding={{ x: 8, y: 8 }}>
    <Flow.Node id="vrt-one">One</Flow.Node>
    <Flow.Node id="vrt-two" class="mt-8">Two</Flow.Node>
  </Flow>
</Scenario>
