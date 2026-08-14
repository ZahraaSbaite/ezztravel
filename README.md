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

2. Create a Supabase project at supabase.com, then run `supabase/schema.sql` in the Supabase SQL editor to create the `reviews` table and its policies. Also run `supabase/blog_schema.sql` for the blog (`categories`, `posts`, and the `post-thumbnails` storage bucket) and `supabase/services_specialties_schema.sql` for the Services/Specialties sections — see "Blog & admin" and "Services & Specialties" below before doing this.

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

## Blog & admin

Posts live in Supabase (`posts` table, joined to `categories`) and are managed
from a protected `/admin` area on the site itself — there's no public
sign-up, so "authenticated" effectively means "you."

1. Run `supabase/blog_schema.sql` in the Supabase SQL editor. It creates the
   `categories` and `posts` tables, their RLS policies (public can read
   published posts/categories; only signed-in users can write), and a public
   `post-thumbnails` storage bucket for uploaded images.
2. In the Supabase dashboard, go to **Authentication → Providers → Email**
   and turn **off** "Allow new users to sign up" — this app has no sign-up
   flow, and leaving it on would let anyone who finds `/admin/login` create
   an account with write access.
3. Go to **Authentication → Users → Add user** and create your one admin
   account (email + password).
4. Visit `/admin` on the site and sign in with that account. From there:
   - **Categories** — add, rename, or delete the categories posts can use.
   - **Posts** — create/edit posts with a title, category, thumbnail image
     (uploaded to Supabase Storage), content, and an optional video link
     (YouTube/Vimeo links embed inline on the post page; anything else shows
     as a "Watch the video" button).
5. Published posts appear at `/blog`, filterable by category, each with its
   own page at `/blog/<slug>`.

## Services & Specialties

The Services grid and the Specialties list (with its detail card/modal) are
both admin-managed, using the same `/admin` login as the blog.

1. Run `supabase/services_specialties_schema.sql` in the Supabase SQL editor.
   It creates the `services` and `specialties` tables and their RLS policies
   (public reads published rows; only the signed-in admin can write).
2. In `/admin`:
   - **Services** — title, description, and a `Display order` number (lower
     shows first). Uncheck "Published" to hide one without deleting it.
   - **Specialties** — title/description for the list row, plus the card
     shown when a specialty is opened: subtitle, longer description, button
     text, and a repeatable **Features** list (icon + title + description
     per feature — icons are picked from a fixed set in
     `components/SpecialtyIcon.js`).
3. If either table is empty (or the SQL hasn't been run yet), that section
   simply doesn't render on the homepage — no placeholder or error shown to
   visitors.

## Structure
```
app/
  layout.js         root layout, fonts, metadata, theme init script
  page.js            assembles the homepage sections
  globals.css        Tailwind + font imports + theme tokens
  api/reviews/       GET (list) and POST (submit) routes
  blog/              public blog: page.js (listing), [slug]/page.js (post)
  admin/             protected admin: layout.js (auth gate), posts/,
                     categories/, services/, specialties/
components/
  Nav.js Hero.js About.js Services.js Specialties.js Reviews.js Footer.js
  ThemeToggle.js SectionHeading.js
  BlogCard.js PostForm.js AdminGate.js ServiceForm.js
  SpecialtiesClient.js SpecialtyCard.js SpecialtyModal.js SpecialtyIcon.js
  SpecialtyForm.js
lib/
  supabaseClient.js  browser-side Supabase client (also used for public
                     server-side reads and for admin auth/writes)
  slugify.js         title -> URL slug
  videoEmbed.js       post video_url -> embeddable iframe src, or null
supabase/
  schema.sql                       reviews table + RLS policies
  blog_schema.sql                  categories/posts tables + RLS + storage bucket
  services_specialties_schema.sql  services/specialties tables + RLS
```

## Next steps
- Swap placeholder copy/images for final approved content and photography
- Add real destination photos (services and specialties sections currently text-only)
- Consider a proper rate-limit store (e.g. Upstash Redis) before high traffic, since the current one is in-memory and resets on redeploy
- Add French/Arabic translations if going fully multilingual
