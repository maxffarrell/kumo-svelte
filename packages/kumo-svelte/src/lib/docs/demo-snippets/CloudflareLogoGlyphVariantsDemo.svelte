<script lang="ts">
  import { CloudflareLogo } from 'kumo-svelte/components/cloudflare-logo';
</script>

<div class="flex flex-wrap items-center gap-8">
  <CloudflareLogo variant="glyph" class="w-12" color="color" />
  <div class="rounded-lg bg-white p-4">
    <CloudflareLogo variant="glyph" class="w-12" color="black" />
  </div>
  <div class="rounded-lg bg-black p-4">
    <CloudflareLogo variant="glyph" class="w-12" color="white" />
  </div>
</div>
