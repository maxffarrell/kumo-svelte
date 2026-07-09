<script lang="ts">
  import { MenuBar } from 'kumo-svelte/components/menu-bar';
  import TextB from 'phosphor-svelte/lib/TextB';
  import TextItalic from 'phosphor-svelte/lib/TextItalic';

  let active = $state<string | undefined>(undefined);
</script>

<MenuBar
  isActive={active}
  optionIds
  options={[
    {
      icon: TextB,
      id: "bold",
      tooltip: "Bold",
      onClick: () => (active = active === "bold" ? undefined : "bold"),
    },
    {
      icon: TextItalic,
      id: "italic",
      tooltip: "Italic",
      onClick: () => (active = active === "italic" ? undefined : "italic"),
    },
  ]}
/>
