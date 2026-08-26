<script lang="ts">
  import { page } from '$app/state';
  import { loadGallery } from '$lib/vrt/registry';

  const slug = $derived(page.params.component);
  const gallery = $derived(loadGallery(slug));
</script>

<svelte:head>
  <title>{slug} — Kumo Svelte VRT</title>
</svelte:head>

{#await gallery}
  <main class="vr-page" data-vr-page={slug} data-vr-ready="false">
    <p>Loading {slug} gallery…</p>
  </main>
{:then Gallery}
  <main class="vr-page" data-vr-page={slug} data-vr-ready={Gallery ? 'true' : 'false'}>
    {#if Gallery}
      <h1 class="vr-page__title">{slug}</h1>
      <div class="vr-page__scenarios">
        <Gallery />
      </div>
    {:else}
      <h1 class="vr-page__title">Gallery not found</h1>
      <p>No visual-regression gallery exists for <code>{slug}</code>.</p>
    {/if}
  </main>
{/await}

<style>
  .vr-page {
    box-sizing: border-box;
    min-height: 100vh;
    padding: 2rem;
  }

  .vr-page__title {
    margin: 0 0 1.5rem;
    font-size: 1.25rem;
    font-weight: 600;
  }

  .vr-page__scenarios {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(16rem, max-content));
    align-items: start;
    gap: 2rem;
  }
</style>
