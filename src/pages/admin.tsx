// TODO: Add GitHub OAuth, swap to Postgres, daily email digest and offline PWA
import { useState } from 'react';
import useSWR from 'swr';
import MapBox from '@/components/MapBox';
import DrawControls from '@/components/DrawControls';
import AuthGate from '@/components/AuthGate';
import SarForm, { SarData } from '@/components/SarForm';

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export default function Admin() {
  const { data: route, mutate: mutateRoute } = useSWR<GeoJSON.FeatureCollection>('/api/route', fetcher);
  const { data: sar, mutate: mutateSar } = useSWR<SarData | null>('/api/sar', fetcher);
  const [map, setMap] = useState<any>(null);

  async function saveRoute(g: GeoJSON.FeatureCollection) {
    await fetch('/api/route', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(g) });
    mutateRoute();
  }
  async function saveSar(data: SarData) {
    await fetch('/api/sar', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
    mutateSar();
  }

  async function checkin() {
    if (!navigator.geolocation) return alert('no geolocation');
    navigator.geolocation.getCurrentPosition(async (pos) => {
      await fetch('/api/checkin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ lat: pos.coords.latitude, lon: pos.coords.longitude }),
      });
    });
  }

  return (
    <AuthGate>
      <main>
        <h1>Admin</h1>
        <MapBox geojson={route || undefined} checkin={null} onMap={setMap} />
        {map && <DrawControls map={map} onChange={saveRoute} />}
        <button onClick={checkin}>Check-in</button>
        {sar && <SarForm data={sar} onSave={saveSar} />}
      </main>
    </AuthGate>
  );
}
