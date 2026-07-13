<script lang="ts">
  import Check from 'phosphor-svelte/lib/Check';
  import Copy from 'phosphor-svelte/lib/Copy';
  import { Button } from '$lib/components/button';

  interface Props {
    text: string;
    [key: string]: unknown;
  }

  let { text, ...rest }: Props = $props();
  let isCopied = $state(false);
  let timeoutId: ReturnType<typeof setTimeout> | undefined;

  async function handleCopyDeeplink() {
    if (!text) return;

    try {
      await navigator.clipboard.writeText(text);
      isCopied = true;
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        isCopied = false;
      }, 2000);
    } catch (err) {
      console.error('Failed to copy deeplink:', err);
    }
  }
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
