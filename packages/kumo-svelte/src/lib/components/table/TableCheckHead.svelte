<script lang="ts">
  import { Checkbox } from '#lib/components/checkbox/index.js';
  import { cn } from '#lib/utils/cn.js';
  import TableHead from './TableHead.svelte';

  interface Props {
    class?: string;
    checked?: boolean;
    indeterminate?: boolean;
    onCheckedChange?: (checked: boolean) => void;
    onValueChange?: (checked: boolean) => void;
    label?: string;
    disabled?: boolean;
    [key: string]: unknown;
  }

  let {
    class: className,
    checked = $bindable(false),
    indeterminate = $bindable(false),
    onCheckedChange,
    onValueChange,
    label,
    disabled = false,
    ...rest
  }: Props = $props();

  function handleCheckedChange(newChecked: boolean) {
    onCheckedChange?.(newChecked);
    onValueChange?.(newChecked);
  }
</script>

<TableHead class={cn('w-10 leading-none', className)} {...rest}>
  <Checkbox
    bind:checked
    bind:indeterminate
    onCheckedChange={handleCheckedChange}
    aria-label={label ?? 'Select all rows'}
    {disabled}
    class="relative before:absolute before:-inset-3 before:content-['']"
  />
</TableHead>
