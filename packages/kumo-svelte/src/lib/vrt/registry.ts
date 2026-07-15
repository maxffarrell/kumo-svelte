/**
 * Auto-discovers VRT galleries. Each gallery is a Svelte component placed at
 * `src/lib/vrt/galleries/<component-slug>.svelte`. Adding a file here makes the
 * `/vrt/<component-slug>` route render it automatically.
 */
import type { Component } from 'svelte';

const modules = import.meta.glob('./galleries/*.svelte');

/** Sorted list of available gallery slugs (e.g. "button", "dialog"). */
export const gallerySlugs: string[] = Object.keys(modules)
  .map((path) => path.replace('./galleries/', '').replace('.svelte', ''))
  .sort();

/** Loads the gallery Svelte component for a slug, or null if none exists. */
export async function loadGallery(slug: string): Promise<Component | null> {
  const entry = modules[`./galleries/${slug}.svelte`];
  if (!entry) return null;
  const mod = (await entry()) as { default: Component };
  return mod.default;
}
