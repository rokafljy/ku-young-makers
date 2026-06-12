import { getReviews } from '@/lib/content'

export default async function Reviews() {
  const reviews = await getReviews()
  if (reviews.length === 0) return null

  return (
    <section id="reviews" style={{ background: '#fff' }}>
      <div className="wrap">
        <div className="reveal">
          <span className="eyebrow">Reviews</span>
          <h2 className="sec-title">먼저 경험한<br />영 메이커들의 이야기</h2>
        </div>
        <div className="review-grid reveal">
          {reviews.slice(0, 6).map(r => (
            <div className="review-card" key={r.id}>
              <span className="quote">“</span>
              <p>{r.content}</p>
              <div className="who">
                {r.name}
                <small>{r.cohort} · {r.track}</small>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
