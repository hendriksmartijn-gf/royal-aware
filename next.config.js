/** @type {import('next').NextConfig} */
const nextConfig = {
  // Keep @react-pdf/renderer and its canvas dependency out of the server bundle
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.externals = [...(config.externals || []), '@react-pdf/renderer'];
    }
    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'v5.airtableusercontent.com',
      },
      {
        protocol: 'https',
        hostname: '*.airtableusercontent.com',
      },
    ],
  },
};

module.exports = nextConfig;
