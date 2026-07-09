<script lang="ts">
  import { Breadcrumbs } from 'kumo-svelte/components/breadcrumbs';
  import { Button } from 'kumo-svelte/components/button';
  import { PageHeader } from '../../../blocks/page-header';
  import Plus from 'phosphor-svelte/lib/Plus';
</script>

{#snippet breadcrumbs()}
  <Breadcrumbs>
    <Breadcrumbs.Link href="#">Home</Breadcrumbs.Link>
    <Breadcrumbs.Separator />
    <Breadcrumbs.Link href="#">Products</Breadcrumbs.Link>
    <Breadcrumbs.Separator />
    <Breadcrumbs.Current>Page title</Breadcrumbs.Current>
  </Breadcrumbs>
{/snippet}

<PageHeader
  breadcrumbContent={breadcrumbs}
  title="Page title"
  description="Action-led, value-oriented description of what this page does."
  tabs={[
    { label: 'Overview', value: 'overview' },
    { label: 'Analytics', value: 'analytics' },
    { label: 'Settings', value: 'settings' }
  ]}
  defaultTab="overview"
>
  <Button variant="outline" size="sm">Export</Button>
  <Button variant="primary" size="sm" icon={Plus}>New Item</Button>
</PageHeader>
