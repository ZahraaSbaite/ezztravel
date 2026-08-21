-- Run this in the Supabase SQL editor (after schema.sql, blog_schema.sql,
-- services_specialties_schema.sql, and about_schema.sql).
-- Adds a single admin-managed row backing the footer / "Contact us" info.

create table if not exists contact_content (
  id integer primary key default 1,
  address text not null default 'Beirut, Lebanon · Abidjan, Ivory Coast',
  -- array of { number, link }, e.g. { "number": "+961 81 839 155", "link": "https://wa.me/96181839155" }
  phones jsonb not null default '[
    {"number": "+961 81 839 155", "link": "https://wa.me/96181839155"},
    {"number": "+225 07 07 016 056", "link": "https://wa.me/2250707016056"},
    {"number": "+225 07 07 534 308", "link": "https://wa.me/2250707534308"}
  ]'::jsonb,
  -- array of email strings
  emails jsonb not null default '["Ezzedinep@hotmail.com", "abssobdeir@gmail.com"]'::jsonb,
  instagram_handle text not null default '@ezztravell',
  instagram_link text not null default 'https://www.instagram.com/ezztravell',
  updated_at timestamptz not null default now(),
  constraint contact_content_singleton check (id = 1)
);

insert into contact_content (id) values (1) on conflict (id) do nothing;

alter table contact_content enable row level security;

create policy "Public can read contact content"
  on contact_content for select
  using (true);

-- Same pattern as about_schema.sql: only the signed-in admin can write. No
-- insert/delete policy is needed since the row is a fixed singleton (id = 1)
-- managed entirely through updates.
create policy "Authenticated can update contact content"
  on contact_content for update
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');
