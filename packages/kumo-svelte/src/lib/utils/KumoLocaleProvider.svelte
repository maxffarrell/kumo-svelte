<script lang="ts">
  import type { Snippet } from "svelte";
  import { setKumoLocale, type KumoTranslationsPartial } from "./locale.js";
  let {
    children,
    translations = {},
  }: { children?: Snippet; translations?: KumoTranslationsPartial } = $props();
  setKumoLocale(() => translations);
</script>

{@render children?.()}
