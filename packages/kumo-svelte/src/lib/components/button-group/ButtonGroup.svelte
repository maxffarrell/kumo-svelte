<script lang="ts" module>
  import { cn } from '$lib/utils/cn';
  export const KUMO_BUTTON_GROUP_VARIANTS = {} as const;
  export const KUMO_BUTTON_GROUP_DEFAULT_VARIANTS = {} as const;
  export const KUMO_BUTTON_GROUP_STYLING = {
    baseClasses: cn(
      'relative isolate inline-flex w-max flex-row',
      '[&>*]:relative [&>*:focus-visible]:z-10 [&>*:has(:focus-visible)]:z-10',
      '[&>*>:is(button,a)]:shadow-none [&>:is(button,a)]:shadow-none',
      '[&>*:not(:first-child):is(button,a)]:rounded-s-none',
      '[&>*:not(:last-child):is(button,a)]:rounded-e-none',
      '[&>*:not(:first-child)>:is(button,a)]:rounded-s-none',
      '[&>*:not(:last-child)>:is(button,a)]:rounded-e-none',
      '[&>*:not(:first-child)]:-ms-px'
    )
  } as const;
</script>

<script lang="ts">
  import type { Snippet } from 'svelte';
  interface Props { children?: Snippet; class?: string; [key: string]: unknown; }
  let { children, class: className, ...rest }: Props = $props();
</script>

<div role="group" data-kumo-component="ButtonGroup" class={cn(KUMO_BUTTON_GROUP_STYLING.baseClasses, className)} {...rest}>
  {@render children?.()}
</div>
