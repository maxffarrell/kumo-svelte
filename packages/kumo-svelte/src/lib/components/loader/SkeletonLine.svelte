<script lang="ts" module>
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
  let {
    minWidth = 30,
    maxWidth = 100,
    minDuration = 1.3,
    maxDuration = 1.7,
    minDelay = 0,
    maxDelay = 0.5,
    blockHeight,
    class: className,
    ...rest
  }: SkeletonLineProps = $props();
</script>

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
