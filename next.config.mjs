/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // Required for GitHub Pages
  basePath: '/fobertree.github.io', // Repo name
  images: { unoptimized: true }, // Static export doesn't support default optimization
};
export default nextConfig;
