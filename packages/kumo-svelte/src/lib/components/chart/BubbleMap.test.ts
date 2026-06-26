// @vitest-environment happy-dom
import { render, waitFor } from '@testing-library/svelte';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import BubbleMap, { type MapGeoJson } from './BubbleMap.svelte';

const geoJson: MapGeoJson = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      id: 'US',
      properties: { name: 'United States' },
      geometry: { type: 'Polygon', coordinates: [] }
    }
  ]
};

const data = [
  { city: 'San Francisco', lat: 37.77, lon: -122.42, requests: 10 },
  { city: 'London', lat: 51.5, lon: -0.12, requests: 20 }
];

function createMockChart() {
  return {
    setOption: vi.fn(),
    on: vi.fn(),
    off: vi.fn(),
    resize: vi.fn(),
    dispose: vi.fn()
  };
}

function createMockEcharts(mockChart = createMockChart()) {
  return {
    init: vi.fn(() => mockChart),
    registerMap: vi.fn()
  };
}

beforeEach(() => {
  class ResizeObserver {
    observe = vi.fn();
    disconnect = vi.fn();
  }

  vi.stubGlobal('ResizeObserver', ResizeObserver);
  vi.stubGlobal(
    'matchMedia',
    vi.fn(() => ({
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      matches: false
    }))
  );
});

describe('BubbleMap', () => {
  it('reuses the generated map name across remounts for the same GeoJSON', () => {
    const mockEcharts = createMockEcharts();

    const first = render(BubbleMap, {
      echarts: mockEcharts,
      geoJson,
      data,
      lng: 'lon',
      lat: 'lat',
      name: 'city',
      value: 'requests'
    });
    first.unmount();

    render(BubbleMap, {
      echarts: mockEcharts,
      geoJson,
      data,
      lng: 'lon',
      lat: 'lat',
      name: 'city',
      value: 'requests'
    });

    expect(mockEcharts.registerMap).toHaveBeenCalledTimes(2);
    expect(mockEcharts.registerMap.mock.calls[0][0]).toBe(
      mockEcharts.registerMap.mock.calls[1][0]
    );
  });

  it('sanitizes custom map names before registering them', () => {
    const mockEcharts = createMockEcharts();

    render(BubbleMap, {
      echarts: mockEcharts,
      geoJson,
      mapName: 'world:traffic/map',
      data,
      lng: 'lon',
      lat: 'lat',
      name: 'city',
      value: 'requests'
    });

    expect(mockEcharts.registerMap).toHaveBeenCalledWith(
      'world-traffic-map',
      geoJson
    );
  });

  it('uses bubbleSize when provided', async () => {
    const mockChart = createMockChart();
    const mockEcharts = createMockEcharts(mockChart);

    render(BubbleMap, {
      echarts: mockEcharts,
      geoJson,
      data,
      lng: 'lon',
      lat: 'lat',
      name: 'city',
      value: 'requests',
      bubbleSize: (value: number) => value / 2
    });

    await waitFor(() => expect(mockChart.setOption).toHaveBeenCalled());
    const options = mockChart.setOption.mock.calls[0][0];

    expect(options.series[0].data[0].symbolSize).toBe(5);
    expect(options.series[0].data[1].symbolSize).toBe(10);
  });
});
