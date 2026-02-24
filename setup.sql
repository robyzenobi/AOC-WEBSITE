-- 1. Create the blog_posts table
create table public.blog_posts (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  slug text not null unique,
  content text not null,
  category text not null,
  image text,
  views integer default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS for the table
alter table public.blog_posts enable row level security;

-- Create policies for blog_posts
-- Allow public read access to all blog posts
create policy "Allow public read access" 
on public.blog_posts for select 
using (true);

-- Allow authenticated users to insert posts
create policy "Allow authenticated insert" 
on public.blog_posts for insert 
to authenticated 
with check (true);

-- Allow authenticated users to update posts
create policy "Allow authenticated update" 
on public.blog_posts for update 
to authenticated 
using (true)
with check (true);

-- Allow authenticated users to delete posts
create policy "Allow authenticated delete" 
on public.blog_posts for delete 
to authenticated 
using (true);

-- 2. Create the storage bucket for images
-- Note: It is best to create storage buckets via the UI dashboard. 
-- However, running the below SQL usually works as well.
insert into storage.buckets (id, name, public) 
values ('blog-images', 'blog-images', true)
on conflict do nothing;

-- Set up storage policies for the 'blog-images' bucket
-- Allow public access to read images
create policy "Public read access for images"
on storage.objects for select
using (bucket_id = 'blog-images');

-- Allow authenticated users to upload and delete images
create policy "Authenticated users can upload images"
on storage.objects for insert
to authenticated
with check (bucket_id = 'blog-images');

create policy "Authenticated users can update images"
on storage.objects for update
to authenticated
using (bucket_id = 'blog-images');

create policy "Authenticated users can delete images"
on storage.objects for delete
to authenticated
using (bucket_id = 'blog-images');
