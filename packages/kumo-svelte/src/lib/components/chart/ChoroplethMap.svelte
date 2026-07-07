<script lang="ts">
  import type { EChartsType } from 'echarts/core';
  import { geoMercator } from 'd3-geo';
  import Chart, { type ChartEvents, type KumoChartOption } from './Chart.svelte';
  import { ChartPalette } from './Color';
  import { defaultValueFormat, escapeHtml } from './tooltip-utils';
  import type { MapAccessor, MapGeoJson, MapProjection, MapStyle } from './BubbleMap.svelte';

  function resolve<T, V>(row: T, accessor: MapAccessor<T, V>): V {
    return typeof accessor === 'function' ? accessor(row) : (row[accessor] as V);
  }

  const MAX_ZOOM_FACTOR = 8;
  const MERCATOR_MAX_LAT = 85.0511;
  const DEFAULT_BOUNDING_COORDS: [[number, number], [number, number]] = [
    [-180, 80],
    [180, -58]
  ];
  const geoJsonMapNames = new WeakMap<MapGeoJson, string>();
  const mercatorProjection = geoMercator();

  const DEFAULT_PROJECTION: MapProjection = {
    project: (point) => {
      const lat = Math.max(-MERCATOR_MAX_LAT, Math.min(MERCATOR_MAX_LAT, point[1]));
      return mercatorProjection([point[0], lat]) ?? [0, 0];
    },
    unproject: (point) => mercatorProjection.invert?.(point as [number, number]) ?? [0, 0]
  };

  function resolveProjection(projection: MapProjection | null | undefined): MapProjection | undefined {
    if (projection === null) return undefined;
    return projection ?? DEFAULT_PROJECTION;
  }

  function projectedAspect(
    projection: MapProjection | undefined,
    [[west, north], [east, south]]: [[number, number], [number, number]]
  ): number {
    const project = projection ? projection.project : (point: number[]) => point;
    const midLat = Math.min(north, Math.max(south, 0));
    const width = Math.abs(project([east, midLat])[0] - project([west, midLat])[0]);
    const height = Math.abs(project([0, north])[1] - project([0, south])[1]);
    return width > 0 && height > 0 ? width / height : 16 / 9;
  }

  function sanitizeMapName(name: string) {
    return name.replace(/[^a-zA-Z0-9_-]/g, '-');
  }

  function hashString(value: string) {
    let hash = 0;
    for (let i = 0; i < value.length; i++) {
      hash = Math.imul(31, hash) + value.charCodeAt(i);
    }
    return (hash >>> 0).toString(36);
  }

  function getMapName(geoJson: MapGeoJson, mapName?: string) {
    if (mapName) return sanitizeMapName(mapName);
    const existing = geoJsonMapNames.get(geoJson);
    if (existing) return existing;
    const generated = `kumo-map-${hashString(JSON.stringify(geoJson))}`;
    geoJsonMapNames.set(geoJson, generated);
    return generated;
  }

  export interface ChoroplethMapProps<T = Record<string, unknown>> {
    echarts: any;
    geoJson: MapGeoJson;
    mapName?: string;
    data: T[];
    name: MapAccessor<T, string>;
    value: MapAccessor<T, number>;
    nameProperty?: string;
    colorRange?: string[];
    min?: number;
    max?: number;
    noDataColor?: string;
    showLegend?: boolean;
    showTooltip?: boolean;
    valueFormat?: (value: number) => string;
    tooltipFormatter?: (row: T) => string;
    onRegionHover?: (row: T | undefined) => void;
    onRegionClick?: (row: T) => void;
    center?: [number, number];
    zoom?: number;
    roam?: boolean;
    projection?: MapProjection | null;
    aspectRatio?: number | string;
    height?: number;
    class?: string;
    isDarkMode?: boolean;
    chartRef?: EChartsType | null;
  }

  interface ChoroplethRegion<T> {
    name: string;
    value: number;
    datum: T;
  }

  let {
    echarts,
    geoJson,
    mapName: mapNameProp,
    data,
    name,
    value,
    nameProperty = 'name',
    colorRange,
    min,
    max,
    noDataColor,
    showLegend = false,
    showTooltip = true,
    valueFormat = defaultValueFormat,
    tooltipFormatter,
    onRegionHover,
    onRegionClick,
    center,
    zoom = 1.25,
    roam = false,
    projection,
    aspectRatio,
    height,
    class: className,
    isDarkMode,
    chartRef = $bindable(null)
  }: ChoroplethMapProps = $props();

  const mapName = $derived(getMapName(geoJson, mapNameProp));
  const resolvedProjection = $derived(resolveProjection(projection));
  const resolvedAspectRatio = $derived(
    height === undefined ? (aspectRatio ?? projectedAspect(resolvedProjection, DEFAULT_BOUNDING_COORDS)) : undefined
  );

  $effect.pre(() => {
    echarts.registerMap(mapName, geoJson);
  });

  const options = $derived.by(() => {
    const palette = ChartPalette.mapColors(isDarkMode);
    const colors = colorRange ?? palette.scale;
    const noData = noDataColor ?? palette.area;
    const regions: ChoroplethRegion<Record<string, unknown>>[] = data.map((row) => ({
      name: resolve(row, name),
      value: resolve(row, value),
      datum: row
    }));
    const values = regions.map((region) => region.value);
    const vmin = values.length ? Math.min(...values) : 0;
    const vmax = values.length ? Math.max(...values) : 1;
    const resolvedMin = min ?? vmin;
    const resolvedMax = max ?? (vmax > vmin ? vmax : vmin + 1);

    return {
      backgroundColor: 'transparent',
      animation: true,
      animationDuration: 500,
      animationDurationUpdate: 0,
      visualMap: {
        type: 'continuous',
        show: showLegend,
        min: resolvedMin,
        max: resolvedMax,
        calculable: false,
        hoverLink: false,
        inRange: { color: colors },
        orient: 'horizontal',
        text: ['High', 'Low'],
        left: 0,
        bottom: 8,
        textStyle: {
          color: ChartPalette.text('primary', isDarkMode),
          fontSize: 11
        }
      },
      tooltip: showTooltip
        ? {
            trigger: 'item',
            triggerOn: 'mousemove',
            backgroundColor: 'var(--color-kumo-base)',
            borderColor: 'var(--color-kumo-line)',
            borderWidth: 1,
            padding: 8,
            textStyle: {
              color: 'var(--text-color-kumo-default)',
              fontSize: 13
            },
            extraCssText: 'border-radius: 0.5rem;',
            dangerousHtmlFormatter: (params: unknown) => {
              const param = params as { name?: string; value?: number; data?: { datum?: Record<string, unknown> } };
              const row = param.data?.datum;
              if (row === undefined) return '';
              if (tooltipFormatter) return tooltipFormatter(row);
              const tooltipValue =
                typeof param.value === 'number' && !Number.isNaN(param.value) ? param.value : undefined;
              const nameStr = param.name ? `<strong>${escapeHtml(param.name)}</strong>` : '';
              const valueStr =
                tooltipValue !== undefined
                  ? `<span style="color:var(--text-color-kumo-subtle)">${escapeHtml(valueFormat(tooltipValue))}</span>`
                  : '';
              return `<div style="display:flex;flex-direction:column;gap:2px;">${nameStr}${valueStr}</div>`;
            }
          }
        : undefined,
      series: [
        {
          id: 'regions',
          type: 'map',
          map: mapName,
          nameProperty,
          roam,
          ...(roam
            ? {
                scaleLimit: {
                  min: Math.min(1, zoom),
                  max: zoom * MAX_ZOOM_FACTOR
                }
              }
            : {}),
          center,
          zoom,
          boundingCoords: DEFAULT_BOUNDING_COORDS,
          ...(resolvedProjection ? { projection: resolvedProjection } : { aspectScale: 1 }),
          data: regions,
          itemStyle: {
            areaColor: noData,
            borderColor: 'transparent',
            borderWidth: 0
          },
          label: { show: false },
          emphasis: {
            focus: 'self',
            label: { show: false },
            itemStyle: {
              areaColor: 'inherit'
            }
          } as any,
          blur: {
            label: { show: false },
            itemStyle: { opacity: 0.45 }
          },
          select: { disabled: true },
          z: 1
        }
      ]
    } satisfies KumoChartOption;
  });

  const events = $derived<Partial<ChartEvents>>({
    ...(onRegionHover
      ? {
          mouseover: (params: any) => {
            const datum = params.data?.datum;
            if (datum !== undefined) onRegionHover?.(datum);
          },
          mouseout: () => onRegionHover?.(undefined),
          globalout: () => onRegionHover?.(undefined)
        }
      : {}),
    ...(onRegionClick
      ? {
          click: (params: any) => {
            const datum = params.data?.datum;
            if (datum !== undefined) onRegionClick?.(datum);
          }
        }
      : {})
  });
</script>

<Chart
  {echarts}
  options={options}
  bind:chartRef
  {height}
  aspectRatio={resolvedAspectRatio}
  class={className}
  {isDarkMode}
  onEvents={events}
/>
