import { getContext, setContext } from "svelte";
export interface KumoTranslations {
  breadcrumbs: {
    /** Accessible name of the breadcrumb nav landmark. */
    label: string;
    /** Accessible name of the clipboard button. */
    copy: string;
    /** Tooltip on the clipboard button. */
    copyTooltip: string;
  };
  label: { optional: string; tooltip: string };
  layerDialog: { close: string; cancel: string };
}
export type KumoTranslationsPartial = {
  [K in keyof KumoTranslations]?: Partial<KumoTranslations[K]>;
};
const key = Symbol("kumo-locale");
const defaults: KumoTranslations = {
  breadcrumbs: { label: "breadcrumb", copy: "Copy", copyTooltip: "Click to copy" },
  label: { optional: "(optional)", tooltip: "More information" },
  layerDialog: { close: "Close", cancel: "Cancel" },
};
export function getKumoLocale(): KumoTranslations {
  return getContext<KumoTranslations>(key) ?? defaults;
}
export function setKumoLocale(getTranslations: () => KumoTranslationsPartial) {
  const parent = getKumoLocale();
  setContext<KumoTranslations>(key, {
    get breadcrumbs() {
      return { ...parent.breadcrumbs, ...getTranslations().breadcrumbs };
    },
    get label() {
      return { ...parent.label, ...getTranslations().label };
    },
    get layerDialog() {
      return { ...parent.layerDialog, ...getTranslations().layerDialog };
    },
  });
}
