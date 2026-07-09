<script lang="ts">
  import ArrowClockwise from 'phosphor-svelte/lib/ArrowClockwise';
  import { cn } from '$lib/utils/cn';
  import Button from './Button.svelte';

  interface Props {
    class?: string;
    loading?: boolean;
    size?: 'xs' | 'sm' | 'base' | 'lg';
    variant?: 'primary' | 'secondary' | 'ghost' | 'destructive' | 'secondary-destructive' | 'outline';
    'aria-label'?: string;
    [key: string]: unknown;
  }

  let {
    class: className,
    loading = false,
    size = 'base',
    variant = 'secondary',
    'aria-label': ariaLabel = 'Refresh',
    ...rest
  }: Props = $props();
</script>

<Button shape="square" {size} {variant} aria-label={ariaLabel} class={className} {...rest}>
  <ArrowClockwise
    class={cn({
      'animate-refresh': loading,
      'size-4.5': size === 'base',
      'size-4': size === 'sm' || size === 'xs',
      'size-5': size === 'lg'
    })}
  />
</Button>
