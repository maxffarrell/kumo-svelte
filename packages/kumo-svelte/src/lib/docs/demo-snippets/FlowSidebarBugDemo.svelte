<script lang="ts">
  import { Flow } from '$lib';
</script>

<div class="flex min-h-24 w-full items-center justify-center">

      <Flow>
        <Flow.Node>HTTP Request</Flow.Node>
        <Flow.Parallel>
          <Flow.Node>Auth Check</Flow.Node>
          <Flow.Node>Rate Limit</Flow.Node>
          <Flow.Node>Cache Lookup</Flow.Node>
        </Flow.Parallel>
        <Flow.Node>Route Handler</Flow.Node>
      </Flow>
    
</div>
