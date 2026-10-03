<script lang="ts">
  import { cn } from '#lib/utils/cn.js';

  interface Props {
    size?: number;
    class?: string;
  }

  let { size = 20, class: classValue = '' }: Props = $props();
  let circleSize = $derived(size * 0.5);
</script>

<span
  class={cn('inline-flex items-center justify-center align-middle', classValue)}
  style:width={`${size}px`}
  style:height={`${size}px`}
  aria-hidden="true"
>
  <span
    class="block rounded-full bg-current"
    style:width={`${circleSize}px`}
    style:height={`${circleSize}px`}
  ></span>
</span>
