<script lang="ts">
  import type { PropRow } from './prop-types';

  interface Props {
    component?: string;
    sourceFile?: string;
  }

  let { component, sourceFile }: Props = $props();

  const propModules = import.meta.glob('./props-data/*.ts', {
    eager: true,
    import: 'default'
  }) as Record<string, PropRow[]>;

  const rowsByComponent = new Map(
    Object.entries(propModules).map(([path, rows]) => {
      const componentName = path.split('/').pop()?.replace(/\.ts$/, '').replace(/__/g, '.') ?? '';
      return [componentName, rows] as const;
    })
  );

  const aliases: Record<string, string> = {
    'DropdownMenu.LinkItem': 'DropdownMenu.Item',
    'DropdownMenu.Sub': 'DropdownMenu',
    'InputGroup.Input': 'InputGroupInput',
    'InputGroup.Addon': 'InputGroupAddon',
    'InputGroup.Button': 'InputGroupButton',
    'InputGroup.Suffix': 'InputGroupSuffix',
    'Popover.Root': 'Popover',
    'Popover.Trigger': 'PopoverTrigger',
    'Popover.Content': 'PopoverContent',
    'Popover.Title': 'PopoverTitle',
    'Popover.Description': 'PopoverDescription',
    'Popover.Close': 'PopoverClose',
    'Tooltip.Provider': 'Tooltip',
    'Select.Option': 'Select',
    LinkButton: 'Button.LinkButton',
    PoweredByCloudflare: 'CloudflareLogo.PoweredByCloudflare'
  };

  const omittedProps: Record<string, string[]> = {
    Button: ['href', 'external'],
    Input: ['children'],
    Checkbox: ['children', 'description', 'error'],
    Switch: ['children', 'description', 'error'],
    Tabs: ['children', 'items', 'class', 'className', 'triggerClass', 'contentClass'],
    TableOfContents: ['items'],
    Sidebar: ['items'],
    Empty: ['children'],
    CloudflareLogo: ['children', 'href', 'poweredBy'],
    Label: ['for']
  };

  const requiredProps: Record<string, string[]> = {
    Meter: ['label'],
    Empty: ['title'],
    Label: ['children'],
    ClipboardText: ['text'],
    CodeHighlighted: ['code'],
    DatePicker: ['mode'],
    'Collapsible.DefaultTrigger': ['children'],
    'Collapsible.DefaultPanel': ['children'],
    'Flow.Parallel': ['children'],
    'Flow.List': ['children'],
    'Checkbox.Group': ['children'],
    'Checkbox.Legend': ['children'],
    'Checkbox.Item': ['label'],
    'Radio.Group': ['children'],
    'Radio.Legend': ['children'],
    'Radio.Item': ['label', 'value'],
    'Switch.Group': ['children'],
    'Switch.Legend': ['children'],
    'Switch.Item': ['label'],
    'DropdownMenu.RadioItem': ['value'],
    'Breadcrumbs.Link': ['href'],
    'Breadcrumbs.Clipboard': ['text'],
    'MenuBar': ['isActive', 'options'],
    'Pagination': ['setPage'],
    'Pagination.PageSize': ['value', 'onChange'],
    'TableOfContents.Group': ['label'],
    Tooltip: ['content'],
    Autocomplete: ['items'],
    Combobox: ['items']
  };

  const snippetPropsOmittedByComponent: Record<string, string[]> = {
    'Dialog.Root': ['class'],
    'Dialog.Title': ['children'],
    'Dialog.Description': ['children'],
    'Dialog.Close': ['class'],
    'PopoverTitle': ['children'],
    'PopoverDescription': ['children'],
    'Table.Row': ['children'],
    'Table.Header': ['children'],
    'Table.Head': ['children'],
    'Table.Cell': ['children'],
    'Table.Body': ['children'],
    'Table.Footer': ['children'],
    'TableOfContents.Title': ['children'],
    'TableOfContents.List': ['children'],
    'DropdownMenu.Separator': ['children'],
    'Pagination.Controls': ['children'],
    'Pagination.PageSize': ['children'],
    'Pagination.Separator': ['children'],
    'CommandPalette.Input': ['children'],
    'CommandPalette.ResultItem': ['class', 'children']
  };

  const topLevelComponentKeys = new Set([
    'Autocomplete',
    'Badge',
    'Banner',
    'Breadcrumbs',
    'Button',
    'Chart',
    'Checkbox',
    'ClipboardText',
    'CloudflareLogo',
    'CodeHighlighted',
    'Collapsible',
    'Combobox',
    'CommandPalette',
    'DatePicker',
    'DeleteResource',
    'Dialog',
    'DropdownMenu',
    'Empty',
    'Flow',
    'Grid',
    'Input',
    'InputArea',
    'InputGroup',
    'Label',
    'LayerCard',
    'Link',
    'Button.LinkButton',
    'Loader',
    'MenuBar',
    'Meter',
    'PageHeader',
    'Pagination',
    'Popover',
    'Radio',
    'SankeyChart',
    'Select',
    'SensitiveInput',
    'Sidebar',
    'SkeletonLine',
    'Surface',
    'Switch',
    'Table',
    'TableOfContents',
    'Tabs',
    'Text',
    'TimeseriesChart',
    'Toasty',
    'Tooltip'
  ]);

  const key = $derived(component ?? sourceFile ?? 'Component');
  const resolvedKey = $derived(aliases[key] ?? key);
  const rows = $derived.by(() => {
    const isTopLevelComponent = topLevelComponentKeys.has(key);
    const omitted = new Set([
      ...(omittedProps[key] ?? omittedProps[resolvedKey] ?? []),
      ...(snippetPropsOmittedByComponent[key] ?? snippetPropsOmittedByComponent[resolvedKey] ?? []),
      ...(isTopLevelComponent ? [] : ['class', 'children'])
    ]);
    const required = new Set(requiredProps[key] ?? requiredProps[resolvedKey] ?? []);
    return (rowsByComponent.get(resolvedKey) ?? [])
      .filter((row) => !omitted.has(row.prop))
      .map((row) => ({ ...row, required: row.required || required.has(row.prop) }));
  });
</script>

<div class="not-prose overflow-x-auto">
  <table class="w-full text-sm">
    <thead>
      <tr class="border-b border-kumo-hairline">
        <th class="px-4 py-3 text-left font-semibold">Prop</th>
        <th class="px-4 py-3 text-left font-semibold">Type</th>
        <th class="px-4 py-3 text-left font-semibold">Default</th>
        <th class="px-4 py-3 text-left font-semibold">Description</th>
      </tr>
    </thead>
    <tbody class="text-kumo-strong">
      {#each rows as row (row.prop)}
        <tr class="border-b border-kumo-hairline">
          <td class="px-4 py-3 font-mono text-xs">
            {row.prop}
            {#if row.required}
              <span class="ml-0.5 text-kumo-danger">*</span>
            {/if}
          </td>
          <td class="max-w-xs px-4 py-3 font-mono text-xs">
            <code class="text-wrap break-words">{row.type}</code>
          </td>
          <td class="px-4 py-3 font-mono text-xs">
            {#if (row.default ?? '-') !== '-'}
              <code>{row.default}</code>
            {:else}
              -
            {/if}
          </td>
          <td class="max-w-md px-4 py-3 text-xs">{row.description}</td>
        </tr>
      {:else}
        <tr>
          <td class="px-4 py-3 text-sm text-kumo-subtle" colspan="4">
            No component-specific props. Accepts standard HTML attributes.
          </td>
        </tr>
      {/each}
    </tbody>
  </table>
</div>
