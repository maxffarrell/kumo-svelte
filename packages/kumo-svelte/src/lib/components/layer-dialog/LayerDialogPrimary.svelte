<script module lang="ts">
  export interface LayerDialogPrimaryProps { children?: import('svelte').Snippet; loading?: boolean; variant?: 'primary' | 'destructive'; [key: string]: unknown; }
</script>

<script lang="ts">
  import type { Snippet } from 'svelte';
  import { Button } from '$lib/components/button';
  let { children, loading = false, variant = 'primary', ...rest }: LayerDialogPrimaryProps = $props();
</script>

<Button {loading} {variant} {...rest}>{@render children?.()}</Button>
