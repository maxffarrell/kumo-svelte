<script lang="ts" module>
  export const KUMO_SKELETON_LINE_VARIANTS = {
    variant: {
      default: { classes: 'skeleton-line', description: 'Flat bar with a sliding shimmer' },
      sketch: {
        classes: 'relative h-2 w-(--skeleton-width)',
        description: 'Wireframe bar with a sliding shimmer and extended corner strokes'
      }
    }
  } as const;

  export const KUMO_SKELETON_LINE_DEFAULT_VARIANTS = { variant: 'default' } as const;
  export type KumoSkeletonLineVariant = keyof typeof KUMO_SKELETON_LINE_VARIANTS.variant;
</script>

<script lang="ts">
  import { useKumoRandom } from '#lib/utils/random.js';

  interface Props {
    variant?: KumoSkeletonLineVariant;
    minWidth?: number;
    maxWidth?: number;
    minDuration?: number;
    maxDuration?: number;
    minDelay?: number;
    maxDelay?: number;
    blockHeight?: string | number;
    class?: string;
    [key: string]: unknown;
  }

  let {
    variant = KUMO_SKELETON_LINE_DEFAULT_VARIANTS.variant,
    minWidth = 30,
    maxWidth = 100,
    minDuration = 1.3,
    maxDuration = 1.7,
    minDelay = 0,
    maxDelay = 0.5,
    blockHeight,
    class: className,
    ...rest
  }: Props = $props();

  const random = useKumoRandom();
  let width = $derived(random.int(minWidth, maxWidth));
  let duration = $derived(random.float(minDuration, maxDuration).toFixed(2));
  let delay = $derived(random.float(minDelay, maxDelay).toFixed(2));
  let height = $derived(typeof blockHeight === 'number' ? `${blockHeight}px` : blockHeight);
</script>

{#snippet line()}
  <div
    class={[KUMO_SKELETON_LINE_VARIANTS.variant[variant].classes, className].filter(Boolean).join(' ')}
    style:--skeleton-width={`${width}%`}
    style:--shimmer-duration={`${duration}s`}
    style:--shimmer-delay={`${delay}s`}
    data-variant={variant === 'sketch' ? variant : undefined}
    {...rest}
  >
    {#if variant === 'sketch'}
      <div class="absolute inset-0 overflow-hidden rounded-lg bg-kumo-recessed">
        <div class="sketch-shimmer absolute inset-0 bg-linear-to-r from-transparent via-kumo-contrast/8 to-transparent motion-reduce:animate-none"></div>
      </div>
      <div class="absolute -inset-x-1 top-0 h-px bg-kumo-fill"></div>
      <div class="absolute -inset-x-1 bottom-0 h-px bg-kumo-fill"></div>
      <div class="absolute -inset-y-1 left-0 w-px bg-kumo-fill"></div>
      <div class="absolute -inset-y-1 right-0 w-px bg-kumo-fill"></div>
      <div class="absolute inset-0 rounded-lg border border-kumo-interact"></div>
    {/if}
  </div>
{/snippet}

{#if blockHeight !== undefined}
  <div class="flex items-center" style:height={height}>
    {@render line()}
  </div>
{:else}
  {@render line()}
{/if}

<style>
  @keyframes shimmer {
    0% {
      transform: translateX(-100%);
    }

    100% {
      transform: translateX(100%);
    }
  }

  @layer base {
    .sketch-shimmer {
      animation: shimmer var(--shimmer-duration, 1.5s) var(--shimmer-delay, 0s) infinite ease-in-out;
    }

    :global(.skeleton-line) {
      position: relative;
      overflow: hidden;
      border-radius: 2px;
      height: 0.5rem;
      width: var(--skeleton-width);
      background-color: #f3f4f6;
    }

    :global(.skeleton-line::after) {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      animation: shimmer var(--shimmer-duration, 1.5s) var(--shimmer-delay, 0s) infinite ease-in-out;
      content: '';
      background: linear-gradient(90deg, rgb(0 0 0 / 0%) 0%, rgb(0 0 0 / 8%) 50%, rgb(0 0 0 / 0%) 100%);
    }

    :global([data-mode='dark'] .skeleton-line) {
      background-color: rgb(255 255 255 / 6%);
    }

    :global([data-mode='dark'] .skeleton-line::after) {
      background: linear-gradient(90deg, rgb(255 255 255 / 0%) 0%, rgb(255 255 255 / 5%) 50%, rgb(255 255 255 / 0%) 100%);
    }
  }
</style>
