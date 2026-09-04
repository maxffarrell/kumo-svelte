<script lang="ts">
  import BookOpen from 'phosphor-svelte/lib/BookOpen';
  import DownloadSimple from 'phosphor-svelte/lib/DownloadSimple';
  import { Toolbar } from 'kumo-svelte/components/toolbar';
</script>

<Toolbar>
  <Toolbar.Link href="/components/button" icon={BookOpen}>Button documentation</Toolbar.Link>
  <Toolbar.Button icon={DownloadSimple}>Download</Toolbar.Button>
</Toolbar>
