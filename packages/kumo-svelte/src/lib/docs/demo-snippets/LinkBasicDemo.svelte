<script lang="ts">
  import { Link } from 'kumo-svelte';
</script>

<div class="grid gap-x-6 gap-y-4 text-base md:grid-cols-3">
  <Link href="#">Default inline link</Link>
  <Link href="#" variant="current">Current color link</Link>
  <Link href="#" variant="plain">Plain inline link</Link>
</div>
