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
