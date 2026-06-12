# KU YOUNG MAKERS 2026 홈페이지

## 프로젝트 개요
- 건국대 KU-KISM 운영, 2026 미래내일 일경험 지원사업 공식 홈페이지
- 현재: Next.js(App Router, TS) 포털 v3
- 저장소: https://github.com/rokafljy/ku-young-makers (main 브랜치, public)
- 배포: Netlify 자동 배포 — main에 push하면 https://ku-young-makers.netlify.app 에 1~2분 내 반영 (환경변수 등록 완료)
- v2 단일 HTML 프로토타입은 `legacy/index-v2.html`에 보존 (디자인 원본 참고용)
- 개발: `npm run dev` (localhost:3000) / 빌드: `npm run build`

## 디자인 토큰 (변경 금지)
- Green #0B6B3A / Lime #D9FF4B / Paper #F4F6EF / Ink #10180F
- 폰트: Archivo(디스플레이) + Pretendard(본문)
- 토큰·전체 스타일: `app/globals.css` (v2 CSS를 그대로 포팅)

## 구조
### 메인(/) — v2 섹션 구성 유지
히어로(BE THE YOUNG MAKER) → 퀵허브 6종 → 사업소개 →
듀얼트랙 모집(청년/기업 탭) → 8주 여정 레일 → 참여기업 →
인사이트(유튜브) → 채용 → 공지+FAQ → 갤러리
(섹션 컴포넌트: `components/home/`)

### 포털 서브페이지 (사용자 페이지)
- `/apply` 청년 지원서 · `/apply/company` 기업 참여 신청
- `/status` 지원현황 조회 · `/qna` FAQ+질문 남기기
- `/notice`, `/notice/[id]` 공지사항 · `/careers` 채용 · `/gallery` 갤러리
- 정적 콘텐츠 데이터(공지·FAQ·채용·기업·영상)는 `lib/data.ts` 한곳에 모음

## 백엔드 — Supabase (유료 구독 중)
- 연결된 프로젝트: young makers 조직 / `youngmakers_lotte` (ref: kypzebnhgtoldiiknmzq, 서울 리전) — 스키마 적용·연동 테스트 완료 (2026-06-12)
- 접수·조회는 서버 액션(`app/actions.ts`) → Supabase. 클라이언트는 `lib/supabase.ts`
- DB 스키마: `supabase/schema.sql` (대시보드 SQL Editor에서 실행)
  - youth_applications / company_applications / questions + RLS(익명은 insert만)
  - 지원현황 조회는 `lookup_application_status` 함수(security definer)로만
- 환경변수: `.env.local`에 NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY (`.env.example` 참고)
  - 미설정 시 폼은 "연동 전" 안내로 안전하게 동작
- 향후 확장 계획: 회원가입(Supabase Auth, @supabase/ssr 도입), 채용관리 시스템, 영메이커스 관리시스템 연동

## 작업 규칙
- 모바일 반응형 유지 (브레이크포인트 680px / 960px / 1060px, 메뉴는 960px에서 햄버거 전환)
- placeholder 표기("업데이트", "(예시)", "준비 중") 항목은 실데이터 입력 전까지 유지
- 관리자 페이지는 사용자 페이지 완성 후 추가 (예정: /admin — 접수·공지·채용 관리)

## TODO
- [x] Supabase 스키마 실행 + `.env.local` 키 설정 — 폼 실접수 동작 확인됨
- [ ] 유튜브 영상 ID 3개 삽입 (`lib/data.ts`의 videos[].videoId — 넣으면 자동 임베드)
- [ ] 모집 일정·문의처 실데이터 반영
- [ ] 갤러리 실사진 교체
- [x] Netlify 자동 배포 (GitHub 연동, 프로덕션 Supabase 연동 확인됨)
- [ ] 회원가입(Supabase Auth) → 관리자 페이지(/admin) 순 개발
