<script lang="ts">
  import { cn } from '$lib/utils/cn';
  let { class: className, ...rest }: { class?: string; [key: string]: unknown } = $props();
</script>

<span class={cn('flex shrink-0 items-center text-kumo-inactive', className)} aria-hidden="true" {...rest}>
  <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
    <path
      stroke="currentColor"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="1.5"
      d="M10.75 8.75L14.25 12L10.75 15.25"
    />
  </svg>
</span>
