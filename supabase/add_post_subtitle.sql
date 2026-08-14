-- Run this in the Supabase SQL editor (after blog_schema.sql).
-- Adds a subtitle field to posts, shown on the blog card before opening the post.

alter table posts add column if not exists subtitle text not null default '';
