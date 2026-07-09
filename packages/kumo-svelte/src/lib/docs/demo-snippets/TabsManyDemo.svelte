<script lang="ts">
  import { Tabs } from 'kumo-svelte/components/tabs';

  const items = [
    { value: 'overview', label: 'Overview' },
    { value: 'analytics', label: 'Analytics' },
    { value: 'reports', label: 'Reports' },
    { value: 'notifications', label: 'Notifications' },
    { value: 'settings', label: 'Settings' },
    { value: 'billing', label: 'Billing' },
    { value: 'security', label: 'Security' },
    { value: 'integrations', label: 'Integrations' }
  ];
</script>

<div class="w-full max-w-md">
  <Tabs {items} value="overview" />
</div>
