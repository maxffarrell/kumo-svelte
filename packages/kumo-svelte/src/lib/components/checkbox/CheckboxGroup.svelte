<script lang="ts">
  import { Checkbox as CheckboxPrimitive } from 'bits-ui';
  import { setContext } from 'svelte';
  import type { Snippet } from 'svelte';
  import { cn } from '#lib/utils/cn.js';

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
    appearance?: "default" | "card";
    orientation?: "vertical" | "horizontal";
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
    appearance = "default",
    orientation = "vertical",
    class: className,
    onValueChange
  }: Props = $props();

  setContext('kumo-checkbox-group', { get controlFirst() { return controlFirst; }, get appearance() { return appearance; }, get orientation() { return orientation; } });
</script>

<CheckboxPrimitive.Group bind:value {disabled} {required} {name} {onValueChange}>
  <fieldset class={cn('flex flex-col p-0', appearance === 'card' ? 'gap-2' : 'gap-4', className)} {disabled}>
    {#if legend}
      <legend class="text-base font-medium text-kumo-default">{legend}</legend>
    {/if}
    <div class={cn(appearance === 'card' ? cn('overflow-hidden rounded-lg bg-kumo-base ring ring-kumo-line', orientation === 'horizontal' ? 'grid grid-cols-2' : 'flex flex-col') : cn('flex gap-2', orientation === 'horizontal' ? 'flex-row flex-wrap' : 'flex-col'))}>
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
