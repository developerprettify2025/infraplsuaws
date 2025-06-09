/** @type {import('next').NextConfig} */
const nextConfig = { 
  // output: 'export',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'infraplusadmin.hellopci.com',
        pathname: '/BackEndImage/**',
      },
      {
        protocol: 'https',
        hostname: 'infraplusadmin.hellopci.com',
        pathname: '/BackEndImage/**',
      },
    ],
    // or use 'domains' if you're just allowing the full domain without path filtering:
    // domains: ['admin.eon7.in'],
  },
  sassOptions: {
    additionalData: `$var: red;`,
  },
};

export default nextConfig;