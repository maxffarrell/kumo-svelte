import { render, screen } from '@testing-library/svelte';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { expectNoA11yViolations } from '../../../../tests/a11y';
import Chart from './Chart.svelte';
import ChartLegend from './ChartLegend.svelte';

class ResizeObserverMock {
  observe = vi.fn();
  disconnect = vi.fn();
  unobserve = vi.fn();
}

class IntersectionObserverMock {
  observe = vi.fn();
  disconnect = vi.fn();
  unobserve = vi.fn();
  takeRecords = vi.fn(() => []);
  readonly root = null;
  readonly rootMargin = '';
  readonly thresholds = [];
}

const mockChartInstance = {
  setOption: vi.fn(),
  on: vi.fn(),
  off: vi.fn(),
  resize: vi.fn(),
  dispose: vi.fn(),
  clear: vi.fn(),
  dispatchAction: vi.fn(),
  convertFromPixel: vi.fn()
};

const mockEcharts = {
  init: vi.fn(() => mockChartInstance)
};

describe('Chart', () => {
  beforeEach(() => {
    vi.stubGlobal('ResizeObserver', ResizeObserverMock);
    vi.stubGlobal('IntersectionObserver', IntersectionObserverMock);
    mockEcharts.init.mockClear();
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('mounts without throwing and renders the w-full wrapper', () => {
    const { container } = render(Chart, {
      echarts: mockEcharts,
      options: {
        xAxis: { type: 'category', data: ['A'] },
        yAxis: {},
        series: [{ type: 'bar', data: [1] }]
      },
      height: 200
    });

    const wrapper = container.querySelector('.w-full');
    expect(wrapper).toBeTruthy();
    expect(wrapper?.getAttribute('style')).toContain('height: 200px');
    expect(mockEcharts.init).toHaveBeenCalled();
  });

  it('has no axe violations on the wrapper', async () => {
    const { container } = render(Chart, {
      echarts: mockEcharts,
      options: {
        xAxis: { type: 'category', data: ['A'] },
        yAxis: {},
        series: [{ type: 'bar', data: [1] }]
      },
      height: 120
    });

    await expectNoA11yViolations(container);
  });
});

describe('ChartLegend', () => {
  it('renders small variant with expected Kumo classes', () => {
    render(ChartLegend, { name: 'Requests', color: '#086FFF', value: '1,234' });

    const item = screen.getByRole('button');
    expect(item.className).toContain('inline-flex');
    expect(item.className).toContain('items-center');
    expect(item.className).toContain('gap-2');
    expect(item.textContent).toContain('Requests');
    expect(item.textContent).toContain('1,234');
  });

  it('renders large variant with stacked layout classes', () => {
    render(ChartLegend, {
      variant: 'large',
      name: 'Latency',
      color: '#CF7EE9',
      value: '42',
      unit: 'ms'
    });

    const item = screen.getByRole('button');
    expect(item.className).toContain('inline-flex');
    expect(item.className).toContain('flex-col');
    expect(item.className).toContain('min-w-42');
    expect(item.textContent).toContain('ms');
  });

  it('adds cursor-pointer when clickable', () => {
    render(ChartLegend, {
      name: 'Requests',
      color: '#086FFF',
      value: '1,234',
      onclick: vi.fn()
    } as never);

    expect(screen.getByRole('button').className).toContain('cursor-pointer');
  });

  it('has no axe violations', async () => {
    const { container } = render(ChartLegend, {
      name: 'Requests',
      color: '#086FFF',
      value: '1,234'
    });

    await expectNoA11yViolations(container);
  });
});
