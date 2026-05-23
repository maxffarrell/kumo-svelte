<script lang="ts">
  import { Badge } from 'kumo-svelte';
</script>

<div class="flex flex-wrap items-center gap-2">
  <Badge variant="success" appearance="dot">Healthy</Badge>
  <Badge variant="warning" appearance="dot">Degraded</Badge>
  <Badge variant="error" appearance="dot">Down</Badge>
  <Badge variant="neutral" appearance="dot">Unknown</Badge>
</div>
