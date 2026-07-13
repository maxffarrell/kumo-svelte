<script lang="ts">
  import { Flow } from 'kumo-svelte/components/flow';
</script>

<Flow>
  <Flow.Node bare class="size-4 rounded-full bg-kumo-hairline" />
  <Flow.Node bare class="rounded-lg bg-kumo-contrast px-3 py-2 font-medium text-kumo-inverse">
    my-worker
  </Flow.Node>
</Flow>
