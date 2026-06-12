import { videos } from '@/lib/data'

export default function Insight() {
  return (
    <section id="insight" style={{ background: '#fff' }}>
      <div className="wrap">
        <div className="sec-head reveal">
          <div>
            <span className="eyebrow">Insight</span>
            <h2 className="sec-title">취업역량을 키우는<br />교육 &amp; 인사이트</h2>
          </div>
          <a href="#" className="more-link">유튜브 채널 전체 보기 →</a>
        </div>
        <div className="vid-grid reveal">
          {videos.map(v => (
            <div className="vid" key={v.title}>
              <div className="thumb">
                {v.videoId ? (
                  <iframe
                    src={`https://www.youtube.com/embed/${v.videoId}`}
                    title={v.title}
                    allowFullScreen
                  />
                ) : (
                  <span className="play">▶</span>
                )}
              </div>
              <div className="body">
                <span className="cat">{v.cat}</span>
                <h3>{v.title}</h3>
                <p>{v.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
