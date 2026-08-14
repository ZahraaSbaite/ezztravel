-- Run this in the Supabase SQL editor (after schema.sql, blog_schema.sql, and
-- services_specialties_schema.sql).
-- Adds a single admin-managed row backing the About section.

create table if not exists about_content (
  id integer primary key default 1,
  eyebrow text not null default 'ABOUT',
  heading text not null default 'Built on trust,
not popularity',
  pull_quote text not null default 'Discover the world with discretion, comfort, and priority.',
  paragraph_1 text not null default 'At Ezz Travel, we design every journey around the person taking it — from breathtaking honeymoons crafted exclusively for two, to VIP airport meet & assist that turns arrival into part of the experience, to spiritual journeys arranged with elegance and care. Based in Beirut and Abidjan, we bring royal treatment to every stage of travel: flights, visas, transfers, and the details most agencies overlook.',
  paragraph_2 text not null default 'Where discretion matters, like medical travel to Lebanon, we help clients navigate the details honestly, backed by real experience rather than promises. We believe every trip — and every love story — deserves to be unforgettable. That''s why we handle everything from A to Z: tickets, hotels, transfers, experiences. You tell us what you dream of, we make it happen, your way.',
  -- array of { value, label }, e.g. { "value": "20+", "label": "Years of experience" }
  stats jsonb not null default '[
    {"value": "20+", "label": "Years of experience"},
    {"value": "Worldwide", "label": "Destinations covered"},
    {"value": "2", "label": "Offices — Beirut & Abidjan"}
  ]'::jsonb,
  whatsapp_link text not null default 'https://wa.me/96181839155',
  whatsapp_label text not null default 'WhatsApp +961 81 839 155',
  updated_at timestamptz not null default now(),
  constraint about_content_singleton check (id = 1)
);

insert into about_content (id) values (1) on conflict (id) do nothing;

alter table about_content enable row level security;

create policy "Public can read about content"
  on about_content for select
  using (true);

-- Same pattern as blog_schema.sql / services_specialties_schema.sql: only the
-- signed-in admin can write. No insert/delete policy is needed since the row
-- is a fixed singleton (id = 1) managed entirely through updates.
create policy "Authenticated can update about content"
  on about_content for update
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');
