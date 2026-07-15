<script lang="ts">
  import { Input, Textarea } from '$lib/components/input';
  import { InputArea } from '$lib/components/input-area';
  import Scenario from '$lib/vrt/Scenario.svelte';
  import { EnvelopeSimple } from 'phosphor-svelte';

  const sizes = ['xs', 'sm', 'base', 'lg'] as const;
</script>

<Scenario id="default" label="default">
  <Input aria-label="Email" placeholder="you@example.com" class="w-[280px]" />
</Scenario>

<Scenario id="with-label" label="with label">
  <Input label="Email" placeholder="you@example.com" class="w-[280px]" />
</Scenario>

<Scenario id="with-description" label="with description">
  <Input
    label="Password"
    description="Must be at least 8 characters"
    placeholder="Enter password"
    class="w-[280px]"
  />
</Scenario>

<Scenario id="error" label="error">
  <Input label="Email" error="Invalid email address" placeholder="you@example.com" class="w-[280px]" />
</Scenario>

<Scenario id="disabled" label="disabled">
  <Input aria-label="Email" disabled placeholder="you@example.com" class="w-[280px]" />
</Scenario>

{#each sizes as size (size)}
  <Scenario id={`size-${size}`} label={`size ${size}`}>
    <Input aria-label="Email" {size} placeholder="you@example.com" class="w-[280px]" />
  </Scenario>
{/each}

<Scenario id="textarea-default" label="textarea default">
  <Textarea aria-label="Notes" placeholder="Add notes..." class="w-[280px]" />
</Scenario>

<Scenario id="textarea-with-label" label="textarea with label">
  <Textarea label="Description" placeholder="Describe your project..." class="w-[280px]" />
</Scenario>

<Scenario id="textarea-error" label="textarea error">
  <Textarea label="Bio" error="Bio is required" placeholder="Tell us about yourself" class="w-[280px]" />
</Scenario>

<Scenario id="input-area-default" label="input area default">
  <InputArea aria-label="Message" placeholder="Write a message..." class="w-[280px]" />
</Scenario>

<Scenario id="input-area-disabled" label="input area disabled">
  <InputArea aria-label="Message" disabled placeholder="Write a message..." class="w-[280px]" />
</Scenario>

<Scenario id="password-manager-ignore" label="password manager ignore">
  <Input aria-label="Search" passwordManagerIgnore placeholder="Search..." class="w-[280px]" />
</Scenario>

<Scenario id="focus" label="focus" interact={[{ type: 'focus' }]}>
  <Input aria-label="Email" placeholder="you@example.com" class="w-[280px]" />
</Scenario>

<Scenario id="focus-error" label="focus error" interact={[{ type: 'focus' }]}>
  <Input
    aria-label="Email"
    error="Invalid email"
    placeholder="you@example.com"
    class="w-[280px]"
  />
</Scenario>

<Scenario id="textarea-focus" label="textarea focus" interact={[{ type: 'focus' }]}>
  <Textarea aria-label="Notes" placeholder="Add notes..." class="w-[280px]" />
</Scenario>

<!-- decorative icon scenario for prefix-adjacent standalone input -->
<Scenario id="with-icon-context" label="icon context">
  <div class="flex w-[280px] items-center gap-2">
    <EnvelopeSimple class="size-4 text-kumo-subtle" aria-hidden="true" />
    <Input aria-label="Email" placeholder="you@example.com" class="w-full" />
  </div>
</Scenario>
