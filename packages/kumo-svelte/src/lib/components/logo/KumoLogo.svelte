<script lang="ts">
  import { cn } from '#lib/utils/cn.js';
  interface Props { class?: string; title?: string; wordmark?: boolean; [key: string]: unknown; }
  let { class: className, title = 'Kumo Svelte', wordmark = true, ...rest }: Props = $props();
</script>

<svg class={cn('h-6 w-auto text-kumo-default', className)} viewBox={wordmark ? '0 0 176 32' : '0 0 48 32'} role="img" aria-label={title} {...rest}>
  <title>{title}</title>
  <g aria-hidden="true">
    <path fill="#f6821f" d="M33.204 20.4c.161-.426.218-.884.165-1.336a3.14 3.14 0 0 0-.465-1.264 4.2 4.2 0 0 0-2.1-1.1l-17.4-.2c-.1 0-.2-.1-.3-.1a.25.25 0 0 1 0-.3c.1-.2.2-.3.4-.3l17.5-.2a8.04 8.04 0 0 0 5.1-3.8l1-2.6c0-.1.1-.2 0-.3a11.6 11.6 0 0 0-21.9-1.2 5.76 5.76 0 0 0-3.6-1 5.37 5.37 0 0 0-4.6 4.6 5.3 5.3 0 0 0 .1 1.8 7.3 7.3 0 0 0-7.1 7.3c-.016.37.017.74.1 1.1a.32.32 0 0 0 .3.3h32.1c.2 0 .4-.1.4-.3l.3-1.1Z" />
    <path fill="#faae40" d="M38.704 9.2h-.5c-.1 0-.2.1-.3.2l-.7 2.4a3.14 3.14 0 0 0 .3 2.6 4.2 4.2 0 0 0 2.1 1.1l3.7.2c.1 0 .2.1.3.1a.25.25 0 0 1 0 .3c-.1.2-.2.3-.4.3l-3.8.2a8.04 8.04 0 0 0-5.1 3.8l-.2.9c-.1.1 0 .3.2.3h13.2a.28.28 0 0 0 .3-.3c.238-.847.372-1.72.4-2.6A9.5 9.5 0 0 0 38.704 9.2Z" />
  </g>
  {#if wordmark}
    <text x="58" y="21.5" fill="currentColor" font-size="18" font-weight="700" font-family="Inter, ui-sans-serif, system-ui, sans-serif" letter-spacing="-.04em">Kumo Svelte</text>
  {/if}
</svg>
