<script lang="ts">
  import { KumoLocaleProvider } from 'kumo-svelte';
  import { Breadcrumbs } from 'kumo-svelte/components/breadcrumbs';
</script>

<div dir="rtl" lang="ar">
  <KumoLocaleProvider
    translations={{
      breadcrumbs: {
        label: 'مسار التنقل',
        copy: 'نسخ',
        copyTooltip: 'انقر للنسخ'
      }
    }}
  >
    <Breadcrumbs>
      <Breadcrumbs.Link href="/">الرئيسية</Breadcrumbs.Link>
      <Breadcrumbs.Separator />
      <Breadcrumbs.Current>المستندات</Breadcrumbs.Current>
      <Breadcrumbs.Clipboard text="/components/breadcrumbs" />
    </Breadcrumbs>
  </KumoLocaleProvider>
</div>
