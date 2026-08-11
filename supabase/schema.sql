-- Run this in the Supabase SQL editor

create table if not exists reviews (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) between 1 and 60),
  rating smallint not null check (rating between 1 and 5),
  comment text not null check (char_length(comment) between 1 and 600),
  approved boolean not null default true,
  created_at timestamptz not null default now()
);

alter table reviews enable row level security;

-- Anyone can read approved reviews (this is the public review list)
create policy "Public can read approved reviews"
  on reviews for select
  using (approved = true);

-- Anyone can submit a review (inserts land as approved = true by default;
-- flip the default to false above if you want to moderate before publishing)
create policy "Anyone can submit a review"
  on reviews for insert
  with check (
    char_length(name) between 1 and 60
    and char_length(comment) between 1 and 600
    and rating between 1 and 5
  );

-- Optional: basic rate limiting per IP should be enforced at the API route
-- level (see app/api/reviews/route.js) since Postgres RLS has no IP context.
