<script lang="ts">
  import '../lib/styles.css';
  import SidebarNav from '$lib/docs/SidebarNav.svelte';
  import { TooltipProvider } from '$lib/components/tooltip';
</script>

<svelte:head>
  <title>Kumo Svelte</title>
  <meta name="description" content="Kumo - a modern component library" />
  <meta name="kumo-version" content={__KUMO_VERSION__} />
  <meta name="docs-version" content={__DOCS_VERSION__} />
  <meta name="build-date" content={__BUILD_DATE__} />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="color-scheme" content="light dark" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=optional" />
  <script>
    (function () {
      const stored = localStorage.getItem('theme');
      if (stored) {
        document.documentElement.setAttribute('data-mode', stored);
      } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.documentElement.setAttribute('data-mode', 'dark');
      }
    })();
  </script>
</svelte:head>

<TooltipProvider>
  <div class="isolate min-h-screen bg-kumo-canvas text-kumo-default">
    <SidebarNav />
    <div id="main-content" class="main-content mt-12 md:mt-0 md:ml-12 transition-[margin] duration-300">
      <slot />
    </div>
  </div>
</TooltipProvider>

<style>
  @media (min-width: 768px) {
    :global(body:has(aside[data-sidebar-open='true']) .main-content) {
      margin-left: 304px;
    }

    :global(body:has(aside[data-sidebar-open='false']) .main-content) {
      margin-left: 48px;
    }
  }
</style>
