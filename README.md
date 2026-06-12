# KU YOUNG MAKERS 2026 홈페이지

건국대 KU-KISM 운영, 2026 미래내일 일경험 지원사업 공식 홈페이지.

- **라이브 사이트**: https://ku-young-makers.netlify.app (main에 push하면 1~2분 내 자동 배포)
- **기술**: Next.js(App Router, TypeScript) + Supabase + Netlify
- **프로젝트 상세 문서**: [CLAUDE.md](CLAUDE.md) — 구조, 디자인 토큰, 작업 규칙, TODO

## 새 컴퓨터에서 시작하기 (최초 1회)

1. [Node.js LTS](https://nodejs.org/ko)와 [Git](https://git-scm.com/downloads)을 설치
2. 터미널(PowerShell)에서:

```powershell
git clone https://github.com/rokafljy/ku-young-makers.git
cd ku-young-makers
npm install
npm run dev
```

3. 브라우저에서 http://localhost:3000 접속 — 끝.
   (환경변수는 저장소의 `.env`에 포함되어 있어 별도 설정이 필요 없습니다)
4. 첫 `git push` 때 GitHub 로그인 창이 뜨면 `rokafljy` 계정으로 로그인 (1회만)

## 일상 작업 흐름 (사무실 ↔ 집 노트북)

```powershell
git pull        # ① 작업 시작 전: 다른 컴퓨터에서 한 작업 받아오기 (필수!)
# ... 코드 수정, npm run dev 로 확인 ...
git add -A
git commit -m "작업 내용"
git push        # ② 작업 끝: 올리기 → 1~2분 후 라이브 사이트 반영
```

> ⚠️ **작업 시작 전 `git pull`, 작업 후 `git push`를 습관화하세요.**
> 두 컴퓨터에서 pull 없이 각자 수정하면 충돌이 발생합니다.

## 관리자 페이지

- 접속: 사이트 우측 상단 로그인 → 관리자 계정(2jaeyong@gmail.com)으로 로그인 → `/admin`
- 기능: 회원 승인, 지원서·기업신청 관리(CSV 내보내기), 질문 답변,
  콘텐츠 등록·수정·삭제·노출토글(공지/채용/영상/갤러리/수료생후기), 모집일정·문의처 설정
- **최초 1회 관리자 지정**: 2jaeyong@gmail.com으로 회원가입한 뒤 Supabase SQL Editor에서
  `update profiles set role='admin', status='approved' where email='2jaeyong@gmail.com';` 실행

## 회원 흐름

회원가입 → 운영자(관리자 페이지)에서 승인 → 로그인 후 지원서 제출 → 마이페이지에서 진행상태 확인

## 데이터 확인

접수 데이터는 관리자 페이지 또는 [Supabase 대시보드](https://supabase.com/dashboard/project/kypzebnhgtoldiiknmzq) → Table Editor에서 확인
