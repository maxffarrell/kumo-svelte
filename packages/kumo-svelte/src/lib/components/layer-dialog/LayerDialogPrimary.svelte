<script lang="ts">
  import type { Snippet } from 'svelte';
  import { Button } from '$lib/components/button';
  interface Props { children?: Snippet; loading?: boolean; variant?: 'primary' | 'destructive'; [key: string]: unknown; }
  let { children, loading = false, variant = 'primary', ...rest }: Props = $props();
</script>

<Button {loading} {variant} {...rest}>{@render children?.()}</Button>
