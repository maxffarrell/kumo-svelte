import { getContext, setContext } from "svelte";
import type { BannerVariant } from "./Banner.svelte";

export const BANNER_ACTION_CONTEXT = Symbol("kumo-banner-action");

export interface BannerActionContextValue {
  variant: BannerVariant;
  size: "xs" | "sm";
}

export function setBannerActionContext(context: BannerActionContextValue) {
  setContext(BANNER_ACTION_CONTEXT, context);
}

export function getBannerActionContext(): BannerActionContextValue {
  return (
    getContext<BannerActionContextValue | undefined>(BANNER_ACTION_CONTEXT) ?? {
      variant: "default",
      size: "sm",
    }
  );
}
