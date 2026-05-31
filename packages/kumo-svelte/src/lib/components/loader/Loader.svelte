<script lang="ts" module>
  export { SkeletonLine };

  export const KUMO_LOADER_VARIANTS = {
    size: {
      xs: {
        value: 12,
        description: 'Extra small loader for compact controls'
      },
      sm: {
        value: 16,
        description: 'Small loader for inline use'
      },
      base: {
        value: 24,
        description: 'Default loader size'
      },
      lg: {
        value: 32,
        description: 'Large loader for prominent loading states'
      }
    }
  } as const;

  export const KUMO_LOADER_DEFAULT_VARIANTS = {
    size: 'base'
  } as const;

  export type KumoLoaderSize = keyof typeof KUMO_LOADER_VARIANTS.size;

  export function loaderVariants(size: KumoLoaderSize | number = KUMO_LOADER_DEFAULT_VARIANTS.size): number {
    if (typeof size === 'number') return size;
    return KUMO_LOADER_VARIANTS.size[size]?.value ?? KUMO_LOADER_VARIANTS.size[KUMO_LOADER_DEFAULT_VARIANTS.size].value;
  }

  export interface SkeletonLineProps {
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

  const getRandomWidth = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1) + min);

  const getRandomFloat = (min: number, max: number) => (Math.random() * (max - min) + min).toFixed(2);

  function getSkeletonLineStyle({
    minWidth = 30,
    maxWidth = 100,
    minDuration = 1.3,
    maxDuration = 1.7,
    minDelay = 0,
    maxDelay = 0.5
  }: SkeletonLineProps) {
    return [
      `--skeleton-width: ${getRandomWidth(minWidth, maxWidth)}%`,
      `--shimmer-duration: ${getRandomFloat(minDuration, maxDuration)}s`,
      `--shimmer-delay: ${getRandomFloat(minDelay, maxDelay)}s`
    ].join(';');
  }

  function getSkeletonLineHeight(blockHeight: SkeletonLineProps['blockHeight']) {
    return typeof blockHeight === 'number' ? `${blockHeight}px` : blockHeight;
  }
</script>

<script lang="ts">
  interface Props {
    class?: string;
    size?: KumoLoaderSize | number;
    'aria-label'?: string;
    [key: string]: unknown;
  }

  let {
    class: className,
    size = KUMO_LOADER_DEFAULT_VARIANTS.size,
    'aria-label': ariaLabel = 'Loading',
    ...rest
  }: Props = $props();

  let sizeValue = $derived(loaderVariants(size));
</script>

{#snippet SkeletonLine({
  minWidth = 30,
  maxWidth = 100,
  minDuration = 1.3,
  maxDuration = 1.7,
  minDelay = 0,
  maxDelay = 0.5,
  blockHeight,
  class: className,
  ...rest
}: SkeletonLineProps)}
  {#if blockHeight !== undefined}
    <div class="flex items-center" style:height={getSkeletonLineHeight(blockHeight)}>
      <div
        class={['skeleton-line', className].filter(Boolean).join(' ')}
        style={getSkeletonLineStyle({ minWidth, maxWidth, minDuration, maxDuration, minDelay, maxDelay })}
        {...rest}
      ></div>
    </div>
  {:else}
    <div
      class={['skeleton-line', className].filter(Boolean).join(' ')}
      style={getSkeletonLineStyle({ minWidth, maxWidth, minDuration, maxDuration, minDelay, maxDelay })}
      {...rest}
    ></div>
  {/if}
{/snippet}

<svg
  width="24"
  height="24"
  viewBox="0 0 24 24"
  xmlns="http://www.w3.org/2000/svg"
  stroke="currentColor"
  class={className}
  style:height={`${sizeValue}px`}
  style:width={`${sizeValue}px`}
  role="status"
  aria-label={ariaLabel}
  {...rest}
>
  <circle cx="12" cy="12" r="9.5" fill="none" stroke-width="2" stroke-linecap="round">
    <animateTransform
      attributeName="transform"
      type="rotate"
      from="0 12 12"
      to="360 12 12"
      dur="2s"
      repeatCount="indefinite"
    />
    <animate
      attributeName="stroke-dasharray"
      values="0 150;42 150;42 150"
      keyTimes="0;0.5;1"
      dur="1.5s"
      repeatCount="indefinite"
    />
    <animate
      attributeName="stroke-dashoffset"
      values="0;-16;-59"
      keyTimes="0;0.5;1"
      dur="1.5s"
      repeatCount="indefinite"
    />
  </circle>
  <circle cx="12" cy="12" r="9.5" fill="none" opacity="0.1" stroke-width="2" stroke-linecap="round" />
</svg>

<style>
  @keyframes shimmer {
    0% {
      transform: translateX(-100%);
    }

    100% {
      transform: translateX(100%);
    }
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
</style>
