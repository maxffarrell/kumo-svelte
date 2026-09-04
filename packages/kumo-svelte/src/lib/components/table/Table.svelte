<script module lang="ts">
  import { cn } from '$lib/utils/cn';

  export const KUMO_TABLE_VARIANTS = {
    layout: {
      auto: {
        classes: '',
        description: 'Auto table layout - columns resize based on content'
      },
      fixed: {
        classes: 'table-fixed',
        description: 'Fixed table layout - columns have equal width, controlled via colgroup'
      }
    },
    variant: {
      default: {
        classes:
          'even:bg-kumo-elevated [--kumo-table-row-bg:var(--color-kumo-base)] even:[--kumo-table-row-bg:var(--color-kumo-elevated)]',
        description: 'Default row variant'
      },
      selected: {
        classes: 'bg-kumo-tint [--kumo-table-row-bg:var(--color-kumo-tint)]',
        description: 'Selected row variant'
      }
    },
    sticky: {
      left: {
        classes: 'sticky left-0',
        description: 'Pin column to the left edge of the scroll container'
      },
      right: {
        classes: 'sticky right-0',
        description: 'Pin column to the right edge of the scroll container'
      }
    }
  } as const;

  export const KUMO_TABLE_DEFAULT_VARIANTS = {
    layout: 'auto',
    variant: 'default'
  } as const;

  export type KumoTableStickyColumn = keyof typeof KUMO_TABLE_VARIANTS.sticky;
  export type KumoTableRowVariant = keyof typeof KUMO_TABLE_VARIANTS.variant;
  export type KumoTableLayout = keyof typeof KUMO_TABLE_VARIANTS.layout;

  export function tableStickyColumnClasses(side: KumoTableStickyColumn, element: 'head' | 'cell') {
    const base = KUMO_TABLE_VARIANTS.sticky[side].classes;
    const z = element === 'head' ? 'z-2' : 'z-1';
    const fadePosition = side === 'right' ? 'before:-left-6' : 'before:-right-6';
    const fadeBase = 'before:pointer-events-none before:absolute before:inset-y-0 before:w-6';

    if (element === 'cell') {
      const fade =
        side === 'right'
          ? 'before:bg-gradient-to-r before:from-transparent before:to-(--kumo-table-row-bg)'
          : 'before:bg-gradient-to-l before:from-transparent before:to-(--kumo-table-row-bg)';

      return cn(base, z, 'bg-(--kumo-table-row-bg)', fadeBase, fadePosition, fade);
    }

    const bg = 'bg-kumo-base group-data-[compact]/header:bg-kumo-elevated';
    const fade =
      side === 'right'
        ? 'before:bg-gradient-to-r before:from-transparent before:to-kumo-base group-data-[compact]/header:before:to-kumo-elevated'
        : 'before:bg-gradient-to-l before:from-transparent before:to-kumo-base group-data-[compact]/header:before:to-kumo-elevated';

    return cn(base, z, bg, fadeBase, fadePosition, fade);
  }
</script>

<script lang="ts">
  import type { Snippet } from 'svelte';

  interface Props {
    children?: Snippet;
    class?: string;
    layout?: KumoTableLayout;
    [key: string]: unknown;
  }

  let { children, class: className, layout = KUMO_TABLE_DEFAULT_VARIANTS.layout, ...rest }: Props = $props();
</script>

<table
  class={cn(
    'isolate w-full',
    KUMO_TABLE_VARIANTS.layout[layout].classes,
    '[&_td]:p-3',
    '[&_th]:border-b [&_th]:border-kumo-fill [&_th]:p-3 [&_th]:font-semibold [&_th]:text-base',
    '[&_th]:bg-kumo-base',
    'text-base text-left text-kumo-default',
    className
  )}
  {...rest}
>
  {@render children?.()}
</table>
