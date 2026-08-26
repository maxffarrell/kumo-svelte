<script lang="ts">
  import { Command as CommandPrimitive } from 'bits-ui';
  import type { Snippet } from 'svelte';
  import { cn } from '$lib/utils/cn';
  import CommandPaletteDialog from './CommandPaletteDialog.svelte';

  export interface CommandPaletteCommand {
    label: string;
    value?: string;
    action?: () => void;
    disabled?: boolean;
    description?: string;
    group?: string;
    keywords?: string[];
  }

  interface GroupedCommand {
    label?: string;
    items: CommandPaletteCommand[];
  }

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
          'h-11 w-full border-none bg-transparent px-3 text-base text-kumo-default kumo-input-placeholder outline-none',
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
  <CommandPaletteDialog bind:open {onOpenChange} {onBackdropClick} {container}>
    {@render commandRoot()}
  </CommandPaletteDialog>
{:else}
  {@render commandRoot()}
{/if}
