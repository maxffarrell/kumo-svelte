<script lang="ts">
  import { page } from '$app/state';
  import { LinkButton } from '$lib/components/button';

  const notFound = $derived(page.status === 404);
  const title = $derived(notFound ? 'Page not found' : 'Something went wrong');
  const description = $derived(
    notFound
      ? "This page isn't available. It may have moved, been renamed, or been removed."
      : page.error?.message || 'An unexpected error occurred.'
  );
  let reversed = $state(false);
</script>

<svelte:head>
  <title>{title} — Kumo Svelte</title>
  <meta name="description" content={description} />
</svelte:head>

<main class="flex min-h-[calc(100dvh-3rem)] flex-col items-center justify-center px-4 py-12 md:min-h-dvh md:px-8">
  <div class="wireframe-grid w-full max-w-5xl border-x border-dashed border-kumo-hairline">
    <div class="h-16 border-b border-dashed border-kumo-hairline md:h-24"></div>
    <section class="relative grid items-center gap-8 border-b border-dashed border-kumo-hairline p-8 md:grid-cols-[1fr_auto] md:p-14">
      <span class="corner corner-left"></span>
      <span class="corner corner-right"></span>
      <div class="order-2 text-center md:order-1 md:text-left">
        <p class="mb-2 text-sm font-medium text-kumo-subtle">{page.status}</p>
        <h1 class="text-2xl font-semibold text-kumo-default md:text-3xl">{title}</h1>
        <p class="mt-3 max-w-prose text-base leading-relaxed text-kumo-subtle md:text-lg">{description}</p>
        <LinkButton class="mt-6" href="/" variant="secondary">Back to documentation</LinkButton>
      </div>
      <div class="order-1 flex justify-center md:order-2 md:justify-end">
        <button
          class:reversed
          class="not-found-logo-button"
          type="button"
          aria-label="Reverse logo animation"
          aria-pressed={reversed}
          onclick={() => (reversed = !reversed)}
        >
          <svg aria-hidden="true" class="size-32 md:size-44" fill="none" viewBox="0 0 40 40">
            <path
              class="not-found-logo-path"
              d="M12.032 21.368H27.92V22.784H12.032V21.368ZM9.272 24.488H30.728V25.928H9.272V24.488ZM15.872 24.824L17.984 25.208C17.488 25.992 16.936 26.8 16.328 27.632C15.736 28.448 15.176 29.152 14.648 29.744L13.112 29.288C13.448 28.888 13.784 28.424 14.12 27.896C14.472 27.368 14.8 26.84 15.104 26.312C15.408 25.768 15.664 25.272 15.872 24.824ZM10.592 28.76C11.936 28.728 13.512 28.696 15.32 28.664C17.144 28.632 19.08 28.592 21.128 28.544C23.192 28.48 25.248 28.424 27.296 28.376L27.224 29.816C25.24 29.88 23.24 29.952 21.224 30.032C19.208 30.112 17.304 30.176 15.512 30.224C13.72 30.272 12.136 30.32 10.76 30.368L10.592 28.76ZM11.144 9.776H28.832V11.216H11.144V9.776ZM12.704 15.824H17.792V17.072H12.704V15.824ZM12.2 18.584H17.768V19.832H12.2V18.584ZM22.064 18.584H27.872V19.832H22.064V18.584ZM22.064 15.824H27.224V17.072H22.064V15.824ZM19.04 10.328H20.792V20.36H19.04V10.328ZM9.824 12.944H30.2V18.128H28.52V14.36H11.456V18.128H9.824V12.944ZM22.544 26.696L24.056 25.904C24.712 26.304 25.392 26.76 26.096 27.272C26.816 27.784 27.488 28.304 28.112 28.832C28.736 29.344 29.248 29.816 29.648 30.248L28.04 31.112C27.672 30.68 27.184 30.2 26.576 29.672C25.968 29.16 25.312 28.64 24.608 28.112C23.904 27.584 23.216 27.112 22.544 26.696Z"
            />
          </svg>
        </button>
      </div>
    </section>
    <div class="h-16 md:h-24"></div>
  </div>
</main>

<style>
  .wireframe-grid {
    background-image: linear-gradient(to right, color-mix(in oklab, var(--color-kumo-hairline) 45%, transparent) 1px, transparent 1px);
    background-size: 2rem 100%;
  }

  .corner {
    position: absolute;
    bottom: -0.25rem;
    z-index: 1;
    width: 0.4375rem;
    height: 0.4375rem;
    border-radius: 0.09375rem;
    background: var(--color-kumo-canvas);
    box-shadow: 0 0 0 1px var(--color-kumo-line);
  }

  .corner-left { left: -0.25rem; }
  .corner-right { right: -0.25rem; }

  .not-found-logo-button {
    display: flex;
    appearance: none;
    padding: 0;
    border: 0;
    color: var(--color-kumo-inactive);
    cursor: pointer;
    background: transparent;
  }

  .not-found-logo-button:focus-visible {
    outline: 2px solid var(--color-kumo-brand);
    outline-offset: 2px;
  }

  .not-found-logo-path {
    stroke: currentColor;
    stroke-width: 0.7;
    stroke-dasharray: 3.333 3.333;
    vector-effect: non-scaling-stroke;
    animation: dash-move 600ms linear infinite;
  }

  .not-found-logo-button.reversed .not-found-logo-path { animation-direction: reverse; }

  @keyframes dash-move { to { stroke-dashoffset: 6.666; } }

  @media (prefers-reduced-motion: reduce) {
    .not-found-logo-path { animation: none; stroke-dashoffset: 0; }
  }
</style>
