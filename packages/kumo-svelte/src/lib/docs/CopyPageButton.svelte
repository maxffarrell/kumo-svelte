<script lang="ts">
  import CaretDownIcon from 'phosphor-svelte/lib/CaretDownIcon';
  import CheckIcon from 'phosphor-svelte/lib/CheckIcon';
  import CopySimpleIcon from 'phosphor-svelte/lib/CopySimpleIcon';
  import FileMdIcon from 'phosphor-svelte/lib/FileMdIcon';
  import LinkSimpleIcon from 'phosphor-svelte/lib/LinkSimpleIcon';
  import OpenAiLogo from 'phosphor-svelte/lib/OpenAiLogo';
  import { Button } from '$lib/components/button';
  import { DropdownMenu } from '$lib/components/dropdown-menu';
  import ClaudeIcon from './ClaudeIcon.svelte';

  interface Props {
    align?: 'start' | 'center' | 'end';
  }

  let { align = 'end' }: Props = $props();
  let copied = $state(false);
  let open = $state(false);

  function getMarkdownUrl() {
    const url = new URL(window.location.href);
    let path = url.pathname.replace(/\/+$/, '');
    path = path.replace(/^\/changelog\/.*/, '/changelog');
    return `${url.origin}${path}/page.md`;
  }

  function onCopySuccess() {
    copied = true;
    setTimeout(() => {
      copied = false;
    }, 2000);
  }

  async function handleCopyMarkdown() {
    onCopySuccess();

    try {
      const response = await fetch(getMarkdownUrl());
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      await navigator.clipboard.writeText(await response.text());
    } catch (error) {
      console.error('Failed to copy page as Markdown:', error);
    }
  }

  async function handleCopyPageLink() {
    try {
      await navigator.clipboard.writeText(window.location.href);
    } catch (error) {
      console.error('Failed to copy page link:', error);
    }
  }

  function handleViewMarkdown() {
    window.open(getMarkdownUrl(), '_blank');
    open = false;
  }

  function handleOpenAIPrompt(baseUrl: string) {
    window.open(getAIPromptUrl(baseUrl), '_blank');
    open = false;
  }

  function getAIPromptUrl(baseUrl: string) {
    const prompt = encodeURIComponent(
      `Read through this Kumo documentation: ${getMarkdownUrl()}. I'll need your help to understand it, so be prepared to explain concepts, share examples, and assist with debugging.`
    );
    return `${baseUrl}?q=${prompt}`;
  }
</script>

<div class="flex items-center" data-copy-ignore>
  <DropdownMenu bind:open>
    <Button
      class="gap-1.5 rounded-r-none border-r-0"
      size="sm"
      variant="secondary"
      onclick={handleCopyMarkdown}
    >
      {#if copied}
        <CheckIcon size={16} />
      {:else}
        <CopySimpleIcon size={16} />
      {/if}
      <span>Copy page</span>
    </Button>

    <DropdownMenu.Trigger>
      <Button
        variant="secondary"
        size="sm"
        shape="square"
        aria-label="Copy page options"
        class="rounded-l-none"
      >
        <CaretDownIcon size={12} />
      </Button>
    </DropdownMenu.Trigger>

    <DropdownMenu.Content {align}>
      <DropdownMenu.Item icon={LinkSimpleIcon} onSelect={handleCopyPageLink}>Copy page link</DropdownMenu.Item>
      <DropdownMenu.Item icon={FileMdIcon} onSelect={handleViewMarkdown}>View Page as Markdown</DropdownMenu.Item>
      <DropdownMenu.Separator />
      <DropdownMenu.Item icon={ClaudeIcon} onSelect={() => handleOpenAIPrompt('https://claude.ai/new')}>
        Open in Claude
      </DropdownMenu.Item>
      <DropdownMenu.Item icon={OpenAiLogo} onSelect={() => handleOpenAIPrompt('https://chatgpt.com')}>
        Open in ChatGPT
      </DropdownMenu.Item>
    </DropdownMenu.Content>
  </DropdownMenu>
</div>
