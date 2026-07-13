<script lang="ts">
  import { Breadcrumbs } from 'kumo-svelte/components/breadcrumbs';
  import { Button } from 'kumo-svelte/components/button';
  import { PageHeader } from '../../../blocks/page-header';
  import Code from 'phosphor-svelte/lib/Code';
  import Globe from 'phosphor-svelte/lib/Globe';
  import House from 'phosphor-svelte/lib/House';

  let activeTab = $state('overview');
</script>

{#snippet breadcrumbs()}
  <Breadcrumbs>
    <Breadcrumbs.Link icon={House} href="#">Workers & Pages</Breadcrumbs.Link>
    <Breadcrumbs.Separator />
    <Breadcrumbs.Current>cloudflare-dev-platform</Breadcrumbs.Current>
  </Breadcrumbs>
{/snippet}

<PageHeader
  class="w-full"
  breadcrumbContent={breadcrumbs}
  tabs={[
    { label: 'Overview', value: 'overview' },
    { label: 'Metrics', value: 'metrics' },
    { label: 'Deployments', value: 'deployments' },
    { label: 'Bindings', value: 'bindings' },
    { label: 'Observability', value: 'observability' },
    { label: 'Settings', value: 'settings' }
  ]}
  defaultTab="overview"
  bind:activeTab
>
  <Button icon={Code} class="h-8">Edit code</Button>
  <Button icon={Globe} variant="primary" class="h-8">Visit</Button>
</PageHeader>
