<script lang="ts">
  import { Breadcrumbs } from 'kumo-svelte/components/breadcrumbs';
  import { PageHeader } from '../../../blocks/page-header';
</script>

{#snippet breadcrumbs()}
  <Breadcrumbs>
    <Breadcrumbs.Link href="#">Home</Breadcrumbs.Link>
    <Breadcrumbs.Separator />
    <Breadcrumbs.Current>Dashboard</Breadcrumbs.Current>
  </Breadcrumbs>
{/snippet}

<PageHeader breadcrumbContent={breadcrumbs} />
