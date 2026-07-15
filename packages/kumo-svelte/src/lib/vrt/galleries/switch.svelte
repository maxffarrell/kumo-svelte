<script lang="ts">
  import { Switch } from '$lib/components/switch';
  import Scenario from '$lib/vrt/Scenario.svelte';

  const sizes = ['sm', 'base', 'lg'] as const;
</script>

<Scenario id="off" label="off">
  <Switch aria-label="Off" checked={false} />
</Scenario>

<Scenario id="on" label="on">
  <Switch aria-label="On" checked />
</Scenario>

<Scenario id="disabled-off" label="disabled off">
  <Switch aria-label="Disabled off" checked={false} disabled />
</Scenario>

<Scenario id="disabled-on" label="disabled on">
  <Switch aria-label="Disabled on" checked disabled />
</Scenario>

{#each sizes as size (size)}
  <Scenario id={`size-${size}`} label={`size ${size}`}>
    <Switch aria-label={`Size ${size}`} {size} checked />
  </Scenario>
{/each}

<Scenario id="variant-neutral-off" label="neutral off">
  <Switch aria-label="Neutral off" variant="neutral" checked={false} />
</Scenario>

<Scenario id="variant-neutral-on" label="neutral on">
  <Switch aria-label="Neutral on" variant="neutral" checked />
</Scenario>

<Scenario id="with-label" label="with label">
  <Switch label="Enable notifications" checked />
</Scenario>

<Scenario id="label-first" label="label first">
  <Switch label="Dark mode" controlFirst={false} checked />
</Scenario>

<Scenario id="group" label="group">
  <Switch.Group legend="Notification settings">
    <Switch.Item label="Email notifications" checked />
    <Switch.Item label="SMS notifications" checked={false} />
  </Switch.Group>
</Scenario>

<Scenario id="group-disabled" label="group disabled">
  <Switch.Group legend="Disabled settings" disabled>
    <Switch.Item label="Email notifications" checked />
    <Switch.Item label="SMS notifications" checked={false} />
  </Switch.Group>
</Scenario>

<Scenario id="hover" label="hover" interact={[{ type: 'hover' }]}>
  <Switch aria-label="Hover me" checked />
</Scenario>

<Scenario id="focus" label="focus" interact={[{ type: 'focus' }]}>
  <Switch aria-label="Focus me" checked />
</Scenario>

<Scenario id="hover-neutral" label="hover neutral" interact={[{ type: 'hover' }]}>
  <Switch aria-label="Hover neutral" variant="neutral" checked />
</Scenario>

<Scenario id="focus-neutral" label="focus neutral" interact={[{ type: 'focus' }]}>
  <Switch aria-label="Focus neutral" variant="neutral" checked />
</Scenario>

<Scenario id="hover-with-label" label="hover with label" interact={[{ type: 'hover' }]}>
  <Switch label="Hover me" checked />
</Scenario>

<Scenario id="focus-with-label" label="focus with label" interact={[{ type: 'focus' }]}>
  <Switch label="Focus me" checked />
</Scenario>
