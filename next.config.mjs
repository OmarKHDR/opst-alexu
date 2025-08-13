const isExport = process.env.NEXT_EXPORT === 'true';

const nextConfig = {
  output: 'export',
  basePath: isExport ? '' : '/opst-alexu',
    assetPrefix: isExport ? '' : '/opst-alexu',
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  env: {
    NEXT_PUBLIC_BASE_PATH: isExport ? '' : '/opst-alexu'
  },
};


export default nextConfig;