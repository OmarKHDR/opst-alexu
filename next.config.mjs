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
    NEXT_PUBLIC_BASE_PATH: isExport ? isGitHubPages ? '/opst-alexu' : '' : '',
    NEXT_PUBLIC_CONTENTFUL_ENTITIES_URI: 'https://cdn.contentful.com/spaces/8jah25b7bryc/environments/master/entries',
    NEXT_PUBLIC_CDA_TOKEN: '69W1F8QEruLJaH6qZcoNPV9izJK4gytIthm_XRx4lEI'
  },
};


export default nextConfig;