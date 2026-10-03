<script lang="ts" module>
  import { cn } from '#lib/utils/cn.js';

  /** Code language variant definitions. */
  export const KUMO_CODE_VARIANTS = {
    lang: {
      ts: {
        classes: '',
        description: 'TypeScript code'
      },
      tsx: {
        classes: '',
        description: 'TypeScript JSX code'
      },
      jsonc: {
        classes: '',
        description: 'JSON with comments'
      },
      bash: {
        classes: '',
        description: 'Shell/Bash commands'
      },
      css: {
        classes: '',
        description: 'CSS styles'
      }
    }
  } as const;

  export const KUMO_CODE_DEFAULT_VARIANTS = {
    lang: 'ts'
  } as const;

  /**
   * Styling metadata for Code component (for AI/Figma plugin consumption).
   */
  export const KUMO_CODE_STYLING = {
    baseTokens: ['text-kumo-subtle'],
    typography: {
      fontFamily: 'font-mono',
      fontSize: 'text-sm',
      lineHeight: 'leading-[20px]'
    },
    dimensions: {
      margin: 'm-0',
      padding: 'p-0',
      width: 'w-auto'
    },
    appearance: {
      borderRadius: 'rounded-none',
      border: 'border-none',
      background: 'bg-transparent'
    }
  } as const;

  export type KumoCodeLang = keyof typeof KUMO_CODE_VARIANTS.lang;

  export interface KumoCodeVariantsProps {
    lang?: KumoCodeLang;
  }

  export type CodeLang = KumoCodeLang;

  /** @deprecated Use CodeLang instead. */
  export type BundledLanguage = CodeLang;

  export function codeVariants({
    lang = KUMO_CODE_DEFAULT_VARIANTS.lang
  }: KumoCodeVariantsProps = {}) {
    const variant =
      KUMO_CODE_VARIANTS.lang[lang] ??
      KUMO_CODE_VARIANTS.lang[KUMO_CODE_DEFAULT_VARIANTS.lang];

    return cn(
      'm-0 w-auto rounded-none border-none bg-transparent p-0 font-mono text-sm leading-[20px] text-kumo-subtle',
      variant.classes
    );
  }
</script>

<script lang="ts">
  import type { Snippet } from 'svelte';

  interface Props extends KumoCodeVariantsProps {
    /** The code string to display. */
    code?: string;
    /** Template values are accepted for API parity; interpolation is handled by highlighted code utilities upstream. */
    values?: Record<string, { value: string; highlight?: boolean }>;
    children?: Snippet;
    class?: string;
    style?: string;
    [key: string]: unknown;
  }

  let {
    code = '',
    children,
    class: className,
    lang = KUMO_CODE_DEFAULT_VARIANTS.lang,
    style,
    values: _values,
    ...rest
  }: Props = $props();
</script>

<pre class={cn(codeVariants({ lang }), className)} {style} {...rest}>{#if children}{@render children()}{:else}{code}{/if}</pre>
