<script lang="ts">
  import { Banner } from '$lib';
  import { CheckCircle, Info, Warning, WarningCircle } from 'phosphor-svelte';
</script>

<div class="w-full space-y-3">
  <Banner icon={Info} title="Information" description="Neutral system context uses the info status tokens." />
  <Banner icon={CheckCircle} title="Deployment complete" description="Successful states use success tokens for indicators." />
  <Banner icon={Warning} variant="alert" title="Usage approaching limit" description="Warnings use attention tokens with tinted surfaces." />
  <Banner icon={WarningCircle} variant="error" title="Request failed" description="Destructive states use danger tokens for icon and contrast." />
</div>
