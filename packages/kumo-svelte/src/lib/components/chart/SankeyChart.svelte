<script lang="ts">
  import type { EChartsOption } from 'echarts';
  import Chart, { type ChartEvents } from './Chart.svelte';
  import { ChartPalette } from './Color';
  import { defaultValueFormat, escapeHtml } from './tooltip-utils';

  export interface SankeyNodeData {
    id?: string;
    name: string;
    color?: string;
    value?: number;
    tooltipData?: Record<string, number | string>;
    isDrillable?: boolean;
    childCount?: number;
  }

  export interface SankeyLinkData {
    id?: string;
    source: number;
    target: number;
    value: number;
    isDrillable?: boolean;
  }

  export interface SankeyTooltipParams {
    type: 'node' | 'link';
    name: string;
    node?: SankeyNodeData;
    link?: { source: string; target: string; value: number };
    color?: string;
  }

  interface Props {
    echarts: any;
    nodes: SankeyNodeData[];
    links: SankeyLinkData[];
    height?: number;
    showNodeValues?: boolean;
    formatValue?: (value: number) => string;
    tooltipFormatter?: (params: SankeyTooltipParams) => string;
    nodeWidth?: number;
    nodePadding?: number;
    showTooltip?: boolean;
    defaultNodeColor?: string;
    left?: number | string;
    right?: number | string;
    linkColor?: 'gradient' | 'gray';
    linkOpacity?: number;
    class?: string;
    isDarkMode?: boolean;
    onNodeClick?: (node: SankeyNodeData) => void;
    onLinkClick?: (link: SankeyLinkData) => void;
  }

  let {
    echarts,
    nodes,
    links,
    height = 400,
    showNodeValues,
    formatValue = defaultValueFormat,
    tooltipFormatter,
    nodeWidth = 8,
    nodePadding = 10,
    showTooltip = true,
    defaultNodeColor,
    left,
    right,
    linkColor = 'gradient',
    linkOpacity = 0.5,
    class: className,
    isDarkMode = false,
    onNodeClick,
    onLinkClick
  }: Props = $props();

  const escapeRichText = (str: string): string => str.replace(/[{}|]/g, (char) => `\\${char}`);
  const sanitizeColor = (color: string): string => (/^#(?:[0-9a-f]{3}|[0-9a-f]{6}|[0-9a-f]{8})$/i.test(color) ? color : '#666');

  let options = $derived.by(() => {
    const hasNodeValues = nodes.some((node) => node.value !== undefined);
    const shouldShowValues = showNodeValues ?? hasNodeValues;
    const labelColor = ChartPalette.text('primary', isDarkMode);
    const secondaryColor = ChartPalette.text('secondary', isDarkMode);
    const nodeDataMap = new Map(nodes.map((node) => [node.name, node]));
    const chartNodes = nodes.map((node, index) => ({
      name: node.name,
      value: node.value,
      itemStyle: { color: node.color ?? defaultNodeColor ?? ChartPalette.categorical(index, isDarkMode) }
    }));
    const chartLinks = links.map((link) => ({ source: nodes[link.source]?.name ?? '', target: nodes[link.target]?.name ?? '', value: link.value }));

    return {
      backgroundColor: 'transparent',
      animation: true,
      animationDuration: 500,
      animationDurationUpdate: 300,
      animationEasingUpdate: 'cubicInOut',
      tooltip: showTooltip
        ? {
            trigger: 'item',
            triggerOn: 'mousemove',
            dangerousHtmlFormatter: (params: any) => {
              if (params?.dataType === 'node' && params.name) {
                const nodeData = nodeDataMap.get(params.name);
                const color = sanitizeColor(nodeData?.color ?? params.color ?? '#666');
                if (tooltipFormatter) return tooltipFormatter({ type: 'node', name: params.name, node: nodeData, color });
                return `<div style="display:flex;align-items:center;gap:6px;"><span style="display:inline-block;width:10px;height:10px;border-radius:50%;background:${color}"></span><strong>${escapeHtml(params.name)}</strong></div>`;
              }
              if (params?.dataType === 'edge' && params.data) {
                const { source, target, value } = params.data;
                if (tooltipFormatter) return tooltipFormatter({ type: 'link', name: `${source} -> ${target}`, link: { source, target, value } });
                const sourceColor = sanitizeColor(nodeDataMap.get(source ?? '')?.color ?? '#666');
                const targetColor = sanitizeColor(nodeDataMap.get(target ?? '')?.color ?? '#666');
                return `<div style="display:flex;align-items:center;gap:6px;margin-bottom:4px;"><span style="display:inline-block;width:10px;height:10px;border-radius:50%;background:${sourceColor}"></span><strong>${escapeHtml(source ?? '')}</strong><span style="color:${secondaryColor}">-></span><span style="display:inline-block;width:10px;height:10px;border-radius:50%;background:${targetColor}"></span><strong>${escapeHtml(target ?? '')}</strong></div><strong>${value !== undefined ? escapeHtml(formatValue(value)) : ''}</strong>`;
              }
              return '';
            }
          }
        : undefined,
      series: [
        {
          type: 'sankey',
          ...(left !== undefined && { left }),
          ...(right !== undefined && { right }),
          data: chartNodes,
          links: chartLinks,
          draggable: false,
          emphasis: { focus: 'adjacency' },
          nodeWidth,
          nodeGap: nodePadding,
          lineStyle: { color: linkColor === 'gradient' ? 'source' : '#d1d5db', opacity: linkColor === 'gradient' ? linkOpacity : 0.4, curveness: 0.5 },
          label: {
            show: true,
            color: labelColor,
            fontSize: 12,
            formatter: shouldShowValues
              ? (params: { name?: string }) => {
                  const name = params.name ?? '';
                  const nodeData = nodeDataMap.get(name);
                  return nodeData?.value !== undefined ? `{value|${escapeRichText(formatValue(nodeData.value))}}\n{name|${escapeRichText(name)}}` : escapeRichText(name);
                }
              : undefined,
            rich: shouldShowValues
              ? {
                  value: { fontSize: 11, color: labelColor, lineHeight: 16 },
                  name: { fontSize: 12, color: labelColor, fontWeight: 700 }
                }
              : undefined
          }
        }
      ]
    } as EChartsOption;
  });

  let events = $derived<Partial<ChartEvents>>({
    click: (params: any) => {
      if (params.dataType === 'node' && onNodeClick && params.name) {
        onNodeClick({ ...nodes.find((node) => node.name === params.name), name: params.name });
      } else if (params.dataType === 'edge' && onLinkClick && params.data) {
        const sourceIndex = nodes.findIndex((node) => node.name === params.data.source);
        const targetIndex = nodes.findIndex((node) => node.name === params.data.target);
        if (sourceIndex === -1 || targetIndex === -1) return;
        const originalLink = links.find((link) => link.source === sourceIndex && link.target === targetIndex);
        onLinkClick({ ...originalLink, source: sourceIndex, target: targetIndex, value: params.data.value ?? 0 });
      }
    }
  });
</script>

<Chart {echarts} options={options as any} {height} class={className} {isDarkMode} onEvents={events} />
