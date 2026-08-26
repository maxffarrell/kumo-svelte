<script lang="ts">
  import { Text } from '$lib/components/text';
  import Scenario from '$lib/vrt/Scenario.svelte';

  const copyVariants = ['body', 'secondary', 'success', 'error'] as const;
  const sizes = ['xs', 'sm', 'base', 'lg'] as const;
</script>

<Scenario id="heading1" label="heading1">
  <Text variant="heading1" as="h1">Page Title</Text>
</Scenario>

<Scenario id="heading2" label="heading2">
  <Text variant="heading2" as="h2">Section Title</Text>
</Scenario>

<Scenario id="heading3" label="heading3">
  <Text variant="heading3" as="h3">Subsection</Text>
</Scenario>

<Scenario id="heading-decorative" label="heading decorative span">
  <Text variant="heading2" as="span">Decorative heading</Text>
</Scenario>

{#each copyVariants as variant (variant)}
  <Scenario id={`variant-${variant}`} label={variant}>
    <Text {variant}>Sample {variant} text</Text>
  </Scenario>
{/each}

{#each sizes as size (size)}
  <Scenario id={`size-${size}`} label={`body size ${size}`}>
    <Text variant="body" {size}>Body text at {size}</Text>
  </Scenario>
{/each}

<Scenario id="body-bold" label="body bold">
  <Text variant="body" bold>Bold body text</Text>
</Scenario>

<Scenario id="truncate" label="truncate">
  <div class="w-32">
    <Text variant="body" truncate>Long text that should truncate with ellipsis</Text>
  </div>
</Scenario>

<Scenario id="mono" label="mono">
  <Text variant="mono">console.log('hello')</Text>
</Scenario>

<Scenario id="mono-secondary" label="mono-secondary">
  <Text variant="mono-secondary">// comment</Text>
</Scenario>

<Scenario id="mono-lg" label="mono lg">
  <Text variant="mono" size="lg">larger mono</Text>
</Scenario>

<Scenario id="as-code" label="as code">
  <Text variant="mono" as="code">const x = 1</Text>
</Scenario>
