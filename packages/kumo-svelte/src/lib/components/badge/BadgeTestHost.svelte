<script lang="ts">
  import Badge, { type BadgeAppearance, type BadgeVariant } from './Badge.svelte';

  interface Props {
    label?: string;
    variant?: BadgeVariant;
    appearance?: BadgeAppearance;
    class?: string;
  }

  let { label = 'Badge', variant, appearance, class: className }: Props = $props();
</script>

<Badge {variant} {appearance} class={className}>{label}</Badge>
