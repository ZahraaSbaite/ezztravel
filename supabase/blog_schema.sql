-- Run this in the Supabase SQL editor (after schema.sql).
-- Adds the blog: categories, posts, and a public storage bucket for thumbnails.

create table if not exists categories (
  id uuid primary key default gen_random_uuid(),
  name text not null unique check (char_length(name) between 1 and 40),
  slug text not null unique,
  created_at timestamptz not null default now()
);

create table if not exists posts (
  id uuid primary key default gen_random_uuid(),
  title text not null check (char_length(title) between 1 and 140),
  slug text not null unique,
  thumbnail_url text not null,
  content text not null,
  video_url text,
  category_id uuid references categories(id) on delete set null,
  published boolean not null default true,
  created_at timestamptz not null default now()
);

alter table categories enable row level security;
alter table posts enable row level security;

-- Public (anon) can read everything needed for the public blog pages.
create policy "Public can read categories"
  on categories for select
  using (true);

create policy "Public can read published posts"
  on posts for select
  using (published = true);

-- Only signed-in users (the admin account you create in Supabase Auth) can
-- write. There is no public sign-up flow in the app, so "authenticated"
-- effectively means "logged in as the admin" as long as you keep
-- Authentication -> Providers -> Email -> "Allow new users to sign up" OFF
-- and create your one admin user manually from the Supabase dashboard.
create policy "Authenticated can manage categories"
  on categories for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

create policy "Authenticated can manage posts"
  on posts for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

-- Storage bucket for post thumbnails, publicly readable.
insert into storage.buckets (id, name, public)
values ('post-thumbnails', 'post-thumbnails', true)
on conflict (id) do nothing;

create policy "Public can view thumbnails"
  on storage.objects for select
  using (bucket_id = 'post-thumbnails');

create policy "Authenticated can upload thumbnails"
  on storage.objects for insert
  with check (bucket_id = 'post-thumbnails' and auth.role() = 'authenticated');

create policy "Authenticated can update thumbnails"
  on storage.objects for update
  using (bucket_id = 'post-thumbnails' and auth.role() = 'authenticated');

create policy "Authenticated can delete thumbnails"
  on storage.objects for delete
  using (bucket_id = 'post-thumbnails' and auth.role() = 'authenticated');
