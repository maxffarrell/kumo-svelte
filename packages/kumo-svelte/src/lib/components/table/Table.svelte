<script module lang="ts">
  import type { Snippet } from 'svelte';
  import { cn } from '$lib/utils/cn';
  import { Checkbox } from '$lib/components/checkbox';

  export const KUMO_TABLE_VARIANTS = {
    layout: {
      auto: {
        classes: '',
        description: 'Auto table layout - columns resize based on content'
      },
      fixed: {
        classes: 'table-fixed',
        description: 'Fixed table layout - columns have equal width, controlled via colgroup'
      }
    },
    variant: {
      default: {
        classes: '',
        description: 'Default row variant'
      },
      selected: {
        classes: 'bg-kumo-tint',
        description: 'Selected row variant'
      }
    },
    sticky: {
      left: {
        classes: 'sticky left-0',
        description: 'Pin column to the left edge of the scroll container'
      },
      right: {
        classes: 'sticky right-0',
        description: 'Pin column to the right edge of the scroll container'
      }
    }
  } as const;

  export const KUMO_TABLE_DEFAULT_VARIANTS = {
    layout: 'auto',
    variant: 'default'
  } as const;

  export type KumoTableStickyColumn = keyof typeof KUMO_TABLE_VARIANTS.sticky;
  export type KumoTableRowVariant = keyof typeof KUMO_TABLE_VARIANTS.variant;
  export type KumoTableLayout = keyof typeof KUMO_TABLE_VARIANTS.layout;

  type RestProps = Record<string, unknown>;

  interface TableSectionProps extends RestProps {
    children?: Snippet;
    class?: string;
  }

  interface TableHeaderProps extends TableSectionProps {
    variant?: 'default' | 'compact';
    sticky?: boolean;
  }

  interface TableRowProps extends TableSectionProps {
    variant?: KumoTableRowVariant;
  }

  interface TableCellProps extends TableSectionProps {
    sticky?: KumoTableStickyColumn;
  }

  interface TableCheckboxProps extends RestProps {
    class?: string;
    checked?: boolean;
    indeterminate?: boolean;
    onCheckedChange?: (checked: boolean) => void;
    onValueChange?: (checked: boolean) => void;
    label?: string;
    disabled?: boolean;
  }

  export function tableStickyColumnClasses(side: KumoTableStickyColumn, element: 'head' | 'cell') {
    const base = KUMO_TABLE_VARIANTS.sticky[side].classes;
    const z = element === 'head' ? 'z-2' : 'z-1';
    const fadePosition = side === 'right' ? 'before:-left-6' : 'before:-right-6';
    const fadeBase = 'before:pointer-events-none before:absolute before:inset-y-0 before:w-6';

    if (element === 'cell') {
      const fade =
        side === 'right'
          ? 'before:bg-gradient-to-r before:from-transparent before:to-kumo-base'
          : 'before:bg-gradient-to-l before:from-transparent before:to-kumo-base';

      return cn(base, z, 'bg-kumo-base', fadeBase, fadePosition, fade);
    }

    const bg = 'bg-kumo-base group-data-[compact]/header:bg-kumo-elevated';
    const fade =
      side === 'right'
        ? 'before:bg-gradient-to-r before:from-transparent before:to-kumo-base group-data-[compact]/header:before:to-kumo-elevated'
        : 'before:bg-gradient-to-l before:from-transparent before:to-kumo-base group-data-[compact]/header:before:to-kumo-elevated';

    return cn(base, z, bg, fadeBase, fadePosition, fade);
  }

  function tableCheckboxProps(props: TableCheckboxProps) {
    const {
      class: className,
      label,
      disabled = false,
      onCheckedChange,
      onValueChange,
      checked: _checked,
      indeterminate: _indeterminate,
      ...rest
    } = props;

    return { className, label, disabled, onCheckedChange, onValueChange, rest };
  }

  function tableCheckboxRest(props: TableCheckboxProps) {
    return tableCheckboxProps(props).rest;
  }

  function tableCheckboxClass(props: TableCheckboxProps) {
    return tableCheckboxProps(props).className;
  }

  function tableCheckboxLabel(props: TableCheckboxProps, fallback: string) {
    return tableCheckboxProps(props).label ?? fallback;
  }

  function tableCheckboxDisabled(props: TableCheckboxProps) {
    return tableCheckboxProps(props).disabled;
  }

  function handleTableCheckboxChange(props: TableCheckboxProps, checked: boolean) {
    props.checked = checked;
    props.onCheckedChange?.(checked);
    props.onValueChange?.(checked);
  }

  export { Body, Cell, CheckCell, CheckHead, Footer, Head, Header, ResizeHandle, Row };
</script>

<script lang="ts">
  interface Props {
    children?: Snippet;
    class?: string;
    layout?: KumoTableLayout;
    [key: string]: unknown;
  }

  let { children, class: className, layout = KUMO_TABLE_DEFAULT_VARIANTS.layout, ...rest }: Props = $props();
</script>

<table
  class={cn(
    'isolate w-full',
    KUMO_TABLE_VARIANTS.layout[layout].classes,
    '[&_td]:border-b [&_td]:border-kumo-fill [&_tr:last-child_td]:border-b-0',
    '[&_td]:p-3',
    '[&_th]:border-b [&_th]:border-kumo-fill [&_th]:p-3 [&_th]:font-semibold [&_th]:text-base',
    '[&_th]:bg-kumo-base',
    'text-base text-left text-kumo-default',
    className
  )}
  {...rest}
>
  {@render children?.()}
</table>

{#snippet Header({
  children,
  class: className,
  variant = 'default',
  sticky = false,
  ...rest
}: TableHeaderProps)}
  <thead
    class={cn(
      'group/header',
      variant === 'compact' && '[&_th]:bg-kumo-elevated [&_th]:py-2 text-xs text-kumo-strong',
      sticky && '[&_th]:sticky [&_th]:top-0 [&_th]:z-1',
      className
    )}
    data-compact={variant === 'compact' ? '' : undefined}
    {...rest}
  >
    {@render children?.()}
  </thead>
{/snippet}

{#snippet Body({ children, class: className, ...rest }: TableSectionProps)}
  <tbody class={cn(className)} {...rest}>
    {@render children?.()}
  </tbody>
{/snippet}

{#snippet Row({
  children,
  class: className,
  variant = KUMO_TABLE_DEFAULT_VARIANTS.variant,
  ...rest
}: TableRowProps)}
  <tr class={cn(KUMO_TABLE_VARIANTS.variant[variant].classes, className)} {...rest}>
    {@render children?.()}
  </tr>
{/snippet}

{#snippet Head({ children, class: className, sticky, ...rest }: TableCellProps)}
  <th class={cn('group relative', sticky && tableStickyColumnClasses(sticky, 'head'), className)} {...rest}>
    {@render children?.()}
  </th>
{/snippet}

{#snippet Cell({ children, class: className, sticky, ...rest }: TableCellProps)}
  <td class={cn(sticky && tableStickyColumnClasses(sticky, 'cell'), className)} {...rest}>
    {@render children?.()}
  </td>
{/snippet}

{#snippet Footer({ children, class: className, ...rest }: TableSectionProps)}
  <tfoot class={cn(className)} {...rest}>
    {@render children?.()}
  </tfoot>
{/snippet}

{#snippet CheckHead(props: TableCheckboxProps)}
  <th class={cn('group relative w-10 leading-none', tableCheckboxClass(props))} {...tableCheckboxRest(props)}>
    <Checkbox
      checked={props.checked}
      indeterminate={props.indeterminate}
      onCheckedChange={(newChecked) => handleTableCheckboxChange(props, newChecked)}
      aria-label={tableCheckboxLabel(props, 'Select all rows')}
      disabled={tableCheckboxDisabled(props)}
      class="relative before:absolute before:-inset-3 before:content-['']"
    />
  </th>
{/snippet}

{#snippet CheckCell(props: TableCheckboxProps)}
  <td class={cn('w-10 leading-none', tableCheckboxClass(props))} {...tableCheckboxRest(props)}>
    <Checkbox
      checked={props.checked}
      indeterminate={props.indeterminate}
      onCheckedChange={(newChecked) => handleTableCheckboxChange(props, newChecked)}
      aria-label={tableCheckboxLabel(props, 'Select row')}
      disabled={tableCheckboxDisabled(props)}
      class="relative before:absolute before:-inset-3 before:content-['']"
    />
  </td>
{/snippet}

{#snippet ResizeHandle({ class: className, ...rest }: RestProps & { class?: string })}
  <button
    type="button"
    aria-label="Resize column"
    class={cn(
      'invisible h-full group-hover:visible w-[10px] flex items-center justify-center cursor-col-resize touch-none select-none absolute top-0 right-0 m-0 bg-kumo-base p-0 focus-visible:ring-2 focus-visible:ring-kumo-brand',
      className
    )}
    {...rest}
  >
    <span class="h-5 w-[2px] rounded bg-kumo-hairline"></span>
  </button>
{/snippet}
