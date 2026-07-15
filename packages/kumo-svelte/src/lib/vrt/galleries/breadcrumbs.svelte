<script lang="ts">
  import { Breadcrumbs } from '$lib/components/breadcrumbs';
  import Scenario from '$lib/vrt/Scenario.svelte';
  import { House, BookOpen } from 'phosphor-svelte';

  const twoLevel = [
    { label: 'Home', href: '/' },
    { label: 'Dashboard' }
  ];

  const multiLevel = [
    { label: 'Home', href: '/' },
    { label: 'Products', href: '/products' },
    { label: 'Analytics', href: '/products/analytics' },
    { label: 'Reports' }
  ];

  const withIcons = [
    { label: 'Home', href: '/', icon: House },
    { label: 'Documentation', href: '/docs', icon: BookOpen },
    { label: 'Getting Started' }
  ];
</script>

<Scenario id="two-level" label="2-level">
  <Breadcrumbs items={twoLevel} />
</Scenario>

<Scenario id="multi-level" label="multi-level with separators">
  <Breadcrumbs items={multiLevel} />
</Scenario>

<Scenario id="current-page" label="current page">
  <Breadcrumbs>
    <Breadcrumbs.Link href="/">Home</Breadcrumbs.Link>
    <Breadcrumbs.Separator />
    <Breadcrumbs.Link href="/settings">Settings</Breadcrumbs.Link>
    <Breadcrumbs.Separator />
    <Breadcrumbs.Current>Profile</Breadcrumbs.Current>
  </Breadcrumbs>
</Scenario>

<Scenario id="with-icons" label="with icons">
  <Breadcrumbs items={withIcons} />
</Scenario>

<Scenario id="size-sm" label="size sm">
  <Breadcrumbs size="sm" items={multiLevel} />
</Scenario>

<Scenario id="loading-current" label="loading current">
  <Breadcrumbs>
    <Breadcrumbs.Link href="/">Home</Breadcrumbs.Link>
    <Breadcrumbs.Separator />
    <Breadcrumbs.Current loading>Loading…</Breadcrumbs.Current>
  </Breadcrumbs>
</Scenario>

<Scenario id="with-clipboard" label="with clipboard">
  <Breadcrumbs>
    <Breadcrumbs.Link href="/">Home</Breadcrumbs.Link>
    <Breadcrumbs.Separator />
    <Breadcrumbs.Link href="/products">Products</Breadcrumbs.Link>
    <Breadcrumbs.Separator />
    <Breadcrumbs.Link href="/products/analytics">Analytics</Breadcrumbs.Link>
    <Breadcrumbs.Separator />
    <Breadcrumbs.Current>Reports</Breadcrumbs.Current>
    <Breadcrumbs.Clipboard text="https://example.com/products/analytics/reports" />
  </Breadcrumbs>
</Scenario>
