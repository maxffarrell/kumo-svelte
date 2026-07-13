<script lang="ts">
  import MoonIcon from 'phosphor-svelte/lib/MoonIcon';
  import SunIcon from 'phosphor-svelte/lib/SunIcon';
  import { onMount } from 'svelte';
  import { Button } from '$lib/components/button';

  let theme = $state<'light' | 'dark'>('light');
  let mounted = $state(false);

  onMount(() => {
    mounted = true;
    const stored = localStorage.getItem('theme');
    if (stored === 'dark' || stored === 'light') {
      theme = stored;
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      theme = 'dark';
    }
  });

  function toggleTheme() {
    const next = theme === 'light' ? 'dark' : 'light';
    theme = next;
    localStorage.setItem('theme', next);
    document.documentElement.setAttribute('data-mode', next);
  }
</script>

<Button
  variant="ghost"
  shape="square"
  aria-label={mounted ? `Switch to ${theme === 'light' ? 'dark' : 'light'} mode` : 'Toggle theme'}
  onclick={toggleTheme}
>
  {#if mounted && theme === 'dark'}
    <SunIcon size={20} />
  {:else}
    <MoonIcon size={20} />
  {/if}
</Button>
