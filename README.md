# Parcel Delivery System (Frontend)

Parcel Delivery System frontend built with React + TypeScript. It provides role-based dashboards for Admin, Sender, and Receiver, and communicates with a REST API via Redux Toolkit Query.

## Live Demo

- https://parcel-delivery-system-frontend-delta.vercel.app/

## Key Features

- Role-based authentication (Admin / Sender / Receiver)
- JWT-based login flow
- Sender dashboard
  - Create parcel delivery requests
  - Cancel a parcel (when not dispatched)
  - View created parcels
- Receiver dashboard
  - View incoming parcels
  - Confirm delivery
  - View delivery history
- Admin dashboard
  - View/manage users and parcels
  - Block/unblock users
  - Update parcel statuses (e.g., Approved, In Transit, Delivered)

## Tech Stack

- React (Vite)
- TypeScript
- Redux Toolkit + RTK Query
- Tailwind CSS + shadcn/ui (Radix UI)
- React Router

## Getting Started

### Prerequisites

- Node.js (LTS recommended)
- npm (comes with Node)

### Installation

```bash
git clone <your-repo-url>
cd Parcel-Delivery-system-frontend
npm install
```

### Environment Variables

Create a `.env` file in the project root (you can copy from `.env.example`).

Required:

```bash
VITE_BASE_URL=http://localhost:5000/api
```

Optional (used for demo/prefill in UI if implemented in the app):

```bash
VITE_DEMO_ADMIN_EMAIL=
VITE_DEMO_ADMIN_PASSWORD=

VITE_DEMO_SENDER_EMAIL=
VITE_DEMO_SENDER_PASSWORD=

VITE_DEMO_RECEIVER_EMAIL=
VITE_DEMO_RECEIVER_PASSWORD=
```

### Run Locally

1. Create your environment file:

```bash
copy .env.example .env
```

2. Update `VITE_BASE_URL` in `.env` to your backend API URL.

3. Start the dev server:

```bash
npm run dev
```

Then open:

- http://localhost:5173/

## Available Scripts

- `npm run dev` — start the development server
- `npm run build` — type-check and build for production
- `npm run preview` — preview the production build locally
- `npm run lint` — run ESLint across the project

## Project Structure (High Level)

- `src/components` — UI and feature components (layout, modules, ui)
- `src/page` — route-level pages grouped by role
- `src/redux` — store setup + RTK Query APIs
- `src/routes` — route configuration and sidebar items
- `src/config` — app configuration (API base URL)

### Folder Structure (src)

```text
src/
  assets/
  components/
    layout/
    modules/
    provider/
    ui/
  config/
  constant/
  hooks/
  lib/
  page/
    admin/
    receiver/
    sender/
  redux/
    features/
      auth/
      parcel/
  routes/
  types/
  ults/
  App.tsx
  main.tsx
  index.css
```

## Deployment Notes (Vercel)

- Set `VITE_BASE_URL` in your Vercel environment variables to point at your deployed backend API.
- Build command: `npm run build`
- Output directory: `dist`

## License

This project is provided for educational purposes.
