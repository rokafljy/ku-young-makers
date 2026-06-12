import { getVideos, getSetting } from '@/lib/content'

export default async function Insight() {
  const [videos, channel] = await Promise.all([getVideos(), getSetting('youtube_channel')])

  return (
    <section id="insight" style={{ background: '#fff' }}>
      <div className="wrap">
        <div className="sec-head reveal">
          <div>
            <span className="eyebrow">Insight</span>
            <h2 className="sec-title">취업역량을 키우는<br />교육 &amp; 인사이트</h2>
          </div>
          <a href={channel || '#'} className="more-link" target={channel ? '_blank' : undefined}>
            유튜브 채널 전체 보기 →
          </a>
        </div>
        <div className="vid-grid reveal">
          {videos.slice(0, 3).map(v => (
            <div className="vid" key={v.id}>
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
