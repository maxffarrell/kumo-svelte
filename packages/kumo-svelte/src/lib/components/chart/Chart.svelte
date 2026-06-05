<script lang="ts">
  import { onMount } from 'svelte';
  import type { EChartsOption, SetOptionOpts, TooltipComponentOption } from 'echarts';
  import type { EChartsType } from 'echarts/core';
  import { cn } from '$lib/utils/cn';
  import { CHART_DARK_COLORS, CHART_LIGHT_COLORS, ChartPalette } from './Color';

  export type SafeTooltipOption = Omit<TooltipComponentOption, 'formatter'> & {
    dangerousHtmlFormatter?: TooltipComponentOption['formatter'];
  };

  export type KumoChartOption = {
    [K in keyof EChartsOption]: K extends 'tooltip' ? SafeTooltipOption | SafeTooltipOption[] | undefined : EChartsOption[K];
  };

  export type ChartEvents = Record<string, (params: any) => void>;

  interface Props {
    echarts: any;
    options: KumoChartOption;
    optionUpdateBehavior?: SetOptionOpts;
    class?: string;
    isDarkMode?: boolean;
    height?: number;
    onEvents?: Partial<ChartEvents>;
    chartRef?: EChartsType | null;
  }

  let {
    echarts,
    options,
    optionUpdateBehavior,
    class: className,
    isDarkMode,
    height = 350,
    onEvents = {},
    chartRef = $bindable(null)
  }: Props = $props();

  let el: HTMLDivElement;
  let chart: EChartsType | null = null;
  let resizeObserver: ResizeObserver | null = null;
  let intersectionObserver: IntersectionObserver | null = null;
  let detectedDarkMode = $state(false);
  let hasBeenVisible = $state(false);
  const eventWrappers = new Map<string, (params: any) => void>();
  let boundEvents = new Set<string>();
  const effectiveDarkMode = $derived(isDarkMode ?? detectedDarkMode);

  const themedTooltipDefaults = $derived({
    backgroundColor: effectiveDarkMode ? '#3A3E44' : '#FFFFFF',
    borderColor: effectiveDarkMode ? '#505372' : '#DDDDDD',
    textStyle: {
      color: effectiveDarkMode ? '#B3B4B7' : '#1F1F1F'
    },
    extraCssText: `color: ${effectiveDarkMode ? '#B3B4B7' : '#1F1F1F'}; box-shadow: 0 8px 24px rgba(0, 0, 0, ${effectiveDarkMode ? '0.45' : '0.12'});`
  });

  const mergeTooltipTheme = (tooltipObj: SafeTooltipOption): SafeTooltipOption => ({
    ...themedTooltipDefaults,
    ...tooltipObj,
    textStyle: {
      ...themedTooltipDefaults.textStyle,
      ...tooltipObj.textStyle
    },
    extraCssText: [themedTooltipDefaults.extraCssText, tooltipObj.extraCssText].filter(Boolean).join(' ')
  });

  const transformTooltip = (tooltipObj: SafeTooltipOption) => {
    const { dangerousHtmlFormatter, ...restOfTooltip } = tooltipObj;
    return { ...restOfTooltip, formatter: dangerousHtmlFormatter };
  };

  const prepareChartOptions = (rawOptions: KumoChartOption, suppressAnimation = false): EChartsOption => {
    const optionsWithTheme = {
      backgroundColor: 'transparent',
      color: effectiveDarkMode ? CHART_DARK_COLORS : CHART_LIGHT_COLORS,
      ...rawOptions,
      ...(suppressAnimation ? { animation: false } : {}),
      textStyle: {
        color: ChartPalette.text('primary', effectiveDarkMode),
        ...(rawOptions.textStyle ?? {})
      }
    };
    if (!optionsWithTheme.tooltip) return optionsWithTheme as EChartsOption;
    return {
      ...optionsWithTheme,
      tooltip: Array.isArray(optionsWithTheme.tooltip)
        ? optionsWithTheme.tooltip.map((tooltip) => transformTooltip(mergeTooltipTheme(tooltip)))
        : transformTooltip(mergeTooltipTheme(optionsWithTheme.tooltip))
    } as EChartsOption;
  };

  const bindEvents = () => {
    if (!chart) return;
    const nextBound = new Set<string>();
    for (const [event, handler] of Object.entries(onEvents ?? {})) {
      if (typeof handler !== 'function') continue;
      nextBound.add(event);
      if (!eventWrappers.has(event)) {
        eventWrappers.set(event, (params: any) => onEvents?.[event]?.(params));
      }
      if (!boundEvents.has(event)) chart.on(event, eventWrappers.get(event)!);
    }
    for (const event of boundEvents) {
      if (nextBound.has(event)) continue;
      const wrapper = eventWrappers.get(event);
      if (wrapper) chart.off(event, wrapper);
    }
    boundEvents = nextBound;
  };

  const updateOptions = (forceInitialAnimation = false) => {
    if (!chart) return;
    const shouldSuppressAnimation = !hasBeenVisible && !forceInitialAnimation;
    chart.setOption(prepareChartOptions(options, shouldSuppressAnimation), {
      lazyUpdate: true,
      ...optionUpdateBehavior,
      notMerge: forceInitialAnimation
    });
    chartRef = chart;
    bindEvents();
  };

  const initChart = () => {
    if (!el) return;
    chart?.dispose();
    const nextChart = echarts.init(el, effectiveDarkMode ? 'dark' : undefined, { renderer: 'canvas' });
    chart = nextChart;
    updateOptions();
  };

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

    initChart();

    if ('IntersectionObserver' in window) {
      intersectionObserver = new IntersectionObserver(
        ([entry]) => {
          if (!entry?.isIntersecting) return;
          hasBeenVisible = true;
          chart?.clear();
          updateOptions(true);
          intersectionObserver?.disconnect();
          intersectionObserver = null;
        },
        { threshold: 0.1 }
      );
      intersectionObserver.observe(el);
    } else {
      hasBeenVisible = true;
      updateOptions();
    }

    let isInitialResize = true;
    resizeObserver = new ResizeObserver(() => {
      if (isInitialResize) {
        isInitialResize = false;
        return;
      }
      chart?.resize();
    });
    resizeObserver.observe(el);
    return () => {
      intersectionObserver?.disconnect();
      themeObserver.disconnect();
      mediaQuery?.removeEventListener('change', updateDetectedDarkMode);
      resizeObserver?.disconnect();
      for (const event of boundEvents) {
        const wrapper = eventWrappers.get(event);
        if (wrapper) chart?.off(event, wrapper);
      }
      chart?.dispose();
      chart = null;
      chartRef = null;
    };
  });

  $effect(() => {
    updateOptions();
  });

  $effect(() => {
    effectiveDarkMode;
    if (chart) initChart();
  });
</script>

<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
<div bind:this={el} class={cn('w-full', className)} style:height={`${height}px`} tabindex={options.aria?.enabled ? 0 : undefined} role={options.aria?.enabled ? 'img' : undefined}></div>
