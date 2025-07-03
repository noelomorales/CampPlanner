import mapboxgl from 'mapbox-gl';
import MapboxDraw from '@mapbox/mapbox-gl-draw';
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css';
import { useEffect, useRef } from 'react';
import { gpx } from '@tmcw/togeojson';

interface Props {
  map: mapboxgl.Map | null;
  onChange(geojson: GeoJSON.FeatureCollection): void;
}

export default function DrawControls({ map, onChange }: Props) {
  const drawRef = useRef<MapboxDraw | null>(null);

  /* ───────────────────────────
     Initialise / destroy Draw
  ─────────────────────────── */
  useEffect(() => {
    if (!map) return;

    const draw = new MapboxDraw({
      displayControlsDefault: false,
      controls: { line_string: true, trash: true },
    });

    drawRef.current = draw;
    map.addControl(draw);

    const handle = () =>
      onChange(draw.getAll() as unknown as GeoJSON.FeatureCollection);

    map.on('draw.create', handle);
    map.on('draw.update', handle);

    return () => {
      map.off('draw.create', handle);
      map.off('draw.update', handle);
      map.removeControl(draw);
    };
  }, [map, onChange]);

  /* ───────────────────────────
     Import GPX / GeoJSON file
  ─────────────────────────── */
  const loadFile = async (file: File) => {
    const text = await file.text();
    let data: GeoJSON.FeatureCollection;

    if (file.name.toLowerCase().endsWith('.gpx')) {
      const dom = new DOMParser().parseFromString(text, 'application/xml');
      data = gpx(dom) as unknown as GeoJSON.FeatureCollection;
    } else {
      data = JSON.parse(text);
    }

    if (!drawRef.current) return;

    drawRef.current.deleteAll();
    drawRef.current.set(data as any);
    onChange(drawRef.current.getAll() as unknown as GeoJSON.FeatureCollection);
  };

  /* ───────────────────────────
     File-input UI
  ─────────────────────────── */
  return (
    <div style={{ margin: '0.5rem 0' }}>
      <input
        type="file"
        accept=".gpx,.geojson,application/gpx+xml,application/json"
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) loadFile(f);
          // allow re-uploading the same file
          e.target.value = '';
        }}
      />
    </div>
  );
}