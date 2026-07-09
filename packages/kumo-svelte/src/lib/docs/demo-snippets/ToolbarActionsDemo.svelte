<script lang="ts">
  import DownloadSimple from 'phosphor-svelte/lib/DownloadSimple';
  import UploadSimple from 'phosphor-svelte/lib/UploadSimple';
  import { Toolbar } from 'kumo-svelte/components/toolbar';
</script>

<Toolbar>
  <Toolbar.Button icon={UploadSimple}>Upload</Toolbar.Button>
  <Toolbar.Button icon={DownloadSimple}>Download</Toolbar.Button>
</Toolbar>
