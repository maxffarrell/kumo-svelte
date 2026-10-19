<script lang="ts">
 import { DropdownMenu } from 'bits-ui';
 import type { Snippet } from 'svelte';
 import { setDropdownSub } from './context';
 let { children, open = $bindable(false), ...rest }: { children?: Snippet; open?: boolean; [key: string]: unknown } = $props();
 setDropdownSub();
</script>
<DropdownMenu.Sub bind:open {...rest}>{@render children?.()}</DropdownMenu.Sub>
