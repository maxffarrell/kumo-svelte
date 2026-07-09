<script lang="ts">
  import { onMount } from 'svelte';
  import { ChartLegend, ChartPalette } from 'kumo-svelte/components/chart';
  import { getIsDarkMode } from './chart-color-demo-data';

  let isDarkMode = $state(false);

  onMount(() => {
    const update = () => {
      isDarkMode = getIsDarkMode();
    };
    const observer = new MutationObserver(update);

    update();
    [document.documentElement, document.body].forEach((node) => {
      observer.observe(node, { attributes: true, attributeFilter: ['data-mode', 'class'] });
    });

    const mediaQuery = window.matchMedia?.('(prefers-color-scheme: dark)');
    mediaQuery?.addEventListener('change', update);

    return () => {
      observer.disconnect();
      mediaQuery?.removeEventListener('change', update);
    };
  });
</script>

<div class="space-y-4">
  <h3 class="text-sm font-medium">Active State</h3>
  <div class="flex flex-wrap gap-4">
    <ChartLegend
      name="Requests"
      color={ChartPalette.semantic('Neutral', isDarkMode)}
      value="1,234"
      unit="req/s"
    />
    <ChartLegend
      name="Storage"
      color={ChartPalette.semantic('Attention', isDarkMode)}
      value="56"
      unit="GB"
    />
    <ChartLegend name="Warnings" color={ChartPalette.semantic('Warning', isDarkMode)} value="128" />
  </div>

  <h3 class="mt-12 text-sm font-medium">Inactive State</h3>
  <div class="flex flex-wrap gap-4">
    <ChartLegend
      name="Requests"
      color={ChartPalette.semantic('Neutral', isDarkMode)}
      value="1,234"
      unit="req/s"
      inactive
    />
    <ChartLegend
      name="Storage"
      color={ChartPalette.semantic('Attention', isDarkMode)}
      value="56"
      unit="GB"
      inactive
    />
    <ChartLegend
      name="Warnings"
      color={ChartPalette.semantic('Warning', isDarkMode)}
      value="128"
      inactive
    />
  </div>
</div>
