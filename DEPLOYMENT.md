# Deployment

This repo has two apps:

- `server`: Express API
- `client`: Next.js frontend

Deploy the API first, then deploy the frontend with the API URL.

## 1. Backend

Use any Node host such as Render, Railway, or Fly.io.

Recommended settings:

- Root directory: `server`
- Build command: `npm install`
- Start command: `npm start`
- Health check path: `/health`

Environment variables:

```env
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_long_random_secret
CLIENT_URL=https://your-frontend-domain.example
PORT=5000
```

Most hosts provide `PORT` automatically. If yours does, you can omit it.

## 2. Frontend

Use Vercel or another Next.js host.

Recommended settings:

- Root directory: `client`
- Build command: `npm run build`
- Output: Next.js default

Environment variables:

```env
NEXT_PUBLIC_API_URL=https://your-backend-domain.example
```

Do not include a trailing slash in `NEXT_PUBLIC_API_URL`.

## 3. Final Connection

After both deploys are live:

1. Set the backend `CLIENT_URL` to the deployed frontend URL.
2. Set the frontend `NEXT_PUBLIC_API_URL` to the deployed backend URL.
3. Redeploy both services after changing environment variables.
4. Visit `/health` on the backend and `/login` on the frontend to confirm both are reachable.

