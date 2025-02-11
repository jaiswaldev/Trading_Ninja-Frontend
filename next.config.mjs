/** @type {import('next').NextConfig} */
const nextConfig = {
    eslint: {
      ignoreDuringBuilds: true, 
    },
    experimental: {
    //   appDir: true, 
    },
    reactStrictMode: true, 
    webpack: (config) => {
      config.resolve.fallback = {
        fs: false, 
        path: false,
        os: false,
      };
      return config;
    },
  };
  
  export default nextConfig;
  
