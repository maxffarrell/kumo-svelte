<script lang="ts">
  import { CloudflareLogo } from 'kumo-svelte/components/cloudflare-logo';
</script>

<div class="flex flex-wrap items-center gap-8">
  <CloudflareLogo class="w-28" color="color" />
  <div class="rounded-lg bg-white p-4">
    <CloudflareLogo class="w-28" color="black" />
  </div>
  <div class="rounded-lg bg-black p-4">
    <CloudflareLogo class="w-28" color="white" />
  </div>
</div>
