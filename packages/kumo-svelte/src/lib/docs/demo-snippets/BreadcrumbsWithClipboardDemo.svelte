<script lang="ts">
  import { Breadcrumbs } from 'kumo-svelte/components/breadcrumbs';
</script>

<Breadcrumbs>
  <Breadcrumbs.Link href="#">Home</Breadcrumbs.Link>
  <Breadcrumbs.Separator />
  <Breadcrumbs.Current>Breadcrumbs</Breadcrumbs.Current>
  <Breadcrumbs.Clipboard text="#" />
</Breadcrumbs>
