<script lang="ts">
  import { Input } from '$lib';
</script>

<div class="flex min-h-24 w-full items-center justify-center">
<div class="flex w-full max-w-sm flex-col gap-4">
      <div class="space-y-1.5"><Input value="not a host" placeholder="example.com" invalid /><p class="text-sm text-kumo-danger">Please enter a valid hostname</p></div>
      <div class="space-y-1.5"><Input value="missing-slash" placeholder="/api/v1/users" invalid /><p class="text-sm text-kumo-danger">Path must start with /</p></div>
    </div>
</div>
