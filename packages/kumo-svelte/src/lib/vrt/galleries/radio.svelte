<script lang="ts">
  import { Radio } from '$lib/components/radio';
  import Scenario from '$lib/vrt/Scenario.svelte';
</script>

<Scenario id="unchecked" label="unchecked">
  <Radio.Group legend="Notification preference" value="sms">
    <Radio.Item label="Email" value="email" />
    <Radio.Item label="SMS" value="sms" />
    <Radio.Item label="Push" value="push" />
  </Radio.Group>
</Scenario>

<Scenario id="checked" label="checked">
  <Radio.Group legend="Notification preference" value="email">
    <Radio.Item label="Email" value="email" />
    <Radio.Item label="SMS" value="sms" />
    <Radio.Item label="Push" value="push" />
  </Radio.Group>
</Scenario>

<Scenario id="disabled-unchecked" label="disabled unchecked">
  <Radio.Group legend="Disabled group" disabled value="a">
    <Radio.Item label="Option A" value="a" />
    <Radio.Item label="Option B" value="b" />
  </Radio.Group>
</Scenario>

<Scenario id="disabled-checked" label="disabled checked">
  <Radio.Group legend="Disabled group" disabled value="b">
    <Radio.Item label="Option A" value="a" />
    <Radio.Item label="Option B" value="b" />
  </Radio.Group>
</Scenario>

<Scenario id="item-disabled" label="item disabled">
  <Radio.Group legend="Individual disabled" value="available">
    <Radio.Item label="Available" value="available" />
    <Radio.Item label="Unavailable" value="unavailable" disabled />
  </Radio.Group>
</Scenario>

<Scenario id="variant-error" label="error variant">
  <Radio.Group legend="Payment method" error="Please select a payment method">
    <Radio.Item label="Credit Card" value="card" variant="error" />
    <Radio.Item label="PayPal" value="paypal" variant="error" />
  </Radio.Group>
</Scenario>

<Scenario id="appearance-card" label="card appearance">
  <Radio.Group legend="Choose a plan" appearance="card" value="pro">
    <Radio.Item label="Free" description="For personal projects." value="free" />
    <Radio.Item label="Pro" description="For professional websites." value="pro" />
  </Radio.Group>
</Scenario>

<Scenario id="appearance-card-disabled" label="card disabled">
  <Radio.Group legend="Card disabled" appearance="card" disabled value="a">
    <Radio.Item label="Option A" description="Disabled option." value="a" />
    <Radio.Item label="Option B" description="Disabled option." value="b" />
  </Radio.Group>
</Scenario>

<Scenario id="control-position-end" label="control end">
  <Radio.Group legend="Preferences" controlPosition="end" value="a">
    <Radio.Item label="Label before radio" value="a" />
    <Radio.Item label="Another option" value="b" />
  </Radio.Group>
</Scenario>

<Scenario id="horizontal" label="horizontal group">
  <Radio.Group legend="Size" orientation="horizontal" value="md">
    <Radio.Item label="Small" value="sm" />
    <Radio.Item label="Medium" value="md" />
    <Radio.Item label="Large" value="lg" />
  </Radio.Group>
</Scenario>

<Scenario id="hover" label="hover" interact={[{ type: 'hover' }]}>
  <Radio.Group legend="Hover me" value="a">
    <Radio.Item label="Option A" value="a" />
    <Radio.Item label="Option B" value="b" />
  </Radio.Group>
</Scenario>

<Scenario id="focus" label="focus" interact={[{ type: 'focus' }]}>
  <Radio.Group legend="Focus me" value="a">
    <Radio.Item label="Option A" value="a" />
    <Radio.Item label="Option B" value="b" />
  </Radio.Group>
</Scenario>

<Scenario id="hover-card" label="hover card" interact={[{ type: 'hover' }]}>
  <Radio.Group legend="Hover card" appearance="card" value="free">
    <Radio.Item label="Free" description="Personal use." value="free" />
    <Radio.Item label="Pro" description="Professional use." value="pro" />
  </Radio.Group>
</Scenario>

<Scenario id="focus-card" label="focus card" interact={[{ type: 'focus' }]}>
  <Radio.Group legend="Focus card" appearance="card" value="free">
    <Radio.Item label="Free" description="Personal use." value="free" />
    <Radio.Item label="Pro" description="Professional use." value="pro" />
  </Radio.Group>
</Scenario>
