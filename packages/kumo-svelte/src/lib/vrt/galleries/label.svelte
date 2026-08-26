<script lang="ts">
  import { Label } from '$lib/components/label';
  import Scenario from '$lib/vrt/Scenario.svelte';
</script>

<Scenario id="default" label="default">
  <Label>Email</Label>
</Scenario>

<Scenario id="optional" label="show optional">
  <Label showOptional>Middle name</Label>
</Scenario>

<Scenario id="tooltip" label="with tooltip">
  <Label tooltip="We'll use this to send you updates">Email</Label>
</Scenario>

<Scenario id="html-for" label="htmlFor">
  <Label htmlFor="email-input">Email address</Label>
</Scenario>

<Scenario id="as-content" label="as content">
  <span class="m-0 text-base font-medium text-kumo-default">
    <Label asContent showOptional tooltip="Extra context">Field name</Label>
  </span>
</Scenario>

<Scenario id="custom-children" label="custom children">
  <Label>
    <span>Custom label with <strong>bold</strong> text</span>
  </Label>
</Scenario>
