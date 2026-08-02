import { onDestroy } from 'svelte';

export interface UseTableOfContentsActiveIdOptions {
  /** Section anchor ids in document order. */
  ids: string[];
  /** Fixed-header offset for the scrollspy activation line. @default 0 */
  offset?: number;
  /** Scroll container to observe. Defaults to the viewport. */
  root?: Element | null;
  /** Select location.hash targets on load and hashchange. @default true */
  trackHash?: boolean;
}

export interface UseTableOfContentsActiveIdResult {
  readonly activeId: string | null;
  selectSection(id: string): void;
}

const SCROLL_SETTLE_MS = 150;

/** SSR-safe scrollspy for TableOfContents sections, including hash deep links. */
export function useTableOfContentsActiveId({
  ids,
  offset = 0,
  root = null,
  trackHash = true
}: UseTableOfContentsActiveIdOptions): UseTableOfContentsActiveIdResult {
  let activeId = $state<string | null>(null);
  let pinned = false;
  let settleTimer: number | undefined;
  let cleanupPin: (() => void) | undefined;
  const idsKey = $derived(ids.join('\0'));

  const selectSection = (id: string) => {
    if (typeof window === 'undefined') return;

    cleanupPin?.();
    pinned = true;
    activeId = id;
    const target: EventTarget = root ?? window;
    const arm = () => {
      if (settleTimer !== undefined) window.clearTimeout(settleTimer);
      settleTimer = window.setTimeout(() => {
        cleanupPin?.();
        pinned = false;
      }, SCROLL_SETTLE_MS);
    };

    target.addEventListener('scroll', arm, { passive: true });
    cleanupPin = () => {
      if (settleTimer !== undefined) window.clearTimeout(settleTimer);
      target.removeEventListener('scroll', arm);
      cleanupPin = undefined;
      settleTimer = undefined;
    };
    arm();
  };

  // Rebuild the observer when ids change so dynamically rendered headings are
  // tracked without requiring consumers to recreate the hook.
  $effect(() => {
    const sectionIds = idsKey.split('\0').filter(Boolean);
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => Boolean(element));

    if (elements.length === 0) return;

    const intersecting = new Set<Element>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) intersecting.add(entry.target);
          else intersecting.delete(entry.target);
        }

        const first = elements.find((element) => intersecting.has(element));
        if (first && !pinned) activeId = first.id;
      },
      { root, rootMargin: `-${offset}px 0px 0px 0px` }
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  });

  $effect(() => {
    if (!trackHash || typeof window === 'undefined') return;

    const knownIds = new Set(idsKey.split('\0').filter(Boolean));
    const syncHash = () => {
      const id = decodeURIComponent(window.location.hash.slice(1));
      if (id && knownIds.has(id)) selectSection(id);
    };

    syncHash();
    window.addEventListener('hashchange', syncHash);
    return () => window.removeEventListener('hashchange', syncHash);
  });

  onDestroy(() => cleanupPin?.());

  return {
    get activeId() {
      return activeId;
    },
    selectSection
  };
}
