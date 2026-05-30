<script lang="ts">
  import { BROWSER } from 'esm-env';
  import type { Component } from 'svelte';
  import { onDestroy, onMount } from 'svelte';
  import { Tooltip } from '$lib/components/tooltip';
  import { cn } from '$lib/utils/cn';

  export const KUMO_MENUBAR_VARIANTS = {} as const;
  export const KUMO_MENUBAR_DEFAULT_VARIANTS = {} as const;

  export interface KumoMenuBarVariantsProps {}

  export function menuBarVariants(_props: KumoMenuBarVariantsProps = {}) {
    return cn(
      'flex rounded-lg border border-kumo-recessed bg-kumo-recessed pl-px shadow-xs transition-colors'
    );
  }

  type MenuOptionId = number | string;

  export type MenuOptionProps = {
    icon: Component;
    id?: MenuOptionId;
    isActive?: number | boolean | string;
    onClick: () => void;
    tooltip: string;
  };

  interface Props {
    class?: string;
    isActive: number | boolean | string | undefined;
    options: MenuOptionProps[];
    optionIds?: boolean;
    [key: string]: unknown;
  }

  let { class: className, isActive, options, optionIds = false, ...rest }: Props = $props();

  let menuRef: HTMLElement | undefined;
  let activeElement: HTMLElement | null = null;

  const classes = $derived(
    cn(
      'isolate flex rounded-lg ring ring-kumo-line bg-kumo-recessed pl-px shadow-xs transition-colors',
      className
    )
  );

  function getFocusableElements() {
    if (!menuRef) return [];

    return Array.from(
      menuRef.querySelectorAll(
        'a, button, input, textarea, select, details, [tabindex]:not([tabindex="-1"])'
      )
    ) as HTMLElement[];
  }

  function handleKeyDown(event: KeyboardEvent) {
    if (!activeElement) return;

    const focusableElements = getFocusableElements();
    const currentIndex = focusableElements.indexOf(activeElement);
    let nextIndex = currentIndex;

    if (currentIndex === -1) return;

    if (event.key === 'ArrowRight') {
      event.preventDefault();
      nextIndex = (currentIndex + 1) % focusableElements.length;
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault();
      nextIndex = (currentIndex - 1 + focusableElements.length) % focusableElements.length;
    } else {
      return;
    }

    const nextElement = focusableElements[nextIndex];
    activeElement = nextElement;
    nextElement.focus();
  }

  function addKeyListener() {
    if (!BROWSER) return;
    document.addEventListener('keydown', handleKeyDown);
  }

  function removeKeyListener() {
    if (!BROWSER) return;
    document.removeEventListener('keydown', handleKeyDown);
  }

  function handleFocusIn() {
    if (!BROWSER) return;
    activeElement = document.activeElement as HTMLElement;
    addKeyListener();
  }

  function handleFocusOut() {
    activeElement = null;
    removeKeyListener();
  }

  onMount(() => {
    menuRef?.addEventListener('focusin', handleFocusIn);
    menuRef?.addEventListener('focusout', handleFocusOut);
  });

  onDestroy(() => {
    menuRef?.removeEventListener('focusin', handleFocusIn);
    menuRef?.removeEventListener('focusout', handleFocusOut);
    removeKeyListener();
  });
</script>

<nav class={classes} bind:this={menuRef} {...rest}>
  {#each options as option, index (optionIds ? option.id : index)}
    {@const id = optionIds ? option.id : index}
    {@const Icon = option.icon}

    {#snippet menuButton(props: Record<string, unknown>)}
      <button
        {...props}
        aria-label={option.tooltip}
        data-kumo-component="MenuBar"
        data-kumo-part="option"
        class={cn(
          'relative -ml-px flex h-full w-11 cursor-pointer items-center justify-center rounded-md border-none bg-kumo-recessed first:rounded-l-lg last:rounded-r-lg transition-colors focus:z-3 focus:outline-none focus:ring-kumo-focus/50 focus-visible:z-3 focus-visible:ring-2 focus-visible:ring-kumo-brand',
          isActive === id && 'z-2 bg-kumo-base shadow-xs transition-colors'
        )}
        onclick={option.onClick}
      >
        <Icon size={18} />
      </button>
    {/snippet}

    <Tooltip trigger={menuButton}>{option.tooltip}</Tooltip>
  {/each}
</nav>
