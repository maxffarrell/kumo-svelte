import type { SidebarScrollToItemOptions } from './context';

export function scrollWithinViewport(
  target: HTMLElement,
  options: SidebarScrollToItemOptions = {},
) {
  const { align = 'auto', behavior = 'auto' } = options;
  const viewport = target.closest<HTMLElement>('[data-sidebar="viewport"]');
  if (!viewport) return;

  const targetRect = target.getBoundingClientRect();
  const viewportRect = viewport.getBoundingClientRect();
  const viewportScaleY =
    viewport.offsetHeight > 0 && viewportRect.height > 0
      ? viewportRect.height / viewport.offsetHeight
      : 1;
  const itemScrollOffset =
    (targetRect.top - viewportRect.top) / viewportScaleY + viewport.scrollTop;

  let desired: number;
  if (align === 'center') {
    desired = itemScrollOffset - (viewport.clientHeight - target.offsetHeight) / 2;
  } else if (align === 'end') {
    desired = itemScrollOffset - (viewport.clientHeight - target.offsetHeight);
  } else if (align === 'auto') {
    const itemBottom = itemScrollOffset + target.offsetHeight;
    const viewBottom = viewport.scrollTop + viewport.clientHeight;
    if (itemScrollOffset < viewport.scrollTop) desired = itemScrollOffset;
    else if (itemBottom > viewBottom) desired = itemBottom - viewport.clientHeight;
    else return;
  } else {
    desired = itemScrollOffset;
  }

  const clamped = Math.max(0, Math.min(desired, viewport.scrollHeight - viewport.clientHeight));
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  viewport.scrollTo({ top: clamped, behavior: reducedMotion ? 'auto' : behavior });
}
