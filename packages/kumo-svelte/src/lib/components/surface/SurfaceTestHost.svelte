<script lang="ts">
  import Surface from './Surface.svelte';

  interface Props {
    label?: string;
    color?: 'primary' | 'secondary';
    class?: string;
    as?: string;
  }

  let { label = 'Surface', color, class: className, as }: Props = $props();
</script>

<Surface {color} class={className} {as}>{label}</Surface>
