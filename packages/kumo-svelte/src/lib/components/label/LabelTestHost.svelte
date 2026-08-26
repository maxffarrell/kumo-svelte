<script lang="ts">
  import type { Snippet } from 'svelte';
  import Label from './Label.svelte';

  interface Props {
    label?: string;
    showOptional?: boolean;
    tooltip?: string;
    htmlFor?: string;
    asContent?: boolean;
    children?: Snippet;
  }

  let {
    label = 'Label',
    showOptional,
    tooltip,
    htmlFor,
    asContent,
    children
  }: Props = $props();
</script>

<Label {showOptional} {tooltip} {htmlFor} {asContent}>
  {#if children}
    {@render children()}
  {:else}
    {label}
  {/if}
</Label>
