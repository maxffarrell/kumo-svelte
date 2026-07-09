<script lang="ts">
  import FolderOpen from 'phosphor-svelte/lib/FolderOpen';
  import { Empty } from 'kumo-svelte/components/empty';
</script>

<Empty
  title="No projects found"
  description="Get started by creating your first project using the command below."
  commandLine="npm create kumo-project"
>
  {#snippet icon()}<FolderOpen class="size-12 text-kumo-inactive" />{/snippet}
</Empty>
