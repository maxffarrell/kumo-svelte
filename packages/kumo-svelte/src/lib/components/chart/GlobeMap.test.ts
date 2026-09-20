import { fireEvent, render, waitFor } from '@testing-library/svelte';
import { describe, expect, it, vi } from 'vitest';
import GlobeMap from './GlobeMap.svelte';

describe('GlobeMap', () => {
  it('renders an accessible SVG globe without ECharts', async () => {
    const onMarkerClick = vi.fn();
    const { getByLabelText, getByRole } = render(GlobeMap, {
      props: {
        markers: [
          {
            name: 'London',
            description: 'Availability location',
            latitude: 51.5,
            longitude: -0.12
          }
        ],
        showGraticule: true,
        onMarkerClick,
        'aria-label': 'Traffic globe'
      }
    });

    const globe = getByLabelText('Traffic globe');
    expect(globe.tagName).toBe('svg');
    expect(getByRole('group', { name: 'Traffic globe' })).toBe(globe);
    expect(globe.getAttribute('aria-describedby')).toBeTruthy();
    expect(globe.querySelectorAll('path').length).toBeGreaterThan(3);
    const landPath = globe.querySelector('[data-land-style="hatched"]')?.getAttribute('d');
    expect(landPath).toContain('L');
    expect(landPath?.match(/M/g)?.length).toBeGreaterThan(100);
    const sphereClip = globe.querySelector('clipPath');
    expect(sphereClip).not.toBeNull();
    expect(globe.querySelector('[data-land-style="hatched"]')?.getAttribute('clip-path')).toBe(
      `url(#${sphereClip?.id})`
    );
    expect(globe.querySelectorAll('circle')).toHaveLength(1);

    await fireEvent.keyDown(getByRole('button', { name: 'London: Availability location' }), {
      key: 'Enter'
    });
    expect(onMarkerClick).toHaveBeenCalledWith(expect.objectContaining({ name: 'London' }));
  });

  it('updates rotation while dragging', async () => {
    const onUserRotationChange = vi.fn();
    const { getByLabelText } = render(GlobeMap, {
      props: { 'aria-label': 'Draggable globe', onUserRotationChange }
    });
    const globe = getByLabelText('Draggable globe');
    const land = globe.querySelector('[data-land-style="hatched"]');
    const initialPath = land?.getAttribute('d');

    await fireEvent.pointerDown(globe, {
      pointerId: 1,
      clientX: 100,
      clientY: 100,
      button: 0,
      isPrimary: true
    });
    await fireEvent.pointerMove(globe, { pointerId: 1, clientX: 140, clientY: 100 });

    await waitFor(() => expect(land?.getAttribute('d')).not.toBe(initialPath));
    expect(onUserRotationChange).toHaveBeenCalledWith([2, -20, 0]);
  });

  it('supports keyboard rotation and informational marker semantics', async () => {
    const onUserRotationChange = vi.fn();
    const { container, getByRole, queryByRole } = render(GlobeMap, {
      props: {
        markers: [{ name: 'London', latitude: 51.5, longitude: -0.12 }],
        onUserRotationChange
      }
    });
    const globe = getByRole('group', { name: 'Interactive globe map' });
    await fireEvent.keyDown(globe, { key: 'ArrowRight' });
    await fireEvent.keyDown(globe, { key: 'ArrowUp' });
    expect(onUserRotationChange).toHaveBeenNthCalledWith(1, [0, -20, 0]);
    expect(onUserRotationChange).toHaveBeenNthCalledWith(2, [0, -10, 0]);
    expect(queryByRole('button', { name: /London:/ })).toBeNull();
    expect(container.querySelector('[data-globe-marker]')?.getAttribute('aria-hidden')).toBe('true');
    expect(getByRole('list', { name: 'Interactive globe map locations' }).textContent).toContain(
      'London: 51.50, -0.12'
    );
  });

  it('renders markers above the outline and fades them at the horizon', () => {
    const { container } = render(GlobeMap, {
      props: {
        defaultRotation: [0, 0, 0],
        markers: [{ name: 'Edge', latitude: 0, longitude: 80 }]
      }
    });
    const outline = container.querySelector('[data-globe-outline]');
    const marker = container.querySelector('[data-globe-marker]');
    const opacity = Number(marker?.getAttribute('opacity'));
    expect(outline?.nextElementSibling).toBe(marker);
    expect(opacity).toBeGreaterThan(0);
    expect(opacity).toBeLessThan(1);
  });
});
