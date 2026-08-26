<script module lang="ts">
  export {
    KUMO_TOOLBAR_DEFAULT_VARIANTS,
    KUMO_TOOLBAR_VARIANTS,
    type ToolbarSize
  } from './context';
</script>

<script lang="ts">
  import type { Snippet } from 'svelte';
  import { cn } from '$lib/utils/cn';
  import {
    KUMO_TOOLBAR_DEFAULT_VARIANTS,
    KUMO_TOOLBAR_VARIANTS,
    setToolbarContext,
    type ToolbarSize
  } from './context';

  export interface Props {
    children?: Snippet;
    class?: string;
    /** @deprecated Omit this prop to use the default base size. */
    size?: ToolbarSize;
    [key: string]: unknown;
  }

  let {
    children,
    class: className,
    size = KUMO_TOOLBAR_DEFAULT_VARIANTS.size,
    ...rest
  }: Props = $props();

  setToolbarContext({
    get size() {
      return size;
    }
  });

  function handleKeydown(event: KeyboardEvent) {
    if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') return;
    if (event.defaultPrevented) return;

    const target = event.target;
    if (!(target instanceof HTMLElement)) return;
    if (target.getAttribute('aria-expanded') === 'true') return;
    if (target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement) {
      const selectionStart = target.selectionStart ?? 0;
      const selectionEnd = target.selectionEnd ?? selectionStart;
      if (selectionStart !== selectionEnd) return;
      if (event.key === 'ArrowLeft' && selectionStart > 0) return;
      if (event.key === 'ArrowRight' && selectionEnd < target.value.length) return;
    }

    const root = event.currentTarget as HTMLElement;
    const controls = Array.from(
      root.querySelectorAll<HTMLElement>(
        '[data-kumo-toolbar-control]:not([disabled]), [data-kumo-toolbar-input-group] input:not([disabled])'
      )
    ).filter((element) => !element.hasAttribute('aria-hidden'));
    const index = controls.indexOf(target);
    if (index === -1) return;

    event.preventDefault();
    const direction = event.key === 'ArrowRight' ? 1 : -1;
    controls[(index + direction + controls.length) % controls.length]?.focus();
  }
</script>

<div
  data-kumo-component="Toolbar"
  role="toolbar"
  class={cn(
    'inline-flex w-fit items-stretch rounded-lg bg-kumo-control shadow-xs ring ring-kumo-line',
    KUMO_TOOLBAR_VARIANTS.size[size].classes,
    className
  )}
  onkeydown={handleKeydown}
  {...rest}
>
  {@render children?.()}
</div>
