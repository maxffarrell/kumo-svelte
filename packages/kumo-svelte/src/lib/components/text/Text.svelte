<script lang="ts" module>
  import { cn } from '$lib/utils/cn';

  /** Text variant and size definitions mapping names to their Tailwind classes. */
  export const KUMO_TEXT_VARIANTS = {
    variant: {
      heading: {
        classes: 'text-lg font-semibold',
        description: 'Heading text (16px by default, 20px at large size)'
      },
      /** @deprecated Use `heading` and set `size` and `as` explicitly. */
      heading1: {
        classes: 'text-3xl font-semibold',
        description: 'Deprecated large heading for page titles; use heading instead'
      },
      /** @deprecated Use `heading` and set `size` and `as` explicitly. */
      heading2: {
        classes: 'text-2xl font-semibold',
        description: 'Deprecated medium heading for section titles; use heading instead'
      },
      /** @deprecated Use `heading` and set `size` and `as` explicitly. */
      heading3: {
        classes: 'text-lg font-semibold',
        description: 'Deprecated small heading for subsections; use heading instead'
      },
      body: {
        classes: 'text-kumo-default',
        description: 'Default body text'
      },
      secondary: {
        classes: 'text-kumo-subtle',
        description: 'Muted text for secondary information'
      },
      success: {
        classes: 'text-kumo-link',
        description: 'Success state text'
      },
      error: {
        classes: 'text-kumo-danger',
        description: 'Error state text'
      },
      mono: {
        classes: 'font-mono',
        description: 'Monospace text for code'
      },
      'mono-secondary': {
        classes: 'font-mono text-kumo-subtle',
        description: 'Muted monospace text'
      }
    },
    size: {
      xs: {
        classes: 'text-xs',
        description: 'Extra small text'
      },
      sm: {
        classes: 'text-sm',
        description: 'Small text'
      },
      base: {
        classes: 'text-base',
        description: 'Default text size'
      },
      lg: {
        classes: 'text-lg',
        description: 'Large text'
      }
    }
  } as const;

  export const KUMO_TEXT_DEFAULT_VARIANTS = {
    variant: 'body',
    size: 'base'
  } as const;

  /**
   * Styling metadata for Text component (for AI/Figma plugin consumption).
   */
  export const KUMO_TEXT_STYLING = {
    fontSizes: {
      xs: 12,
      sm: 14,
      base: 16,
      lg: 18,
      xl: 20,
      '2xl': 24,
      '3xl': 30
    },
    fontWeights: {
      normal: 400,
      medium: 500,
      semibold: 600
    },
    baseColor: 'text-kumo-default',
    variantColors: {
      body: 'text-kumo-default',
      secondary: 'text-kumo-subtle',
      success: 'text-kumo-link',
      error: 'text-kumo-danger',
      mono: 'text-kumo-default',
      'mono-secondary': 'text-kumo-subtle'
    },
    fontFamilies: {
      default: 'sans-serif',
      mono: 'monospace'
    }
  } as const;

  export type KumoTextVariant = keyof typeof KUMO_TEXT_VARIANTS.variant;
  export type KumoTextSize = keyof typeof KUMO_TEXT_VARIANTS.size;
  type CopyVariant = 'body' | 'secondary' | 'success' | 'error';
  type MonospaceVariant = 'mono' | 'mono-secondary';
  type DeprecatedHeadingVariant = 'heading1' | 'heading2' | 'heading3';

  const DEPRECATED_HEADING_VARIANTS: readonly DeprecatedHeadingVariant[] = [
    'heading1',
    'heading2',
    'heading3'
  ];

  export function isDeprecatedHeadingVariant(
    variant: KumoTextVariant
  ): variant is DeprecatedHeadingVariant {
    return (DEPRECATED_HEADING_VARIANTS as readonly KumoTextVariant[]).includes(variant);
  }

  export function resolveTextSizeClasses(variant: KumoTextVariant, size: KumoTextSize) {
    if (variant === 'heading') return size === 'lg' ? 'text-xl' : '';
    if (isDeprecatedHeadingVariant(variant)) return '';
    if (variant === 'mono' || variant === 'mono-secondary') {
      return size === 'lg' ? KUMO_TEXT_VARIANTS.size.base.classes : KUMO_TEXT_VARIANTS.size.sm.classes;
    }
    return KUMO_TEXT_VARIANTS.size[size]?.classes ?? KUMO_TEXT_VARIANTS.size.base.classes;
  }

  export interface KumoTextVariantsProps {
    variant?: KumoTextVariant;
    size?: KumoTextSize;
  }

  export type TextElement =
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'h5'
    | 'h6'
    | 'p'
    | 'span'
    | 'label'
    | 'dt'
    | 'dd'
    | 'li'
    | 'figcaption'
    | 'legend'
    | 'pre'
    | 'code'
    | 'em'
    | 'strong'
    | 'small'
    | 'abbr'
    | 'time';

  export function textVariants({
    variant = KUMO_TEXT_DEFAULT_VARIANTS.variant,
    size = KUMO_TEXT_DEFAULT_VARIANTS.size
  }: KumoTextVariantsProps = {}) {
    return cn(
      KUMO_TEXT_VARIANTS.variant[variant]?.classes ??
        KUMO_TEXT_VARIANTS.variant[KUMO_TEXT_DEFAULT_VARIANTS.variant].classes,
      resolveTextSizeClasses(variant, size)
    );
  }

  interface CommonTextProps {
    truncate?: boolean;
    children?: import('svelte').Snippet;
    DANGEROUS_className?: string;
    DANGEROUS_style?: string;
    class?: string;
    style?: string;
    [key: string]: unknown;
  }

  export type TextProps = CommonTextProps &
    (
      | { variant?: CopyVariant; color?: 'default' | 'subtle' | 'success' | 'error'; size?: KumoTextSize; bold?: boolean; as?: TextElement }
      | { variant: 'heading'; color?: never; size?: 'lg'; bold?: never; as?: TextElement }
      | { variant: DeprecatedHeadingVariant; color?: never; size?: never; bold?: never; as: TextElement }
      | { variant: MonospaceVariant; color?: never; size?: 'lg'; bold?: never; as?: TextElement }
    );
</script>

<script lang="ts">
  import { DEV } from 'esm-env';

  let {
    variant = KUMO_TEXT_DEFAULT_VARIANTS.variant,
    color,
    size = KUMO_TEXT_DEFAULT_VARIANTS.size,
    bold = false,
    truncate = false,
    as,
    children,
    DANGEROUS_className,
    DANGEROUS_style,
    class: className,
    style,
    ...rest
  }: TextProps = $props();

  const copyVariants = ['body', 'secondary', 'success', 'error'];
  const monoVariants = ['mono', 'mono-secondary'];
  const resolvedVariant = $derived(color === 'subtle' ? 'secondary' : color === 'default' ? 'body' : color ?? variant);

  let isCopy = $derived(copyVariants.includes(resolvedVariant));
  let isMono = $derived(monoVariants.includes(resolvedVariant));
  let Component = $derived(as ?? (isMono || resolvedVariant.startsWith('heading') ? 'span' : 'p'));

  $effect(() => {
    if (DEV && isDeprecatedHeadingVariant(resolvedVariant)) {
      console.warn(
        `[Kumo Text]: variant="${resolvedVariant}" is deprecated. Use variant="heading" and set size and as explicitly.`
      );
    }
  });
  let computedClass = $derived(
    cn(
      'text-kumo-default',
      KUMO_TEXT_VARIANTS.variant[resolvedVariant]?.classes ??
        KUMO_TEXT_VARIANTS.variant[KUMO_TEXT_DEFAULT_VARIANTS.variant].classes,
      resolveTextSizeClasses(resolvedVariant, size),
      isCopy && bold ? 'font-medium' : '',
      truncate && 'truncate min-w-0',
      DANGEROUS_className,
      className
    )
  );
  let computedStyle = $derived(DANGEROUS_style ?? style);
</script>

<svelte:element this={Component} class={computedClass} style={computedStyle} {...rest}>
  {@render children?.()}
</svelte:element>
