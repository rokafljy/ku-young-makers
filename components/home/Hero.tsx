import Link from 'next/link'
import { companies } from '@/lib/data'

export default function Hero() {
  const names = companies.map(c => c.name)
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
