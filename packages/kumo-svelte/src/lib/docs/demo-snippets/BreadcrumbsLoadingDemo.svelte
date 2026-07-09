<script lang="ts">
  import { Breadcrumbs } from 'kumo-svelte/components/breadcrumbs';
  import House from 'phosphor-svelte/lib/House';
</script>

<Breadcrumbs>
  <Breadcrumbs.Link href="#" icon={House}>Home</Breadcrumbs.Link>
  <Breadcrumbs.Separator />
  <Breadcrumbs.Link href="#">Docs</Breadcrumbs.Link>
  <Breadcrumbs.Separator />
  <Breadcrumbs.Current loading />
</Breadcrumbs>
