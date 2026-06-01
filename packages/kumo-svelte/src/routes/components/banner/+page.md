---
title: "Banner"
description: "Displays contextual inline messages for informational, alert, or error states."
sourceFile: "components/banner"
---

<script>
  import ComponentExample from '$lib/docs/ComponentExample.svelte';
  import ComponentSection from '$lib/docs/ComponentSection.svelte';
  import PropsTable from '$lib/docs/PropsTable.svelte';
</script>

<!-- Hero Demo -->

<ComponentSection>
  <ComponentExample demo="BannerVariantsDemo" />
</ComponentSection>

<!-- Installation -->

<ComponentSection>

## Installation

### Barrel

```typescript
import { Banner } from 'kumo-svelte';
```

### Granular

```typescript
import { Banner } from 'kumo-svelte/components/banner';
```

</ComponentSection>

<!-- Usage -->

<ComponentSection>

## Usage

```svelte
<script lang="ts">
import { Banner } from "kumo-svelte";
import { Info } from "phosphor-svelte";
</script>

<Banner
  icon={Info}
  title="Update available"
  description="A new version is ready to install."
/>
```

</ComponentSection>

<!-- Examples -->

<ComponentSection>

## Examples

### Variants

#### Default

<ComponentExample demo="BannerDefaultDemo" />

#### Alert

<ComponentExample demo="BannerAlertDemo" />

#### Error

<ComponentExample demo="BannerErrorDemo" />

#### Secondary

<ComponentExample demo="BannerSecondaryDemo" />

### With icon

<ComponentExample demo="BannerWithIconDemo" />

### With action

  <ComponentExample demo="BannerWithActionDemo" />

### With multiple actions

  <ComponentExample demo="BannerWithActionsDemo" />

### Custom content

  <ComponentExample demo="BannerCustomContentDemo" />
</ComponentSection>

<!-- API Reference -->

<ComponentSection>

## API Reference

  <PropsTable component="Banner" />
</ComponentSection>
