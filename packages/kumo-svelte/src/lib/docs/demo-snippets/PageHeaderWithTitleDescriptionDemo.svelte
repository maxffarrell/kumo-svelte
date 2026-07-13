<script lang="ts">
  import { Breadcrumbs } from 'kumo-svelte/components/breadcrumbs';
  import { PageHeader } from '../../../blocks/page-header';
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
  description="Action-led, value-oriented description of what this page does. Optional second sentence with use cases or prerequisites."
/>
