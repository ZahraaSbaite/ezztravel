# Ezz Travel

Next.js (React) + Tailwind CSS + Supabase (PostgreSQL) starter for the Ezz Travel site, including a public reviews section (star rating + comments, visible to everyone).

## Stack
- **Frontend**: Next.js 14 (App Router), React, Tailwind CSS
- **Backend**: Next.js API routes (`app/api/reviews/route.js`)
- **Database**: Supabase (PostgreSQL)
- **Hosting**: designed for Vercel

## Setup

1. Install dependencies
   ```bash
   npm install
   ```

2. Create a Supabase project at supabase.com, then run `supabase/schema.sql` in the Supabase SQL editor to create the `reviews` table and its policies.

3. Copy `.env.local.example` to `.env.local` and fill in your Supabase project's URL and keys (found in Project Settings → API).
   ```bash
   cp .env.local.example .env.local
   ```
   `SUPABASE_SERVICE_ROLE_KEY` is secret — it's only used server-side in the API route and must never be exposed to the browser or committed to git.

4. Run the dev server
   ```bash
   npm run dev
   ```
   Visit http://localhost:3000

## Reviews feature

- Anyone visiting the site can submit a name, 1–5 star rating, and a comment.
- Submissions are validated and rate-limited (3 per IP per 10 minutes) server-side in `app/api/reviews/route.js`.
- Reviews insert as `approved = true` by default (shows immediately). To require your approval before a review goes public, change the default in `supabase/schema.sql` to `approved boolean not null default false`, and build a small admin view that flips it to `true` (e.g. a protected page or the Supabase table editor directly).

## Structure
```
app/
  layout.js        root layout, fonts, metadata
  page.js           assembles all sections
  globals.css       Tailwind + font imports
  api/reviews/      GET (list) and POST (submit) routes
components/
  Nav.js Hero.js About.js Services.js Specialties.js Reviews.js Footer.js
lib/
  supabaseClient.js browser-side Supabase client
supabase/
  schema.sql        reviews table + RLS policies
```

## Next steps
- Swap placeholder copy/images for final approved content and photography
- Add real destination photos (services and specialties sections currently text-only)
- Consider a proper rate-limit store (e.g. Upstash Redis) before high traffic, since the current one is in-memory and resets on redeploy
- Add French/Arabic translations if going fully multilingual
