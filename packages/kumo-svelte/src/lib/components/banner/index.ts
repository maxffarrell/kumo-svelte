import BannerRoot from "./Banner.svelte";
import BannerAction from "./BannerAction.svelte";

export {
  KUMO_BANNER_BASE_STYLES,
  KUMO_BANNER_DEFAULT_VARIANTS,
  KUMO_BANNER_VARIANTS,
  bannerVariants,
} from "./Banner.svelte";
export type { BannerVariant, KumoBannerSize } from "./Banner.svelte";

export const Banner = Object.assign(BannerRoot, {
  Action: BannerAction,
}) as typeof BannerRoot & {
  Action: typeof BannerAction;
};

export { BannerRoot, BannerAction };
