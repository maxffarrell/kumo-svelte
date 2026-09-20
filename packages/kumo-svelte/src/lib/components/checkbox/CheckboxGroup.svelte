<script lang="ts">
  import { Checkbox as CheckboxPrimitive } from 'bits-ui';
  import { setContext } from 'svelte';
  import type { Snippet } from 'svelte';
  import { cn } from '$lib/utils/cn';

  interface Props {
    children?: Snippet;
    legend?: string;
    description?: string | Snippet;
    error?: string;
    value?: string[];
    disabled?: boolean;
    required?: boolean;
    name?: string;
    controlFirst?: boolean;
    class?: string;
    onValueChange?: (value: string[]) => void;
  }

  let {
    children,
    legend,
    description,
    error,
    value = $bindable([]),
    disabled = false,
    required,
    name,
    controlFirst = true,
    class: className,
    onValueChange
  }: Props = $props();

  setContext('kumo-checkbox-group', { get controlFirst() { return controlFirst; } });
</script>

<CheckboxPrimitive.Group bind:value {disabled} {required} {name} {onValueChange}>
  <fieldset class={cn('flex flex-col gap-4 p-0', className)} {disabled}>
    {#if legend}
      <legend class="text-base font-medium text-kumo-default">{legend}</legend>
    {/if}
    <div class="flex flex-col gap-2">
      {@render children?.()}
    </div>
    {#if error}
      <p class="text-sm text-kumo-danger">{error}</p>
    {:else if description}
      <p class="text-sm text-kumo-subtle">
        {#if typeof description === 'string'}{description}{:else}{@render description()}{/if}
      </p>
    {/if}
  </fieldset>
</CheckboxPrimitive.Group>
