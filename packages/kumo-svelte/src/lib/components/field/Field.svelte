<script lang="ts" module>
  import type { Snippet } from 'svelte';
  import { cn } from '$lib/utils/cn';

  export type FieldErrorMatch =
    | boolean
    | 'badInput'
    | 'customError'
    | 'patternMismatch'
    | 'rangeOverflow'
    | 'rangeUnderflow'
    | 'stepMismatch'
    | 'tooLong'
    | 'tooShort'
    | 'typeMismatch'
    | 'valid'
    | 'valueMissing';

  type FieldText = string | Snippet;

  export function normalizeFieldError(
    error: string | { message: FieldText; match: FieldErrorMatch } | undefined
  ): { message: FieldText; match: FieldErrorMatch } | undefined {
    if (!error) return undefined;
    if (typeof error === 'string') return { message: error, match: true };
    return error;
  }

  export const KUMO_FIELD_VARIANTS = {} as const;
  export const KUMO_FIELD_DEFAULT_VARIANTS = {} as const;

  export interface KumoFieldVariantsProps {
    controlFirst?: boolean;
  }

  export function fieldVariants({ controlFirst = false }: KumoFieldVariantsProps = {}) {
    return cn(
      'grid gap-2',
      'has-[input[type=checkbox]]:grid-cols-[auto_1fr] has-[input[type=checkbox]]:items-center',
      'has-[[role=switch]]:grid-cols-[auto_1fr] has-[[role=switch]]:items-center',
      controlFirst && [
        'has-[input[type=checkbox]]:flex has-[input[type=checkbox]]:flex-row-reverse has-[input[type=checkbox]]:flex-wrap has-[input[type=checkbox]]:items-center',
        'has-[[role=switch]]:flex has-[[role=switch]]:flex-row-reverse has-[[role=switch]]:flex-wrap has-[[role=switch]]:items-center',
        '[&>label]:flex-1'
      ]
    );
  }
</script>

<script lang="ts">
  import Label from '$lib/components/label/Label.svelte';

  type FieldLabel = string | Snippet;
  type FieldError = string | { message: FieldText; match: FieldErrorMatch };

  interface Props extends KumoFieldVariantsProps {
    children?: Snippet;
    class?: string;
    label?: FieldLabel;
    description?: FieldText;
    error?: FieldError;
    required?: boolean;
    labelTooltip?: FieldText;
    hideLabel?: boolean;
    [key: string]: unknown;
  }

  let {
    children,
    class: className,
    label,
    description,
    error,
    required,
    labelTooltip,
    controlFirst = false,
    hideLabel = false,
    ...rest
  }: Props = $props();

  const normalizedError = $derived(normalizeFieldError(error));
  const showOptional = $derived(required === false);
</script>

<div class={cn(fieldVariants({ controlFirst }), className)} {...rest}>
  {#if label && !hideLabel}
    <label class="m-0 select-none text-base font-medium text-kumo-default">
      <Label showOptional={showOptional} tooltip={labelTooltip} asContent>
        {#if typeof label === 'function'}{@render label()}{:else}{label}{/if}
      </Label>
    </label>
  {/if}
  {@render children?.()}
  {#if normalizedError}
    <div class="col-span-full text-sm leading-snug text-kumo-danger">
      {#if typeof normalizedError.message === 'function'}{@render normalizedError.message()}{:else}{normalizedError.message}{/if}
    </div>
  {:else if description}
    <div class="col-span-full text-sm leading-snug text-kumo-subtle">
      {#if typeof description === 'function'}{@render description()}{:else}{description}{/if}
    </div>
  {/if}
</div>
