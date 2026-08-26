<script lang="ts">
  import { InputGroup } from '$lib/components/input-group';
  import { Loader } from '$lib/components/loader';
  import Scenario from '$lib/vrt/Scenario.svelte';
  import { EnvelopeSimple, MagnifyingGlass } from 'phosphor-svelte';

  const sizes = ['xs', 'sm', 'base', 'lg'] as const;
</script>

<Scenario id="default" label="default">
  <InputGroup class="w-[280px]">
    <InputGroup.Input placeholder="Search..." aria-label="Search" />
  </InputGroup>
</Scenario>

<Scenario id="with-label" label="with label">
  <InputGroup label="Email" class="w-[280px]">
    <InputGroup.Input placeholder="you@example.com" />
  </InputGroup>
</Scenario>

<Scenario id="with-icon-addon" label="icon addon">
  <InputGroup class="w-[280px]">
    <InputGroup.Addon>
      <EnvelopeSimple aria-hidden="true" />
    </InputGroup.Addon>
    <InputGroup.Input placeholder="you@example.com" aria-label="Email" />
  </InputGroup>
</Scenario>

<Scenario id="with-suffix" label="suffix">
  <InputGroup class="w-[280px]">
    <InputGroup.Input placeholder="my-worker" aria-label="Worker name" />
    <InputGroup.Suffix>.workers.dev</InputGroup.Suffix>
  </InputGroup>
</Scenario>

<Scenario id="with-text-addon" label="text addon">
  <InputGroup class="w-[280px]">
    <InputGroup.Addon>https://</InputGroup.Addon>
    <InputGroup.Input placeholder="example.com" aria-label="Domain" />
  </InputGroup>
</Scenario>

<Scenario id="with-kbd" label="kbd hint">
  <InputGroup class="w-[280px]">
    <InputGroup.Addon>
      <MagnifyingGlass aria-hidden="true" />
    </InputGroup.Addon>
    <InputGroup.Input placeholder="Search..." aria-label="Search" />
    <InputGroup.Addon align="end">
      <kbd class="rounded-sm bg-kumo-overlay px-1.5 py-0.5 text-xs text-kumo-subtle">⌘K</kbd>
    </InputGroup.Addon>
  </InputGroup>
</Scenario>

<Scenario id="with-loading" label="loading">
  <InputGroup class="w-[280px]">
    <InputGroup.Addon>
      <Loader size={16} />
    </InputGroup.Addon>
    <InputGroup.Input placeholder="Loading..." aria-label="Search" disabled />
  </InputGroup>
</Scenario>

<Scenario id="with-button" label="with button">
  <InputGroup class="w-[280px]">
    <InputGroup.Input placeholder="Search..." aria-label="Search" />
    <InputGroup.Button aria-label="Search">
      <MagnifyingGlass aria-hidden="true" />
    </InputGroup.Button>
  </InputGroup>
</Scenario>

<Scenario id="individual-mode" label="individual mode">
  <InputGroup focusMode="individual" class="w-[280px]">
    <InputGroup.Input placeholder="Page" aria-label="Page" value="1" />
    <InputGroup.Button variant="secondary">Go</InputGroup.Button>
  </InputGroup>
</Scenario>

<Scenario id="hybrid-mode" label="hybrid mode">
  <InputGroup focusMode="hybrid" class="w-[320px]">
    <InputGroup.Addon>
      <EnvelopeSimple aria-hidden="true" />
    </InputGroup.Addon>
    <InputGroup.Input placeholder="you@example.com" aria-label="Email" />
    <InputGroup.Button variant="secondary">Send</InputGroup.Button>
  </InputGroup>
</Scenario>

<Scenario id="error" label="error">
  <InputGroup label="Email" error="Invalid email" class="w-[280px]">
    <InputGroup.Addon>
      <EnvelopeSimple aria-hidden="true" />
    </InputGroup.Addon>
    <InputGroup.Input placeholder="you@example.com" />
  </InputGroup>
</Scenario>

<Scenario id="disabled" label="disabled">
  <InputGroup disabled class="w-[280px]">
    <InputGroup.Addon>
      <EnvelopeSimple aria-hidden="true" />
    </InputGroup.Addon>
    <InputGroup.Input placeholder="you@example.com" aria-label="Email" />
  </InputGroup>
</Scenario>

{#each sizes as size (size)}
  <Scenario id={`size-${size}`} label={`size ${size}`}>
    <InputGroup {size} class="w-[280px]">
      <InputGroup.Addon>
        <EnvelopeSimple aria-hidden="true" />
      </InputGroup.Addon>
      <InputGroup.Input placeholder="you@example.com" aria-label="Email" />
    </InputGroup>
  </Scenario>
{/each}

<Scenario id="focus" label="focus" interact={[{ type: 'focus' }]}>
  <InputGroup class="w-[280px]">
    <InputGroup.Addon>
      <EnvelopeSimple aria-hidden="true" />
    </InputGroup.Addon>
    <InputGroup.Input placeholder="you@example.com" aria-label="Email" />
  </InputGroup>
</Scenario>

<Scenario id="focus-individual" label="focus individual" interact={[{ type: 'focus' }]}>
  <InputGroup focusMode="individual" class="w-[280px]">
    <InputGroup.Input placeholder="Page" aria-label="Page" />
    <InputGroup.Button variant="secondary">Go</InputGroup.Button>
  </InputGroup>
</Scenario>
