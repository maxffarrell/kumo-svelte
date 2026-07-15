<script lang="ts">
  import { ClipboardText } from '$lib/components/clipboard-text';
  import Scenario from '$lib/vrt/Scenario.svelte';

  const sizes = ['sm', 'base', 'lg'] as const;
</script>

<Scenario id="default" label="default">
  <ClipboardText text="0c239dd2-8f4a-4b2e-9c1d-3a7b5e6f8091" />
</Scenario>

{#each sizes as size (size)}
  <Scenario id={`size-${size}`} label={`size ${size}`}>
    <ClipboardText text="npm install @cloudflare/kumo" {size} />
  </Scenario>
{/each}

<Scenario id="with-tooltip" label="with tooltip">
  <ClipboardText
    text="sk_live_abc123"
    tooltip={{ text: 'Copy API key', copiedText: 'Copied!', side: 'top' }}
  />
</Scenario>

<Scenario id="click-copied" label="click: copied state" interact={[{ type: 'click' }]}>
  <ClipboardText text="click-to-copy-token" />
</Scenario>

<Scenario id="click-copied-tooltip" label="click: copied with tooltip" interact={[{ type: 'click' }]}>
  <ClipboardText
    text="click-to-copy-token"
    tooltip={{ text: 'Copy', copiedText: 'Copied!', side: 'top' }}
  />
</Scenario>
