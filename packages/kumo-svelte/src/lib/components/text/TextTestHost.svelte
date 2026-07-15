<script lang="ts">
  import Text, { type KumoTextSize, type KumoTextVariant, type TextElement } from './Text.svelte';

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
</script>

<Text {variant} {size} {bold} {truncate} {as} {color}>{label}</Text>
