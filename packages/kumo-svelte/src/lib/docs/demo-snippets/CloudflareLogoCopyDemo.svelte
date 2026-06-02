<script lang="ts">
  import { CloudflareLogo, DropdownMenu } from '$lib';
  import { ArrowSquareOut, Cloud, Code, DownloadSimple } from 'phosphor-svelte';
  import { generateCloudflareLogoSvg } from '$lib/components/cloudflare-logo';

  let copied = $state<string | null>(null);

  async function copyToClipboard(text: string, label: string) {
    await navigator.clipboard.writeText(text);
    copied = label;
    setTimeout(() => {
      copied = null;
    }, 2000);
  }
</script>

<div class="flex items-center gap-4">
  <DropdownMenu>
    <DropdownMenu.Trigger>
      <button
        type="button"
        class="flex items-center gap-2 rounded-lg bg-black px-4 py-3 text-white transition-opacity hover:opacity-80"
      >
        <CloudflareLogo variant="glyph" color="white" class="w-8" />
        <span class="font-medium">Logo</span>
      </button>
    </DropdownMenu.Trigger>
    <DropdownMenu.Content>
      <DropdownMenu.Item
        icon={Cloud}
        onSelect={() => copyToClipboard(generateCloudflareLogoSvg({ variant: 'glyph' }), 'glyph')}
      >
        {copied === 'glyph' ? 'Copied!' : 'Copy logo as SVG'}
      </DropdownMenu.Item>
      <DropdownMenu.Item
        icon={Code}
        onSelect={() => copyToClipboard(generateCloudflareLogoSvg({ variant: 'full' }), 'full')}
      >
        {copied === 'full' ? 'Copied!' : 'Copy full logo as SVG'}
      </DropdownMenu.Item>
      <DropdownMenu.Item
        icon={DownloadSimple}
        onSelect={() => window.open('https://www.cloudflare.com/press-kit/', '_blank', 'noopener')}
      >
        Download brand assets
      </DropdownMenu.Item>
      <DropdownMenu.Separator />
      <DropdownMenu.Item
        icon={ArrowSquareOut}
        onSelect={() => window.open('https://www.cloudflare.com/brand-assets/', '_blank', 'noopener')}
      >
        Visit brand guidelines
      </DropdownMenu.Item>
    </DropdownMenu.Content>
  </DropdownMenu>

  <span class="text-sm text-kumo-subtle">Click to open the brand assets menu</span>
</div>
