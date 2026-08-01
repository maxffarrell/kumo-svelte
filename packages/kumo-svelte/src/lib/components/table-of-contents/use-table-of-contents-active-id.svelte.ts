import { onDestroy, onMount } from "svelte";

export interface UseTableOfContentsActiveIdOptions {
  ids: string[];
  offset?: number;
  root?: Element | null;
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
  trackHash = true,
}: UseTableOfContentsActiveIdOptions): UseTableOfContentsActiveIdResult {
  let activeId = $state<string | null>(null);
  let pinned = false;
  let settleTimer: number | undefined;
  let cleanupPin: (() => void) | undefined;

  const selectSection = (id: string) => {
    cleanupPin?.();
    pinned = true;
    activeId = id;
    const target: EventTarget = root ?? window;
    const arm = () => {
      if (settleTimer) window.clearTimeout(settleTimer);
      settleTimer = window.setTimeout(() => {
        cleanupPin?.();
        pinned = false;
      }, SCROLL_SETTLE_MS);
    };
    target.addEventListener("scroll", arm, { passive: true });
    cleanupPin = () => {
      if (settleTimer) window.clearTimeout(settleTimer);
      target.removeEventListener("scroll", arm);
      cleanupPin = undefined;
    };
    arm();
  };

  onMount(() => {
    const elements = ids
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
      { root, rootMargin: `-${offset}px 0px 0px 0px` },
    );
    elements.forEach((element) => observer.observe(element));

    const syncHash = () => {
      const id = decodeURIComponent(window.location.hash.slice(1));
      if (id && ids.includes(id)) selectSection(id);
    };
    if (trackHash) {
      syncHash();
      window.addEventListener("hashchange", syncHash);
    }

    return () => {
      observer.disconnect();
      if (trackHash) window.removeEventListener("hashchange", syncHash);
    };
  });

  onDestroy(() => cleanupPin?.());

  return {
    get activeId() {
      return activeId;
    },
    selectSection,
  };
}
