# KTS UAE – Website Redesign (demo)

React + TypeScript + Vite + Tailwind v4 + Framer Motion. Contact API is a Cloudflare Pages Function (`functions/api/contact.ts`) sharing its logic with the Vite dev/preview server (`server/handleContact.ts`).

## Run
```
npm install
cp .env.example .env   # fill in as needed
npm run dev            # http://localhost:5173 (includes /api/contact)
npm run build          # generates sitemap/robots, type-checks, builds to dist/
```

## Deploy (free: Cloudflare Pages)
1. Push to a Git repo, then Cloudflare dashboard > Workers & Pages > Create > Pages > connect repo.
2. Build command `npm run build`, output directory `dist`.
3. Add the variables from `.env.example` (server secrets as encrypted variables; `VITE_*` before build).
4. Set `VITE_SITE_URL` to the assigned `*.pages.dev` URL and redeploy (drives canonical URLs, sitemap, OG tags).

## Contact email (Resend, free tier)
Set `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL` (sender on a Resend-verified domain). Optional: Cloudflare Turnstile (`VITE_TURNSTILE_SITE_KEY` + `TURNSTILE_SECRET_KEY`). Until configured, the API answers 503 and the form shows a clear message.

## Content to confirm / supply
- `src/data/site.ts` holds all content. Social accounts come from `VITE_FACEBOOK_URL`, `VITE_MESSENGER_USERNAME`, `VITE_INSTAGRAM_URL`; blank = hidden.
- Project photos: add `image: '/projects/x.jpg'` per project (placeholder artwork is used otherwise). Project division assignments are assumptions; "Jumeirah projects" is omitted until details are confirmed.
- Replace the wordmark in `Logo` (`src/components/ui.tsx`) with the official logo file.

## Transfer to KTS
Point KTS's own Cloudflare (or any static host + the function) at the repo, add their domain, update `VITE_SITE_URL`, rebuild.
