import Link from 'next/link'
import { companies } from '@/lib/data'
import { getSetting } from '@/lib/content'

function ddayLabel(end: string): string | null {
  if (!end) return null
  const endDate = new Date(`${end}T23:59:59+09:00`)
  if (isNaN(endDate.getTime())) return null
  const days = Math.floor((endDate.getTime() - Date.now()) / 86400000)
  if (days < 0) return null
  return days === 0 ? 'D-DAY' : `D-${days}`
}

export default async function Hero() {
  const names = companies.map(c => c.name)
  const recruitEnd = await getSetting('recruit_end')
  const dday = ddayLabel(recruitEnd)
  return (
    <div className="hero">
      <div className="hero-bg" aria-hidden="true">
        <div className="blob b1" />
        <div className="blob b2" />
        <div className="blob b3" />
        <div className="grain" />
      </div>
      <div className="wrap">
        <div className="hero-badges">
          <span className="badge"><span className="dot" />2026 고용노동부 미래내일 일경험 지원사업</span>
          <span className="badge gold">★ 5년 연속 운영기관 · 건국대학교</span>
        </div>
        <h1>
          <span className="line"><span>BE THE</span></span>
          <span className="line">
            <span>
              <span className="outline">YOUNG</span> <span className="hl">MAKER</span>
            </span>
          </span>
        </h1>
        <div className="hero-row">
          <p className="hero-sub">
            기업의 실제 과제를 <b>8주 프로젝트</b>로 수행하며 취업역량을 증명하세요.
            서류 한 줄이 아닌, <b>포트폴리오와 경력기술서</b>가 남습니다.
          </p>
          <div className="hero-cta">
            <Link href="/apply" className="btn btn-primary">지금 지원하기 →</Link>
            <a href="#about" className="btn btn-ghost">사업 소개</a>
          </div>
        </div>
      </div>
      <div className="scroll-cue">SCROLL</div>
      {dday && (
        <Link href="/apply" className="dday-banner">
          📢 2026 참여자 모집 마감까지 <b>{dday}</b> — 지금 지원하기 →
        </Link>
      )}
      <div className="marquee" aria-hidden="true">
        <div className="marquee-track">
          {[...names, ...names].map((name, i) => (
            <span key={i}>
              {name} <i>✦</i>
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
