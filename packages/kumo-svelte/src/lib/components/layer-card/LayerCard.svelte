<script lang="ts">
  import { getContext, onDestroy, setContext } from 'svelte';
  import type { Snippet } from 'svelte';
  import { cn } from '$lib/utils/cn';

  const LAYER_CARD_SURFACE_CLASSES =
    'overflow-hidden rounded-lg bg-kumo-base shadow-xs ring ring-kumo-line';
  const LAYER_CARD_LAYERED_ROOT_CLASSES =
    'flex w-full flex-col overflow-hidden rounded-lg bg-kumo-elevated text-base ring ring-kumo-hairline';
  const LAYER_CARD_PRIMARY_CLASSES =
    'relative flex flex-col gap-2 overflow-hidden rounded-lg bg-kumo-base p-4 pr-3 text-inherit no-underline ring ring-kumo-fill';
  const LAYER_CARD_SECONDARY_CLASSES =
    '-my-2 flex items-center gap-2 bg-kumo-elevated p-4 text-base font-medium text-kumo-subtle';

  export type KumoLayerCardPart = 'root' | 'primary' | 'secondary';

  interface LayerCardContext {
    registerSection: () => () => void;
  }

  export interface Props {
    __part?: KumoLayerCardPart;
    children?: Snippet;
    class?: string;
    as?: string;
    [key: string]: unknown;
  }

  let { __part = 'root', children, class: className, as = 'div', ...rest }: Props = $props();

  let sectionCount = $state(0);
  const isRootPart = () => __part === 'root';
  const isSectionPart = () => __part === 'primary' || __part === 'secondary';

  if (isRootPart()) {
    setContext<LayerCardContext>('kumo-layer-card', {
      registerSection: () => {
        sectionCount += 1;

        return () => {
          sectionCount -= 1;
        };
      }
    });
  }

  const context =
    isSectionPart() ? getContext<LayerCardContext | undefined>('kumo-layer-card') : undefined;
  const unregister = context?.registerSection();

  onDestroy(() => {
    unregister?.();
  });
</script>

{#if __part === 'primary' || __part === 'secondary'}
  <div
    class={cn(__part === 'secondary' ? LAYER_CARD_SECONDARY_CLASSES : LAYER_CARD_PRIMARY_CLASSES, className)}
    {...rest}
  >
    {@render children?.()}
  </div>
{:else}
  <svelte:element
    this={as}
    class={cn(sectionCount > 0 ? LAYER_CARD_LAYERED_ROOT_CLASSES : LAYER_CARD_SURFACE_CLASSES, className)}
    {...rest}
  >
    {@render children?.()}
  </svelte:element>
{/if}
