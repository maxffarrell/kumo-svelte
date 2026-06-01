<script lang="ts">
  import { LinkIcon } from 'phosphor-svelte';
  import { InputGroup } from 'kumo-svelte';
</script>

<InputGroup class="w-full max-w-3xs">
  <InputGroup.Addon>
    <LinkIcon />
  </InputGroup.Addon>
  <InputGroup.Input placeholder="Paste a link..." aria-label="Link" />
</InputGroup>
