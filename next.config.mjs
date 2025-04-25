/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  output: 'export', // Enable static export
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    unoptimized: true, // Disable Next.js Image Optimization for static export
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'cintia.unicordoba.edu.co',
        port: '',
        pathname: '/**',
      },
       {
        protocol: 'https',
        hostname: 'moria.aurens.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'upload.wikimedia.org',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn.pixabay.com', // Added Pixabay hostname
        port: '',
        pathname: '/**',
      },
    ],
  },
  // Optional: Add basePath if deploying to a subdirectory like username.github.io/repo-name
  // basePath: '/your-repo-name', // Example: '/EduSmart' if repo is named EduSmart
};

export default nextConfig;
