<script lang="ts">
  import { CheckCircle } from 'phosphor-svelte';
  import { InputGroup, Loader } from 'kumo-svelte';

  let status = $state<'idle' | 'loading' | 'success'>('success');
  let value = $state('kumo');
  let timer: ReturnType<typeof setTimeout> | undefined;

  function handleChange(next: string) {
    value = next;
    if (timer) clearTimeout(timer);

    if (next.length > 0) {
      status = 'loading';
      timer = setTimeout(() => {
        status = 'success';
      }, 1500);
    } else {
      status = 'idle';
    }
  }
</script>

<div class="w-full max-w-2xs">
  <InputGroup>
    <InputGroup.Input {value} maxlength={20} onValueChange={handleChange} />
    <InputGroup.Suffix>.workers.dev</InputGroup.Suffix>
    {#if status !== 'idle'}
      <InputGroup.Addon align="end">
        {#if status === 'loading'}
          <Loader />
        {:else}
          <CheckCircle weight="duotone" class="text-kumo-success" />
        {/if}
      </InputGroup.Addon>
    {/if}
  </InputGroup>
</div>
