const isExport = process.env.NEXT_EXPORT === 'true';
const isGitHubPages = process.env.NEXT_PUBLIC_GITHUB_PAGES === 'true';

const nextConfig = {
  output: 'export',
  basePath: isExport ? isGitHubPages ? '/opst-alexu' : '' : '',
  assetPrefix: isExport ? isGitHubPages ? '/opst-alexu' : '' : '',
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
    NEXT_PUBLIC_BASE_PATH: isExport ? isGitHubPages ? '/opst-alexu' : '' : ''
  },
};


export default nextConfig;