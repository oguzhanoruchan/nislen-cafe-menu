# Nislen Café Menu

A mobile-first QR menu and café administration dashboard built with React, Vite, TypeScript, Tailwind CSS, and Firebase.

## Features

- Public, responsive QR menu with category filters, search, promotions, and product detail pages
- Dark/light appearance setting and installable PWA experience
- Firebase Firestore-backed categories and products; Firebase Storage product image uploads
- Firebase Authentication-protected admin dashboard with product/category CRUD
- Printable/downloadable menu QR code, Docker production image, ESLint, Prettier, Vitest, and GitHub Actions CI
- Useful demo menu when Firebase has not yet been configured

## Run locally

```bash
npm install
cp .env.example .env
npm run dev
```

Visit `http://localhost:5173`. The app works in demo mode without environment variables; saving and sign-in require Firebase.

## Firebase setup

1. Create a Firebase web project, then enable **Firestore**, **Storage**, and **Email/Password Authentication**.
2. Copy its web configuration values into `.env` using `.env.example`.
3. Deploy the included `firestore.rules` and `storage.rules` from the Firebase console or Firebase CLI.
4. Create an Email/Password user for your staff. Any authenticated account may manage the menu under the included rules; replace the write condition with role-based access for larger teams.
5. Open `/admin`, sign in, and add categories/products. Public visitors use `/` and individual product paths use `/product/:id`.

## Commands

```bash
npm run dev          # local development
npm run build        # typecheck and production build
npm run preview      # serve the production bundle
npm run lint         # ESLint
npm run format:check # Prettier validation
npm run test         # Vitest
```

## Docker

```bash
docker compose up --build
```

The production menu is then available at `http://localhost:8080`. Build-time Vite Firebase variables must be supplied during the image build if Firebase is required in the container.

## Deployment notes

Vite reads `VITE_*` variables at build time. Configure the six variables from `.env.example` in your deployment provider before building. The included PWA registers a service worker and the nginx configuration provides SPA route fallback for QR product links.
