import type { Metadata } from 'next'
import PageHero from '@/components/PageHero'
import { getJobs } from '@/lib/content'

export const metadata: Metadata = { title: '채용정보 | KU YOUNG MAKERS' }
export const revalidate = 60

export default async function CareersPage() {
  const jobs = await getJobs()

  return (
    <>
      <PageHero
        eyebrow="Careers"
        title="채용정보"
        desc="참여기업과 파트너의 채용 공고를 모았습니다."
      />
      <main id="content" className="page-main">
        <div className="wrap">
          <div className="job-list" style={{ marginTop: 0 }}>
            {jobs.map(j => (
              <a
                className="job"
                href={j.link ?? '#'}
                key={j.id}
                target={j.link ? '_blank' : undefined}
                rel={j.link ? 'noopener noreferrer' : undefined}
              >
                <div>
                  <div className="co-name">{j.company}</div>
                  <h3>{j.title}</h3>
                  <div className="meta">{j.meta}</div>
                </div>
                <span className="dday">{j.dday}</span>
              </a>
            ))}
            {jobs.length === 0 && <p className="form-note">현재 등록된 공고가 없습니다.</p>}
          </div>
        </div>
      </main>
    </>
  )
}
