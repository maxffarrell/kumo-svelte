<script lang="ts">
  import { Button } from 'kumo-svelte/components/button';
  import ExternalLink from 'phosphor-svelte/lib/ArrowSquareOut';
</script>

<div class="flex flex-wrap items-center gap-3">
  <Button href="/components/link" variant="secondary">Read Link docs</Button>
  <Button href="https://developers.cloudflare.com" variant="ghost">
    Cloudflare Docs <ExternalLink class="size-4" />
  </Button>
</div>
