import { getContext, setContext } from "svelte";
export interface KumoTranslations {
  label: { optional: string; tooltip: string };
  layerDialog: { close: string; cancel: string };
}
export type KumoTranslationsPartial = {
  [K in keyof KumoTranslations]?: Partial<KumoTranslations[K]>;
};
const key = Symbol("kumo-locale");
const defaults: KumoTranslations = {
  label: { optional: "(optional)", tooltip: "More information" },
  layerDialog: { close: "Close", cancel: "Cancel" },
};
export function getKumoLocale(): KumoTranslations {
  return getContext<KumoTranslations>(key) ?? defaults;
}
export function setKumoLocale(getTranslations: () => KumoTranslationsPartial) {
  const parent = getKumoLocale();
  setContext<KumoTranslations>(key, {
    get label() {
      return { ...parent.label, ...getTranslations().label };
    },
    get layerDialog() {
      return { ...parent.layerDialog, ...getTranslations().layerDialog };
    },
  });
}
