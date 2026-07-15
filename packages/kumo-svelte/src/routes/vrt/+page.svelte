<script lang="ts">
  import { gallerySlugs } from '$lib/vrt/registry';
</script>

<main style="padding: 2rem; max-width: 48rem; margin: 0 auto;">
  <h1 style="font-size: 1.25rem; font-weight: 600; margin-bottom: 1rem;">
    Kumo Svelte — VRT galleries
  </h1>
  <p style="color: var(--text-color-kumo-subtle); margin-bottom: 1.5rem;">
    Isolated component galleries for visual-regression capture. Append
    <code>?mode=dark</code> for dark mode.
  </p>
  <ul style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.5rem;">
    {#each gallerySlugs as slug (slug)}
      <li>
        <a href="/vrt/{slug}" style="color: var(--text-color-kumo-link); text-decoration: underline;">
          {slug}
        </a>
      </li>
    {/each}
  </ul>
</main>
