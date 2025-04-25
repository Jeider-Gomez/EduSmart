import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  output: 'export', // Essential for static export to GitHub Pages
  // Uncomment and set the basePath if deploying to a subdirectory (like https://username.github.io/repo-name/)
  // Replace 'your-repo-name' with your actual GitHub repository name.
  // basePath: '/your-repo-name',
  images: {
    unoptimized: true, // Required for static export with next/image on GitHub Pages
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
  typescript: {
    ignoreBuildErrors: true, // Keep if needed, but try to resolve TS errors
  },
  eslint: {
    ignoreDuringBuilds: true, // Keep if needed, but try to resolve lint errors
  },
};

export default nextConfig;
```