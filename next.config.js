const intercept = require('intercept-stdout');

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  skipTrailingSlash: true,
  trailingSlash: true,
  swcMinify: true,
  // config env
  publicRuntimeConfig: {
    NODE_ENV: process.env.NODE_ENV,
    API_URL_DEV: process.env.NEXT_PUBLIC_API_URL_DEV,
    LOCAL_STORAGE_KEY: 'MFAMILY',
    PORT: Number(process.env.PORT) || 3005,
  },
  images: {
    minimumCacheTTL: 60,
    formats: ['image/avif', 'image/webp'],
    domains: [''],
  },
  httpAgentOptions: {
    keepAlive: false,
  },
  headers: async function headers() {
    // if (process.env.NODE_ENV === 'development') return [];
    return [
      {
        source: '/:all*(svg|jpg|png|webp|avif)',
        locale: false,
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=9999999999, must-revalidate',
          },
          { key: 'Access-Control-Allow-Credentials', value: 'true' },
          { key: 'Access-Control-Allow-Origin', value: '*' }, // replace this your actual origin
          { key: 'Access-Control-Allow-Methods', value: 'GET,DELETE,PATCH,POST,PUT' },
          {
            key: 'Access-Control-Allow-Headers',
            value:
              'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',
          },
        ],
      },
    ];
  },
  // devIndicators: {
  //   buildActivity: false,
  // },
};

// safely ignore recoil stdout warning messages
function interceptStdout(text) {
  if (text.includes('Duplicate atom key')) {
    return '';
  }
  return text;
}

// Intercept in dev and prod
intercept(interceptStdout);

module.exports = withBundleAnalyzer(nextConfig);
