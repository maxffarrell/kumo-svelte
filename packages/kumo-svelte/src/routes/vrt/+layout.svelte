<script lang="ts">
  import '@fontsource-variable/inter';
  import '$lib/styles.css';
  import { page } from '$app/state';
  import type { Snippet } from 'svelte';
  import { TooltipProvider } from '$lib/components/tooltip';

  let { children }: { children: Snippet } = $props();

  // Dark mode is driven purely by the `?mode=dark` query param so the Playwright
  // runner can switch themes without any in-page UI.
  const mode = $derived(page.url.searchParams.get('mode') === 'dark' ? 'dark' : 'light');

  $effect(() => {
    const root = document.documentElement;
    if (mode === 'dark') root.setAttribute('data-mode', 'dark');
    else root.removeAttribute('data-mode');
    root.style.colorScheme = mode;
  });
</script>

<svelte:head>
  <title>Kumo Svelte VRT</title>
</svelte:head>

<div class="vr-root" data-vr-root data-mode-current={mode}>
  <TooltipProvider>
    {@render children()}
  </TooltipProvider>
</div>

<style>
  /* Freeze animations/transitions so screenshots are deterministic. Global so
     it also covers Bits-UI overlays that portal outside `.vr-root`. The VRT
     layout only mounts on `/vrt` routes, so this never affects the real app. */
  :global(*),
  :global(*::before),
  :global(*::after) {
    /* `animation: none` (not just 0s duration) so infinite spinners like the
       Loader settle to a fixed frame and screenshots are stable. */
    animation: none !important;
    transition: none !important;
    caret-color: transparent !important;
  }

  .vr-root {
    min-height: 100vh;
    background: var(--color-kumo-canvas);
    color: var(--text-color-kumo-default);
    font-family: 'Inter Variable', ui-sans-serif, system-ui, sans-serif;
  }
</style>
