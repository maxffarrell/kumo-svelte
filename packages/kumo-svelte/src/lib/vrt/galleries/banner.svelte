<script lang="ts">
  import { Banner } from '$lib/components/banner';
  import Scenario from '$lib/vrt/Scenario.svelte';
  import { Info, WarningCircle, XCircle } from 'phosphor-svelte';

  const variants = ['default', 'alert', 'error', 'secondary'] as const;
</script>

{#each variants as variant (variant)}
  <Scenario id={`variant-${variant}`} label={variant}>
    <Banner {variant} title="Banner title" description="Supporting description text." />
  </Scenario>
{/each}

<Scenario id="default-with-icon" label="default with icon">
  <Banner
    variant="default"
    icon={Info}
    title="Update available"
    description="A new version is ready to install."
  />
</Scenario>

<Scenario id="alert-with-icon" label="alert with icon">
  <Banner
    variant="alert"
    icon={WarningCircle}
    title="Review required"
    description="Please review your billing information."
  />
</Scenario>

<Scenario id="error-with-icon" label="error with icon">
  <Banner
    variant="error"
    icon={XCircle}
    title="Save failed"
    description="We couldn't save your changes."
  />
</Scenario>

<Scenario id="description-only" label="description only">
  <Banner variant="default" description="Description without a title." />
</Scenario>

<Scenario id="legacy-children" label="legacy children">
  <Banner variant="alert" icon={WarningCircle}>Review your billing information.</Banner>
</Scenario>

<Scenario id="legacy-text" label="legacy text prop">
  <Banner variant="secondary" text="Simple banner message." />
</Scenario>

<Scenario id="with-action" label="with action">
  <Banner variant="default" title="Session expiring" description="Your session will expire soon.">
    {#snippet action()}
      <button type="button" class="text-sm font-medium underline">Extend</button>
    {/snippet}
  </Banner>
</Scenario>
