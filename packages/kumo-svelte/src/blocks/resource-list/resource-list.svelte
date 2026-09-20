<script lang="ts">
  import type { Component, Snippet } from 'svelte';
  import { cn } from '$lib/utils/cn';

  interface Props {
    title?: string;
    description?: string;
    icon?: Component;
    usage?: Snippet;
    additionalContent?: Snippet;
    children?: Snippet;
    class?: string;
  }

  let {
    title,
    description,
    icon: Icon,
    usage,
    additionalContent,
    children,
    class: className
  }: Props = $props();
</script>

<div class={cn('h-full min-h-screen w-full bg-kumo-overlay', className)}>
  <div class="mx-auto flex max-w-[1400px] flex-col p-6 md:gap-4 md:p-8 lg:px-10 lg:py-9 xl:gap-6">
    <div class="flex flex-col">
      <div class="mb-1.5 flex items-center gap-1.5">
        {#if Icon}
          <Icon size={32} class="text-kumo-subtle" />
        {/if}
        <h1 class="font-heading m-0 p-0 text-3xl font-semibold">{title}</h1>
      </div>
      {#if description}
        <p class="hidden p-0 text-lg leading-normal text-pretty text-kumo-subtle md:block">{description}</p>
      {/if}
    </div>

    <div class="flex flex-col-reverse gap-6 xl:grid xl:grid-cols-[1fr_2fr] xl:gap-8">
      <div class="min-w-0">{@render children?.()}</div>

      {#if usage || additionalContent}
        <div class="top-22 flex h-fit w-full min-w-0 flex-col gap-4 xl:sticky">
          {@render usage?.()}

          <div class={cn('hidden xl:block', usage ? 'mt-6' : '')}>
            {@render additionalContent?.()}
          </div>
        </div>
      {/if}
    </div>

    <div class="mt-6 xl:hidden">{@render additionalContent?.()}</div>
  </div>
</div>
