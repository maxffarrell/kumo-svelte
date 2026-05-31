<script lang="ts">
  import { CodeHighlighted } from 'kumo-svelte';
</script>

<div class="grid gap-4 md:grid-cols-2">
  <CodeHighlighted
    code={`diff --git a/worker.ts b/worker.ts
+export default {
+  fetch(request) {
+    return new Response('Ready');
+  }
+}`}
    lang="diff"
  />
  <CodeHighlighted
    code={`query WorkerDeployments($accountTag: string!) {
  viewer {
    accounts(filter: { accountTag: $accountTag }) {
      workersScripts {
        scriptName
      }
    }
  }
}`}
    lang="graphql"
  />
</div>
