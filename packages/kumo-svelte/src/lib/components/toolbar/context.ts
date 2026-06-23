import { getContext, setContext } from 'svelte';
import { cn } from '$lib/utils/cn';

export const KUMO_TOOLBAR_VARIANTS = {
  size: {
    xs: {
      classes: 'text-xs',
      description: 'Extra small toolbar for compact UIs'
    },
    sm: {
      classes: 'text-xs',
      description: 'Small toolbar for secondary controls'
    },
    base: {
      classes: 'text-base',
      description: 'Default toolbar size'
    },
    lg: {
      classes: 'text-base',
      description: 'Large toolbar for prominent controls'
    }
  }
} as const;

export const KUMO_TOOLBAR_DEFAULT_VARIANTS = {
  size: 'base'
} as const;

export type ToolbarSize = keyof typeof KUMO_TOOLBAR_VARIANTS.size;

export interface ToolbarContextValue {
  size: ToolbarSize;
}

const TOOLBAR_CONTEXT = 'kumo-toolbar';

export function setToolbarContext(context: ToolbarContextValue) {
  setContext(TOOLBAR_CONTEXT, context);
}

export function getToolbarContext() {
  return getContext<ToolbarContextValue | undefined>(TOOLBAR_CONTEXT);
}

export function toolbarControlClassName(className?: string) {
  return cn(
    'relative min-w-0 border-0 bg-transparent shadow-none ring-0 focus:z-2 focus-within:z-2 focus-visible:z-2',
    'rounded-none first:rounded-l-lg last:rounded-r-lg only:rounded-lg',
    'not-first:border-l not-first:border-kumo-line',
    'focus:ring-2 focus:ring-kumo-brand focus-visible:ring-2 focus-visible:ring-kumo-brand',
    'focus-within:ring-2 focus-within:ring-kumo-brand',
    className
  );
}
