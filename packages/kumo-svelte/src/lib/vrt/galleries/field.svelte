<script lang="ts">
  import { Checkbox } from '$lib/components/checkbox';
  import { Field } from '$lib/components/field';
  import { Input } from '$lib/components/input';
  import { Switch } from '$lib/components/switch';
  import Scenario from '$lib/vrt/Scenario.svelte';
</script>

<Scenario id="default" label="default">
  <Field label="Email" class="w-64">
    <Input placeholder="you@example.com" />
  </Field>
</Scenario>

<Scenario id="description" label="with description">
  <Field label="Phone" description="We'll only use this for account recovery." class="w-64">
    <Input placeholder="+1 555-0000" />
  </Field>
</Scenario>

<Scenario id="error" label="with error">
  <Field label="Username" error="Username is already taken" class="w-64">
    <Input placeholder="Choose a username" />
  </Field>
</Scenario>

<Scenario id="optional" label="optional">
  <Field label="Middle name" required={false} class="w-64">
    <Input placeholder="Optional" />
  </Field>
</Scenario>

<Scenario id="label-tooltip" label="label tooltip">
  <Field label="API token" labelTooltip="Create a token in the dashboard" class="w-64">
    <Input placeholder="Paste token" />
  </Field>
</Scenario>

<Scenario id="hide-label" label="hide label">
  <Field label="Hidden label" hideLabel class="w-64">
    <Input placeholder="Search" aria-label="Search" />
  </Field>
</Scenario>

<Scenario id="checkbox" label="checkbox layout">
  <Field label="Email notifications" class="w-64">
    <Checkbox aria-label="Email notifications" />
  </Field>
</Scenario>

<Scenario id="checkbox-control-first" label="checkbox control first">
  <Field label="Marketing emails" controlFirst class="w-64">
    <Checkbox aria-label="Marketing emails" />
  </Field>
</Scenario>

<Scenario id="switch" label="switch layout">
  <Field label="Dark mode" class="w-64">
    <Switch aria-label="Dark mode" />
  </Field>
</Scenario>

<Scenario id="switch-control-first" label="switch control first">
  <Field label="Beta features" controlFirst class="w-64">
    <Switch aria-label="Beta features" />
  </Field>
</Scenario>
