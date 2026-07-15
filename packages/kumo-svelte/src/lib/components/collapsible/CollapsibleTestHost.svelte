<script lang="ts">
  import CollapsibleDefaultPanel from './CollapsibleDefaultPanel.svelte';
  import CollapsibleDefaultTrigger from './CollapsibleDefaultTrigger.svelte';
  import CollapsibleRoot from './CollapsibleRoot.svelte';

  interface Props {
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
  }

  let { open = $bindable(false), onOpenChange }: Props = $props();
</script>

<CollapsibleRoot bind:open {onOpenChange}>
  <CollapsibleDefaultTrigger>Show details</CollapsibleDefaultTrigger>
  <CollapsibleDefaultPanel>
    <p>Hidden content revealed when expanded.</p>
  </CollapsibleDefaultPanel>
</CollapsibleRoot>
