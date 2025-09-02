# Agent Instructions for `niteshrijal.com`

This document provides instructions for AI agents to understand and assist in the development of this codebase.

## Project Overview

This is a personal portfolio and blog website for Nitesh Rijal, built with the [Astro](https://astro.build/) web framework. The site is designed to be fast, content-focused, and easily maintainable.

## Technology Stack

-   **Framework**: [Astro](https://astro.build/)
-   **UI Components**: Astro components (`.astro`) and [SolidJS](https://www.solidjs.com/) (`.tsx`).
-   **Styling**: [Tailwind CSS](https://tailwindcss.com/) with a custom theme.
-   **Content**: [Astro Content Collections](https://docs.astro.build/en/guides/content-collections/) using Markdown (`.md`).
-   **Language**: [TypeScript](https://www.typescriptlang.org/).
-   **Package Manager**: `pnpm` is used (indicated by `pnpm-lock.yaml`).

## Project Structure

The directory structure is standard for an Astro project.

-   `src/`: Contains the core source code.
    -   `components/`: Reusable UI components. Note the mix of `.astro` and `.tsx` (SolidJS) files.
    -   `content/`: This is where all the website's content (blog posts, projects, work experience, legal pages) is stored in Markdown files. This is managed by Astro's Content Collections.
        -   `config.ts`: Defines the schema for the content collections.
    -   `layouts/`: Defines the overall page structure and templates for different content types.
    -   `pages/`: Handles the routing for the website. Astro uses file-based routing.
        -   `index.astro`: The home page.
        -   `blog/[...slug].astro`: A dynamic route that generates pages for each blog post from the `src/content/blog` collection.
    -   `styles/`: Contains global CSS.
    -   `consts.ts`: Project-wide constants.
    -   `types.ts`: TypeScript type definitions.
-   `public/`: Contains static assets like images, fonts, and `robots.txt`. These are served directly by the browser.
-   `astro.config.mjs`: The main configuration file for Astro, defining integrations like Tailwind, SolidJS, and the sitemap.
-   `tailwind.config.mjs`: The configuration file for Tailwind CSS, including custom fonts, colors, and animations.
-   `tsconfig.json`: TypeScript configuration, including path aliases like `@/*` which maps to `src/*`.

## Key Concepts & Conventions

-   **Content as Data**: All content is managed through Astro's Content Collections in `src/content/`. To add a new blog post, you create a new directory and `index.md` file within `src/content/blog/`.
-   **Component-Based**: The UI is built with a component-driven architecture. Use existing components from `src/components/` where possible.
-   **Styling**: All styling is done using Tailwind CSS utility classes directly in the `.astro` and `.tsx` files. Global styles are minimal and located in `src/styles/global.css`.
-   **Routing**: Routes are determined by the file structure in `src/pages/`. Dynamic routes (e.g., `[...slug].astro`) are used to render pages from content collections.
-   **Path Aliases**: The project uses the `~` and `@` alias for `src/`. Always use this alias when importing modules from the `src` directory (e.g., `import MyComponent from '~/components/MyComponent.astro'`).

## Development Workflow

Use `pnpm` for all package management.

-   **To start the development server**:
    ```bash
    pnpm dev
    ```
-   **To build the project for production**:
    ```bash
    pnpm build
    ```
-   **To preview the production build**:
    ```bash
    pnpm preview
    ```
-   **To lint the code**:
    ```bash
    pnpm lint
    ```

Your goal is to assist in developing and maintaining this website by following these conventions. When asked to create new pages or content, follow the existing patterns for content collections and component usage.
