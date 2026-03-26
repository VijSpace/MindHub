create extension if not exists "pgcrypto";

create table if not exists public.users (
  id uuid primary key references auth.users(id) on delete cascade,
  nickname text,
  created_at timestamptz not null default now()
);

create table if not exists public.posts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users(id) on delete cascade,
  content text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.comments (
  id uuid primary key default gen_random_uuid(),
  post_id uuid not null references public.posts(id) on delete cascade,
  user_id uuid not null references public.users(id) on delete cascade,
  content text not null,
  created_at timestamptz not null default now()
);

alter table public.users enable row level security;
alter table public.posts enable row level security;
alter table public.comments enable row level security;

create policy "Users can view profiles" on public.users
  for select using (true);

create policy "Users can insert own profile" on public.users
  for insert with check (auth.uid() = id);

create policy "Users can update own profile" on public.users
  for update using (auth.uid() = id);

create policy "Posts are viewable" on public.posts
  for select using (true);

create policy "Users can insert posts" on public.posts
  for insert with check (auth.uid() = user_id);

create policy "Comments are viewable" on public.comments
  for select using (true);

create policy "Users can insert comments" on public.comments
  for insert with check (auth.uid() = user_id);

create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.users (id, nickname)
  values (new.id, null)
  on conflict (id) do nothing;
  return new;
end;
$$ language plpgsql security definer;

create or replace trigger on_auth_user_created
after insert on auth.users
for each row execute procedure public.handle_new_user();
