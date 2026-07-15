<script lang="ts">
  import { Button } from '$lib/components/button';
  import Scenario from '$lib/vrt/Scenario.svelte';
  import { Gear } from 'phosphor-svelte';

  const variants = [
    'primary',
    'secondary',
    'ghost',
    'destructive',
    'secondary-destructive',
    'outline'
  ] as const;

  const sizes = ['xs', 'sm', 'base', 'lg'] as const;
</script>

{#each variants as variant (variant)}
  <Scenario id={`variant-${variant}`} label={variant}>
    <Button {variant}>Button</Button>
  </Scenario>
{/each}

{#each variants as variant (variant)}
  <Scenario id={`disabled-${variant}`} label={`${variant} disabled`}>
    <Button {variant} disabled>Button</Button>
  </Scenario>
{/each}

{#each sizes as size (size)}
  <Scenario id={`size-${size}`} label={`size ${size}`}>
    <Button variant="primary" {size}>Button</Button>
  </Scenario>
{/each}

<Scenario id="with-icon" label="with icon">
  <Button variant="secondary" icon={Gear}>Settings</Button>
</Scenario>

<Scenario id="loading" label="loading">
  <Button variant="primary" loading>Saving</Button>
</Scenario>

<Scenario id="shape-square" label="square">
  <Button variant="secondary" shape="square" icon={Gear} />
</Scenario>

<Scenario id="shape-circle" label="circle">
  <Button variant="secondary" shape="circle" icon={Gear} />
</Scenario>

<Scenario id="link" label="link button">
  <Button href="https://example.com" variant="secondary">Link</Button>
</Scenario>

<Scenario id="title-open" label="title tooltip" interact={[{ type: 'hover' }]} capture="page">
  <Button variant="secondary" title="Create a new Worker">Create Worker</Button>
</Scenario>

<!-- Interaction scenarios: the runner applies these before capturing. -->
<Scenario id="hover-secondary" label="hover: secondary" interact={[{ type: 'hover' }]}>
  <Button variant="secondary">Hover me</Button>
</Scenario>

<Scenario id="focus-secondary" label="focus: secondary" interact={[{ type: 'focus' }]}>
  <Button variant="secondary">Focus me</Button>
</Scenario>

<Scenario id="hover-primary" label="hover: primary" interact={[{ type: 'hover' }]}>
  <Button variant="primary">Hover me</Button>
</Scenario>

<Scenario id="focus-primary" label="focus: primary" interact={[{ type: 'focus' }]}>
  <Button variant="primary">Focus me</Button>
</Scenario>

<Scenario id="hover-outline" label="hover: outline" interact={[{ type: 'hover' }]}>
  <Button variant="outline">Hover me</Button>
</Scenario>
