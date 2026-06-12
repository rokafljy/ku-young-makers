import { weeks } from '@/lib/data'

export default function Journey() {
  return (
    <section className="journey" id="journey">
      <div className="wrap">
        <div className="reveal">
          <span className="eyebrow">8-Week Journey</span>
          <h2 className="sec-title">8주, 이렇게 흘러갑니다</h2>
        </div>
        <div className="rail reveal" tabIndex={0} aria-label="8주 여정 타임라인">
          {weeks.map(w => (
            <div className="week" key={w.week}>
              <b>{w.week}</b>
              <h3>{w.title}</h3>
              <p>{w.desc}</p>
            </div>
          ))}
        </div>
        <p className="rail-hint">← 좌우로 스크롤하여 전체 여정을 확인하세요</p>
      </div>
    </section>
  )
}
