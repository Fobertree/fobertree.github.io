/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // Required for GitHub Pages
  images: { unoptimized: true }, // Static export doesn't support default optimization
};
export default nextConfig;
