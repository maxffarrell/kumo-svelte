<script lang="ts">
  import { Flow } from 'kumo-svelte/components/flow';
</script>

<Flow>
  <Flow.Node>Load balancer</Flow.Node>
  <Flow.Node bare class="overflow-hidden rounded-lg bg-kumo-overlay shadow-none ring ring-kumo-hairline">
    <div class="flex h-10 items-center px-2.5 text-kumo-subtle">my-worker</div>
    <div class="m-1.5 mt-0 rounded bg-kumo-base px-2 py-1.5 shadow ring ring-kumo-hairline">
      Bindings <span class="ml-3 inline-block w-5 text-kumo-subtle">2</span>
    </div>
  </Flow.Node>
  <Flow.Parallel>
    <Flow.Node>DATABASE</Flow.Node>
    <Flow.Node>OTHER_SERVICE</Flow.Node>
  </Flow.Parallel>
</Flow>
