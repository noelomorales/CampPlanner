/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  env: {
    NEXT_PUBLIC_MAPBOX_TOKEN: process.env.NEXT_PUBLIC_MAPBOX_TOKEN,
    ADMIN_PW: process.env.ADMIN_PW,
    KV_NAMESPACE: process.env.KV_NAMESPACE,
  },
};

export default nextConfig;
