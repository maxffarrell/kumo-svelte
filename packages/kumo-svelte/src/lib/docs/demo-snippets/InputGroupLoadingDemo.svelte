<script lang="ts">
  import { InputGroup } from 'kumo-svelte/components/input-group';
  import { Loader } from 'kumo-svelte/components/loader';
</script>

<InputGroup class="w-full max-w-3xs">
  <InputGroup.Input value="kumo" aria-label="kumo" />
  <InputGroup.Addon align="end">
    <Loader />
  </InputGroup.Addon>
</InputGroup>
