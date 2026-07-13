<script lang="ts">
  import { Code } from 'kumo-svelte/components/code';
  import { Surface } from 'kumo-svelte/components/surface';
  import { ResourceListPage } from '../../../blocks/resource-list';
  import Database from 'phosphor-svelte/lib/Database';
</script>

{#snippet usage()}
  <Surface class="p-4">
    <h3 class="mb-2 font-semibold">Usage Example</h3>
    <Code
      lang="ts"
      code={`// Read from KV
const value = await KV.get('key');

// Write to KV
await KV.put('key', 'value');`}
    />
  </Surface>
{/snippet}

{#snippet additionalContent()}
  <Surface class="p-4">
    <h3 class="mb-2 font-semibold">Learn More</h3>
    <p class="text-sm text-kumo-subtle">
      Check out our documentation to learn more about KV storage.
    </p>
  </Surface>
{/snippet}

<ResourceListPage
  title="KV Namespaces"
  description="Store key-value data globally with low-latency access"
  icon={Database}
  {usage}
  {additionalContent}
>
  <div class="space-y-4">
    <Surface class="p-6">
      <h4 class="mb-2 font-semibold">production-kv</h4>
      <p class="text-sm text-kumo-subtle">Created 2 days ago</p>
    </Surface>
    <Surface class="p-6">
      <h4 class="mb-2 font-semibold">staging-kv</h4>
      <p class="text-sm text-kumo-subtle">Created 1 week ago</p>
    </Surface>
  </div>
</ResourceListPage>
