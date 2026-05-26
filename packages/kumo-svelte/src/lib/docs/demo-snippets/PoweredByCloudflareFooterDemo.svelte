<script lang="ts">
  import { CloudflareLogo, DropdownMenu } from '$lib';
  import { ArrowSquareOut as ExternalLink, Cloud, Code as Code2, Copy, Download } from 'phosphor-svelte';
  import { generateCloudflareLogoSvg } from '$lib/components/cloudflare-logo';
  import { PoweredByCloudflare } from '$lib/components/cloudflare-logo';

  let copiedCloudflareLogo = $state<string | undefined>();

  async function copyCloudflareLogo(variant: 'glyph' | 'full') {
      await navigator.clipboard.writeText(generateCloudflareLogoSvg({ variant }));
      copiedCloudflareLogo = variant;
      setTimeout(() => {
        copiedCloudflareLogo = undefined;
      }, 2000);
    }
</script>

<div class="flex min-h-24 w-full items-center justify-center">

      <PoweredByCloudflare />
    
</div>
