// 포털 콘텐츠 데이터 — 추후 Firebase(Firestore) 연동 시 이 모듈만 교체하면 되도록 한곳에 모음.
// placeholder 표기("업데이트", "00", "(예시)")는 실데이터 입력 전까지 유지 (CLAUDE.md 작업 규칙)

export type Notice = {
  id: string
  title: string
  date: string
  pinned?: boolean
  body: string
}

export const notices: Notice[] = [
  { id: 'recruit-2026', title: '2026 참여자 모집 공고 안내', date: '2026-06-00', pinned: true, body: '모집 공고 내용 업데이트 예정' },
  { id: 'apply-guide', title: '청년 지원서 작성 방법 안내', date: '2026-06-00', pinned: true, body: '지원서 작성 안내 내용 업데이트 예정' },
  { id: 'edu-schedule', title: '직무 사전교육 일정 안내', date: '2026-00-00', body: '사전교육 일정 내용 업데이트 예정' },
  { id: 'fair-campaign', title: '정직한 참여 문화 캠페인', date: '2026-00-00', body: '캠페인 내용 업데이트 예정' },
  { id: 'company-guide', title: '기업 참여 신청 안내', date: '2026-00-00', body: '기업 참여 안내 내용 업데이트 예정' },
]

export type Faq = { q: string; a: string }

export const faqs: Faq[] = [
  { q: '재학생도 지원할 수 있나요?', a: '네, 만 15~34세 미취업 청년이라면 재학·휴학·졸업 여부와 관계없이 지원 가능합니다.' },
  { q: '활동은 대면인가요, 비대면인가요?', a: '트랙별로 상이하며, 기업 방문·멘토링은 대면, 팀 작업은 온·오프라인을 병행합니다.' },
  { q: '전공 제한이 있나요?', a: '전공 제한은 없습니다. 직무에 대한 관심과 성실한 참여 의지가 가장 중요한 평가 요소입니다.' },
  { q: '수료 후 무엇이 남나요?', a: '수료증, 프로젝트 결과물(포트폴리오), 평가위원의 개별 피드백 리포트, 경력기술서 초안이 남습니다.' },
]

export type Job = {
  id: string
  company: string
  title: string
  meta: string
  dday: string
}

export const jobs: Job[] = [
  { id: 'lotte-home-2026', company: '롯데홈쇼핑', title: '2026 상반기 신입사원 채용 (예시)', meta: '서울 · 신입 · 정규직', dday: 'D-14' },
  { id: 'lina-intern', company: '라이나생명', title: '디지털 마케팅 인턴 채용 (예시)', meta: '서울 · 인턴 · 6개월', dday: 'D-7' },
  { id: 'xexymix-marketer', company: '젝시믹스', title: '콘텐츠 마케터 채용 (예시)', meta: '서울 · 경력무관', dday: '상시' },
]

export type Company = { tag: string; name: string; desc: string }

export const companies: Company[] = [
  { tag: '유통 · 라이브커머스', name: '롯데홈쇼핑', desc: '라이브커머스 기획·운영, 모바일 방송 콘텐츠 실전 프로젝트' },
  { tag: '테마파크 · 마케팅', name: '롯데월드', desc: '브랜드 캐릭터 IP 활용 마케팅 콘텐츠 기획' },
  { tag: '보험 · 디지털', name: '라이나생명', desc: '디지털 웹/UX, AI 활용 상품·서비스 마케팅' },
  { tag: '패션 · 애슬레저', name: '젝시믹스', desc: 'SNS 기반 브랜드 캠페인 기획·운영' },
  { tag: 'IT · 스타트업', name: '커넥팅더닷츠', desc: 'IT 서비스 기획 및 그로스 프로젝트' },
]

export type Week = { week: string; title: string; desc: string }

export const weeks: Week[] = [
  { week: 'WEEK 1', title: '온보딩 & 팀빌딩', desc: 'OT, 직무 사전교육, 팀 구성과 그라운드룰 수립' },
  { week: 'WEEK 2', title: '과제 정의', desc: '기업 과제 브리핑, 문제 정의와 목표(KPI) 합의' },
  { week: 'WEEK 3', title: '리서치 & 분석', desc: '시장·고객 조사, 데이터 분석, 인사이트 도출' },
  { week: 'WEEK 4', title: '아이디어 검증', desc: '솔루션 가설 수립, 중간 멘토링 피드백' },
  { week: 'WEEK 5', title: '중간 발표', desc: '기업 담당자 대상 중간 보고 및 방향 보정' },
  { week: 'WEEK 6', title: '실행 & 제작', desc: '콘텐츠 제작, 캠페인 운영 등 실전 수행' },
  { week: 'WEEK 7', title: '성과 정리', desc: '성과 데이터 정리, 결과 보고서·포트폴리오 작성' },
  { week: 'WEEK 8', title: '최종 발표 & 수료', desc: '파이널 피칭, 우수팀 시상, 수료식과 개별 피드백' },
]

export type Video = {
  cat: string
  title: string
  desc: string
  videoId: string | null // 유튜브 영상 ID 삽입 시 자동으로 임베드됨 (TODO)
}

export const videos: Video[] = [
  { cat: '직무 교육', title: '라이브커머스 기획, 처음부터 끝까지', desc: '유튜브 링크 연결 예정', videoId: null },
  { cat: '현직자 인터뷰', title: '마케터가 말하는 일경험의 가치', desc: '유튜브 링크 연결 예정', videoId: null },
  { cat: '비하인드', title: '8주 프로젝트 하이라이트', desc: '유튜브 링크 연결 예정', videoId: null },
]

export const galleryItems: string[] = [
  '발대식 사진',
  '사전교육',
  '팀 프로젝트',
  '기업 멘토링 현장',
  '중간발표',
  '라이브 방송',
  '최종발표 & 수료식',
]
