<script lang="ts">
  import { Checkbox } from '$lib/components/checkbox';
  import Scenario from '$lib/vrt/Scenario.svelte';
</script>

<Scenario id="unchecked" label="unchecked">
  <Checkbox aria-label="Unchecked" />
</Scenario>

<Scenario id="checked" label="checked">
  <Checkbox aria-label="Checked" checked />
</Scenario>

<Scenario id="indeterminate" label="indeterminate">
  <Checkbox aria-label="Indeterminate" indeterminate />
</Scenario>

<Scenario id="disabled-unchecked" label="disabled unchecked">
  <Checkbox aria-label="Disabled unchecked" disabled />
</Scenario>

<Scenario id="disabled-checked" label="disabled checked">
  <Checkbox aria-label="Disabled checked" checked disabled />
</Scenario>

<Scenario id="disabled-indeterminate" label="disabled indeterminate">
  <Checkbox aria-label="Disabled indeterminate" indeterminate disabled />
</Scenario>

<Scenario id="with-label" label="with label">
  <Checkbox label="Accept terms and conditions" />
</Scenario>

<Scenario id="with-label-control-last" label="label first">
  <Checkbox label="Enable notifications" controlFirst={false} />
</Scenario>

<Scenario id="variant-error" label="error variant">
  <Checkbox label="Required field" variant="error" />
</Scenario>

<Scenario id="variant-error-checked" label="error checked">
  <Checkbox label="Required field" variant="error" checked />
</Scenario>

<!-- Interaction scenarios -->
<Scenario id="hover" label="hover" interact={[{ type: 'hover' }]}>
  <Checkbox aria-label="Hover me" />
</Scenario>

<Scenario id="focus" label="focus" interact={[{ type: 'focus' }]}>
  <Checkbox aria-label="Focus me" />
</Scenario>

<Scenario id="hover-with-label" label="hover with label" interact={[{ type: 'hover' }]}>
  <Checkbox label="Hover me" />
</Scenario>

<Scenario id="focus-with-label" label="focus with label" interact={[{ type: 'focus' }]}>
  <Checkbox label="Focus me" />
</Scenario>

<Scenario id="click-toggle" label="click toggle" interact={[{ type: 'click' }]}>
  <Checkbox aria-label="Toggle me" />
</Scenario>
