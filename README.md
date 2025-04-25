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

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Deploying to GitHub Pages

This project is configured for static export, making it suitable for deployment on GitHub Pages.

1.  **Build the static site:**
    Run the following command in your project's root directory:
    ```bash
    npm run build:static
    ```
    This will generate the static files in the `out` directory.

2.  **Push the `out` directory to GitHub:**
    *   **Method 1: Deploy `out` folder directly**
        *   Initialize a Git repository in the `out` folder (if not already done).
        *   Create a new repository on GitHub (e.g., `your-username.github.io` for a user/org page, or any name like `my-edusmart-app` for a project page).
        *   Add the GitHub repository as a remote: `git remote add origin https://github.com/your-username/your-repo-name.git`
        *   Commit and push the contents of the `out` folder to the `main` (or `master`) branch:
            ```bash
            cd out
            git init # If not already a repo
            # Add .nojekyll file if not copied by build process
            touch .nojekyll
            git add .
            git commit -m "Deploy static site"
            git branch -M main # Or master
            git remote add origin https://github.com/your-username/your-repo-name.git # Add remote if needed
            git push -u origin main --force # Use --force if overwriting history
            ```
    *   **Method 2: Use `gh-pages` branch**
        *   Commit your main project code changes.
        *   Push the `out` folder's contents to a `gh-pages` branch in your main project repository:
            ```bash
            # Install gh-pages if you haven't: npm install gh-pages --save-dev
            # Make sure .nojekyll is in the 'out' directory (or public)
            # Run from the project root:
            npx gh-pages -d out -t true # -t adds the .nojekyll file automatically
            ```

3.  **Configure GitHub Pages:**
    *   Go to your repository settings on GitHub (`https://github.com/your-username/your-repo-name/settings/pages`).
    *   Under "Build and deployment", select "Deploy from a branch" as the source.
    *   Choose the branch you pushed the static files to (`main`/`master` or `gh-pages`).
    *   Select the `/ (root)` folder.
    *   Click "Save".

4.  **Access your site:**
    *   If you deployed to `your-username.github.io`, the site will be at `https://your-username.github.io/`.
    *   If you deployed to a project repository (e.g., `my-edusmart-app`), the site will be at `https://your-username.github.io/my-edusmart-app/`.
        *   **Important:** If deploying to a subdirectory (project repository), you might need to configure `basePath` in `next.config.mjs`. Uncomment and set `basePath: '/your-repo-name'` in `next.config.mjs` and rebuild before deploying.

It might take a few minutes for GitHub Pages to build and deploy your site.
