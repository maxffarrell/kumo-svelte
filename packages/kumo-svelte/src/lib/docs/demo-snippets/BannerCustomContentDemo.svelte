<script lang="ts">
  import { Banner } from '$lib/components/banner';
  import { Text } from '$lib/components/text';
  import Info from 'phosphor-svelte/lib/Info';
</script>

<Banner icon={Info} title="Custom content supported">
  {#snippet description()}
    <Text DANGEROUS_className="text-inherit">
      This banner supports <strong>custom content</strong> with Text.
    </Text>
  {/snippet}
</Banner>
