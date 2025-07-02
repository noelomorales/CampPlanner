import MapboxDraw from '@mapbox/mapbox-gl-draw';
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css';
import { useEffect } from 'react';
import mapboxgl from 'mapbox-gl';

interface Props {
  map: mapboxgl.Map | null;
  onChange(geojson: GeoJSON.FeatureCollection): void;
}

export default function DrawControls({ map, onChange }: Props) {
  useEffect(() => {
    if (!map) return;
    const draw = new MapboxDraw({ displayControlsDefault: false, controls: { line_string: true, trash: true } });
    map.addControl(draw);
    map.on('draw.create', () => onChange(draw.getAll() as any));
    map.on('draw.update', () => onChange(draw.getAll() as any));
    return () => {
      map.removeControl(draw);
    };
  }, [map, onChange]);
  return null;
}
