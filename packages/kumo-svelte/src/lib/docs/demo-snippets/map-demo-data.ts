import { type MapGeoJson } from 'kumo-svelte/components/chart';

export interface Colo extends Record<string, unknown> {
  iata: string;
  city: string;
  country?: string;
  lat: number;
  lon: number;
  requests: number;
}

export interface CfLocation extends Record<string, unknown> {
  city: string;
  iata: string;
  lat: number;
  lon: number;
}

export interface CountryTraffic extends Record<string, unknown> {
  country: string;
  requests: number;
}

type Position = [number, number];

function boxFeature(name: string, west: number, south: number, east: number, north: number) {
  const coordinates: Position[] = [
    [west, south],
    [east, south],
    [east, north],
    [west, north],
    [west, south]
  ];

  return {
    type: 'Feature' as const,
    properties: { name },
    geometry: {
      type: 'Polygon' as const,
      coordinates: [coordinates]
    }
  };
}

const WORLD_GEO_JSON: MapGeoJson = {
  type: 'FeatureCollection',
  features: [
    boxFeature('United States of America', -125, 25, -66, 49),
    boxFeature('Canada', -141, 42, -52, 83),
    boxFeature('Mexico', -118, 14, -86, 33),
    boxFeature('Argentina', -73, -55, -53, -21),
    boxFeature('Brazil', -74, -34, -34, 5),
    boxFeature('United Kingdom', -8, 50, 2, 59),
    boxFeature('Netherlands', 3, 50, 8, 54),
    boxFeature('France', -5, 42, 8, 51),
    boxFeature('Spain', -10, 36, 4, 44),
    boxFeature('Germany', 5, 47, 15, 55),
    boxFeature('Nigeria', 3, 4, 14, 14),
    boxFeature('South Africa', 16, -35, 33, -22),
    boxFeature('India', 68, 6, 97, 35),
    boxFeature('Japan', 129, 31, 146, 46),
    boxFeature('Australia', 113, -44, 154, -10)
  ]
};

export const colos: Colo[] = [
  { iata: 'SFO', city: 'San Francisco', country: 'US', lat: 37.77, lon: -122.42, requests: 1600 },
  { iata: 'EWR', city: 'New York', country: 'US', lat: 40.71, lon: -74.0, requests: 980 },
  { iata: 'GRU', city: 'Sao Paulo', country: 'BR', lat: -23.55, lon: -46.63, requests: 540 },
  { iata: 'LHR', city: 'London', country: 'GB', lat: 51.5, lon: -0.12, requests: 1500 },
  { iata: 'LOS', city: 'Lagos', country: 'NG', lat: 6.52, lon: 3.38, requests: 320 },
  { iata: 'FRA', city: 'Frankfurt', country: 'DE', lat: 50.11, lon: 8.68, requests: 760 },
  { iata: 'BOM', city: 'Mumbai', country: 'IN', lat: 19.07, lon: 72.87, requests: 640 },
  { iata: 'SIN', city: 'Singapore', country: 'SG', lat: 1.35, lon: 103.82, requests: 880 },
  { iata: 'NRT', city: 'Tokyo', country: 'JP', lat: 35.68, lon: 139.69, requests: 1100 },
  { iata: 'SYD', city: 'Sydney', country: 'AU', lat: -33.86, lon: 151.21, requests: 410 }
];

export const cloudflareLocations: CfLocation[] = [
  { city: 'San Francisco', iata: 'SFO', lat: 37.77, lon: -122.42 },
  { city: 'Los Angeles', iata: 'LAX', lat: 34.05, lon: -118.24 },
  { city: 'Seattle', iata: 'SEA', lat: 47.61, lon: -122.33 },
  { city: 'Dallas', iata: 'DFW', lat: 32.78, lon: -96.8 },
  { city: 'Chicago', iata: 'ORD', lat: 41.88, lon: -87.63 },
  { city: 'Atlanta', iata: 'ATL', lat: 33.75, lon: -84.39 },
  { city: 'Miami', iata: 'MIA', lat: 25.76, lon: -80.19 },
  { city: 'Ashburn', iata: 'IAD', lat: 39.04, lon: -77.49 },
  { city: 'New York', iata: 'EWR', lat: 40.71, lon: -74.01 },
  { city: 'Toronto', iata: 'YYZ', lat: 43.65, lon: -79.38 },
  { city: 'Mexico City', iata: 'MEX', lat: 19.43, lon: -99.13 },
  { city: 'Sao Paulo', iata: 'GRU', lat: -23.55, lon: -46.63 },
  { city: 'Buenos Aires', iata: 'EZE', lat: -34.6, lon: -58.38 },
  { city: 'London', iata: 'LHR', lat: 51.51, lon: -0.13 },
  { city: 'Amsterdam', iata: 'AMS', lat: 52.37, lon: 4.9 },
  { city: 'Paris', iata: 'CDG', lat: 48.86, lon: 2.35 },
  { city: 'Frankfurt', iata: 'FRA', lat: 50.11, lon: 8.68 },
  { city: 'Madrid', iata: 'MAD', lat: 40.42, lon: -3.7 },
  { city: 'Milan', iata: 'MXP', lat: 45.46, lon: 9.19 },
  { city: 'Stockholm', iata: 'ARN', lat: 59.33, lon: 18.06 },
  { city: 'Istanbul', iata: 'IST', lat: 41.01, lon: 28.98 },
  { city: 'Dubai', iata: 'DXB', lat: 25.2, lon: 55.27 },
  { city: 'Cairo', iata: 'CAI', lat: 30.04, lon: 31.24 },
  { city: 'Lagos', iata: 'LOS', lat: 6.52, lon: 3.38 },
  { city: 'Johannesburg', iata: 'JNB', lat: -26.2, lon: 28.05 },
  { city: 'Mumbai', iata: 'BOM', lat: 19.08, lon: 72.88 },
  { city: 'Delhi', iata: 'DEL', lat: 28.61, lon: 77.21 },
  { city: 'Singapore', iata: 'SIN', lat: 1.35, lon: 103.82 },
  { city: 'Jakarta', iata: 'CGK', lat: -6.21, lon: 106.85 },
  { city: 'Hong Kong', iata: 'HKG', lat: 22.32, lon: 114.17 },
  { city: 'Tokyo', iata: 'NRT', lat: 35.68, lon: 139.69 },
  { city: 'Seoul', iata: 'ICN', lat: 37.57, lon: 126.98 },
  { city: 'Sydney', iata: 'SYD', lat: -33.87, lon: 151.21 }
];

export const countries: CountryTraffic[] = [
  { country: 'United States of America', requests: 4200 },
  { country: 'Germany', requests: 3100 },
  { country: 'United Kingdom', requests: 2800 },
  { country: 'Japan', requests: 2500 },
  { country: 'France', requests: 2200 },
  { country: 'Brazil', requests: 1700 },
  { country: 'India', requests: 1500 },
  { country: 'Canada', requests: 1300 },
  { country: 'Australia', requests: 1100 },
  { country: 'Spain', requests: 900 },
  { country: 'Netherlands', requests: 700 },
  { country: 'Mexico', requests: 600 },
  { country: 'Argentina', requests: 420 },
  { country: 'Nigeria', requests: 300 },
  { country: 'South Africa', requests: 220 }
];

export const fmtRequests = (value: number) =>
  `${value >= 1000 ? `${(value / 1000).toLocaleString()}k` : value.toString()} requests`;

export async function loadWorldGeoJson(): Promise<MapGeoJson> {
  return WORLD_GEO_JSON;
}
