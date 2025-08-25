# LMS App

A full‑stack Learning Management System with a React (Vite) frontend and an Express/MongoDB backend. It supports authentication via Clerk, media storage with Cloudinary, and payments with Stripe.

## Tech Stack

- Frontend: React 19, Vite 6, React Router, Tailwind CSS
- Backend: Node.js, Express 5, Mongoose (MongoDB)
- Auth: Clerk
- Payments: Stripe
- Media: Cloudinary
- Dev tooling: ESLint, Nodemon, Docker Compose (MongoDB + mongo-express)

## Repository Structure

```
.
├─ backend/
│  ├─ index.js
│  ├─ package.json
│  ├─ docker-compose.yml          # MongoDB + mongo-express (dev)
│  └─ src/
│     ├─ routes/                  # client, admin, auth
│     ├─ controllers/
│     ├─ middlewares/
│     ├─ models/
│     └─ utils/                   # connectDB, stripe, upload, constaints
└─ frontend/
   ├─ index.html
   ├─ package.json
   ├─ src/
   │  ├─ pages/, components/, layouts/
   │  └─ utils/constaints.js      # reads VITE_* env vars
   └─ vite.config.js
```

## Prerequisites

- Node.js 18+ and npm
- Stripe account (API keys)
- Cloudinary account (cloud name, API key/secret)
- Clerk account (publishable + secret key, webhook secret if used)
- MongoDB instance (local, cloud, or via Docker Compose)

## Environment Variables

Create a `.env` file in `backend/` with:

```
# MongoDB
MONGODB_URI=mongodb://localhost:27017

# Clerk
CLERK_PUBLISHABLE_KEY=pk_...
CLERK_SECRET_KEY=sk_...
CLERK_WEBHOOK_SECRET=whsec_...       # if using webhook(s)

# Cloudinary
CLOUDINARY_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_SECRET_KEY=your_api_secret

# Stripe
STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...      # for /verifypayment endpoint

# App
CURRENCY=USD
PORT=8000
```

Create a `.env` file in `frontend/` (Vite uses VITE\_\*):

```
VITE_CLERK_PUBLISHABLE_KEY=pk_...
VITE_CURRENCY=USD
# Base URL for your backend (include protocol). Example for local dev:
VITE_BASE_URL=http://localhost:8000
```

## Running the App (Local)

### 1) Start MongoDB via Docker (optional but recommended)

From `backend/` you can spin up MongoDB and mongo‑express:

```
cd backend
docker compose up -d
```

- MongoDB: `mongodb://root:example@localhost:27017/`
- mongo‑express UI: `http://localhost:8081` (admin: root / example)

If you use Docker, set `MONGODB_URI=mongodb://root:example@localhost:27017/` (or your chosen URI) in `backend/.env` and ensure the `dbName` is handled by the app (`LMS`).

### 2) Install dependencies

```
# Backend
cd backend
npm install

# Frontend (in a separate shell)
cd ../frontend
npm install
```

### 3) Run the servers

```
# Backend
cd backend
npm run server           # starts nodemon on PORT (default 8000)

# Frontend
cd frontend
npm run dev              # starts Vite dev server
```

- Backend health check: `GET http://localhost:8000/` -> "backend server is working"
- API base paths: `/api/client`, `/api/admin` (protected by admin middleware), `/api/auth`

## Payments Webhook (Stripe)

The backend exposes `POST /verifypayment` and expects raw JSON with `stripe` signature verification. When testing locally, forward Stripe events to your local backend and set `STRIPE_WEBHOOK_SECRET`.
Example using Stripe CLI:

```
stripe listen --forward-to localhost:8000/verifypayment
```

## Frontend Configuration

`frontend/src/utils/constaints.js` reads:

```
VITE_CLERK_PUBLISHABLE_KEY
VITE_CURRENCY
VITE_BASE_URL
```

Ensure `VITE_BASE_URL` points to the deployed backend in production.

## Scripts

- Backend (`backend/package.json`):
  - `npm run server` — start dev server with nodemon
  - `npm run run` — start server with node
- Frontend (`frontend/package.json`):
  - `npm run dev` — Vite dev server
  - `npm run build` — production build
  - `npm run preview` — preview production build
  - `npm run lint` — run ESLint

## Deployment Notes

- Both `frontend/` and `backend/` include `vercel.json` files for deployment via Vercel. Ensure all required environment variables are configured in the hosting provider.
- For backend, ensure you also configure Stripe and Clerk webhook URLs as needed.

## Troubleshooting

- 401/403 on admin routes: verify Clerk setup and `authenticateAdmin` logic/claims.
- Image/video upload failures: verify Cloudinary credentials and that requests use multipart/form‑data when required.
- Payment errors: confirm `STRIPE_SECRET_KEY` and webhook secret; use Stripe CLI for local testing.
- DB connection issues: verify `MONGODB_URI` and that MongoDB is reachable; container up if using Docker.

---

Maintained in the `LMS-app` monorepo with separate `frontend/` and `backend/` apps.
