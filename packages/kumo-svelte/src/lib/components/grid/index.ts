import Root from './Grid.svelte';
import type { KumoGridPart } from './Grid.svelte';

const part = (part: KumoGridPart) =>
  ((anchor, props = {}) =>
    Root(anchor, {
      ...props,
      __part: part
    })) as typeof Root;

const Item = part('item');

const Grid = Object.assign(Root, {
  Root,
  Item
}) as typeof Root & {
  Root: typeof Root;
  Item: typeof Item;
};

export { Grid };
export {
  gridItemVariants,
  gridVariants,
  KUMO_GRID_DEFAULT_VARIANTS,
  KUMO_GRID_VARIANTS,
  type KumoGridPart,
  type KumoGridGap,
  type KumoGridVariant,
  type KumoGridVariantsProps
} from './Grid.svelte';
export { Item as GridItem };
