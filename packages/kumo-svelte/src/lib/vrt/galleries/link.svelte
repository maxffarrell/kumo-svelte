<script lang="ts">
  import { Link, LinkExternalIcon } from '$lib/components/link';
  import Scenario from '$lib/vrt/Scenario.svelte';

  const variants = ['inline', 'current', 'plain'] as const;
</script>

{#each variants as variant (variant)}
  <Scenario id={`variant-${variant}`} label={variant}>
    <Link href="#" {variant}>Learn more</Link>
  </Scenario>
{/each}

<Scenario id="external" label="external">
  <Link href="https://cloudflare.com" target="_blank" rel="noopener noreferrer">
    Visit Cloudflare
    <LinkExternalIcon />
  </Link>
</Scenario>

<Scenario id="in-paragraph" label="in paragraph">
  <p class="max-w-md text-base text-kumo-default">
    Cloudflare protects and accelerates web applications.
    <Link href="/docs" variant="inline">Read the documentation</Link>
    for setup details, or
    <Link href="https://cloudflare.com" target="_blank" rel="noopener noreferrer" variant="plain">
      visit our website
      <LinkExternalIcon />
    </Link>.
  </p>
</Scenario>

<Scenario id="current-in-paragraph" label="current in paragraph">
  <p class="text-base text-kumo-brand">
    Parent-colored text with a
    <Link href="/dashboard" variant="current">current-color link</Link>
    inline.
  </p>
</Scenario>

<Scenario id="hover-inline" label="hover: inline" interact={[{ type: 'hover' }]}>
  <Link href="#" variant="inline">Hover me</Link>
</Scenario>

<Scenario id="hover-plain" label="hover: plain" interact={[{ type: 'hover' }]}>
  <Link href="#" variant="plain">Hover me</Link>
</Scenario>

<Scenario id="focus-inline" label="focus: inline" interact={[{ type: 'focus' }]}>
  <Link href="#" variant="inline">Focus me</Link>
</Scenario>
