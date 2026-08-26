<script lang="ts">
  import { Button } from 'kumo-svelte/components/button';
  import { Tabs } from 'kumo-svelte/components/tabs';

  const baseItems = [
    { value: 'overview', label: 'Overview' },
    { value: 'metrics', label: 'Metrics' },
    { value: 'deployments', label: 'Deployments' },
    { value: 'observability', label: 'Observability' },
    { value: 'domains', label: 'Domains' },
    { value: 'access', label: 'Access' },
    { value: 'settings', label: 'Settings' }
  ];
  const extraItems = [
    { value: 'analytics', label: 'Analytics' },
    { value: 'logs', label: 'Logs' },
    { value: 'security', label: 'Security' }
  ];

  let showExtraItems = $state(true);
  const items = $derived(showExtraItems ? [...baseItems, ...extraItems] : baseItems);
</script>

<div class="w-full space-y-3">
  <div class="w-full max-w-[588px]">
    <Tabs {items} value="settings" />
  </div>
  <div class="flex items-center gap-3 text-sm text-kumo-subtle">
    <Button size="sm" onclick={() => (showExtraItems = !showExtraItems)}>Toggle extra tabs</Button>
    <span>{showExtraItems ? '10 tabs' : '7 tabs'}</span>
  </div>
</div>
