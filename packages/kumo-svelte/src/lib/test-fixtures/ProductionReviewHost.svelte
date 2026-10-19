<script lang="ts">
  import { DropdownMenu, Slider } from "#lib/index.js";
  let checked = $state(false);
</script>

<form id="slider-review-form"></form>
<Slider
  aria-label="External volume"
  name="volume"
  form="slider-review-form"
  defaultValue={40}
/>
<DropdownMenu open>
  <DropdownMenu.Positioner forceMount>
    <DropdownMenu.Popup>
      <DropdownMenu.Label>Settings</DropdownMenu.Label>
      <DropdownMenu.CheckboxItem bind:checked
        >Notifications</DropdownMenu.CheckboxItem
      >
    </DropdownMenu.Popup>
  </DropdownMenu.Positioner>
</DropdownMenu>
<output aria-label="Notifications enabled">{String(checked)}</output>
