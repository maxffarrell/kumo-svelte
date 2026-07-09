<script lang="ts">
  import { Breadcrumbs } from 'kumo-svelte/components/breadcrumbs';
  import { Button } from 'kumo-svelte/components/button';
  import { PageHeader } from '../../../blocks/page-header';
</script>

{#snippet breadcrumbs()}
  <Breadcrumbs>
    <Breadcrumbs.Link href="#">Home</Breadcrumbs.Link>
    <Breadcrumbs.Separator />
    <Breadcrumbs.Link href="#">Projects</Breadcrumbs.Link>
    <Breadcrumbs.Separator />
    <Breadcrumbs.Current>My Project</Breadcrumbs.Current>
  </Breadcrumbs>
{/snippet}

<PageHeader
  breadcrumbContent={breadcrumbs}
  tabs={[
    { label: 'Overview', value: 'overview' },
    { label: 'Settings', value: 'settings' }
  ]}
  defaultTab="overview"
>
  <Button variant="primary" size="base">Deploy</Button>
</PageHeader>
