const nextConfig = {
  output: 'export',
  basePath: '/opst-alexu',
  assetPrefix: "/opst-alexu/",
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
