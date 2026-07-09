<script lang="ts">
  import { SensitiveInput } from 'kumo-svelte/components/sensitive-input';

  const sizes = ['xs', 'sm', 'base', 'lg'] as const;
</script>

<div class="flex flex-col gap-4">
  {#each sizes as size (size)}
    <div class="flex items-center gap-2">
      <span class="w-12 text-sm text-kumo-subtle">{size}</span>
      <SensitiveInput
        label={`${size} size`}
        {size}
        defaultValue="secret-api-key-123"
      />
    </div>
  {/each}
</div>
