<script lang="ts">
  import { cn } from '$lib/utils/cn';
  import { getSidebarContext } from './context';
  interface Props { class?: string; [key: string]: unknown; }
  let { class: className, ...rest }: Props = $props();
  const sidebar = getSidebarContext('Sidebar.ResizeHandle');
  let startX = 0;
  let startWidth = 0;

  function onPointerDown(event: PointerEvent) {
    if (!sidebar.resizable) return;
    event.preventDefault();
    sidebar.setIsResizing(true);
    startX = event.clientX;
    startWidth = sidebar.open ? sidebar.width : sidebar.minWidth;

    const onMove = (moveEvent: PointerEvent) => {
      const delta = sidebar.side === 'left' ? moveEvent.clientX - startX : startX - moveEvent.clientX;
      const nextWidth = startWidth + delta;
      if (nextWidth < sidebar.minWidth) {
        sidebar.setOpen(false);
        return;
      }
      sidebar.setOpen(true);
      sidebar.setWidth(nextWidth);
    };
    const onUp = () => {
      sidebar.setIsResizing(false);
      document.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerup', onUp);
    };
    document.addEventListener('pointermove', onMove);
    document.addEventListener('pointerup', onUp);
  }

  function onKeyDown(event: KeyboardEvent) {
    const grow = sidebar.side === 'left' ? 'ArrowRight' : 'ArrowLeft';
    const shrink = sidebar.side === 'left' ? 'ArrowLeft' : 'ArrowRight';
    if (event.key === grow) {
      event.preventDefault();
      sidebar.setOpen(true);
      sidebar.setWidth(sidebar.open ? sidebar.width + 10 : sidebar.minWidth);
    } else if (event.key === shrink) {
      event.preventDefault();
      const next = sidebar.width - 10;
      if (next < sidebar.minWidth) sidebar.setOpen(false);
      else sidebar.setWidth(next);
    } else if (event.key === 'Home') {
      event.preventDefault();
      sidebar.setOpen(false);
    } else if (event.key === 'End') {
      event.preventDefault();
      sidebar.setOpen(true);
      sidebar.setWidth(sidebar.maxWidth);
    }
  }
</script>

{#if sidebar.resizable}
  <button
    type="button"
    aria-label="Resize sidebar"
    data-sidebar="resize-handle"
    class={cn('absolute inset-y-0 z-2 hidden w-3 cursor-col-resize after:absolute after:inset-y-0 after:w-0.5 after:bg-transparent hover:after:bg-kumo-hairline focus:outline-none focus-visible:after:bg-kumo-hairline sm:block', sidebar.side === 'left' ? 'right-0 after:right-0' : 'left-0 after:left-0', className)}
    onpointerdown={onPointerDown}
    onkeydown={onKeyDown}
    {...rest}
  ></button>
{/if}
