# Michail’s Handyman Marketing Site

This repository contains a Vite + React + TypeScript single-page marketing site for Michail’s Handyman, a licensed handyman and home improvement service in Ridgecrest, CA serving Palmdale, Lancaster, and Santa Clarita. It uses Tailwind CSS, shadcn/ui components, centralized site content, and JSON-LD local business schema for quick rebrands.

## Getting Started

```bash
# install dependencies
npm install

# start the dev server with hot reload (http://localhost:5173 by default)
npm run dev

# run linting
npm run lint

# create a production build
npm run build

# preview the production build locally
npm run preview
```

## Project Structure

- `src/` – React components, pages, hooks, and styles.
- `public/` – Static assets such as the favicon and robots.txt.
- `tailwind.config.ts` – Tailwind theme customizations.
- `vite.config.ts` – Vite configuration and path aliases.

## Deployment

Build the app with `npm run build` and host the contents of the generated `dist/` folder on your preferred static hosting provider (Netlify, Vercel, Render, Cloudflare Pages, S3 + CloudFront, etc.). Ensure your host serves `index.html` for unknown routes since this is a single-page application.

## Contributing

1. Create a new branch for your feature or fix.
2. Make your changes and run `npm run lint` to catch issues.
3. Open a pull request describing what changed and why.

## License

This project is private and intended for internal client work. Please contact the maintainers before reusing any portion of the codebase.
