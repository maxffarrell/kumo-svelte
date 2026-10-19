<script lang="ts">
 import { DropdownMenu } from 'bits-ui';
 import type { Snippet } from 'svelte';
 let { children, container, ...rest }: { children?: Snippet; container?: HTMLElement | string; [key: string]: unknown } = $props();
</script>
<DropdownMenu.Portal to={container} {...rest}>{@render children?.()}</DropdownMenu.Portal>
