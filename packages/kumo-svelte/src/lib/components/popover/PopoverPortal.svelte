<script lang="ts">
 import { Popover } from 'bits-ui';
 import type { Snippet } from 'svelte';
 let { children, container, ...rest }: { children?: Snippet; container?: HTMLElement | string; [key: string]: unknown } = $props();
</script>
<Popover.Portal to={container} {...rest}>{@render children?.()}</Popover.Portal>
