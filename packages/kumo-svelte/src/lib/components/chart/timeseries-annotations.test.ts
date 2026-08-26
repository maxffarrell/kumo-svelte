import { describe, expect, it } from 'vitest';
import {
  buildTimeseriesMarkerAnnotations,
  clusterTimeseriesMarkers,
  getApproximateMarkerClusterInterval,
  getTimeseriesMarkerFromEvent
} from './timeseries-markers';
import { buildTimeseriesThresholdAnnotations, getThresholdValueExtent } from './timeseries-thresholds';

describe('timeseries annotations', () => {
  it('clusters nearby reference markers in timestamp order', () => {
    const markers = clusterTimeseriesMarkers(
      [
        { timestamp: 300, label: 'Deploy C' },
        { timestamp: 100, label: 'Deploy A' },
        { timestamp: 120, label: 'Deploy B' }
      ],
      25
    );

    expect(markers).toHaveLength(2);
    expect(markers[0]?.label).toBe('2 changes');
    expect(markers[0]?.markers.map((marker) => marker.label)).toEqual(['Deploy A', 'Deploy B']);
    expect(markers[1]?.label).toBe('Deploy C');
  });

  it('builds marker lines and recovers marker data from chart events', () => {
    const annotations = buildTimeseriesMarkerAnnotations(
      [{ timestamp: 100, label: 'Release', markers: [{ timestamp: 100, label: 'Release' }] }],
      { color: '#086FFF', labelBackgroundColor: '#fff' }
    );

    expect(annotations?.markLine.data[0]?.xAxis).toBe(100);
    expect(annotations?.markLine.data[0]?.lineStyle.type).toBe('dashed');
    expect(
      getTimeseriesMarkerFromEvent({
        componentType: 'markLine',
        data: { tooltip: { marker: annotations?.markLine.data[0]?.tooltip.marker } }
      })?.label
    ).toBe('Release');
    expect(getTimeseriesMarkerFromEvent({ componentType: 'line' })).toBeUndefined();
  });

  it('builds threshold lines and extends the y-axis extent', () => {
    const annotations = buildTimeseriesThresholdAnnotations([
      { value: 80, label: 'SLO', color: '#D63939' },
      { value: 20, color: '#086FFF' }
    ]);

    expect(annotations?.markLine.data).toHaveLength(2);
    expect(annotations?.markLine.data[0]?.yAxis).toBe(80);
    expect(annotations?.markLine.data[1]?.label.show).toBe(false);
    expect(getThresholdValueExtent([{ value: 80, color: '#D63939' }, { value: 20, color: '#086FFF' }])).toEqual({
      min: 20,
      max: 80
    });
  });

  it('uses zero interval when there are not enough timestamps', () => {
    expect(getApproximateMarkerClusterInterval([100], 5)).toBe(0);
  });
});
