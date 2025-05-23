import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  output: 'export', // Essential for static export to GitHub Pages
  // *** IMPORTANT FOR GITHUB PAGES PROJECT SITES ***
  // If deploying to a URL like https://your-username.github.io/your-repo-name/
  // Uncomment the line below and replace 'your-repo-name' with your actual GitHub repository name.
  // Failing to do this will likely result in a 404 error or the README being displayed instead of the site.
  basePath: '/your-repo-name', // REPLACE 'your-repo-name' with your repo name!
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
