<script lang="ts">
  import Text, {
    type KumoTextSize,
    type KumoTextVariant,
    type TextElement,
    type TextProps
  } from './Text.svelte';

  interface Props {
    label?: string;
    variant?: KumoTextVariant;
    size?: KumoTextSize;
    bold?: boolean;
    truncate?: boolean;
    as?: TextElement;
    color?: 'default' | 'subtle' | 'success' | 'error';
  }

  let {
    label = 'Text',
    variant,
    size,
    bold,
    truncate,
    as,
    color
  }: Props = $props();

  const textProps = $derived({ variant, size, bold, truncate, as, color } as TextProps);
</script>

<Text {...textProps}>{label}</Text>
