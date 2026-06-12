import Link from 'next/link'
import { companies } from '@/lib/data'

export default function Companies() {
  return (
    <section id="companies">
      <div className="wrap">
        <div className="sec-head reveal">
          <div>
            <span className="eyebrow">Partners</span>
            <h2 className="sec-title">함께하는 기업</h2>
          </div>
          <Link href="/apply/company" className="more-link">참여기업 신청 →</Link>
        </div>
        <div className="co-grid reveal">
          {companies.map(c => (
            <div className="co" key={c.name}>
              <span className="tag">{c.tag}</span>
              <h3>{c.name}</h3>
              <p>{c.desc}</p>
            </div>
          ))}
          <div className="co" style={{ background: 'var(--green)', color: '#fff', border: 'none' }}>
            <span className="tag" style={{ background: 'rgba(255,255,255,.14)', color: 'var(--lime)' }}>
              참여기업 모집
            </span>
            <h3>귀사의 과제를<br />제안해 주세요</h3>
            <p style={{ color: 'rgba(255,255,255,.75)' }}>
              참여기업 상시 모집 중 — <Link href="/apply/company" style={{ textDecoration: 'underline' }}>문의하기 →</Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
