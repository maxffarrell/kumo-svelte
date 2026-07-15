<script lang="ts">
  import { Badge } from '$lib/components/badge';
  import Scenario from '$lib/vrt/Scenario.svelte';

  const filledVariants = [
    'primary',
    'secondary',
    'error',
    'warning',
    'success',
    'destructive',
    'info',
    'beta',
    'outline',
    'red',
    'green',
    'neutral',
    'orange',
    'purple',
    'teal',
    'teal-subtle',
    'blue'
  ] as const;

  const dotVariants = ['success', 'warning', 'error', 'neutral'] as const;
</script>

{#each filledVariants as variant (variant)}
  <Scenario id={`filled-${variant}`} label={`filled ${variant}`}>
    <Badge {variant}>{variant}</Badge>
  </Scenario>
{/each}

{#each dotVariants as variant (variant)}
  <Scenario id={`dot-${variant}`} label={`dot ${variant}`}>
    <Badge {variant} appearance="dot">{variant}</Badge>
  </Scenario>
{/each}

<Scenario id="dot-primary-no-dot" label="dot primary (no indicator)">
  <Badge variant="primary" appearance="dot">No dot</Badge>
</Scenario>
