<script lang="ts">
  import { DownloadSimple, UploadSimple } from 'phosphor-svelte';
  import { Toolbar } from 'kumo-svelte';
</script>

<Toolbar>
  <Toolbar.Button icon={UploadSimple}>Upload</Toolbar.Button>
  <Toolbar.Button icon={DownloadSimple}>Download</Toolbar.Button>
</Toolbar>
