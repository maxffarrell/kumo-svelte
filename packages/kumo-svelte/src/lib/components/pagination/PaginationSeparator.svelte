<script lang="ts">
  import { cn } from '#lib/utils/cn.js';

  interface Props {
    class?: string;
    [key: string]: unknown;
  }

  let { class: className, ...rest }: Props = $props();
</script>

<div data-slot="pagination-separator" class={cn('mx-2 h-6 border-l border-kumo-hairline', className)} {...rest}></div>
