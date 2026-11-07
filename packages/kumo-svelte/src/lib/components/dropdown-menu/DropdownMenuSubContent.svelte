<script lang="ts">
 import type { Snippet, ComponentProps } from 'svelte';
 import Portal from './DropdownMenuPortal.svelte';
 import Positioner from './DropdownMenuPositioner.svelte';
 import Popup from './DropdownMenuPopup.svelte';
 let { children, class: className, container, ...rest }: ComponentProps<typeof Positioner> & { container?: HTMLElement | string } = $props();
</script>
<Portal {container}><Positioner {...rest}><Popup class={className}>{@render children?.()}</Popup></Positioner></Portal>
