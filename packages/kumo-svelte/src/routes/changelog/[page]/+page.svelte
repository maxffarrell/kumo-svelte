<script lang="ts">
  import ChangelogPage from '../+page.svelte';
  import type { ChangelogVersion } from '#lib/docs/changelog.js';

  interface Props {
    data: {
      page: number;
      perPage: number;
      totalPages: number;
      totalVersions: number;
      versions: ChangelogVersion[];
    };
  }

  let { data }: Props = $props();
</script>

<ChangelogPage {data} />
