import LayerCardRoot from "./LayerCard.svelte";
import type { KumoLayerCardPart } from "./LayerCard.svelte";

const part = (part: KumoLayerCardPart) =>
  ((anchor, props = {}) =>
    LayerCardRoot(anchor, {
      ...props,
      __part: part,
    })) as typeof LayerCardRoot;

const LayerCardPrimary = part("primary");
const LayerCardSecondary = part("secondary");

export const LayerCard = Object.assign(LayerCardRoot, {
  Primary: LayerCardPrimary,
  Secondary: LayerCardSecondary,
}) as typeof LayerCardRoot & {
  Primary: typeof LayerCardPrimary;
  Secondary: typeof LayerCardSecondary;
};

export { LayerCardPrimary, LayerCardSecondary };
export default LayerCard;
