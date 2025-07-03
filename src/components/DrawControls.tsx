import MapboxDraw from '@mapbox/mapbox-gl-draw';
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css';
import { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import { gpx } from '@tmcw/togeojson';


=======
=======
import { useEffect } from 'react';
import mapboxgl from 'mapbox-gl';



interface Props {
  map: mapboxgl.Map | null;
  onChange(geojson: GeoJSON.FeatureCollection): void;
}

export default function DrawControls({ map, onChange }: Props) {
  const drawRef = useRef<MapboxDraw | null>(null);

  useEffect(() => {
    if (!map) return;
    const draw = new MapboxDraw({ displayControlsDefault: false, controls: { line_string: true, trash: true } });
    drawRef.current = draw;
    map.addControl(draw);
    const handle = () => onChange(draw.getAll() as any);
    map.on('draw.create', handle);
    map.on('draw.update', handle);
    return () => {
      map.off('draw.create', handle);
      map.off('draw.update', handle);
      map.removeControl(draw);
    };
  }, [map, onChange]);

  async function loadFile(file: File) {
    const text = await file.text();
    let data: GeoJSON.FeatureCollection;
    if (file.name.endsWith('.gpx')) {
      const dom = new DOMParser().parseFromString(text, 'application/xml');
      data = gpx(dom) as any;
    } else {
      data = JSON.parse(text);
    }
    const draw = drawRef.current;
    if (!draw) return;
    draw.deleteAll();
    draw.set(data as any);
    onChange(draw.getAll() as any);
  }

  return (
    <div style={{ margin: '0.5rem 0' }}>
      <input
        type="file"
        accept=".gpx,.geojson,application/gpx+xml,application/json"
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) loadFile(f);
          e.target.value = '';
        }}
      />
    </div>
  );

=======

=======

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
