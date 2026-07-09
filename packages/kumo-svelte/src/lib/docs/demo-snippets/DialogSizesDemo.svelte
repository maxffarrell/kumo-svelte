<script lang="ts">
  import { X } from 'phosphor-svelte';
  import { Button, Dialog } from 'kumo-svelte';

  const sizes = [
    { size: 'sm', label: 'Small', width: '288px' },
    { size: 'base', label: 'Base', width: '384px' },
    { size: 'lg', label: 'Large', width: '512px' },
    { size: 'xl', label: 'Extra Large', width: '768px' }
  ] as const;

  let openBySize = $state<Record<(typeof sizes)[number]['size'], boolean>>({
    sm: false,
    base: false,
    lg: false,
    xl: false
  });
</script>

<div class="flex flex-wrap gap-2">
  {#each sizes as { size, label, width } (size)}
    <Dialog bind:open={openBySize[size]} size={size} class="p-8">
      {#snippet trigger(props)}
        <Button variant="secondary" {...props}>{label} ({width})</Button>
      {/snippet}

      <div class="mb-4 flex items-start justify-between gap-4">
        <h2 class="text-2xl font-semibold">{label} Dialog</h2>
        <Button variant="secondary" shape="square" aria-label="Close" onclick={() => (openBySize[size] = false)}>
          <X />
        </Button>
      </div>
      <p class="text-kumo-subtle">
        This <code>size="{size}"</code> dialog should stay at {width} wide regardless of the content below.
      </p>
      <div class="mt-4 overflow-auto rounded-md border border-kumo-line">
        <table class="w-max text-sm">
          <thead class="bg-kumo-elevated text-left">
            <tr>
              <th class="px-3 py-2">Resource</th>
              <th class="px-3 py-2">Region</th>
              <th class="px-3 py-2">Status</th>
              <th class="px-3 py-2">Latency</th>
              <th class="px-3 py-2">Requests</th>
              <th class="px-3 py-2">Last Deployed</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-kumo-hairline">
            <tr>
              <td class="px-3 py-2">api-gateway-prod</td>
              <td class="px-3 py-2">us-east-1</td>
              <td class="px-3 py-2 text-kumo-success">Healthy</td>
              <td class="px-3 py-2">12ms</td>
              <td class="px-3 py-2">1,234,567</td>
              <td class="px-3 py-2">2026-06-23</td>
            </tr>
            <tr>
              <td class="px-3 py-2">worker-analytics</td>
              <td class="px-3 py-2">eu-west-1</td>
              <td class="px-3 py-2 text-kumo-warning">Degraded</td>
              <td class="px-3 py-2">89ms</td>
              <td class="px-3 py-2">456,789</td>
              <td class="px-3 py-2">2026-06-22</td>
            </tr>
          </tbody>
        </table>
      </div>
    </Dialog>
  {/each}
</div>
