<script lang="ts">
  import { ToastPreview } from '$lib/components/toasty';
  import Scenario from '$lib/vrt/Scenario.svelte';

  const variants = ['default', 'success', 'error', 'info', 'warning'] as const;
</script>

{#each variants as variant (variant)}
  <Scenario id={`variant-${variant}`} label={variant}>
    <ToastPreview
      {variant}
      title="Notification title"
      description="Supporting description text for the toast message."
    />
  </Scenario>
{/each}

<Scenario id="with-action" label="with action">
  <ToastPreview
    variant="default"
    title="Update available"
    description="A new version is ready to install."
    actions={[{ children: 'Update', variant: 'secondary' }]}
  />
</Scenario>

<Scenario id="with-close" label="with close">
  <ToastPreview
    variant="success"
    title="Changes saved"
    description="Your settings were updated successfully."
  />
</Scenario>
