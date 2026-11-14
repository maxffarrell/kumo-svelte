<script lang="ts">
  import Header from '#lib/docs/Header.svelte';
  import HomeGrid from '#lib/docs/HomeGrid.svelte';
</script>

<div class="flex flex-col">
  <Header />
  <main class="flex grow flex-col lg:pr-12">
    <span id="introduction" class="sr-only">Introduction</span>
    <span id="installation" class="sr-only">Installation</span>
    <span id="usage" class="sr-only">Usage</span>
    <div class="mx-auto w-full grow lg:border-r lg:border-kumo-hairline">
      <HomeGrid />
    </div>
  </main>
</div>
