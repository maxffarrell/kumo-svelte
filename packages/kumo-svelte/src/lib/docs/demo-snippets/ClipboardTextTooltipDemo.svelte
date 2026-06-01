<script lang="ts">
  import { ClipboardText } from '$lib';
</script>

<div class="flex min-h-24 w-full items-center justify-center">
  <ClipboardText
    text="npx kumo add button"
    tooltip={{ text: 'Copy', copiedText: 'Copied!', side: 'top' }}
  />
</div>
