<script lang="ts">
  import DesktopIcon from 'phosphor-svelte/lib/DesktopIcon';
  import MoonIcon from 'phosphor-svelte/lib/MoonIcon';
  import SunIcon from 'phosphor-svelte/lib/SunIcon';
  import { onMount, type Component } from 'svelte';
  import { Button } from '$lib/components/button';
  import { DropdownMenu } from '$lib/components/dropdown-menu';

  type ThemePreference = 'light' | 'dark' | 'system';

  const themeOptions: Array<{ value: ThemePreference; label: string; icon: Component }> = [
    { value: 'light', label: 'Light', icon: SunIcon },
    { value: 'dark', label: 'Dark', icon: MoonIcon },
    { value: 'system', label: 'System', icon: DesktopIcon }
  ];

  function isThemePreference(value: string | null): value is ThemePreference {
    return value === 'light' || value === 'dark' || value === 'system';
  }

  let theme = $state<ThemePreference>('system');
  let mounted = $state(false);

  onMount(() => {
    mounted = true;
    const stored = localStorage.getItem('theme');
    theme = isThemePreference(stored) ? stored : 'system';

    const handleThemeChange = (event: Event) => {
      const nextTheme = (event as CustomEvent<{ theme?: string }>).detail?.theme ?? null;
      if (isThemePreference(nextTheme)) theme = nextTheme;
    };

    window.addEventListener('kumo:theme-change', handleThemeChange);
    return () => window.removeEventListener('kumo:theme-change', handleThemeChange);
  });

  function selectTheme(nextTheme: string) {
    if (!isThemePreference(nextTheme)) return;

    const resolvedTheme =
      nextTheme === 'system'
        ? window.matchMedia('(prefers-color-scheme: dark)').matches
          ? 'dark'
          : 'light'
        : nextTheme;

    theme = nextTheme;
    localStorage.setItem('theme', nextTheme);
    document.documentElement.setAttribute('data-mode', resolvedTheme);
    window.dispatchEvent(
      new CustomEvent('kumo:theme-change', { detail: { theme: nextTheme, resolvedTheme } })
    );
  }
</script>

{#snippet themeTrigger({ props }: { props: Record<string, unknown> })}
  <Button
    {...props}
    variant="ghost"
    shape="square"
    aria-label={mounted ? `Select theme, current theme is ${theme}` : 'Select theme'}
  >
    {#if !mounted || theme === 'system'}
      <DesktopIcon size={20} />
    {:else if theme === 'dark'}
      <MoonIcon size={20} />
    {:else}
      <SunIcon size={20} />
    {/if}
  </Button>
{/snippet}

<DropdownMenu>
  <DropdownMenu.Trigger child={themeTrigger} />
  <DropdownMenu.Content align="end">
    <DropdownMenu.RadioGroup value={theme} onValueChange={selectTheme}>
      <DropdownMenu.Label>Theme</DropdownMenu.Label>
      {#each themeOptions as option}
        <DropdownMenu.RadioItem value={option.value} icon={option.icon}>
          {option.label}
          <DropdownMenu.RadioItemIndicator />
        </DropdownMenu.RadioItem>
      {/each}
    </DropdownMenu.RadioGroup>
  </DropdownMenu.Content>
</DropdownMenu>
