<script lang="ts">
  import { Input } from '$lib/components/input';
  import Field, { type FieldErrorMatch } from './Field.svelte';

  interface Props {
    label?: string;
    description?: string;
    error?: string | { message: string; match: FieldErrorMatch };
    required?: boolean;
    labelTooltip?: string;
    controlFirst?: boolean;
    hideLabel?: boolean;
    inputPlaceholder?: string;
    inputId?: string;
  }

  let {
    label = 'Email',
    description,
    error,
    required,
    labelTooltip,
    controlFirst,
    hideLabel,
    inputPlaceholder = 'you@example.com',
    inputId
  }: Props = $props();
</script>

<Field
  {label}
  {description}
  {error}
  {required}
  {labelTooltip}
  {controlFirst}
  {hideLabel}
>
  <Input placeholder={inputPlaceholder} id={inputId} aria-label={hideLabel ? label : undefined} />
</Field>
