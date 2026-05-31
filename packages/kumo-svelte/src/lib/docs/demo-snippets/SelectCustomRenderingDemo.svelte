<script lang="ts">
  import { Select } from '$lib';

  const languages = [
    { value: 'en', label: 'English', emoji: 'GB' },
    { value: 'fr', label: 'French', emoji: 'FR' },
    { value: 'de', label: 'German', emoji: 'DE' }
  ];

  let value = $state('en');
</script>

<div class="flex min-h-24 w-full items-center justify-center">
  <div class="w-full max-w-xs space-y-2">
    <Select
      class="w-[200px]"
      label="Language"
      bind:value
      renderValue={(selected) => languages.find((language) => language.value === selected)?.label ?? String(selected)}
      items={languages.map((language) => ({
        value: language.value,
        label: `${language.emoji} ${language.label}`
      }))}
    />
  </div>
</div>
