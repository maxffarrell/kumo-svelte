<script lang="ts">
  import { Flow } from 'kumo-svelte/components/flow';
  import { CodeHighlighted } from 'kumo-svelte/components/code';

  const code = `export default {
  async fetch(req: Request) {
    return new Response("ok");
  },
}`;
</script>

<Flow canvas={false} class="py-4">
  <Flow.Node>Receive Request</Flow.Node>
  <Flow.Node bare class="min-w-64 overflow-hidden rounded-lg bg-kumo-base ring ring-kumo-line">
    <div class="border-b border-kumo-line px-3 py-2 text-sm font-medium text-kumo-default">
      Handler
    </div>
    <CodeHighlighted {code} lang="typescript" />
  </Flow.Node>
  <Flow.Node>Return Response</Flow.Node>
</Flow>
