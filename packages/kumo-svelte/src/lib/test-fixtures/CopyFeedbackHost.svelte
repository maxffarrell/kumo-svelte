<script lang="ts">
  import { createCopyFeedback } from "#lib/utils/copy-feedback.svelte.js";
  let { copy }: { copy: () => Promise<void> } = $props();
  const feedback = createCopyFeedback(1000);
</script>

<button onclick={() => feedback.runCopy(copy).catch(() => {})}
  >{feedback.copied ? "Copied" : "Copy"}</button
>
