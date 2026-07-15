<script lang="ts">
  import { Tabs } from '$lib/components/tabs';
  import Scenario from '$lib/vrt/Scenario.svelte';

  const basicItems = [
    { value: 'overview', label: 'Overview' },
    { value: 'settings', label: 'Settings' },
    { value: 'billing', label: 'Billing' }
  ];

  const manyItems = [
    { value: 'overview', label: 'Overview' },
    { value: 'analytics', label: 'Analytics' },
    { value: 'reports', label: 'Reports' },
    { value: 'notifications', label: 'Notifications' },
    { value: 'settings', label: 'Settings' },
    { value: 'billing', label: 'Billing' },
    { value: 'security', label: 'Security' },
    { value: 'integrations', label: 'Integrations' }
  ];

  let controlledValue = $state('tab2');
</script>

<Scenario id="segmented-default" label="segmented default">
  <Tabs variant="segmented" tabs={basicItems} value="settings" />
</Scenario>

<Scenario id="underline" label="underline">
  <Tabs variant="underline" tabs={basicItems} value="settings" />
</Scenario>

<Scenario id="segmented" label="segmented">
  <Tabs variant="segmented" tabs={basicItems} value="billing" />
</Scenario>

<Scenario id="size-sm" label="size sm">
  <Tabs variant="segmented" size="sm" tabs={basicItems} value="overview" />
</Scenario>

<Scenario id="many-overflow" label="many tabs overflow">
  <div class="w-full max-w-md">
    <Tabs variant="segmented" tabs={manyItems} value="integrations" />
  </div>
</Scenario>

<Scenario id="controlled" label="controlled selection">
  <Tabs
    variant="segmented"
    tabs={[
      { value: 'tab1', label: 'Tab 1' },
      { value: 'tab2', label: 'Tab 2' },
      { value: 'tab3', label: 'Tab 3' }
    ]}
    bind:value={controlledValue}
  />
</Scenario>
