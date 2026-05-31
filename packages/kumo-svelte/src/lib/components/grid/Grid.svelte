<script module lang="ts">
  import { cn } from '$lib/utils/cn';
  import { resolveVariant } from '$lib/utils/variants';

  export const KUMO_GRID_VARIANTS = {
    variant: {
      '2up': {
        classes: 'grid-cols-1 md:grid-cols-2',
        description: 'Grid items stack on small screens, display side-by-side on medium screens and up'
      },
      'side-by-side': {
        classes: 'grid-cols-2',
        description: 'Grid items always displayed side-by-side'
      },
      '2-1': {
        classes: 'grid-cols-1 md:grid-cols-[2fr_1fr]',
        description: 'Two-thirds / one-third split (66%/33%) on medium screens and up'
      },
      '1-2': {
        classes: 'grid-cols-1 md:grid-cols-[1fr_2fr]',
        description: 'One-third / two-thirds split (33%/66%) on medium screens and up'
      },
      '1-3up': {
        classes: 'grid-cols-1 lg:grid-cols-3',
        description: 'Grid items stack on small screens, expand to 3 across on large screens'
      },
      '3up': {
        classes: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
        description: 'Grid items stack on small screens, 2 across on medium, 3 across on large'
      },
      '4up': {
        classes: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
        description: 'Grid items stack on small screens, progressively increase columns at larger breakpoints'
      },
      '6up': {
        classes: 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6',
        description: 'Grid items start at 2 across, expand to 6 across on XL'
      },
      '1-2-4up': {
        classes: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
        description: 'Grid items stack on small screens, 2 across on medium, 4 across on large'
      }
    },
    gap: {
      none: {
        classes: 'gap-0',
        description: 'No gap between grid items'
      },
      sm: {
        classes: 'gap-3',
        description: 'Small gap between grid items'
      },
      base: {
        classes: 'gap-2 md:gap-6 lg:gap-8',
        description: 'Default responsive gap between grid items'
      },
      lg: {
        classes: 'gap-8',
        description: 'Large gap between grid items'
      }
    }
  } as const;

  export const KUMO_GRID_DEFAULT_VARIANTS = {
    gap: 'base'
  } as const;

  export type KumoGridVariant = keyof typeof KUMO_GRID_VARIANTS.variant;
  export type KumoGridGap = keyof typeof KUMO_GRID_VARIANTS.gap;

  export interface KumoGridVariantsProps {
    gap?: KumoGridGap;
    variant?: KumoGridVariant;
  }

  export type KumoGridPart = 'root' | 'item';

  export function gridVariants({
    variant,
    gap = KUMO_GRID_DEFAULT_VARIANTS.gap
  }: KumoGridVariantsProps = {}) {
    return cn(
      'grid',
      variant &&
        resolveVariant(KUMO_GRID_VARIANTS, { variant }, { variant: '2up' }),
      resolveVariant(KUMO_GRID_VARIANTS, { gap }, KUMO_GRID_DEFAULT_VARIANTS)
    );
  }

  export function gridItemVariants({
    variant,
    mobileDivider
  }: {
    variant?: KumoGridVariant;
    mobileDivider?: boolean;
  } = {}) {
    return cn(
      mobileDivider &&
        variant === '4up' &&
        'border-b border-kumo-hairline pb-8 md:border-b-0 md:pb-0'
    );
  }
</script>

<script lang="ts">
  import { getContext, setContext } from 'svelte';
  import type { Snippet } from 'svelte';

  interface GridContextValue {
    variant?: KumoGridVariant;
    gap: KumoGridGap;
    mobileDivider?: boolean;
  }

  export interface Props extends KumoGridVariantsProps {
    __part?: KumoGridPart;
    children?: Snippet;
    class?: string;
    mobileDivider?: boolean;
    [key: string]: unknown;
  }

  let {
    __part = 'root',
    children,
    class: className,
    mobileDivider,
    gap = KUMO_GRID_DEFAULT_VARIANTS.gap,
    variant,
    ...rest
  }: Props = $props();

  const isRootPart = () => __part === 'root';
  const isItemPart = () => __part === 'item';

  if (isRootPart()) {
    setContext('kumo-grid', () => ({ variant, gap, mobileDivider }));
  }

  const getGridContext =
    isItemPart() ? getContext<() => GridContextValue>('kumo-grid') : undefined;
  const context = $derived(getGridContext?.());
  const classes = $derived(
    cn(
      __part === 'item'
        ? gridItemVariants({
            variant: context?.variant,
            mobileDivider: context?.mobileDivider
          })
        : gridVariants({ variant, gap }),
      className
    )
  );
</script>

<div class={classes} {...rest}>
  {@render children?.()}
</div>
