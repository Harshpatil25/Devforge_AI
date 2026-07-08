create table if not exists public.bugs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null,
  title text not null,
  short_description text default '',
  detailed_description text default '',
  technology text[] default '{}',
  programming_language text default '',
  framework text default '',
  severity text default 'Medium',
  priority text default 'Medium',
  status text default 'Open',
  error_message text default '',
  solution text default '',
  root_cause text default '',
  lessons_learned text default '',
  tags text[] default '{}',
  screenshot_url text default '',
  code_snippet text default '',
  reference_links text[] default '{}',
  favorite boolean default false,
  archived boolean default false,
  activity_history jsonb default '[]'::jsonb,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table public.bugs enable row level security;

create policy if not exists bugs_user_policy on public.bugs
for all
using (auth.uid() = user_id)
with check (auth.uid() = user_id);
