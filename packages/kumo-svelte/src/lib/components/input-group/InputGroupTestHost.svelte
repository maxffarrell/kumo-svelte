<script lang="ts">
  import InputGroup from './InputGroup.svelte';
  import InputGroupInput from './InputGroupInput.svelte';
  import InputGroupAddon from './InputGroupAddon.svelte';
  import InputGroupButton from './InputGroupButton.svelte';
  import InputGroupSuffix from './InputGroupSuffix.svelte';

  interface Props {
    focusMode?: 'container' | 'individual' | 'hybrid';
    disabled?: boolean;
    label?: string;
    error?: string;
    size?: 'xs' | 'sm' | 'base' | 'lg';
    class?: string;
    variant?: 'basic' | 'suffix' | 'button' | 'addon';
    inputValue?: string;
  }

  let {
    focusMode = 'container',
    disabled = false,
    label,
    error,
    size = 'base',
    class: className = 'w-[280px]',
    variant = 'basic',
    inputValue = ''
  }: Props = $props();
</script>

<InputGroup {focusMode} {disabled} {label} {error} {size} class={className}>
  {#if variant === 'addon'}
    <InputGroupAddon>
      <svg aria-hidden="true" width="16" height="16" viewBox="0 0 16 16"><circle cx="8" cy="8" r="6" /></svg>
    </InputGroupAddon>
  {/if}
  <InputGroupInput placeholder="Search..." aria-label="Search" bind:value={inputValue} />
  {#if variant === 'suffix'}
    <InputGroupSuffix>.workers.dev</InputGroupSuffix>
  {/if}
  {#if variant === 'button'}
    <InputGroupButton aria-label="Submit">Go</InputGroupButton>
  {/if}
</InputGroup>
