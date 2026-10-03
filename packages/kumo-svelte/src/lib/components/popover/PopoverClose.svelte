<script lang="ts">
  import { Popover as PopoverPrimitive } from 'bits-ui';
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

{#snippet defaultCloseChild({ props }: { props: Record<string, unknown> })}
  <button {...props} class={cn(className, props.class as string | undefined)} {type}>
    {@render children?.()}
  </button>
{/snippet}

<PopoverPrimitive.Close {type} {...rest} child={renderChild ?? defaultCloseChild} />
