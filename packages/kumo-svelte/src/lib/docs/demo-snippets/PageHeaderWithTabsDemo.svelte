<script lang="ts">
  import { Breadcrumbs } from 'kumo-svelte/components/breadcrumbs';
  import { PageHeader } from '../../../blocks/page-header';
</script>

{#snippet breadcrumbs()}
  <Breadcrumbs>
    <Breadcrumbs.Link href="#">Home</Breadcrumbs.Link>
    <Breadcrumbs.Separator />
    <Breadcrumbs.Current>Settings</Breadcrumbs.Current>
  </Breadcrumbs>
{/snippet}

<PageHeader
  breadcrumbContent={breadcrumbs}
  tabs={[
    { label: 'General', value: 'general' },
    { label: 'Security', value: 'security' },
    { label: 'Notifications', value: 'notifications' }
  ]}
  defaultTab="general"
/>
