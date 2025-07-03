import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useEffect, useRef } from 'react';

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN!;

export interface MapBoxProps {
  geojson?: GeoJSON.FeatureCollection;
  checkin?: { ts: number; lat: number; lon: number } | null;
  onMap?: (map: mapboxgl.Map) => void;
}

export default function MapBox({ geojson, checkin, onMap }: MapBoxProps) {
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!divRef.current || mapRef.current) return;
    mapRef.current = new mapboxgl.Map({
      container: divRef.current,
      style: 'mapbox://styles/mapbox/outdoors-v12',
      center: [-119.5, 37.8],
      zoom: 8,
    });
    onMap?.(mapRef.current);
  }, [onMap]);


=======
=======
  }, []);



  useEffect(() => {
    const map = mapRef.current;
    if (!map || !geojson) return;
    if (map.getSource('route')) {
      (map.getSource('route') as mapboxgl.GeoJSONSource).setData(geojson as any);
    } else {
      map.addSource('route', {
        type: 'geojson',
        data: geojson as any,
      });
      map.addLayer({
        id: 'route',
        type: 'line',
        source: 'route',
        paint: { 'line-color': '#d00', 'line-width': 3 },
      });
    }
  }, [geojson]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map || !checkin) return;
    const id = 'checkin';
    if (map.getSource(id)) {
      (map.getSource(id) as mapboxgl.GeoJSONSource).setData({ type: 'Point', coordinates: [checkin.lon, checkin.lat] } as any);
    } else {
      map.addSource(id, { type: 'geojson', data: { type: 'Point', coordinates: [checkin.lon, checkin.lat] } as any });
      map.addLayer({ id, type: 'circle', source: id, paint: { 'circle-radius': 6, 'circle-color': '#38f' } });
    }
  }, [checkin]);

  return <div ref={divRef} style={{ width: '100%', height: '400px' }} />;
}
