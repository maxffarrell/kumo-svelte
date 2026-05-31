<script lang="ts">
  import { getSidebarContext } from '$lib/components/sidebar/context';

  const sidebar = getSidebarContext('StateReader');
</script>

<div
  data-testid="state-reader"
  data-state={sidebar.state}
  data-open={String(sidebar.open)}
  data-peeking={String(sidebar.isPeeking)}
></div>
