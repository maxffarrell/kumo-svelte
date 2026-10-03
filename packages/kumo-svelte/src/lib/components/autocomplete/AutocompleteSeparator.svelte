<script lang="ts">
  import { cn } from '#lib/utils/cn.js';

  export interface Props {
    class?: string;
    [key: string]: unknown;
  }

  let { class: className, ...rest }: Props = $props();
</script>

<div class={cn('mx-0 my-1 h-px bg-kumo-line', className)} {...rest}></div>
