<script lang="ts">
  import { Badge, Input, LayerCard, Tabs } from 'kumo-svelte';

  const ORIGINS = [
    { origin: 'challenges.cloudflare.com', s2xx: 1, s4xx: 0, duration: '95.4ms' },
    { origin: 'Unknown', s2xx: 19, s4xx: 7, duration: '463.7ms' },
    { origin: 'api.example.com', s2xx: 42, s4xx: 3, duration: '128.1ms' }
  ];

  type StatusFilter = 'all' | '2xx' | '3xx' | '4xx' | '5xx';

  let filter: StatusFilter = $state('all');
  let search = $state('');

  const tabs = [
    { value: 'all', label: 'All' },
    { value: '2xx', label: '2xx' },
    { value: '3xx', label: '3xx' },
    { value: '4xx', label: '4xx' },
    { value: '5xx', label: '5xx' }
  ];

  const filtered = $derived(
    ORIGINS.filter((origin) => {
      if (filter === '2xx' && origin.s2xx === 0) return false;
      if (filter === '4xx' && origin.s4xx === 0) return false;
      if (search && !origin.origin.toLowerCase().includes(search.toLowerCase())) return false;
      return true;
    })
  );
</script>

<LayerCard class="w-full max-w-[540px]">
  <LayerCard.Secondary>Subrequests</LayerCard.Secondary>

  <LayerCard.Primary>
    <div class="mb-2 flex items-center gap-3">
      <Input
        size="sm"
        placeholder="Filter origins..."
        aria-label="Filter origins"
        bind:value={search}
        class="min-w-0 flex-1"
      />
      <Tabs
        variant="segmented"
        size="sm"
        class="shrink-0"
        {tabs}
        bind:value={filter}
      />
    </div>

    <div class="-mx-1 text-sm">
      <div
        class="grid grid-cols-[1fr_auto_auto] gap-x-4 border-b border-kumo-fill px-1 pb-2 text-xs font-medium text-kumo-subtle"
      >
        <span>Origin</span>
        <span class="w-28 text-right">Requests</span>
        <span class="w-20 text-right">Duration</span>
      </div>

      {#each filtered as row, i (row.origin)}
        <div
          class={[
            'grid grid-cols-[1fr_auto_auto] items-center gap-x-4 px-1 py-2.5',
            i < filtered.length - 1 && 'border-b border-kumo-hairline'
          ]}
        >
          <span class="truncate font-medium text-kumo-default">{row.origin}</span>
          <div class="flex w-28 items-center justify-end gap-1.5">
            {#if row.s2xx > 0}
              <Badge variant="success">2xx {row.s2xx}</Badge>
            {/if}
            {#if row.s4xx > 0}
              <Badge variant="error">4xx {row.s4xx}</Badge>
            {/if}
          </div>
          <span class="w-20 text-right text-kumo-subtle">{row.duration}</span>
        </div>
      {/each}
    </div>

    <div class="-mx-1 border-t border-kumo-fill pt-2 text-xs text-kumo-subtle">
      Showing {filtered.length} of {ORIGINS.length}
    </div>
  </LayerCard.Primary>
</LayerCard>
