# EduSmart - Next.js Application

This is a Next.js project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:9002](http://localhost:9002) with your browser to see the result.

You can start editing the page by modifying `src/app/page.tsx`. The page auto-updates as you edit the file.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploying to GitHub Pages

This project is configured for static export, making it suitable for deployment on GitHub Pages. Follow these steps carefully:

**1. Build the Static Site:**

Run the following command in your project's root directory:
```bash
npm run build:static
```
This command first builds the Next.js application (`npm run build`) and then exports it to static HTML/CSS/JS files (`npm run export`). The static files will be generated in the `out` directory.

**2. Push the Static Files to GitHub:**

You need to push the contents of the `out` directory (not the entire project source code) to a specific branch that GitHub Pages will serve. The recommended method is using the `gh-pages` branch:

*   **Method: Use `gh-pages` branch (Recommended)**
    *   Make sure your main project code changes are committed to your `main` (or `master`) branch first.
    *   Install the `gh-pages` helper package if you haven't already:
        ```bash
        npm install gh-pages --save-dev
        ```
    *   Run the following command **from your project's root directory** (the one containing `package.json`):
        ```bash
        npx gh-pages -d out -t true
        ```
        *   `-d out`: Specifies that the `out` directory contains the files to deploy.
        *   `-t true`: Adds a `.nojekyll` file automatically to the deployment branch, which is important for GitHub Pages to serve the site correctly without Jekyll interference.

**3. Configure GitHub Pages Settings:**

**This is a crucial step!** If you see your README file instead of your website, it's likely because GitHub Pages is not configured correctly.

*   Go to your repository on GitHub.
*   Click on the "Settings" tab.
*   In the left sidebar, navigate to "Pages".
*   Under "Build and deployment":
    *   Set the **Source** to **"Deploy from a branch"**.
    *   Under **Branch**, select the `gh-pages` branch (or `main`/`master` if you used Method 1 in step 2, although `gh-pages` is preferred for project sites).
    *   Ensure the folder is set to `/ (root)`.
    *   Click **"Save"**.

**4. Configure `basePath` (If Deploying to a Project Repository):**

*   GitHub Pages deploys project sites to a subdirectory (e.g., `https://your-username.github.io/your-repo-name/`). User/Organization sites deploy to the root (`https://your-username.github.io/`).
*   **If your site URL includes your repository name (a project site)**, you MUST configure the `basePath` in your Next.js config to match the repository name.
    *   Open `next.config.ts`.
    *   Add or uncomment the `basePath` property:
        ```ts
        import type {NextConfig} from 'next';

        const nextConfig: NextConfig = {
          output: 'export', // Keep this for static export
          // *** Add or uncomment the line below, replacing 'your-repo-name' ***
          // basePath: '/your-repo-name',
          images: {
             unoptimized: true, // Required for static export with next/image
             remotePatterns: [
                 // ... your existing remote patterns ...
             ],
          },
          // ... other configurations ...
          typescript: {
            ignoreBuildErrors: true,
          },
          eslint: {
            ignoreDuringBuilds: true,
          },
        };

        export default nextConfig;
        ```
    *   Replace `/your-repo-name` with the actual name of your GitHub repository (e.g., `/EduSmart`).
    *   **Important:** After modifying `next.config.ts`, you **must rebuild** the static site (`npm run build:static`) and **re-push** it to the `gh-pages` branch (`npx gh-pages -d out -t true`) before the changes take effect on GitHub Pages.

**5. Access Your Site:**

*   Wait a few minutes for GitHub Pages to build and deploy your site after configuring the settings.
*   The URL will be shown in the GitHub Pages settings section.
    *   User/Org site: `https://your-username.github.io/`
    *   Project site: `https://your-username.github.io/your-repo-name/`

If you still encounter issues, double-check:
*   You pushed the contents of the `out` folder, not the source code, to the deployment branch (`gh-pages`).
*   Your GitHub Pages settings point to the correct branch (`gh-pages`) and folder (`/ (root)`).
*   You configured `basePath` in `next.config.ts`, rebuilt, and redeployed if it's a project site.
*   The `.nojekyll` file exists in the root of the `gh-pages` branch.
```