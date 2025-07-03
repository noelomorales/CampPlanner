// TODO: Add GitHub OAuth, swap to Postgres, daily email digest and offline PWA
import { useState } from 'react';
import mapboxgl from 'mapbox-gl';
import useSWR from 'swr';

import MapBox from '@/components/MapBox';
import DrawControls from '@/components/DrawControls';
import AuthGate from '@/components/AuthGate';
import SarForm, { SarData } from '@/components/SarForm';

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export default function Admin() {
  /* ── remote state ──────────────────────────────────────── */
  const { data: route, mutate: mutateRoute } =
    useSWR<GeoJSON.FeatureCollection>('/api/route', fetcher);

  const { data: sar, mutate: mutateSar } =
    useSWR<SarData | null>('/api/sar', fetcher);

  /* ── local state ───────────────────────────────────────── */
  const [map, setMap] = useState<mapboxgl.Map | null>(null);

  /* ── helpers ───────────────────────────────────────────── */
  const saveRoute = async (g: GeoJSON.FeatureCollection) => {
    await fetch('/api/route', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(g),
    });
    mutateRoute();
  };

  const saveSar = async (data: SarData) => {
    await fetch('/api/sar', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    mutateSar();
  };

  const checkIn = () => {
    if (!navigator.geolocation) {
      alert('Geolocation unavailable');
      return;
    }
    navigator.geolocation.getCurrentPosition(async (pos) => {
      await fetch('/api/checkin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          lat: pos.coords.latitude,
          lon: pos.coords.longitude,
        }),
      });
    });
  };

  /* ── render ────────────────────────────────────────────── */
  return (
    <AuthGate>
      <main>
        <h1>Admin</h1>

        <MapBox
          geojson={route || undefined}
          checkin={null}
          onMap={setMap}
        />

        {map && <DrawControls map={map} onChange={saveRoute} />}

        <button onClick={checkIn}>Check-in</button>

        {sar && <SarForm data={sar} onSave={saveSar} />}
      </main>
    </AuthGate>
  );
}