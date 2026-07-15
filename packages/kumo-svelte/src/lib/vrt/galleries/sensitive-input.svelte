<script lang="ts">
  import { SensitiveInput } from '$lib/components/sensitive-input';
  import Scenario from '$lib/vrt/Scenario.svelte';

  const sizes = ['xs', 'sm', 'base', 'lg'] as const;
  const secret = 'sk_live_abc123xyz789';
</script>

<Scenario id="masked-default" label="masked (default)">
  <SensitiveInput aria-label="API Key" defaultValue={secret} class="w-[280px]" />
</Scenario>

<Scenario
  id="revealed"
  label="revealed"
  interact={[{ type: 'click', selector: '[data-kumo-part="masked-container"]' }]}
>
  <SensitiveInput aria-label="API Key" defaultValue={secret} class="w-[280px]" />
</Scenario>

{#each sizes as size (size)}
  <Scenario id={`size-${size}`} label={`size ${size}`}>
    <SensitiveInput aria-label="API Key" {size} defaultValue={secret} class="w-[280px]" />
  </Scenario>
{/each}

<Scenario id="error" label="error">
  <SensitiveInput
    aria-label="API Key"
    defaultValue={secret}
    error="Invalid API key"
    class="w-[280px]"
  />
</Scenario>

<Scenario id="disabled" label="disabled">
  <SensitiveInput aria-label="API Key" defaultValue={secret} disabled class="w-[280px]" />
</Scenario>

<Scenario id="with-label" label="with label">
  <SensitiveInput label="API Key" defaultValue={secret} class="w-[280px]" />
</Scenario>

<Scenario id="copy-control" label="copy control" interact={[{ type: 'hover' }]}>
  <SensitiveInput aria-label="API Key" defaultValue={secret} class="w-[280px]" />
</Scenario>

<Scenario id="focus" label="focus" interact={[{ type: 'focus' }]}>
  <SensitiveInput aria-label="API Key" defaultValue={secret} class="w-[280px]" />
</Scenario>
