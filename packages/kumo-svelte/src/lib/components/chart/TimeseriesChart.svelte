<script lang="ts">
  import { onMount } from 'svelte';
  import { Tooltip as TooltipPrimitive } from 'bits-ui';
  import type { SeriesOption } from 'echarts';
  import type { EChartsType } from 'echarts/core';
  import Chart, { type ChartEvents, type KumoChartOption } from './Chart.svelte';

  export interface TimeseriesData {
    name: string;
    data: [number, number][];
    color: string;
  }

  interface Props {
    echarts: any;
    type?: 'line' | 'bar';
    data: TimeseriesData[];
    xAxisName?: string;
    xAxisTickCount?: number;
    xAxisTickFormat?: (value: number) => string;
    yAxisTickFormat?: (value: number) => string;
    yAxisTickLabelFormat?: (value: number) => string;
    yAxisName?: string;
    yAxisTickCount?: number;
    tooltipValueFormat?: (value: number) => string;
    tooltipMode?: 'all' | 'single';
    tooltipMaxItems?: number;
    tooltipBoundary?: 'clipping-ancestors' | Element | Element[];
    tooltipFollowCursor?: 'both' | 'x';
    incomplete?: { before?: number; after?: number };
    height?: number;
    onTimeRangeChange?: (from: number, to: number) => void;
    isDarkMode?: boolean;
    gradient?: boolean;
    loading?: boolean;
    ariaDescription?: string;
    animation?: boolean;
    animationDuration?: number;
    optionUpdateBehavior?: Record<string, unknown>;
  }

  let {
    echarts,
    type = 'line',
    data,
    xAxisName,
    xAxisTickCount,
    xAxisTickFormat,
    yAxisTickFormat,
    yAxisTickLabelFormat,
    yAxisName,
    yAxisTickCount,
    tooltipValueFormat,
    tooltipMode = 'all',
    tooltipMaxItems = 10,
    tooltipBoundary,
    tooltipFollowCursor = 'both',
    incomplete,
    height = 350,
    onTimeRangeChange,
    isDarkMode,
    gradient = false,
    loading = false,
    ariaDescription,
    animation = true,
    animationDuration = 600,
    optionUpdateBehavior
  }: Props = $props();

  let chartRef: EChartsType | null = $state(null);
  let detectedDarkMode = $state(false);
  let containerRef: HTMLDivElement;
  let tooltipAnchor: HTMLSpanElement | null = $state(null);
  let tooltipState: { ts: number; rows: { name: string; value: number; color: string }[]; hiddenCount: number } | null = $state(null);
  let mousePos = $state({ x: 0, y: 0 });
  const effectiveDarkMode = $derived(isDarkMode ?? detectedDarkMode);

  onMount(() => {
    const updateDetectedDarkMode = () => {
      detectedDarkMode =
        document.documentElement.classList.contains('dark') ||
        document.body.classList.contains('dark') ||
        document.documentElement.dataset.mode === 'dark' ||
        document.body.dataset.mode === 'dark' ||
        window.matchMedia?.('(prefers-color-scheme: dark)').matches === true;
    };
    const themeObserver = new MutationObserver(updateDetectedDarkMode);
    updateDetectedDarkMode();
    [document.documentElement, document.body].forEach((node) => {
      themeObserver.observe(node, { attributes: true, attributeFilter: ['data-mode', 'class'] });
    });
    const mediaQuery = window.matchMedia?.('(prefers-color-scheme: dark)');
    mediaQuery?.addEventListener('change', updateDetectedDarkMode);

    return () => {
      themeObserver.disconnect();
      mediaQuery?.removeEventListener('change', updateDetectedDarkMode);
    };
  });

  const colorWithOpacity = (color: string, alpha: number): string => {
    const a = Math.max(0, Math.min(1, alpha));
    const rgbMatch = color.match(/rgba?\(\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)/i);
    if (rgbMatch) return `rgba(${rgbMatch[1]}, ${rgbMatch[2]}, ${rgbMatch[3]}, ${a})`;
    let hex = color.replace(/^#/, '');
    if (hex.length === 3) hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    if (hex.length === 8) hex = hex.slice(0, 6);
    return `rgba(${parseInt(hex.slice(0, 2), 16)}, ${parseInt(hex.slice(2, 4), 16)}, ${parseInt(hex.slice(4, 6), 16)}, ${a})`;
  };

  const tooltipDateFormat = new Intl.DateTimeFormat(undefined, {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  });
  const defaultNumberFormat = new Intl.NumberFormat(undefined, { maximumFractionDigits: 3 });
  const pad = (n: number) => n.toString().padStart(2, '0');
  const formatTimestamp = (ts: number | string | Date): string => {
    return tooltipDateFormat.format(new Date(ts));
  };
  const formatAriaTimestamp = (ts: number | string | Date): string => {
    const d = new Date(ts);
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
  };
  const findNearest = (points: [number, number][], ts: number) => {
    if (points.length === 0) return null;
    let lo = 0;
    let hi = points.length - 1;
    while (lo < hi) {
      const mid = (lo + hi) >> 1;
      if (points[mid][0] < ts) lo = mid + 1;
      else hi = mid;
    }
    if (lo > 0 && Math.abs(points[lo - 1][0] - ts) < Math.abs(points[lo][0] - ts)) lo -= 1;
    return points[lo][1];
  };
  const formatDefaultValue = (value: number) => {
    if (Number.isInteger(value)) return String(value);
    return defaultNumberFormat.format(value);
  };

  let options = $derived.by(() => {
    const incompleteBefore = incomplete?.before;
    const incompleteAfter = incomplete?.after;
    const series: SeriesOption[] = [];
    const seriesType = type === 'bar' ? ({ type: 'bar', stack: 'total' } as const) : ({ type: 'line', showSymbol: false } as const);

    for (const s of data) {
      const incompleteBeforePoints = incompleteBefore && type === 'line' ? s.data.filter((point) => point[0] <= incompleteBefore) : [];
      const incompleteAfterPoints = incompleteAfter && type === 'line' ? s.data.filter((point) => point[0] >= incompleteAfter) : [];
      const completePoints =
        incompleteBeforePoints.length > 0 || incompleteAfterPoints.length > 0
          ? s.data.slice(Math.max(0, incompleteBeforePoints.length - 1), Math.max(0, s.data.length - incompleteAfterPoints.length + 1))
          : s.data;

      series.push({
        data: completePoints,
        color: s.color,
        name: s.name,
        emphasis: { focus: 'series' },
        ...(gradient && type === 'line'
          ? {
              areaStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: colorWithOpacity(s.color, 0.4) },
                  { offset: 1, color: colorWithOpacity(s.color, 0) }
                ])
              }
            }
          : {}),
        ...seriesType
      });

      const incompleteConfig = {
        color: s.color,
        name: s.name,
        type: 'line' as const,
        lineStyle: { type: 'dashed' as const },
        showSymbol: false,
        emphasis: { focus: 'series' as const }
      };
      if (incompleteBeforePoints.length > 0) series.push({ ...incompleteConfig, data: incompleteBeforePoints });
      if (incompleteAfterPoints.length > 0) series.push({ ...incompleteConfig, data: incompleteAfterPoints });
    }

    return {
      aria: { enabled: true, ...(ariaDescription && { label: { description: ariaDescription } }) },
      brush: {
        xAxisIndex: 'all',
        brushType: 'lineX',
        brushMode: 'single',
        outOfBrush: { colorAlpha: 0.3 },
        brushStyle: { borderWidth: 1, color: 'rgba(120,140,180,0.3)', borderColor: 'rgba(120,140,180,0.8)' }
      },
      tooltip: {
        trigger: 'axis',
        showContent: false,
        axisPointer: { type: 'shadow' }
      },
      backgroundColor: 'transparent',
      animation,
      animationDuration,
      animationDurationUpdate: 300,
      animationEasing: 'cubicOut',
      animationEasingUpdate: 'cubicOut',
      toolbox: { show: false },
      xAxis: {
        name: xAxisName,
        nameLocation: 'middle',
        nameGap: 30,
        type: 'time',
        splitLine: { show: false },
        axisLine: { show: false },
        splitNumber: xAxisTickCount ?? 5,
        ...(xAxisTickFormat && { axisLabel: { formatter: (value: number) => xAxisTickFormat(value) } })
      },
      yAxis: {
        name: yAxisName,
        nameLocation: 'middle',
        nameGap: 40,
        type: 'value',
        axisTick: { show: true },
        axisLabel: { margin: 15, ...(yAxisTickFormat && { formatter: (value: number) => yAxisTickFormat(value) }) },
        splitLine: { show: true, lineStyle: { type: 'dashed', width: 1 } },
        splitNumber: yAxisTickCount
      },
      grid: { left: yAxisName ? 30 : 24, right: 24, top: 24, bottom: xAxisName ? 30 : 24 },
      series
    } satisfies KumoChartOption;
  });

  let events = $derived<Partial<ChartEvents>>(
    {
      updateaxispointer: (params: any) => {
        const ts: number | undefined = params?.axesInfo?.[0]?.value;
        if (ts == null) return;
        const seenNames = new Set<string>();
        const allRows: { name: string; value: number; color: string }[] = [];

        for (const series of data) {
          if (seenNames.has(series.name)) continue;
          seenNames.add(series.name);
          const value = findNearest(series.data, ts);
          if (value != null) allRows.push({ name: series.name, value, color: series.color });
        }

        allRows.sort((a, b) => b.value - a.value);
        let rows: { name: string; value: number; color: string }[];
        let hiddenCount = 0;
        if (tooltipMode === 'single') {
          const cursorValue = chartRef ? (chartRef.convertFromPixel('grid', [0, mousePos.y]) as [number, number] | undefined)?.[1] : null;
          if (cursorValue != null && allRows.length > 0) {
            rows = [
              allRows.reduce((best, row) =>
                Math.abs(row.value - cursorValue) < Math.abs(best.value - cursorValue) ? row : best
              )
            ];
          } else {
            rows = allRows.slice(0, 1);
          }
        } else {
          rows = allRows.slice(0, tooltipMaxItems);
          hiddenCount = Math.max(0, allRows.length - tooltipMaxItems);
        }
        tooltipState = { ts, rows, hiddenCount };
      },
      globalout: () => {
        tooltipState = null;
      },
      ...(onTimeRangeChange
        ? {
            brushend: (params: any) => {
              const range = params.areas?.[0]?.coordRange;
              if (!range) return;
              onTimeRangeChange(range[0], range[1]);
              chartRef?.dispatchAction({ type: 'brush', areas: [] });
            }
          }
        : {})
    }
  );

  $effect(() => {
    if (chartRef && onTimeRangeChange && !loading) {
      chartRef.dispatchAction({
        type: 'takeGlobalCursor',
        key: 'brush',
        brushOption: { brushType: 'lineX', brushMode: 'single' }
      });
      return () => {
        chartRef?.dispatchAction({
          type: 'takeGlobalCursor',
          key: 'brush',
          brushOption: { brushType: false }
        });
      };
    }
  });

  function updateMousePosition(event: MouseEvent) {
    const rect = containerRef.getBoundingClientRect();
    mousePos = { x: event.clientX - rect.left, y: event.clientY - rect.top };
  }

  const tooltipAnchorStyle = $derived.by(() => {
    const x = mousePos.x;
    const y = tooltipFollowCursor === 'x' ? 12 : mousePos.y;
    return `left:${x}px;top:${y}px;`;
  });

  const tooltipCollisionBoundary = $derived.by(() => {
    if (tooltipBoundary === undefined || tooltipBoundary === 'clipping-ancestors') return undefined;
    return tooltipBoundary;
  });
</script>

<div bind:this={containerRef} class="relative w-full" style:height={`${height}px`} role="presentation" onmousemove={updateMousePosition}>
  {#if loading}
    {@const mid = height / 2}
    {@const amp = Math.min(height * 0.12, 28)}
    {@const period = 400}
    {@const wavePath = Array.from({ length: 121 }, (_, i) => {
      const x = -period + (i / 120) * period * 3;
      const y = mid + Math.sin((i / 120) * 2 * Math.PI * 3) * amp;
      return `${i === 0 ? 'M' : 'L'}${x.toFixed(2)},${y.toFixed(2)}`;
    }).join(' ')}
    <div aria-hidden="true" class="absolute inset-0 overflow-hidden" style:height={`${height}px`}>
      <svg width="100%" height={height} viewBox={`0 0 ${period} ${height}`} preserveAspectRatio="none" class="w-full animate-pulse">
        <path
          d={wavePath}
          fill="none"
          stroke={effectiveDarkMode ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.2)'}
          stroke-width="2"
          style:animation="kumo-chart-wave 2.4s linear infinite"
          style:transform-origin="0 0"
        ></path>
      </svg>
    </div>
  {:else}
    <Chart {echarts} bind:chartRef options={options} {height} isDarkMode={effectiveDarkMode} onEvents={events} optionUpdateBehavior={optionUpdateBehavior as any} />
  {/if}
  <span bind:this={tooltipAnchor} aria-hidden="true" class="pointer-events-none absolute size-px" style={tooltipAnchorStyle}></span>
  {#if tooltipState}
    {@const formatFn = tooltipValueFormat ?? yAxisTickLabelFormat}
    <TooltipPrimitive.Root open={true} delayDuration={0} disableHoverableContent>
      <TooltipPrimitive.Portal>
        <TooltipPrimitive.Content
          class="pointer-events-none z-50 min-w-[150px] max-w-[280px] rounded-lg bg-kumo-base p-2 text-kumo-default shadow-lg shadow-kumo-tip-shadow outline outline-1 outline-kumo-fill"
          customAnchor={tooltipAnchor}
          side="right"
          align="start"
          sideOffset={12}
          collisionPadding={8}
          collisionBoundary={tooltipCollisionBoundary}
          avoidCollisions
          strategy="fixed"
          updatePositionStrategy="always"
          data-mode={effectiveDarkMode ? 'dark' : 'light'}
          aria-label={`Values at ${formatAriaTimestamp(tooltipState.ts)}`}
        >
          <div class="mb-1 text-xs font-semibold text-kumo-default">{formatTimestamp(tooltipState.ts)}</div>
          {#each tooltipState.rows as row (row.name)}
            <div class="flex items-center justify-between gap-4 py-0.5">
              <div class="flex min-w-0 items-center gap-2">
                <span class="size-3 shrink-0 rounded-full" style:background-color={row.color}></span>
                <span class="truncate text-xs font-medium text-kumo-default" title={row.name}>{row.name}</span>
              </div>
              <span class="shrink-0 text-xs font-semibold text-kumo-default">
                {formatFn ? formatFn(row.value) : formatDefaultValue(row.value)}
              </span>
            </div>
          {/each}
          {#if tooltipState.hiddenCount > 0}
            <div class="mt-1 text-xs text-kumo-subtle">+{tooltipState.hiddenCount} more</div>
          {/if}
        </TooltipPrimitive.Content>
      </TooltipPrimitive.Portal>
    </TooltipPrimitive.Root>
  {/if}
</div>
