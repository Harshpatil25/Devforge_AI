create extension if not exists pgcrypto;

create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null,
  title text not null,
  description text default '',
  status text not null default 'Planning',
  category text default 'Product',
  tech_stack text[] default array[]::text[],
  github_repo_url text,
  live_demo_url text,
  thumbnail_url text,
  screenshots text[] default array[]::text[],
  tags text[] default array[]::text[],
  start_date date,
  notes text default '',
  last_updated timestamptz default now(),
  favorite boolean default false,
  archived boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table public.projects enable row level security;

create policy if not exists projects_user_policy on public.projects
for all
using (auth.uid() = user_id)
with check (auth.uid() = user_id);
