<script lang="ts">
  import LinkIcon from 'phosphor-svelte/lib/LinkIcon';
  import { InputGroup } from 'kumo-svelte/components/input-group';
</script>

<InputGroup class="w-full max-w-3xs">
  <InputGroup.Addon>
    <LinkIcon />
  </InputGroup.Addon>
  <InputGroup.Input placeholder="Paste a link..." aria-label="Link" />
</InputGroup>
