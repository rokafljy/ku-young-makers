-- KU YOUNG MAKERS 포털 스키마 v2: 회원/관리자/콘텐츠 관리
-- Supabase 대시보드 > SQL Editor에서 실행 (schema.sql 적용 후 실행하는 증분 스크립트)
-- 사전 조건: Auth > Sign In/Up 에서 "Confirm email" 비활성화 (운영자 승인이 게이트 역할)

-- ===== 1. 회원 프로필 =====
create table if not exists profiles (
  id uuid primary key references auth.users on delete cascade,
  created_at timestamptz not null default now(),
  email text not null,
  name text not null default '',
  phone text not null default '',
  school text,
  role text not null default 'member',      -- member | admin
  status text not null default 'pending'    -- pending | approved | rejected | withdrawn
);

-- 가입 시 프로필 자동 생성 (가입 폼 메타데이터에서 이름·전화·학교 복사)
create or replace function handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into profiles (id, email, name, phone, school)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'name', ''),
    coalesce(new.raw_user_meta_data->>'phone', ''),
    new.raw_user_meta_data->>'school'
  );
  return new;
end; $$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function handle_new_user();

-- 관리자 판별 (security definer라 RLS 재귀 없음)
create or replace function is_admin()
returns boolean language sql security definer set search_path = public as $$
  select exists (
    select 1 from profiles where id = auth.uid() and role = 'admin' and status = 'approved'
  );
$$;

alter table profiles enable row level security;
drop policy if exists "profiles select" on profiles;
drop policy if exists "profiles update" on profiles;
create policy "profiles select" on profiles for select to authenticated
  using (id = auth.uid() or is_admin());
create policy "profiles update" on profiles for update to authenticated
  using (id = auth.uid() or is_admin());

-- ⚠️ [보안 강화] 회원의 status/role 자가변경 차단은 별도 파일에서 처리합니다.
--    → supabase/admin_and_security.sql 의 트리거(guard_profile_changes)를 실행하세요.
--    (코드 변경 불필요 — 기존 정보수정·탈회·관리자 승인 동작을 그대로 유지)

-- ===== 2. 콘텐츠 테이블 (published = 노출/비노출) =====
create table if not exists notices (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  title text not null,
  body text not null default '',
  pinned boolean not null default false,
  published boolean not null default true
);

create table if not exists jobs (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  company text not null,
  title text not null,
  meta text not null default '',
  dday text not null default '상시',
  link text,
  published boolean not null default true
);

create table if not exists videos (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  cat text not null default '',
  title text not null,
  description text not null default '',
  video_id text,
  sort int not null default 0,
  published boolean not null default true
);

create table if not exists gallery_items (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  label text not null,
  image_url text,
  sort int not null default 0,
  published boolean not null default true
);

create table if not exists reviews (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  cohort text not null default '',
  track text not null default '',
  content text not null,
  published boolean not null default true
);

create table if not exists site_settings (
  key text primary key,
  value text not null default '',
  updated_at timestamptz not null default now()
);

-- 콘텐츠 RLS: 공개는 published만, 관리자는 전체 CRUD
do $$
declare t text;
begin
  foreach t in array array['notices','jobs','videos','gallery_items','reviews'] loop
    execute format('alter table %I enable row level security', t);
    execute format('drop policy if exists "public read" on %I', t);
    execute format('drop policy if exists "admin all" on %I', t);
    execute format('create policy "public read" on %I for select using (published = true or is_admin())', t);
    execute format('create policy "admin all" on %I for all to authenticated using (is_admin()) with check (is_admin())', t);
  end loop;
end $$;

alter table site_settings enable row level security;
drop policy if exists "public read" on site_settings;
drop policy if exists "admin all" on site_settings;
create policy "public read" on site_settings for select using (true);
create policy "admin all" on site_settings for all to authenticated using (is_admin()) with check (is_admin());

insert into site_settings (key, value) values
  ('recruit_start', ''),
  ('recruit_end', ''),
  ('contact_phone', '02-000-0000'),
  ('contact_email', 'kym@konkuk.ac.kr (업데이트)'),
  ('youtube_channel', '')
on conflict (key) do nothing;

-- ===== 3. 기존 테이블 변경: 회원 연결 =====
alter table youth_applications add column if not exists user_id uuid references auth.users on delete set null;
alter table questions add column if not exists user_id uuid references auth.users on delete set null;

-- 청년 지원서: 승인된 회원만 접수, 본인 조회, 관리자 전체
drop policy if exists "anon insert" on youth_applications;
drop policy if exists "member insert" on youth_applications;
drop policy if exists "own select" on youth_applications;
drop policy if exists "admin update" on youth_applications;
drop policy if exists "admin delete" on youth_applications;
create policy "member insert" on youth_applications for insert to authenticated
  with check (
    user_id = auth.uid()
    and exists (select 1 from profiles where id = auth.uid() and status = 'approved')
  );
create policy "own select" on youth_applications for select to authenticated
  using (user_id = auth.uid() or is_admin());
create policy "admin update" on youth_applications for update to authenticated using (is_admin());
create policy "admin delete" on youth_applications for delete to authenticated using (is_admin());

-- 질문: 로그인 회원 작성, 본인 조회, 관리자 답변
drop policy if exists "anon insert" on questions;
drop policy if exists "member insert" on questions;
drop policy if exists "own select" on questions;
drop policy if exists "admin update" on questions;
drop policy if exists "admin delete" on questions;
create policy "member insert" on questions for insert to authenticated
  with check (user_id = auth.uid());
create policy "own select" on questions for select to authenticated
  using (user_id = auth.uid() or is_admin());
create policy "admin update" on questions for update to authenticated using (is_admin());
create policy "admin delete" on questions for delete to authenticated using (is_admin());

-- 기업 신청: 비회원 접수 유지 + 관리자 조회/수정
drop policy if exists "admin select" on company_applications;
drop policy if exists "admin update" on company_applications;
drop policy if exists "admin delete" on company_applications;
create policy "admin select" on company_applications for select to authenticated using (is_admin());
create policy "admin update" on company_applications for update to authenticated using (is_admin());
create policy "admin delete" on company_applications for delete to authenticated using (is_admin());

-- 현황조회 함수는 마이페이지로 대체되어 제거
drop function if exists lookup_application_status(text, text);

-- ===== 4. Storage: 갤러리 이미지 버킷 =====
insert into storage.buckets (id, name, public) values ('gallery', 'gallery', true)
on conflict (id) do nothing;

drop policy if exists "gallery public read" on storage.objects;
drop policy if exists "gallery admin insert" on storage.objects;
drop policy if exists "gallery admin update" on storage.objects;
drop policy if exists "gallery admin delete" on storage.objects;
create policy "gallery public read" on storage.objects for select using (bucket_id = 'gallery');
create policy "gallery admin insert" on storage.objects for insert to authenticated with check (bucket_id = 'gallery' and is_admin());
create policy "gallery admin update" on storage.objects for update to authenticated using (bucket_id = 'gallery' and is_admin());
create policy "gallery admin delete" on storage.objects for delete to authenticated using (bucket_id = 'gallery' and is_admin());

-- ===== 5. 관리자 지정 (2jaeyong@gmail.com 가입 후 실행) =====
-- update profiles set role = 'admin', status = 'approved' where email = '2jaeyong@gmail.com';
