<script lang="ts">
  import { ClipboardText } from '$lib';
</script>

<div class="flex min-h-24 w-full items-center justify-center">
  <ClipboardText value="wrangler deploy --env production" tooltip={{ text: 'Copy command', copiedText: 'Copied command' }} />
</div>
