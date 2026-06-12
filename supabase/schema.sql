-- KU YOUNG MAKERS 포털 스키마 (v1: 접수 + 현황조회)
-- Supabase 대시보드 > SQL Editor에서 실행하세요.
-- 향후 확장: 회원가입(auth.users 연계), 채용관리(jobs), 공지(notices), 영메이커스 관리시스템

-- ===== 청년 지원서 =====
create table if not exists youth_applications (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  birth date not null,
  phone text not null,
  email text not null,
  school text,
  state text not null,        -- 재학/휴학/졸업/기타
  track text not null,        -- 희망 프로젝트/직무
  motive text not null,       -- 지원 동기 및 수행 계획
  status text not null default '접수완료'  -- 접수완료 → 서류통과 → 면접대상 → 최종합격 / 불합격
);

-- ===== 기업 참여 신청 =====
create table if not exists company_applications (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  company text not null,
  industry text not null,
  manager text not null,
  phone text not null,
  email text not null,
  project text not null,      -- 제안 과제 개요
  status text not null default '접수완료'  -- 접수완료 → 상담중 → 협약체결 / 보류
);

-- ===== Q&A 질문 =====
create table if not exists questions (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  email text not null,
  question text not null,
  answer text,
  answered_at timestamptz
);

-- ===== RLS: 익명 방문자는 접수(insert)만 가능, 조회는 불가 =====
alter table youth_applications enable row level security;
alter table company_applications enable row level security;
alter table questions enable row level security;

create policy "anon insert" on youth_applications for insert to anon with check (true);
create policy "anon insert" on company_applications for insert to anon with check (true);
create policy "anon insert" on questions for insert to anon with check (true);

-- 관리자(추후 /admin)는 authenticated 역할 + 별도 policy로 select/update 권한 부여 예정

-- ===== 지원현황 조회 함수 =====
-- 테이블 select 권한 없이도 본인(이름+이메일 일치) 상태만 반환
create or replace function lookup_application_status(p_name text, p_email text)
returns text
language sql
security definer
set search_path = public
as $$
  select status
  from youth_applications
  where name = trim(p_name) and lower(email) = lower(trim(p_email))
  order by created_at desc
  limit 1;
$$;

grant execute on function lookup_application_status(text, text) to anon;
