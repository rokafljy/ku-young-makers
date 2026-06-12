-- ============================================================
-- KU YOUNG MAKERS — 관리자 지정 + 보안 강화 (1회 실행)
-- Supabase 대시보드 > SQL Editor 에 그대로 붙여넣고 Run 하세요.
-- ※ supabase.com 에서는 Chrome 자동번역을 꺼주세요 (대시보드 충돌 방지)
-- ※ 실행 전에 사이트(https://ku-young-makers.netlify.app/signup)에서
--    2jaeyong@gmail.com 으로 먼저 회원가입을 완료해야 합니다.
-- ============================================================

-- 1) 관리자 지정 (가입 후 실행해야 1건이 반영됩니다)
update profiles
set role = 'admin', status = 'approved'
where email = '2jaeyong@gmail.com';

-- 2) 보안 강화: 일반 회원이 본인 status/role 을 임의로 바꾸지 못하게 차단
--    (관리자는 모든 변경 허용, 일반 회원은 '탈회(withdrawn)'로의 변경만 허용)
--    → 코드 변경 없이 기존 동작(정보수정·탈회·관리자 승인)을 그대로 유지합니다.
create or replace function guard_profile_changes()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  if not is_admin() then
    -- 비관리자: role 은 절대 변경 불가
    new.role := old.role;
    -- 비관리자: status 는 그대로 두거나 'withdrawn'(탈회)으로만 변경 가능
    if new.status is distinct from old.status and new.status <> 'withdrawn' then
      new.status := old.status;
    end if;
  end if;
  return new;
end; $$;

drop trigger if exists trg_guard_profile_changes on profiles;
create trigger trg_guard_profile_changes
  before update on profiles
  for each row execute function guard_profile_changes();

-- 확인용: 관리자 지정 결과
select email, role, status from profiles where email = '2jaeyong@gmail.com';
