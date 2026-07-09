<script lang="ts">
  import { Input } from 'kumo-svelte/components/input';
</script>

<div class="flex flex-col gap-4">
  <Input label="API Key (default)" type="password" placeholder="sk_live_..." />
  <Input
    label="API Key (passwordManagerIgnore)"
    type="password"
    placeholder="sk_live_..."
    passwordManagerIgnore
  />
</div>
