-- Run this in the Supabase SQL editor (after schema.sql).
-- Lets the signed-in admin see and delete reviews, including unapproved ones.

create policy "Authenticated can manage reviews"
  on reviews for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');
