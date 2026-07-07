<script lang="ts">
  import { onMount } from 'svelte';
  import type { EChartsType } from 'echarts/core';
  import { geoMercator } from 'd3-geo';
  import Chart, { type ChartEvents, type KumoChartOption } from './Chart.svelte';
  import { ChartPalette } from './Color';
  import { defaultValueFormat, escapeHtml } from './tooltip-utils';

  export interface MapGeoJson {
    type: 'FeatureCollection';
    features: Array<{
      type: 'Feature';
      id?: string | number;
      properties?: Record<string, unknown> | null;
      geometry: unknown;
    }>;
  }

  /** Accessor for a value on a data row: a key of `T`, or a function of the row. */
  export type MapAccessor<T, V> = keyof T | ((row: T) => V);

  function resolve<T, V>(row: T, accessor: MapAccessor<T, V>): V {
    return typeof accessor === 'function' ? accessor(row) : (row[accessor] as V);
  }

  /** Per-datum style value: a constant, or a function of the row. */
  export type MapStyle<T, V> = V | ((row: T) => V);

  function resolveStyle<T, V>(row: T, style: MapStyle<T, V>): V {
    return typeof style === 'function' ? (style as (row: T) => V)(row) : (style as V);
  }

  const MAX_ZOOM_FACTOR = 8;
  const MERCATOR_MAX_LAT = 85.0511;
  const DEFAULT_BOUNDING_COORDS: [[number, number], [number, number]] = [
    [-180, 80],
    [180, -58]
  ];
  const geoJsonMapNames = new WeakMap<MapGeoJson, string>();
  const mercatorProjection = geoMercator();

  export interface MapProjection {
    project: (point: number[]) => number[];
    unproject: (point: number[]) => number[];
  }

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

  function buildGeo({
    mapName,
    areaColor,
    center,
    zoom,
    roam,
    projection
  }: {
    mapName: string;
    areaColor: string;
    center?: [number, number];
    zoom: number;
    roam: boolean;
    projection?: MapProjection;
  }) {
    return {
      map: mapName,
      nameProperty: 'name',
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
      ...(projection ? { projection } : { aspectScale: 1 }),
      silent: true,
      itemStyle: {
        areaColor,
        borderColor: areaColor,
        borderWidth: 0.5
      },
      emphasis: { disabled: true }
    };
  }

  export interface BubbleMapProps<T = Record<string, unknown>> {
    echarts: any;
    geoJson: MapGeoJson;
    mapName?: string;
    data: T[];
    lng: MapAccessor<T, number>;
    lat: MapAccessor<T, number>;
    value: MapAccessor<T, number>;
    name?: MapAccessor<T, string>;
    minRadius?: number;
    maxRadius?: number;
    bubbleSize?: (value: number) => number;
    bubbleColor?: MapStyle<T, string>;
    bubbleBorderColor?: MapStyle<T, string>;
    bubbleBorderWidth?: MapStyle<T, number>;
    center?: [number, number];
    zoom?: number;
    roam?: boolean;
    projection?: MapProjection | null;
    showTooltip?: boolean;
    valueFormat?: (value: number) => string;
    tooltipFormatter?: (row: T) => string;
    onBubbleHover?: (row: T | undefined) => void;
    onBubbleClick?: (row: T) => void;
    aspectRatio?: number | string;
    height?: number;
    class?: string;
    isDarkMode?: boolean;
    chartRef?: EChartsType | null;
  }

  interface BubblePoint<T> {
    name?: string;
    value: [number, number, number];
    symbolSize: number;
    itemStyle: { color: string; borderColor: string; borderWidth: number };
    datum: T;
  }

  let {
    echarts,
    geoJson,
    mapName: mapNameProp,
    data,
    lng,
    lat,
    value,
    name,
    minRadius = 6,
    maxRadius = 26,
    bubbleSize,
    bubbleColor,
    bubbleBorderColor = 'transparent',
    bubbleBorderWidth = 0,
    center,
    zoom = 1.25,
    roam = false,
    projection,
    showTooltip = true,
    valueFormat = defaultValueFormat,
    tooltipFormatter,
    onBubbleHover,
    onBubbleClick,
    aspectRatio,
    height,
    class: className,
    isDarkMode,
    chartRef = $bindable(null)
  }: BubbleMapProps = $props();

  let detectedDarkMode = $state(false);
  const effectiveDarkMode = $derived(isDarkMode ?? detectedDarkMode);
  const mapName = $derived(getMapName(geoJson, mapNameProp));

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

  $effect.pre(() => {
    // ECharts requires GeoJSON maps to be registered before setOption uses them.
    echarts.registerMap(mapName, geoJson);
  });

  const resolvedProjection = $derived(resolveProjection(projection));
  const resolvedAspectRatio = $derived(
    height === undefined ? (aspectRatio ?? projectedAspect(resolvedProjection, DEFAULT_BOUNDING_COORDS)) : undefined
  );

  const options = $derived.by(() => {
    const palette = ChartPalette.mapColors(effectiveDarkMode);
    const values = data.map((row) => resolve(row, value));
    const vmin = values.length ? Math.min(...values) : 0;
    const vmax = values.length ? Math.max(...values) : 1;

    const radiusFor = (datumValue: number) => {
      if (bubbleSize) return bubbleSize(datumValue);
      if (vmax <= 0) return minRadius;
      const ratio = Math.sqrt(Math.max(0, datumValue) / vmax);
      return minRadius + ratio * (maxRadius - minRadius);
    };

    const points: BubblePoint<Record<string, unknown>>[] = data.map((row) => {
      const datumValue = resolve(row, value);
      return {
        name: name ? resolve(row, name) : undefined,
        value: [resolve(row, lng), resolve(row, lat), datumValue],
        symbolSize: radiusFor(datumValue),
        itemStyle: {
          color: bubbleColor ? resolveStyle(row, bubbleColor) : palette.bubble,
          borderColor: resolveStyle(row, bubbleBorderColor),
          borderWidth: resolveStyle(row, bubbleBorderWidth)
        },
        datum: row
      };
    });

    return {
      backgroundColor: 'transparent',
      animation: true,
      animationDuration: 500,
      animationDurationUpdate: 0,
      geo: buildGeo({
        mapName,
        areaColor: palette.area,
        center,
        zoom,
        roam,
        projection: resolvedProjection
      }),
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
              const param = params as { name?: string; value?: number[]; data?: { datum?: Record<string, unknown> } };
              const row = param.data?.datum;
              if (tooltipFormatter && row !== undefined) return tooltipFormatter(row);

              const tooltipValue = param.value?.[2];
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
          id: 'bubbles',
          type: 'scatter',
          coordinateSystem: 'geo',
          data: points,
          itemStyle: { opacity: 0.8 },
          emphasis: { scale: 1.2, itemStyle: { opacity: 1 } },
          z: 3
        }
      ]
    } satisfies KumoChartOption;
  });

  const events = $derived<Partial<ChartEvents>>({
    ...(onBubbleHover
      ? {
          mouseover: (params: any) => {
            const datum = params.data?.datum;
            if (datum !== undefined) onBubbleHover?.(datum);
          },
          mouseout: () => onBubbleHover?.(undefined),
          globalout: () => onBubbleHover?.(undefined)
        }
      : {}),
    ...(onBubbleClick
      ? {
          click: (params: any) => {
            const datum = params.data?.datum;
            if (datum !== undefined) onBubbleClick?.(datum);
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
  isDarkMode={effectiveDarkMode}
  onEvents={events}
/>
