<script lang="ts">
  import { createCopyFeedback } from '#lib/utils/copy-feedback.svelte.js';
  import Check from 'phosphor-svelte/lib/Check';
  import Copy from 'phosphor-svelte/lib/Copy';
  import { Button } from '#lib/components/button/index.js';

  interface Props {
    text: string;
    [key: string]: unknown;
  }

  let { text, ...rest }: Props = $props();
  const feedback = createCopyFeedback(2000);
  const isCopied = $derived(feedback.copied);

  async function handleCopyDeeplink() { if (!text) return; try { await feedback.runCopy(() => navigator.clipboard.writeText(text)); } catch (error) { console.error('Failed to copy deeplink:', error); } }
</script>

<Button
  variant="ghost"
  shape="square"
  size="sm"
  class="opacity-0 transition-[opacity] group-hover:opacity-100"
  onclick={handleCopyDeeplink}
  title="Click to copy"
  aria-label="Copy"
  {...rest}
>
  {#if isCopied}
    <Check class="text-kumo-success" weight="bold" />
  {:else}
    <Copy />
  {/if}
</Button>
