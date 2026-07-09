<script lang="ts">
  import { Breadcrumbs } from 'kumo-svelte/components/breadcrumbs';
  import { PageHeader } from '../../../blocks/page-header';
  import Gear from 'phosphor-svelte/lib/Gear';
  import House from 'phosphor-svelte/lib/House';
</script>

{#snippet breadcrumbs()}
  <Breadcrumbs>
    <Breadcrumbs.Link icon={House} href="#">Home</Breadcrumbs.Link>
    <Breadcrumbs.Separator />
    <Breadcrumbs.Current icon={Gear}>Settings</Breadcrumbs.Current>
  </Breadcrumbs>
{/snippet}

<PageHeader breadcrumbContent={breadcrumbs} />
