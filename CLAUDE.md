# KU YOUNG MAKERS 2026 홈페이지

## 프로젝트 개요
- 건국대 KU-KISM 운영, 2026 미래내일 일경험 지원사업 공식 홈페이지
- 현재: Next.js(App Router, TS) 포털 v3 / 배포: Netlify (`netlify.toml`)
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
- 콘텐츠 데이터는 `lib/data.ts` 한곳에 모음 — Firebase 전환 시 이 모듈만 교체

## 작업 규칙
- 모바일 반응형 유지 (브레이크포인트 680px / 960px / 1060px, 메뉴는 960px에서 햄버거 전환)
- placeholder 표기("업데이트", "(예시)", "준비 중") 항목은 실데이터 입력 전까지 유지
- 폼 제출은 현재 스텁(접수 안내 메시지) — Firebase(Firestore) 연동 예정 (ku-young-makers-21580과 별도 프로젝트 권장)
- 관리자 페이지는 사용자 페이지 완성 후 추가 (예정: /admin — 공지·채용·접수 관리)

## TODO
- [ ] 유튜브 영상 ID 3개 삽입 (`lib/data.ts`의 videos[].videoId — 넣으면 자동 임베드)
- [ ] 모집 일정·문의처 실데이터 반영
- [ ] 갤러리 실사진 교체
- [ ] Firebase 연동 (지원서 접수 → 지원현황 조회 → Q&A 게시판 순)
- [ ] 관리자 페이지 (/admin)
- [ ] Netlify 배포
