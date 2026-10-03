<script lang="ts">
  import { DropdownMenu as DropdownMenuPrimitive } from 'bits-ui';
  import type { Snippet } from 'svelte';
  import { cn } from '#lib/utils/cn.js';

  interface Props {
    children?: Snippet;
    child?: Snippet<[{ props: Record<string, unknown> }]>;
    class?: string;
    type?: 'button' | 'submit' | 'reset';
    [key: string]: unknown;
  }

  let { children, child: renderChild, class: className, type = 'button', ...rest }: Props = $props();
</script>

{#snippet defaultTriggerChild({ props }: { props: Record<string, unknown> })}
  <span {...props} class={cn('inline-flex', className, props.class as string | undefined)}>
    {@render children?.()}
  </span>
{/snippet}

<DropdownMenuPrimitive.Trigger
  {type}
  {...rest}
  child={renderChild ?? defaultTriggerChild}
/>
