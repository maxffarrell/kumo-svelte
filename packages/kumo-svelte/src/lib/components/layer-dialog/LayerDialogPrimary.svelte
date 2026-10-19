<script module lang="ts">
 export interface LayerDialogActionProps { children?: import('svelte').Snippet; menu?: import('svelte').Snippet; menuLabel?: string; loading?: boolean; disabled?: boolean; variant?: 'primary' | 'destructive'; [key: string]: unknown; }
 /** @deprecated Use LayerDialogActionProps. */
 export type LayerDialogPrimaryProps = LayerDialogActionProps;
</script>
<script lang="ts">
 import { Button } from '#lib/components/button/index.js';
 import { ButtonGroup } from '#lib/components/button-group/index.js';
 import { DropdownMenu } from '#lib/components/dropdown-menu/index.js';
 import CaretDown from 'phosphor-svelte/lib/CaretDown';
 let { children, menu, menuLabel = 'More actions', loading = false, disabled = false, variant = 'primary', ...rest }: LayerDialogActionProps = $props();
</script>
{#snippet primary()}<Button {loading} {disabled} {variant} {...rest}>{@render children?.()}</Button>{/snippet}
{#if menu}
 <ButtonGroup aria-label={menuLabel}>
  {@render primary()}
  <DropdownMenu><DropdownMenu.Trigger>{#snippet child({ props })}<Button {...props} {variant} {disabled} aria-label={menuLabel} shape="square" icon={CaretDown} />{/snippet}</DropdownMenu.Trigger><DropdownMenu.Content>{@render menu()}</DropdownMenu.Content></DropdownMenu>
 </ButtonGroup>
{:else}{@render primary()}{/if}
