<script lang="ts">
  import { Banner, Text } from '$lib';
  import { Info } from 'phosphor-svelte';
</script>

<Banner icon={Info} title="Custom content supported">
  {#snippet description()}
    <Text DANGEROUS_className="text-inherit">
      This banner supports <strong>custom content</strong> with Text.
    </Text>
  {/snippet}
</Banner>
