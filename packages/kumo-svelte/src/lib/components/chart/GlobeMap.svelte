<script module lang="ts">
  export interface GlobeMapMarker {
    longitude: number;
    latitude: number;
    name: string;
    description?: string;
    color?: string;
    radius?: number;
  }
</script>

<script lang="ts">
  import { onMount, untrack } from 'svelte';
  import { geoDistance, geoGraticule10, geoOrthographic, geoPath } from 'd3-geo';
  import { ChartPalette } from './Color';
  import { isCanonicalLand } from './globe-land-mask';

  export interface GlobeMapProps {
    landColor?: string;
    landHatchSpacing?: number;
    oceanColor?: string;
    markers?: GlobeMapMarker[];
    markerColor?: string;
    markerRadius?: number;
    onMarkerClick?: (marker: GlobeMapMarker) => void;
    defaultRotation?: [number, number, number];
    draggable?: boolean;
    autoRotate?: boolean;
    autoRotateSpeed?: number;
    showGraticule?: boolean;
    showTooltip?: boolean;
    onUserRotationChange?: (rotation: [number, number, number]) => void;
    'aria-label'?: string;
    height?: number;
    class?: string;
    isDarkMode?: boolean;
  }

  interface GlobeTooltip {
    name: string;
    detail: string;
    x: number;
    y: number;
  }

  interface MarkerState {
    marker: GlobeMapMarker;
    index: number;
    x: number;
    y: number;
    radius: number;
    opacity: number;
    detail: string;
  }

  const VIEWBOX_SIZE = 640;
  const PADDING = 18;
  const RADIUS = VIEWBOX_SIZE / 2 - PADDING;
  const MARKER_EDGE_FADE_DISTANCE = 24;
  const AUTO_ROTATE_INTERVAL = 1000 / 30;

  let {
    landColor,
    landHatchSpacing = 10,
    oceanColor = 'var(--color-kumo-base)',
    markers = [],
    markerColor,
    markerRadius = 7,
    onMarkerClick,
    defaultRotation = [-10, -20, 0],
    draggable = true,
    autoRotate = false,
    autoRotateSpeed = 4,
    showGraticule = false,
    showTooltip = true,
    onUserRotationChange,
    'aria-label': ariaLabel = 'Interactive globe map',
    height,
    class: className,
    isDarkMode
  }: GlobeMapProps = $props();

  const componentId = $props.id();
  const sphereClipId = `kumo-globe-${componentId}`;
  const instructionsId = `${sphereClipId}-instructions`;
  let container: HTMLDivElement;
  let svg: SVGSVGElement;
  let detectedDarkMode = $state(false);
  let rotation = $state<[number, number, number]>(untrack(() => normalizeRotation(defaultRotation)));
  let tooltip = $state<GlobeTooltip | null>(null);
  let focused = false;
  let drag: { pointerId: number; x: number; y: number; rotation: [number, number, number] } | null = null;
  let pointerMoveFrame: number | null = null;
  let pendingPointerMove: { pointerId: number; x: number; y: number } | null = null;

  const effectiveDarkMode = $derived(isDarkMode ?? detectedDarkMode);
  const palette = $derived(ChartPalette.mapColors(effectiveDarkMode));
  const resolvedLandColor = $derived(landColor ?? palette.area);
  const resolvedMarkerColor = $derived(markerColor ?? palette.bubble);
  const safeHatchSpacing = $derived(Math.max(3, finiteNumber(landHatchSpacing, 10)));
  const safeMarkerRadius = $derived(Math.max(0, finiteNumber(markerRadius, 7)));
  const safeAutoRotateSpeed = $derived(Math.max(-60, Math.min(60, finiteNumber(autoRotateSpeed, 4))));
  const projection = $derived(
    geoOrthographic()
      .translate([VIEWBOX_SIZE / 2, VIEWBOX_SIZE / 2])
      .scale(RADIUS)
      .clipAngle(90)
      .rotate(rotation)
  );
  const path = $derived(geoPath(projection));
  const spherePath = $derived(path({ type: 'Sphere' }) ?? undefined);
  const graticulePath = $derived(path(geoGraticule10()) ?? undefined);
  const landHatchPath = $derived(createLandHatchPath(projection, safeHatchSpacing));
  const center = $derived(projection.invert?.([VIEWBOX_SIZE / 2, VIEWBOX_SIZE / 2]));
  const markerStates = $derived.by(() => {
    const result: MarkerState[] = [];
    for (const [index, marker] of markers.entries()) {
      const position = projection([marker.longitude, marker.latitude]);
      const visible = center && geoDistance(center, [marker.longitude, marker.latitude]) <= Math.PI / 2;
      if (!position || !visible) continue;
      const distance = Math.hypot(position[0] - VIEWBOX_SIZE / 2, position[1] - VIEWBOX_SIZE / 2);
      result.push({
        marker,
        index,
        x: position[0],
        y: position[1],
        radius: Math.max(0, finiteNumber(marker.radius ?? safeMarkerRadius, safeMarkerRadius)),
        opacity: Math.max(0, Math.min(1, (RADIUS - distance) / MARKER_EDGE_FADE_DISTANCE)),
        detail: marker.description ?? `${marker.latitude.toFixed(2)}, ${marker.longitude.toFixed(2)}`
      });
    }
    return result;
  });

  function finiteNumber(value: number, fallback: number): number {
    return Number.isFinite(value) ? value : fallback;
  }

  function normalizeRotation(value: [number, number, number]): [number, number, number] {
    return [
      finiteNumber(value[0], -10),
      Math.max(-90, Math.min(90, finiteNumber(value[1], -20))),
      finiteNumber(value[2], 0)
    ];
  }

  function createLandHatchPath(currentProjection: typeof projection, spacing: number): string | undefined {
    if (spacing <= 0 || !currentProjection.invert) return undefined;
    const commands: string[] = [];
    const sampleStep = 3;
    for (let offset = -VIEWBOX_SIZE; offset < VIEWBOX_SIZE * 2; offset += spacing) {
      let drawing = false;
      for (let y = 0; y <= VIEWBOX_SIZE; y += sampleStep) {
        const x = y + offset;
        const coordinates = x >= 0 && x <= VIEWBOX_SIZE ? currentProjection.invert([x, y]) : null;
        const onLand = coordinates !== null && isCanonicalLand(coordinates[0], coordinates[1]);
        if (onLand && !drawing) {
          commands.push(`M${x.toFixed(1)},${y.toFixed(1)}`);
          drawing = true;
        } else if (onLand) {
          commands.push(`L${x.toFixed(1)},${y.toFixed(1)}`);
        } else {
          drawing = false;
        }
      }
    }
    return commands.join('') || undefined;
  }

  function updateRotation(next: [number, number, number], notify = false) {
    rotation = next;
    if (notify) onUserRotationChange?.(next);
  }

  function moveTooltip(event: PointerEvent, state: MarkerState) {
    if (!showTooltip) return;
    const bounds = svg?.getBoundingClientRect();
    if (!bounds) return;
    tooltip = {
      name: state.marker.name,
      detail: state.detail,
      x: event.clientX - bounds.left,
      y: event.clientY - bounds.top
    };
  }

  function handlePointerDown(event: PointerEvent) {
    if (!draggable || event.isPrimary === false || event.button !== 0) return;
    const target = event.target;
    if (target instanceof Element && target.closest('[data-globe-marker-interactive="true"]')) return;
    svg.setPointerCapture(event.pointerId);
    drag = { pointerId: event.pointerId, x: event.clientX, y: event.clientY, rotation };
    tooltip = null;
  }

  function applyPointerMove(pointerId: number, x: number, y: number) {
    if (!drag || drag.pointerId !== pointerId) return;
    updateRotation(
      [
        drag.rotation[0] + (x - drag.x) * 0.3,
        Math.max(-90, Math.min(90, drag.rotation[1] - (y - drag.y) * 0.3)),
        drag.rotation[2]
      ],
      true
    );
  }

  function handlePointerMove(event: PointerEvent) {
    if (!drag || drag.pointerId !== event.pointerId) return;
    pendingPointerMove = { pointerId: event.pointerId, x: event.clientX, y: event.clientY };
    if (pointerMoveFrame !== null) return;
    pointerMoveFrame = requestAnimationFrame(() => {
      pointerMoveFrame = null;
      const pending = pendingPointerMove;
      pendingPointerMove = null;
      if (pending) applyPointerMove(pending.pointerId, pending.x, pending.y);
    });
  }

  function finishPointerDrag(event: PointerEvent) {
    if (drag?.pointerId !== event.pointerId) return;
    if (pointerMoveFrame !== null) cancelAnimationFrame(pointerMoveFrame);
    pointerMoveFrame = null;
    const pending = pendingPointerMove;
    pendingPointerMove = null;
    if (pending) applyPointerMove(pending.pointerId, pending.x, pending.y);
    drag = null;
    if (svg.hasPointerCapture?.(event.pointerId)) svg.releasePointerCapture(event.pointerId);
  }

  function handleKeyDown(event: KeyboardEvent) {
    if (!draggable || event.target !== svg) return;
    if (!['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(event.key)) return;
    event.preventDefault();
    const [longitude, latitude, roll] = rotation;
    const next: [number, number, number] =
      event.key === 'ArrowLeft'
        ? [longitude - 10, latitude, roll]
        : event.key === 'ArrowRight'
          ? [longitude + 10, latitude, roll]
          : event.key === 'ArrowUp'
            ? [longitude, Math.min(90, latitude + 10), roll]
            : [longitude, Math.max(-90, latitude - 10), roll];
    if (next[0] !== longitude || next[1] !== latitude) updateRotation(next, true);
  }

  function focusTooltip(event: FocusEvent, state: MarkerState) {
    if (!showTooltip) return;
    const circle = event.currentTarget as SVGCircleElement;
    const svgBounds = svg?.getBoundingClientRect();
    if (!svgBounds) return;
    const markerBounds = circle.getBoundingClientRect();
    tooltip = {
      name: state.marker.name,
      detail: state.detail,
      x: markerBounds.left + markerBounds.width / 2 - svgBounds.left,
      y: markerBounds.top - svgBounds.top
    };
  }

  function activateMarker(event: KeyboardEvent | MouseEvent, marker: GlobeMapMarker) {
    if (event instanceof KeyboardEvent && event.key !== 'Enter' && event.key !== ' ') return;
    if (event instanceof KeyboardEvent) event.preventDefault();
    onMarkerClick?.(marker);
  }

  onMount(() => {
    const updateTheme = () => {
      const root = document.documentElement;
      detectedDarkMode = root.dataset.mode === 'dark' || root.classList.contains('dark') ||
        (root.dataset.mode !== 'light' && !root.classList.contains('light') && window.matchMedia?.('(prefers-color-scheme: dark)').matches === true);
    };
    updateTheme();
    const observer = new MutationObserver(updateTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-mode', 'class'] });
    const media = window.matchMedia?.('(prefers-color-scheme: dark)');
    media?.addEventListener('change', updateTheme);
    return () => {
      observer.disconnect();
      media?.removeEventListener('change', updateTheme);
      if (pointerMoveFrame !== null) cancelAnimationFrame(pointerMoveFrame);
    };
  });

  $effect(() => {
    if (!autoRotate || !svg) return;
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;
    let frame: number | null = null;
    let previousTime: number | null = null;
    let visible = true;
    const rotate = (time: number) => {
      if (!visible) return;
      if (drag || focused) {
        previousTime = time;
      } else if (previousTime !== null && time - previousTime >= AUTO_ROTATE_INTERVAL) {
        const seconds = Math.min((time - previousTime) / 1000, 0.1);
        updateRotation([rotation[0] + safeAutoRotateSpeed * seconds, rotation[1], rotation[2]]);
        previousTime = time;
      }
      if (previousTime === null) previousTime = time;
      frame = requestAnimationFrame(rotate);
    };
    const start = () => {
      visible = true;
      if (frame === null) frame = requestAnimationFrame(rotate);
    };
    const stop = () => {
      visible = false;
      if (frame !== null) cancelAnimationFrame(frame);
      frame = null;
      previousTime = null;
    };
    const intersection = typeof IntersectionObserver === 'undefined'
      ? null
      : new IntersectionObserver(([entry]) => entry?.isIntersecting ? start() : stop());
    if (intersection) intersection.observe(svg);
    else start();
    return () => {
      intersection?.disconnect();
      stop();
    };
  });
</script>

<div
  bind:this={container}
  class={['relative w-full overflow-hidden', className]}
  style:aspect-ratio={height === undefined ? '1' : undefined}
  style:height={height === undefined ? undefined : `${height}px`}
  onfocusin={() => (focused = true)}
  onfocusout={(event) => {
    if (!container.contains(event.relatedTarget as Node | null)) focused = false;
  }}
>
  {#if draggable}
    <span id={instructionsId} class="sr-only">Use the arrow keys to rotate the globe.</span>
  {/if}
  <!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
  <!-- svelte-ignore a11y_no_noninteractive_tabindex -->
  <svg
    bind:this={svg}
    role="group"
    aria-label={ariaLabel}
    aria-describedby={draggable ? instructionsId : undefined}
    tabindex={draggable ? 0 : undefined}
    viewBox={`0 0 ${VIEWBOX_SIZE} ${VIEWBOX_SIZE}`}
    class:cursor-grab={draggable}
    class:active:cursor-grabbing={draggable}
    class="block size-full touch-none select-none"
    onpointerdown={handlePointerDown}
    onpointermove={handlePointerMove}
    onpointerup={finishPointerDrag}
    onpointercancel={finishPointerDrag}
    onlostpointercapture={(event) => {
      if (drag?.pointerId === event.pointerId) drag = null;
    }}
    onkeydown={handleKeyDown}
    onpointerleave={() => {
      if (!drag) tooltip = null;
    }}
  >
    <defs>
      <clipPath id={sphereClipId}><path d={spherePath}></path></clipPath>
    </defs>
    <path d={spherePath} fill={oceanColor} class="stroke-kumo-line" stroke-width="1.5"></path>
    {#if showGraticule}
      <path d={graticulePath} fill="none" class="stroke-kumo-line" stroke-width="0.75"></path>
    {/if}
    <path
      data-land-style="hatched"
      d={landHatchPath}
      fill="none"
      stroke={resolvedLandColor}
      stroke-width="1.25"
      stroke-linecap="round"
      stroke-linejoin="round"
      clip-path={`url(#${sphereClipId})`}
      class="pointer-events-none"
    ></path>
    <path
      data-globe-outline=""
      d={spherePath}
      fill="none"
      class="pointer-events-none stroke-kumo-line"
      stroke-width="2"
    ></path>
    {#each markerStates as state (`${state.marker.name}-${state.index}`)}
      <!-- svelte-ignore a11y_no_noninteractive_tabindex -->
      <circle
        cx={state.x}
        cy={state.y}
        r={state.radius}
        fill={state.marker.color ?? resolvedMarkerColor}
        opacity={state.opacity}
        class="stroke-kumo-base transition-opacity outline-none"
        stroke-width="2"
        data-globe-marker=""
        data-globe-marker-interactive={onMarkerClick !== undefined}
        role={onMarkerClick ? 'button' : undefined}
        aria-label={onMarkerClick ? `${state.marker.name}: ${state.detail}` : undefined}
        aria-hidden={onMarkerClick ? undefined : 'true'}
        tabindex={onMarkerClick ? 0 : undefined}
        onpointerenter={(event) => moveTooltip(event, state)}
        onpointermove={(event) => {
          if (!drag) moveTooltip(event, state);
        }}
        onpointerleave={() => (tooltip = null)}
        onfocus={(event) => focusTooltip(event, state)}
        onblur={() => (tooltip = null)}
        onclick={(event) => activateMarker(event, state.marker)}
        onkeydown={(event) => activateMarker(event, state.marker)}
      ></circle>
    {/each}
  </svg>
  {#if onMarkerClick === undefined && markers.length > 0}
    <ul class="sr-only" aria-label={`${ariaLabel} locations`}>
      {#each markers as marker, index (`${marker.name}-${index}`)}
        <li>{marker.name}: {marker.description ?? `${marker.latitude.toFixed(2)}, ${marker.longitude.toFixed(2)}`}</li>
      {/each}
    </ul>
  {/if}
  {#if tooltip}
    <div
      role="tooltip"
      class="pointer-events-none absolute z-10 flex -translate-x-1/2 -translate-y-full flex-col gap-0.5 rounded-lg border border-kumo-line bg-kumo-base px-2 py-1.5 text-xs text-kumo-default shadow-lg"
      style:left={`${tooltip.x}px`}
      style:top={`${tooltip.y - 8}px`}
    >
      <strong>{tooltip.name}</strong>
      <span class="text-kumo-subtle">{tooltip.detail}</span>
    </div>
  {/if}
</div>
