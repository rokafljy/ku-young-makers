# KU YOUNG MAKERS 2026 홈페이지

## 프로젝트 개요
- 건국대 KU-KISM 운영, 2026 미래내일 일경험 지원사업 공식 홈페이지
- 현재: Next.js(App Router, TS) 포털 v4 — 회원/관리자 시스템 포함
- 저장소: https://github.com/rokafljy/ku-young-makers (main 브랜치, public)
- 배포: Netlify 자동 배포 — main에 push하면 https://ku-young-makers.netlify.app 에 1~2분 내 반영 (환경변수 등록 완료)
- v2 단일 HTML 프로토타입은 `legacy/index-v2.html`에 보존 (디자인 원본 참고용)
- 개발: `npm run dev` (localhost:3000) / 빌드: `npm run build`

## 디자인 토큰 (변경 금지)
- Green #0B6B3A / Lime #D9FF4B / Paper #F4F6EF / Ink #10180F
- 폰트: Archivo(디스플레이) + Pretendard(본문)
- 토큰·전체 스타일: `app/globals.css`

## 구조
### 공개 페이지
- 메인(`/`): 히어로(+모집 D-day 배너) → 퀵허브 → 사업소개 → 듀얼트랙 모집 → 8주 여정 →
  참여기업 → **수료생 후기** → 인사이트 → 채용 → 공지+FAQ → 갤러리 (`components/home/`)
- `/notice` `/notice/[id]` `/careers` `/gallery` `/qna` `/privacy` `/apply` `/apply/company`
- 공개 콘텐츠는 `lib/content.ts`가 Supabase(published만) 조회 → DB 비면 `lib/data.ts` 폴백.
  페이지는 `revalidate = 60` ISR

### 회원 (Supabase Auth)
- `/signup`(개인정보 동의 필수) → 운영자 승인 → `/login` → `/mypage`(상태·지원현황·질문·정보수정·탈회)
- 지원서·질문은 **로그인 회원만**, 지원서 제출은 **승인된 회원만**(`/apply` 게이트)
- `/status`는 `/mypage`로 리다이렉트

### 관리자 (`/admin`, 2jaeyong@gmail.com)
- 레이아웃 가드(role=admin 확인) + RLS 이중 방어
- 운영: 회원 승인/거절/탈회, 청년 지원서(상태변경·CSV), 기업 신청, 질문 답변
- 콘텐츠 CRUD + 노출토글: 공지/채용/영상/갤러리(이미지 업로드)/수료생후기
- `/admin/settings`: 모집 일정(D-day)·문의처·유튜브 채널 URL

## 백엔드 — Supabase (유료 구독 중)
- 프로젝트: young makers 조직 / `youngmakers_lotte` (ref: kypzebnhgtoldiiknmzq, 서울 리전)
- 스키마: `supabase/schema.sql`(접수 v1) + `supabase/schema_v2.sql`(회원/관리자/콘텐츠) — 둘 다 적용됨
- 클라이언트: `lib/supabase/client.ts`(브라우저), `lib/supabase/server.ts`(쿠키), `middleware.ts`(세션 갱신),
  `lib/content.ts`(공개 조회용 익명 클라이언트). 서버 액션은 `app/actions.ts`
- Auth: Email 가입, **Confirm email 비활성화**(운영자 승인이 게이트). 관리자 승인은 SQL로 지정
- 갤러리 이미지: Storage 버킷 `gallery`(공개 읽기/관리자 쓰기)

## 작업 규칙
- 멀티 PC 작업(사무실↔집): 작업 시작 전 `git pull`, 작업 후 `git push` (세팅은 README.md)
- 모바일 반응형 유지 (브레이크포인트 680/960/1060px, 960px에서 햄버거)
- placeholder 표기 항목은 실데이터 입력 전까지 유지
- Supabase 작업은 브라우저 SQL Editor로. ⚠️ supabase.com에서 Chrome 자동번역을 끄세요(대시보드 충돌)

## ⚠️ 다음 작업 시 먼저 처리 (보안)
- `supabase/schema_v2.sql` 하단의 **[보안 강화]** 주석 구문을 SQL Editor에서 실행해야 함.
  (현재는 회원이 본인 profiles.status를 직접 바꿀 수 있는 허점이 있음 — 실제 모집 시작 전 필수)
  적용 시 `app/admin/members`의 setStatus와 `app/actions.ts`의 withdrawMembership을
  rpc(`admin_set_member_status`/`withdraw_self`) 호출로 함께 교체. (이번엔 SQL Editor 렌더링 장애로 미적용)
- 테스트 계정 `test-kym@example.com`(withdrawn 처리됨)과 그 지원서 1건 정리 필요

## TODO
- [x] 회원가입/로그인/마이페이지/탈회
- [x] 관리자 페이지 (회원 승인·접수 관리·콘텐츠 CRUD·설정)
- [x] 공개 페이지 DB 전환 + 모집 D-day 배너 + 수료생 후기 섹션
- [x] 개인정보처리방침·동의 체크박스·favicon·OG 메타
- [ ] **위 보안 강화 SQL 적용** (최우선)
- [ ] 관리자 첫 지정: 2jaeyong@gmail.com 가입 후 `update profiles set role='admin', status='approved' where email='2jaeyong@gmail.com';`
- [ ] 콘텐츠 실데이터 입력(관리자 페이지): 공지·채용·영상ID·갤러리·후기·모집일정·문의처
- [ ] 개인정보처리방침 보존기간·책임자 실데이터 확정
- [ ] (다음 단계) 매뉴얼 PDF, 카카오 로그인/채널, 모집 알림 이메일, FAQ 챗봇, 커스텀 도메인
