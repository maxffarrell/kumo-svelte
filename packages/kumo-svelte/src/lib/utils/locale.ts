import { getContext, setContext } from "svelte";
export interface KumoTranslations {
  breadcrumbs?: {
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
  [K in keyof KumoTranslations]?: Partial<NonNullable<KumoTranslations[K]>>;
};
type ResolvedKumoTranslations = Required<KumoTranslations>;

const key = Symbol("kumo-locale");
const defaults: ResolvedKumoTranslations = {
  breadcrumbs: { label: "breadcrumb", copy: "Copy", copyTooltip: "Click to copy" },
  label: { optional: "(optional)", tooltip: "More information" },
  layerDialog: { close: "Close", cancel: "Cancel" },
};
export function getKumoLocale(): ResolvedKumoTranslations {
  return getContext<ResolvedKumoTranslations>(key) ?? defaults;
}
export function setKumoLocale(getTranslations: () => KumoTranslationsPartial) {
  const parent = getKumoLocale();
  setContext<ResolvedKumoTranslations>(key, {
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
