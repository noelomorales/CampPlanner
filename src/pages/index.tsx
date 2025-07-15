// TODO: Add GitHub OAuth, swap to Postgres, daily email digest and offline PWA
import useSWR from 'swr';
import MapBox from '@/components/MapBox';
import copy from '../../copy/en.json';

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export default function Home() {
  const { data: route } = useSWR<GeoJSON.FeatureCollection>('/api/route', fetcher, { refreshInterval: 60000 });
  const { data: checkin } = useSWR<{ ts: number; lat: number; lon: number } | null>(
    '/api/checkin',
    fetcher,
    { refreshInterval: 60000 }
  );

  return (
    <main>
      <h1>{copy.indexHeading}</h1>
      <MapBox geojson={route || undefined} checkin={checkin || undefined} />
    </main>
  );
}
