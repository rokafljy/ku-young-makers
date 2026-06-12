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

## 데이터 확인

접수된 지원서·질문은 [Supabase 대시보드](https://supabase.com/dashboard/project/kypzebnhgtoldiiknmzq) → Table Editor에서 확인
(`youth_applications` / `company_applications` / `questions`)
