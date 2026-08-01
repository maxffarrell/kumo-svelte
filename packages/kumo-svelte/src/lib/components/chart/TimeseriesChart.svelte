<script lang="ts">
  import { onMount } from 'svelte';
  import { Tooltip as TooltipPrimitive } from 'bits-ui';
  import type { SeriesOption } from 'echarts';
  import type { EChartsType } from 'echarts/core';
  import Chart, { type ChartEvents, type KumoChartOption } from './Chart.svelte';
  import { ChartPalette } from './Color';
  import {
    buildTimeseriesMarkerAnnotations,
    clusterTimeseriesMarkers,
    getApproximateMarkerClusterInterval,
    getTimeseriesMarkerFromEvent,
    type TimeseriesMarker,
    type TimeseriesMarkerCluster
  } from './timeseries-markers';
  import {
    buildTimeseriesThresholdAnnotations,
    getThresholdValueExtent,
    type TimeseriesThreshold
  } from './timeseries-thresholds';

  export type { TimeseriesMarker } from './timeseries-markers';
  export type { TimeseriesThreshold } from './timeseries-thresholds';

  export interface TimeseriesData {
    name: string;
    data: [number, number][];
    color: string;
  }

  interface Props {
    echarts: any;
    type?: 'line' | 'bar';
    data: TimeseriesData[];
    markers?: TimeseriesMarker[];
    thresholds?: TimeseriesThreshold[];
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
    enableLegendSelection?: boolean;
    height?: number;
    onTimeRangeChange?: (from: number, to: number) => void;
    isDarkMode?: boolean;
    gradient?: boolean;
    loading?: boolean;
    ariaDescription?: string;
    chartRef?: EChartsType | null;
    animation?: boolean;
    animationDuration?: number;
    optionUpdateBehavior?: Record<string, unknown>;
  }

  let {
    echarts,
    type = 'line',
    data,
    markers,
    thresholds,
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
    enableLegendSelection = false,
    height = 350,
    onTimeRangeChange,
    isDarkMode,
    gradient = false,
    loading = false,
    ariaDescription,
    chartRef = $bindable(null),
    animation = true,
    animationDuration = 600,
    optionUpdateBehavior
  }: Props = $props();

  let detectedDarkMode = $state(false);
  let containerRef: HTMLDivElement;
  let tooltipAnchor: HTMLSpanElement | null = $state(null);
  interface TooltipRow {
    name: string;
    value: number;
    color: string;
  }

  type TooltipState =
    | { type: 'series'; ts: number; rows: TooltipRow[]; hiddenCount: number }
    | { type: 'marker'; ts: number; color: string; markers: TimeseriesMarker[]; rows: TooltipRow[]; hiddenCount: number };

  let tooltipState: TooltipState | null = $state(null);
  let legendSelected: Record<string, boolean> | null = $state(null);
  let mousePos = $state({ x: 0, y: 0 });
  let markerHover = $state(false);
  let activeMarkerKey: string | null = $state(null);
  const effectiveDarkMode = $derived(isDarkMode ?? detectedDarkMode);

  const CHART_LOADER_WIDTH = 400;
  const CHART_LOADER_SAMPLES = 80;
  const CHART_LOADER_BARS = 24;

  function chartLoaderWave(theta: number) {
    return (
      0.45 * Math.sin(3 * theta) +
      0.3 * Math.sin(5 * theta + 0.9) +
      0.25 * Math.sin(7 * theta + 2.1)
    );
  }

  function chartLoaderLinePath(chartHeight: number) {
    const mid = chartHeight / 2;
    const amplitude = Math.min(chartHeight * 0.18, 40);
    return Array.from({ length: CHART_LOADER_SAMPLES + 1 }, (_, index) => {
      const x = (index / CHART_LOADER_SAMPLES) * CHART_LOADER_WIDTH;
      const theta = (x / CHART_LOADER_WIDTH) * 2 * Math.PI;
      const y = mid - chartLoaderWave(theta) * amplitude;
      return `${index === 0 ? 'M' : 'L'}${x.toFixed(2)},${y.toFixed(2)}`;
    }).join(' ');
  }

  function chartLoaderBars(chartHeight: number) {
    const slot = CHART_LOADER_WIDTH / CHART_LOADER_BARS;
    const barWidth = slot * 0.65;
    const minHeight = chartHeight * 0.15;
    const maxHeight = chartHeight * 0.85;

    return Array.from({ length: CHART_LOADER_BARS }, (_, index) => {
      const theta = ((index + 0.5) / CHART_LOADER_BARS) * 2 * Math.PI;
      const normalized = (chartLoaderWave(theta) + 1) / 2;
      const barHeight = minHeight + normalized * (maxHeight - minHeight);
      return {
        x: index * slot + (slot - barWidth) / 2,
        y: chartHeight - barHeight,
        width: barWidth,
        height: barHeight
      };
    });
  }

  let chartLoaderId = $state('kumo-chart-loader');
  onMount(() => {
    chartLoaderId = `kumo-chart-loader-${
      typeof crypto !== 'undefined' && 'randomUUID' in crypto
        ? crypto.randomUUID()
        : `${Date.now()}-${Math.random().toString(36).slice(2)}`
    }`;
  });

  const chartLoaderLine = $derived(chartLoaderLinePath(height));
  const chartLoaderArea = $derived(`${chartLoaderLine} L${CHART_LOADER_WIDTH},${height} L0,${height} Z`);
  const chartLoaderBarsData = $derived(chartLoaderBars(height));
  const chartLoaderColor = $derived(ChartPalette.semantic('Skeleton', effectiveDarkMode));
  const chartLoaderFillId = $derived(`${chartLoaderId}-fill`);
  const chartLoaderShineId = $derived(`${chartLoaderId}-shine`);
  const chartLoaderClipId = $derived(`${chartLoaderId}-clip`);

  function closeTooltip() {
    activeMarkerKey = null;
    markerHover = false;
    tooltipState = null;
  }

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
  const getTimestamps = (seriesData: TimeseriesData[], referenceMarkers: TimeseriesMarker[] | undefined): number[] => [
    ...seriesData.flatMap((series) => series.data.map(([timestamp]) => timestamp)),
    ...(referenceMarkers?.map((marker) => marker.timestamp) ?? [])
  ];
  const getAllTooltipRowsAtTimestamp = (
    seriesData: TimeseriesData[],
    ts: number,
    selected: Record<string, boolean> | null
  ): TooltipRow[] => {
    const seenNames = new Set<string>();
    const rows: TooltipRow[] = [];

    for (const series of seriesData) {
      if (seenNames.has(series.name)) continue;
      if (selected && selected[series.name] === false) continue;
      seenNames.add(series.name);
      const value = findNearest(series.data, ts);
      if (value != null) rows.push({ name: series.name, value, color: series.color });
    }

    return rows.sort((a, b) => b.value - a.value);
  };
  const limitTooltipRows = (rows: TooltipRow[], max: number): { rows: TooltipRow[]; hiddenCount: number } => ({
    rows: rows.slice(0, max),
    hiddenCount: Math.max(0, rows.length - max)
  });
  const getTooltipRowsAtTimestamp = (
    seriesData: TimeseriesData[],
    ts: number,
    selected: Record<string, boolean> | null,
    max: number
  ): { rows: TooltipRow[]; hiddenCount: number } => {
    return limitTooltipRows(getAllTooltipRowsAtTimestamp(seriesData, ts, selected), max);
  };
  const markerColor = $derived(ChartPalette.text('primary', effectiveDarkMode));
  const axisTextColor = $derived(ChartPalette.text('primary', effectiveDarkMode));
  const gridLineColor = $derived(colorWithOpacity(axisTextColor, 0.2));
  const markerLabelBackgroundColor = $derived(effectiveDarkMode ? 'rgba(0, 0, 0, 0.5)' : 'rgba(255, 255, 255, 0.5)');

  let options = $derived.by(() => {
    const incompleteBefore = incomplete?.before;
    const incompleteAfter = incomplete?.after;
    const series: SeriesOption[] = [];
    const seriesType = type === 'bar' ? ({ type: 'bar', stack: 'total' } as const) : ({ type: 'line', showSymbol: false } as const);
    const markerClusters = clusterTimeseriesMarkers(
      markers,
      getApproximateMarkerClusterInterval(getTimestamps(data, markers), xAxisTickCount ?? 5)
    );
    const markerAnnotations = buildTimeseriesMarkerAnnotations(markerClusters, {
      color: markerColor,
      labelBackgroundColor: markerLabelBackgroundColor
    });
    const thresholdAnnotations = buildTimeseriesThresholdAnnotations(thresholds);
    const thresholdExtent = getThresholdValueExtent(thresholds);

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

    if (markerAnnotations) {
      series.push({
        data: [],
        name: 'Markers',
        type: type === 'bar' ? 'bar' : 'line',
        animation: false,
        markLine: markerAnnotations.markLine
      } as SeriesOption);
    }

    if (thresholdAnnotations) {
      series.push({
        data: [],
        name: 'Thresholds',
        type: type === 'bar' ? 'bar' : 'line',
        animation: false,
        markLine: thresholdAnnotations.markLine
      } as SeriesOption);
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
      ...(enableLegendSelection ? { legend: { show: false } } : {}),
      xAxis: {
        name: xAxisName,
        nameLocation: 'middle',
        nameGap: 30,
        nameTextStyle: { color: axisTextColor },
        type: 'time',
        splitLine: { show: false },
        axisLine: { show: false },
        splitNumber: xAxisTickCount ?? 5,
        axisLabel: {
          color: axisTextColor,
          ...(xAxisTickFormat && { formatter: (value: number) => xAxisTickFormat(value) })
        }
      },
      yAxis: {
        name: yAxisName,
        nameLocation: 'middle',
        nameGap: 40,
        nameTextStyle: { color: axisTextColor },
        type: 'value',
        axisTick: { show: true },
        axisLabel: { margin: 15, color: axisTextColor, ...(yAxisTickFormat && { formatter: (value: number) => yAxisTickFormat(value) }) },
        splitLine: { show: true, lineStyle: { type: 'dashed', width: 1, color: gridLineColor } },
        splitNumber: yAxisTickCount,
        ...(thresholdExtent && {
          min: (value: { min: number }) => Math.min(value.min, thresholdExtent.min),
          max: (value: { max: number }) => Math.max(value.max, thresholdExtent.max)
        })
      },
      grid: { left: yAxisName ? 30 : 24, right: 24, top: 24, bottom: xAxisName ? 30 : 24 },
      series
    } satisfies KumoChartOption;
  });

  let events = $derived<Partial<ChartEvents>>(
    {
      updateaxispointer: (params: any) => {
        if (markerHover) return;
        const ts: number | undefined = params?.axesInfo?.[0]?.value;
        if (ts == null) return;

        const allRows = getAllTooltipRowsAtTimestamp(data, ts, legendSelected);
        let rows: TooltipRow[];
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
          ({ rows, hiddenCount } = limitTooltipRows(allRows, tooltipMaxItems));
        }
        tooltipState = { type: 'series', ts, rows, hiddenCount };
      },
      mouseover: (params: any) => {
        const marker: TimeseriesMarkerCluster | undefined = getTimeseriesMarkerFromEvent(params);
        if (!marker) return;

        const markerKey = `${marker.timestamp}-${marker.label ?? ''}`;
        if (activeMarkerKey === markerKey) return;

        activeMarkerKey = markerKey;
        markerHover = true;
        chartRef?.dispatchAction({ type: 'hideTip' });
        chartRef?.dispatchAction({ type: 'updateAxisPointer', currTrigger: 'leave' });

        const { rows, hiddenCount } = getTooltipRowsAtTimestamp(data, marker.timestamp, legendSelected, tooltipMaxItems);

        tooltipState = {
          type: 'marker',
          ts: marker.timestamp,
          color: marker.color ?? markerColor,
          markers: marker.markers,
          rows,
          hiddenCount
        };
      },
      mouseout: (params: any) => {
        if (!getTimeseriesMarkerFromEvent(params)) return;
        closeTooltip();
      },
      globalout: () => {
        closeTooltip();
      },
      legendselectchanged: (params: { selected?: Record<string, boolean> }) => {
        legendSelected = params.selected ?? null;
      },
      legendselected: (params: { selected?: Record<string, boolean> }) => {
        legendSelected = params.selected ?? null;
      },
      legendunselected: (params: { selected?: Record<string, boolean> }) => {
        legendSelected = params.selected ?? null;
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
    enableLegendSelection;
    effectiveDarkMode;
    legendSelected = null;
  });

  $effect(() => {
    if (chartRef && onTimeRangeChange && !loading) {
      options;
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

  $effect(() => {
    if (!tooltipState || typeof window === 'undefined') return;

    const closeWhenOutsideChart = (event: MouseEvent) => {
      const rect = containerRef?.getBoundingClientRect();
      if (!rect) return;
      if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) {
        closeTooltip();
      }
    };

    window.addEventListener('mousemove', closeWhenOutsideChart);
    return () => window.removeEventListener('mousemove', closeWhenOutsideChart);
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

<div bind:this={containerRef} class="relative w-full" style:height={`${height}px`} role="presentation" aria-busy={loading || undefined} onmousemove={updateMousePosition}>
  {#if loading}
    <div role="status" aria-label="Loading chart" class="absolute inset-0 overflow-hidden" style:height={`${height}px`}>
      <svg width="100%" height={height} viewBox={`0 0 ${CHART_LOADER_WIDTH} ${height}`} preserveAspectRatio="none" class="block w-full">
        <defs>
          <linearGradient id={chartLoaderFillId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color={chartLoaderColor} stop-opacity={effectiveDarkMode ? 0.07 : 0.1}></stop>
            <stop offset="100%" stop-color={chartLoaderColor} stop-opacity="0"></stop>
          </linearGradient>
          <linearGradient id={chartLoaderShineId} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stop-color={chartLoaderColor} stop-opacity="0"></stop>
            <stop offset="50%" stop-color={chartLoaderColor} stop-opacity={effectiveDarkMode ? 0.16 : 0.24}></stop>
            <stop offset="100%" stop-color={chartLoaderColor} stop-opacity="0"></stop>
          </linearGradient>
          <clipPath id={chartLoaderClipId}>
            {#if type === 'bar'}
              {#each chartLoaderBarsData as bar}
                <rect x={bar.x} y={bar.y} width={bar.width} height={bar.height}></rect>
              {/each}
            {:else}
              <path d={chartLoaderArea}></path>
            {/if}
          </clipPath>
        </defs>

        {#if type === 'bar'}
          {#each chartLoaderBarsData as bar}
            <rect x={bar.x} y={bar.y} width={bar.width} height={bar.height} fill={chartLoaderColor} fill-opacity={effectiveDarkMode ? 0.12 : 0.16}></rect>
          {/each}
        {:else}
          <path d={chartLoaderArea} fill={`url(#${chartLoaderFillId})`}></path>
          <path d={chartLoaderLine} fill="none" stroke={chartLoaderColor} stroke-opacity={effectiveDarkMode ? 0.36 : 0.6} stroke-width="1" vector-effect="non-scaling-stroke"></path>
        {/if}

        <g clip-path={`url(#${chartLoaderClipId})`}>
          <rect class="kumo-chart-shimmer" x="0" y="0" width={CHART_LOADER_WIDTH} height={height} fill={`url(#${chartLoaderShineId})`}></rect>
        </g>
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
          class="pointer-events-none z-50 min-w-[150px] max-w-[280px] rounded-lg bg-kumo-base p-2 text-kumo-default shadow-lg shadow-kumo-tip-shadow outline-1 outline-kumo-fill"
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
          aria-label={`${tooltipState.type === 'marker' ? 'Reference marker' : 'Values'} at ${formatAriaTimestamp(tooltipState.ts)}`}
        >
          {#if tooltipState.type === 'marker'}
            {#if tooltipState.markers.length === 1}
              <div class="mb-1 text-xs font-semibold text-kumo-default">{formatTimestamp(tooltipState.markers[0].timestamp)}</div>
            {/if}
            <div class="space-y-1">
              {#each tooltipState.markers as marker, index (`${marker.timestamp}-${marker.label}-${index}`)}
                <div>
                  <div class="flex items-center gap-2 text-xs text-kumo-default">
                    <span class="size-3 shrink-0 rounded-full" style:background-color={marker.color ?? tooltipState.color}></span>
                    <span class="font-medium">{marker.label ?? 'Reference marker'}</span>
                    {#if tooltipState.markers.length > 1}
                      <span class="text-kumo-subtle">{formatTimestamp(marker.timestamp)}</span>
                    {/if}
                  </div>
                  {#if marker.description}
                    <div class="ml-5 mt-0.5 text-xs text-kumo-default">{marker.description}</div>
                  {/if}
                </div>
              {/each}
            </div>
            {#if tooltipState.rows.length > 0}
              <div class="mt-2 border-t border-kumo-line pt-2">
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
              </div>
            {/if}
          {:else}
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
          {/if}
        </TooltipPrimitive.Content>
      </TooltipPrimitive.Portal>
    </TooltipPrimitive.Root>
  {/if}
</div>
