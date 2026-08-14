-- Run this in the Supabase SQL editor (after schema.sql and blog_schema.sql).
-- Adds admin-managed content for the Services and Specialties sections.

create table if not exists services (
  id uuid primary key default gen_random_uuid(),
  title text not null check (char_length(title) between 1 and 80),
  description text not null check (char_length(description) between 1 and 200),
  position integer not null default 0,
  published boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists specialties (
  id uuid primary key default gen_random_uuid(),
  title text not null check (char_length(title) between 1 and 80),
  description text not null check (char_length(description) between 1 and 200),
  subtitle text not null default '',
  long_description text not null default '',
  cta text not null default 'Learn more',
  -- array of { icon, title, description }; icon is one of the names in
  -- components/SpecialtyIcon.js (crown, heart, concierge, car, compass,
  -- shield, medical, bed, lock, briefcase, headset)
  features jsonb not null default '[]'::jsonb,
  position integer not null default 0,
  published boolean not null default true,
  created_at timestamptz not null default now()
);

alter table services enable row level security;
alter table specialties enable row level security;

create policy "Public can read published services"
  on services for select
  using (published = true);

create policy "Public can read published specialties"
  on specialties for select
  using (published = true);

-- Same pattern as blog_schema.sql: only the signed-in admin can write.
create policy "Authenticated can manage services"
  on services for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

create policy "Authenticated can manage specialties"
  on specialties for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');
