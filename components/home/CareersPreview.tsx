import Link from 'next/link'
import { getJobs } from '@/lib/content'

export default async function CareersPreview() {
  const jobs = await getJobs()

  return (
    <section id="careers">
      <div className="wrap">
        <div className="sec-head reveal">
          <div>
            <span className="eyebrow">Careers</span>
            <h2 className="sec-title">채용정보</h2>
          </div>
          <Link href="/careers" className="more-link">전체 공고 보기 →</Link>
        </div>
        <div className="job-list reveal">
          {jobs.slice(0, 3).map(j => (
            <Link className="job" href="/careers" key={j.id}>
              <div>
                <div className="co-name">{j.company}</div>
                <h3>{j.title}</h3>
                <div className="meta">{j.meta}</div>
              </div>
              <span className="dday">{j.dday}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
