<script module lang="ts">
  import { Command as CommandPrimitive, Dialog as DialogPrimitive } from 'bits-ui';
  import { ArrowRight, ArrowSquareOut as ExternalLink, CaretRight } from 'phosphor-svelte';
  import type { Snippet } from 'svelte';
  import { cn } from '$lib/utils/cn';

  export interface CommandPaletteCommand {
    label: string;
    value?: string;
    action?: () => void;
    disabled?: boolean;
    description?: string;
    group?: string;
    keywords?: string[];
  }

  interface Highlight {
    start: number;
    end: number;
  }

  type HighlightTuple = [number, number];

  interface Segment {
    text: string;
    highlighted: boolean;
  }

  interface GroupedCommand {
    label?: string;
    items: CommandPaletteCommand[];
  }

  // @ts-ignore Svelte declaration tags are exportable from module script.
  export { Dialog, Empty, Footer, Group, GroupLabel, HighlightedText, Input, Item, Items, List, Loading, Panel, ResultItem };

  function highlightedSegments(text: string, highlights: HighlightTuple[]) {
    if (highlights.length === 0) return [{ text, highlighted: false }];

    const sorted: Highlight[] = highlights
      .map(([start, end]) => ({ start: Math.max(0, start), end: Math.min(text.length - 1, end) }))
      .filter(({ start, end }) => end >= start)
      .sort((a, b) => a.start - b.start);

    const merged: Highlight[] = [];
    for (const highlight of sorted) {
      const previous = merged[merged.length - 1];
      if (previous && highlight.start <= previous.end + 1) {
        previous.end = Math.max(previous.end, highlight.end);
      } else {
        merged.push({ ...highlight });
      }
    }

    const segments: Segment[] = [];
    let cursor = 0;

    for (const highlight of merged) {
      if (highlight.start > cursor) {
        segments.push({ text: text.slice(cursor, highlight.start), highlighted: false });
      }
      segments.push({ text: text.slice(highlight.start, highlight.end + 1), highlighted: true });
      cursor = highlight.end + 1;
    }

    if (cursor < text.length) {
      segments.push({ text: text.slice(cursor), highlighted: false });
    }

    return segments;
  }

  function defaultDialogBackdropClick(onOpenChange?: (open: boolean) => void) {
    onOpenChange?.(false);
    return false;
  }

  function withoutProps(props: Record<string, unknown>, keys: string[]) {
    const rest: Record<string, unknown> = {};
    for (const key of Object.keys(props)) {
      if (!keys.includes(key)) rest[key] = props[key];
    }
    return rest;
  }
</script>

<script lang="ts">
  interface Props {
    children?: Snippet;
    class?: string;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    onBackdropClick?: (event: MouseEvent) => void;
    container?: HTMLElement | string;
    commands?: CommandPaletteCommand[];
    placeholder?: string;
    value?: string;
    onValueChange?: (value: string) => void;
    onSelect?: (command: CommandPaletteCommand, options: { newTab: boolean }) => void;
    label?: string;
    loop?: boolean;
    shouldFilter?: boolean;
    loading?: boolean;
    loadingText?: string;
    emptyText?: string;
    inputClass?: string;
    listClass?: string;
    itemClass?: string;
    inputProps?: Record<string, unknown>;
    [key: string]: unknown;
  }

  let {
    children,
    class: className,
    open = $bindable(undefined),
    onOpenChange,
    onBackdropClick,
    container,
    commands = [],
    placeholder = 'Type a command...',
    value = $bindable(''),
    onValueChange,
    onSelect,
    label = 'Command menu',
    loop = true,
    shouldFilter = true,
    loading = false,
    loadingText = 'Loading...',
    emptyText = 'No results found.',
    inputClass,
    listClass,
    itemClass,
    inputProps,
    ...rest
  }: Props = $props();

  let search = $state('');
  let selectInNewTab = false;

  const groupedCommands = $derived.by<GroupedCommand[]>(() => {
    const grouped: GroupedCommand[] = [];
    const ungrouped: CommandPaletteCommand[] = [];

    for (const command of commands) {
      if (!command.group) {
        ungrouped.push(command);
        continue;
      }

      const group = grouped.find((entry) => entry.label === command.group);
      if (group) {
        group.items.push(command);
      } else {
        grouped.push({ label: command.group, items: [command] });
      }
    }

    return [...(ungrouped.length ? [{ items: ungrouped }] : []), ...grouped];
  });

  function commandValue(command: CommandPaletteCommand) {
    return command.value ?? command.label;
  }

  function handleValueChange(nextValue: string) {
    value = nextValue;
    onValueChange?.(nextValue);
  }

  function handleKeydown(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      selectInNewTab = event.metaKey || event.ctrlKey;
    }
  }

  function handleSelect(command: CommandPaletteCommand) {
    command.action?.();
    onSelect?.(command, { newTab: selectInNewTab });
    selectInNewTab = false;
  }
</script>

{#snippet Dialog({
  children,
  trigger,
  class: className,
  open = false,
  onOpenChange,
  onBackdropClick,
  container,
  ...rest
}: {
  children?: Snippet;
  trigger?: Snippet<[Record<string, unknown>]>;
  class?: string;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onBackdropClick?: (event: MouseEvent) => void;
  container?: HTMLElement | string;
  [key: string]: unknown;
})}
  <DialogPrimitive.Root {open} {onOpenChange}>
    {#if trigger}
      <DialogPrimitive.Trigger>
        {#snippet child({ props })}
          {@render trigger(props)}
        {/snippet}
      </DialogPrimitive.Trigger>
    {/if}
    <DialogPrimitive.Portal to={container}>
      <DialogPrimitive.Overlay
        class="fixed inset-0 bg-kumo-overlay opacity-80 transition-all duration-150 data-ending-style:opacity-0 data-starting-style:opacity-0"
        onclick={(event: MouseEvent) => {
          if (onBackdropClick) {
            onBackdropClick(event);
          } else {
            defaultDialogBackdropClick(onOpenChange);
          }
        }}
      />
      <DialogPrimitive.Content
        class={cn(
          'fixed top-[10vh] left-1/2 w-full max-w-[calc(100vw-2rem)] -translate-x-1/2 overflow-hidden rounded-lg bg-kumo-base text-kumo-default shadow-lg ring ring-kumo-hairline outline-none duration-150 data-ending-style:scale-90 data-ending-style:opacity-0 data-starting-style:scale-90 data-starting-style:opacity-0 sm:max-w-2xl',
          className
        )}
        style="transition-property: scale, opacity; transition-timing-function: var(--default-transition-timing-function);"
        {...rest}
      >
        {@render children?.()}
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  </DialogPrimitive.Root>
{/snippet}

{#snippet Panel({ children, class: className, ...rest }: { children?: Snippet; class?: string; [key: string]: unknown })}
  <div class={cn('flex max-h-[60vh] flex-col overflow-hidden rounded-lg bg-kumo-elevated', className)} {...rest}>
    {@render children?.()}
  </div>
{/snippet}

{#snippet Input(props: {
  class?: string;
  value?: string;
  placeholder?: string;
  leading?: Snippet;
  trailing?: Snippet;
  [key: string]: unknown;
})}
  <div class="flex items-center gap-3 bg-kumo-base px-4 py-3 focus-within:ring-2 focus-within:ring-kumo-brand">
    {#if props.leading}
      {@render props.leading()}
    {:else}
      <svg class="h-4 w-4 text-kumo-subtle" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true">
        <path d="M229.66 218.34l-50.07-50.06a88.11 88.11 0 1 0-11.31 11.31l50.06 50.07a8 8 0 0 0 11.32-11.32ZM40 112a72 72 0 1 1 72 72 72.08 72.08 0 0 1-72-72Z" />
      </svg>
    {/if}
    <CommandPrimitive.Input
      bind:value={props.value}
      placeholder={props.placeholder ?? 'Type a command...'}
      class={cn('h-7 min-w-0 flex-1 bg-transparent text-base text-kumo-default outline-none placeholder:text-kumo-placeholder', props.class)}
      {...withoutProps(props, ['class', 'value', 'placeholder', 'leading', 'trailing'])}
    />
    {@render props.trailing?.()}
  </div>
{/snippet}

{#snippet List({ children, class: className, ...rest }: { children?: Snippet; class?: string; [key: string]: unknown })}
  <CommandPrimitive.List
    class={cn('relative min-h-0 flex-1 overflow-y-auto rounded-b-lg bg-kumo-base px-2 py-2 scroll-py-2 ring-1 ring-kumo-hairline', className)}
    {...rest}
  >
    {@render children?.()}
  </CommandPrimitive.List>
{/snippet}

{#snippet Group({
  children,
  class: className,
  value,
  forceMount,
  ...rest
}: {
  children?: Snippet;
  class?: string;
  value?: string;
  forceMount?: boolean;
  [key: string]: unknown;
})}
  <CommandPrimitive.Group {value} {forceMount} class={cn('space-y-0.5', className)} {...rest}>
    {@render children?.()}
  </CommandPrimitive.Group>
{/snippet}

{#snippet GroupLabel({ children, class: className, ...rest }: { children?: Snippet; class?: string; [key: string]: unknown })}
  <CommandPrimitive.GroupHeading class={cn('mb-2 px-2 pt-1 text-xs font-semibold text-kumo-subtle', className)} {...rest}>
    {@render children?.()}
  </CommandPrimitive.GroupHeading>
{/snippet}

{#snippet Items({ children, ...rest }: { children?: Snippet; [key: string]: unknown })}
  <CommandPrimitive.GroupItems {...rest}>
    {@render children?.()}
  </CommandPrimitive.GroupItems>
{/snippet}

{#snippet Item({
  children,
  class: className,
  value,
  keywords,
  disabled,
  forceMount,
  onSelect,
  onclick,
  ...rest
}: {
  children?: Snippet;
  class?: string;
  value: unknown;
  keywords?: string[];
  disabled?: boolean;
  forceMount?: boolean;
  onSelect?: () => void;
  onclick?: (event: MouseEvent) => void;
  [key: string]: unknown;
})}
  <CommandPrimitive.Item
    value={String(value)}
    {keywords}
    {disabled}
    {forceMount}
    {onSelect}
    {onclick}
    class={cn(
      'group flex w-full cursor-pointer select-none items-center gap-3 rounded-lg px-2 py-1.5 text-left text-base text-kumo-default outline-none transition-colors data-[disabled]:cursor-default data-[disabled]:opacity-50 data-[selected]:bg-kumo-overlay',
      className
    )}
    {...rest}
  >
    {@render children?.()}
  </CommandPrimitive.Item>
{/snippet}

{#snippet HighlightedText({
  text,
  highlights = [],
  class: className,
  markClass = 'rounded-sm bg-kumo-warning/50 text-kumo-default'
}: {
  text: string;
  highlights?: HighlightTuple[];
  class?: string;
  markClass?: string;
})}
  <span class={className}>
    {#each highlightedSegments(text, highlights) as segment, index (`${index}-${segment.text}-${segment.highlighted}`)}
      {#if segment.highlighted}<mark class={markClass}>{segment.text}</mark>{:else}{segment.text}{/if}
    {/each}
  </span>
{/snippet}

{#snippet ResultItem({
  value,
  title,
  breadcrumbs = [],
  titleHighlights = [],
  breadcrumbHighlights = [],
  description,
  icon,
  onclick,
  onSelect,
  showArrow = true,
  external = false,
  nonInteractive = false,
  class: className,
  ...rest
}: {
  value: unknown;
  title: string;
  breadcrumbs?: string[];
  titleHighlights?: HighlightTuple[];
  breadcrumbHighlights?: HighlightTuple[][];
  description?: string;
  icon?: Snippet;
  onclick?: (event?: MouseEvent) => void;
  onSelect?: (value: unknown) => void;
  showArrow?: boolean;
  external?: boolean;
  nonInteractive?: boolean;
  class?: string;
  [key: string]: unknown;
})}
  {@render Item({
    value: String(value),
    disabled: nonInteractive,
    onSelect: () => {
      if (nonInteractive) return;
      onclick?.();
      onSelect?.(value);
    },
    class: cn(
      'group flex w-full items-center gap-3 rounded-lg px-2 py-1.5 text-left transition-colors',
      nonInteractive ? 'cursor-default' : 'cursor-pointer data-[selected]:bg-kumo-overlay',
      className
    ),
    ...rest,
    children: resultItemChildren
  })}

  {#snippet resultItemChildren()}
    {#if icon}
      <span class="flex shrink-0 items-center text-kumo-subtle">
        {@render icon()}
      </span>
    {/if}
    <span class="min-w-0 flex-1">
      <span class="flex items-center gap-2 truncate">
        {#each breadcrumbs as breadcrumb, index (`${index}-${breadcrumb}`)}
          <span class="flex items-center gap-2">
            {@render HighlightedText({
              text: breadcrumb,
              highlights: breadcrumbHighlights[index] ?? [],
              class: 'text-base text-kumo-default'
            })}
            <CaretRight class="h-3 w-3 shrink-0 text-kumo-subtle" weight="bold" />
          </span>
        {/each}
        {@render HighlightedText({ text: title, highlights: titleHighlights, class: 'text-base text-kumo-default' })}
        {#if external}
          <ExternalLink class="h-3.5 w-3.5 shrink-0 text-kumo-subtle" />
        {/if}
        {#if description}
          <span class="text-kumo-subtle">-</span>
          <span class="truncate text-sm text-kumo-subtle">{description}</span>
        {/if}
      </span>
    </span>
    {#if showArrow && !external && !nonInteractive}
      <ArrowRight class="h-4 w-4 shrink-0 text-kumo-subtle opacity-0 transition-opacity group-data-[selected]:opacity-100" />
    {/if}
  {/snippet}
{/snippet}

{#snippet Empty({
  children,
  class: className,
  forceMount,
  ...rest
}: {
  children?: Snippet;
  class?: string;
  forceMount?: boolean;
  [key: string]: unknown;
})}
  <CommandPrimitive.Empty {forceMount} class={cn('p-8 text-center text-kumo-subtle', className)} {...rest}>
    <p>{@render children?.()}</p>
  </CommandPrimitive.Empty>
{/snippet}

{#snippet Loading({
  children,
  class: className,
  progress,
  ...rest
}: {
  children?: Snippet;
  class?: string;
  progress?: number;
  [key: string]: unknown;
})}
  <CommandPrimitive.Loading {progress} class={cn('flex items-center justify-center p-8 text-kumo-subtle', className)} {...rest}>
    {#if children}
      {@render children()}
    {:else}
      <svg class="size-6 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-label="Loading">
        <circle cx="12" cy="12" r="9.5" opacity="0.1" stroke-width="2" />
        <path d="M21.5 12a9.5 9.5 0 0 0-9.5-9.5" stroke-width="2" stroke-linecap="round" />
      </svg>
    {/if}
  </CommandPrimitive.Loading>
{/snippet}

{#snippet Footer({ children, class: className, ...rest }: { children?: Snippet; class?: string; [key: string]: unknown })}
  <div class={cn('flex items-center justify-between rounded-b-lg bg-kumo-elevated px-4 py-3 text-xs text-kumo-subtle', className)} {...rest}>
    {@render children?.()}
  </div>
{/snippet}

{#snippet commandRoot()}
  <CommandPrimitive.Root
    class={cn('flex max-h-[60vh] flex-col overflow-hidden rounded-lg bg-kumo-elevated', className)}
    {label}
    {loop}
    {shouldFilter}
    {value}
    onValueChange={handleValueChange}
    onkeydown={handleKeydown}
    {...rest}
  >
    {#if children}
      {@render children()}
    {:else}
      <CommandPrimitive.Input
        bind:value={search}
        {placeholder}
        {...inputProps}
        class={cn(
          'h-11 w-full border-b border-kumo-line bg-transparent px-3 text-base text-kumo-default outline-none placeholder:text-kumo-placeholder',
          inputClass
        )}
      />
      <CommandPrimitive.List class={cn('relative min-h-0 flex-1 overflow-y-auto rounded-b-lg bg-kumo-base px-2 py-2 scroll-py-2 ring-1 ring-kumo-hairline', listClass)}>
        {#if loading}
          <CommandPrimitive.Loading class="flex items-center justify-center p-8 text-kumo-subtle">
            {loadingText}
          </CommandPrimitive.Loading>
        {:else}
          {#each groupedCommands as group (group.label ?? '__ungrouped')}
            <CommandPrimitive.Group value={group.label} class="space-y-0.5">
              {#if group.label}
                <CommandPrimitive.GroupHeading class="mb-2 px-2 pt-1 text-xs font-semibold text-kumo-subtle">
                  {group.label}
                </CommandPrimitive.GroupHeading>
              {/if}
              <CommandPrimitive.GroupItems>
                {#each group.items as command (commandValue(command))}
                  <CommandPrimitive.Item
                    value={commandValue(command)}
                    keywords={command.keywords}
                    disabled={command.disabled}
                    onSelect={() => handleSelect(command)}
                    class={cn(
                      'group flex w-full cursor-pointer items-center gap-3 rounded-lg px-2 py-1.5 text-left text-base text-kumo-default transition-colors data-[disabled]:cursor-default data-[disabled]:opacity-50 data-[selected]:bg-kumo-overlay',
                      itemClass
                    )}
                  >
                    <span>{command.label}</span>
                    {#if command.description}
                      <span class="truncate text-sm text-kumo-subtle">{command.description}</span>
                    {/if}
                  </CommandPrimitive.Item>
                {/each}
              </CommandPrimitive.GroupItems>
            </CommandPrimitive.Group>
          {/each}
          <CommandPrimitive.Empty class="p-8 text-center text-kumo-subtle">
            {emptyText}
          </CommandPrimitive.Empty>
        {/if}
      </CommandPrimitive.List>
    {/if}
  </CommandPrimitive.Root>
{/snippet}

{#if typeof open === 'boolean'}
  {@render Dialog({ open, onOpenChange, onBackdropClick, container, children: commandRoot })}
{:else}
  {@render commandRoot()}
{/if}
