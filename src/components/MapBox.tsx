import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useEffect, useRef } from 'react';

const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
if (token) {
  mapboxgl.accessToken = token;
}

export interface MapBoxProps {
  geojson?: GeoJSON.FeatureCollection;
  checkin?: { ts: number; lat: number; lon: number } | null;
  onMap?: (map: mapboxgl.Map) => void;
}

export default function MapBox({ geojson, checkin, onMap }: MapBoxProps) {
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const divRef = useRef<HTMLDivElement>(null);

  /* ───────────────────────────
     Initialise map once
  ─────────────────────────── */
  useEffect(() => {
    if (!divRef.current || mapRef.current) return;
    if (!token) {
      console.error('NEXT_PUBLIC_MAPBOX_TOKEN not set');
      return;
    }

    mapRef.current = new mapboxgl.Map({
      container: divRef.current,
      style: 'mapbox://styles/mapbox/outdoors-v12',
      center: [-119.5, 37.8],
      zoom: 8,
    });

    onMap?.(mapRef.current);
  }, [onMap]);

  /* ───────────────────────────
     Add / update route layer
  ─────────────────────────── */
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !geojson) return;

    if (map.getSource('route')) {
      (map.getSource('route') as mapboxgl.GeoJSONSource).setData(
        geojson as any,
      );
    } else {
      map.addSource('route', { type: 'geojson', data: geojson as any });
      map.addLayer({
        id: 'route',
        type: 'line',
        source: 'route',
        paint: { 'line-color': '#d00', 'line-width': 3 },
      });
    }
  }, [geojson]);

  /* ───────────────────────────
     Add / update check-in marker
  ─────────────────────────── */
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !checkin) return;

    const src = 'checkin';
    const point: GeoJSON.Point = {
      type: 'Point',
      coordinates: [checkin.lon, checkin.lat],
    };

    if (map.getSource(src)) {
      (map.getSource(src) as mapboxgl.GeoJSONSource).setData(point as any);
    } else {
      map.addSource(src, { type: 'geojson', data: point as any });
      map.addLayer({
        id: src,
        type: 'circle',
        source: src,
        paint: { 'circle-radius': 6, 'circle-color': '#38f' },
      });
    }
  }, [checkin]);

  if (!token) {
    return (
      <div style={{ width: '100%', height: 400, display: 'grid', placeItems: 'center', background: '#eee' }}>
        <p>Set NEXT_PUBLIC_MAPBOX_TOKEN to view the map.</p>
      </div>
    );
  }
  return <div ref={divRef} style={{ width: '100%', height: 400 }} />;
}