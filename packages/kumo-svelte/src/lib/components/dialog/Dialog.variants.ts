export const KUMO_DIALOG_VARIANTS = {
  size: {
    base: {
      classes: 'sm:w-96',
      description: 'Default dialog width (384px)'
    },
    sm: {
      classes: 'sm:w-72',
      description: 'Small dialog for simple confirmations (288px)'
    },
    lg: {
      classes: 'sm:w-[32rem]',
      description: 'Large dialog for complex content (512px)'
    },
    xl: {
      classes: 'sm:w-[48rem]',
      description: 'Extra large dialog for detailed views (768px)'
    }
  },
  role: {
    dialog: {
      classes: '',
      description: 'Standard dialog for general-purpose modals'
    },
    alertdialog: {
      classes: '',
      description:
        'Alert dialog for confirmation flows requiring explicit user acknowledgment'
    }
  }
} as const;

export const KUMO_DIALOG_DEFAULT_VARIANTS = {
  size: 'base',
  role: 'dialog'
} as const;

export type KumoDialogSize = keyof typeof KUMO_DIALOG_VARIANTS.size;

export function dialogVariants({
  size = KUMO_DIALOG_DEFAULT_VARIANTS.size
}: { size?: KumoDialogSize } = {}) {
  return cn(
    'shadow-m ring ring-kumo-line fixed top-8 left-1/2 w-full max-w-[calc(100vw-2rem)] -translate-x-1/2 overflow-hidden rounded-xl bg-kumo-base text-kumo-default duration-150 data-ending-style:scale-90 data-ending-style:opacity-0 data-starting-style:scale-90 data-starting-style:opacity-0 sm:top-16',
    KUMO_DIALOG_VARIANTS.size[size].classes
  );
}
import { cn } from '$lib/utils/cn';
