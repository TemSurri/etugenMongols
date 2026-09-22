# Etugen Mongols Website

The official web platform for Etugen Mongols NFP, a Calgary-based non-profit organization dedicated to preserving Mongolian culture, strengthening community connections, and sharing Mongolian traditions with future generations.

The website provides a bilingual, responsive experience for discovering the organization, exploring events and community programs, viewing galleries, registering for events, making donations, and managing member accounts.

## Features

- English and Mongolian language support
- Responsive navigation and mobile-friendly layouts
- Organization story, team, impact, and program pages
- Upcoming events and event detail pages
- Community event galleries
- Account registration, authentication, and email verification
- Password recovery and account management
- Event registration and registration history
- Stripe-powered event payments and donations
- Administrative event and registration management
- Accessible motion preferences and keyboard-friendly dialogs

## Tech Stack

- React 19
- TypeScript
- Vite
- React Router
- Tailwind CSS
- Framer Motion
- Axios
- Stripe.js and React Stripe.js
- ESLint
- Node.js test runner

## Project Structure

```text
etugenMongols/
├── client/
│   ├── public/              Static public assets
│   ├── src/
│   │   ├── api/             Shared API client
│   │   ├── app/             Application routing and providers
│   │   ├── assets/          Bundled frontend assets
│   │   ├── components/      Shared UI and navigation components
│   │   ├── context/         Shared application context
│   │   ├── media/           Centralized site media references
│   │   └── sections/        Feature-based pages, components, and logic
│   ├── tests/               Frontend contract and domain tests
│   └── package.json
└── README.md
```

The frontend is organized primarily by feature. Authentication, events, galleries, payments, programs, account management, and administrative tools each keep their pages, components, API functions, content, and supporting logic together.

## Getting Started

### Prerequisites

- Node.js 20.19+ or 22.12+
- npm
- Access to a compatible Etugen Mongols API
- A Stripe publishable key for payment flows

### Installation

```bash
cd client
npm install
```

Create a `client/.env.local` file with the required environment variables:

```env
VITE_API_URL=http://localhost:8080
VITE_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
```

Start the development server:

```bash
npm run dev
```

Vite will print the local development URL in the terminal.

## Available Commands

Run these commands from the `client` directory:

```bash
npm run dev        # Start the development server
npm run typecheck  # Check TypeScript types
npm run lint       # Run ESLint
npm test           # Run frontend tests
npm run build      # Create a production build
npm run preview    # Preview the production build locally
```

## API and Authentication

The frontend communicates with the configured API through a shared Axios client and sends credentials with requests. Authentication is session-based. The application retrieves a masked CSRF token from the API and supplies it for protected mutations.

The API is expected to provide the authentication, account, event, registration, payment, donation, and administrative endpoints consumed by the frontend.

## Deployment

The production frontend is built with:

```bash
cd client
npm run build
```

The generated production files are written to `client/dist`. The included Vercel configuration rewrites application routes to the React entry point so client-side navigation works when pages are loaded directly.

Production environment variables must provide the deployed API URL and Stripe publishable key.

## Quality Checks

Before deploying or submitting changes, run:

```bash
npm run typecheck
npm run lint
npm test
npm run build
```

## Copyright

© 2026 Etugen Mongols NFP. All rights reserved.
