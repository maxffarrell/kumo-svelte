<script lang="ts">
  import { RadioGroup, RadioItem } from '$lib';

  const ThemeType = {
    dark: 'dark',
    light: 'light',
    system: 'system'
  } as const;
  type ThemeType = (typeof ThemeType)[keyof typeof ThemeType];

  let pageSize = $state<number>(10);
  let theme = $state<ThemeType>(ThemeType.system);
</script>

<div class="grid grid-cols-2 gap-6">
  <RadioGroup legend="Items per page" bind:value={pageSize}>
    <RadioItem label="10" value={10} />
    <RadioItem label="25" value={25} />
    <RadioItem label="50" value={50} />
  </RadioGroup>
  <RadioGroup legend="Theme" bind:value={theme}>
    <RadioItem label="Light" value={ThemeType.light} />
    <RadioItem label="Dark" value={ThemeType.dark} />
    <RadioItem label="System" value={ThemeType.system} />
  </RadioGroup>
</div>
