import type { Metadata } from 'next'
import PageHero from '@/components/PageHero'
import { jobs } from '@/lib/data'

export const metadata: Metadata = { title: '채용정보 | KU YOUNG MAKERS' }

export default function CareersPage() {
  return (
    <>
      <PageHero
        eyebrow="Careers"
        title="채용정보"
        desc="참여기업의 채용 공고를 모았습니다. (현재 표시된 공고는 예시이며, 실데이터 반영 예정)"
      />
      <main id="content" className="page-main">
        <div className="wrap">
          <div className="job-list" style={{ marginTop: 0 }}>
            {jobs.map(j => (
              <a className="job" href="#" key={j.id}>
                <div>
                  <div className="co-name">{j.company}</div>
                  <h3>{j.title}</h3>
                  <div className="meta">{j.meta}</div>
                </div>
                <span className="dday">{j.dday}</span>
              </a>
            ))}
          </div>
          <p className="form-note" style={{ marginTop: 26 }}>
            * 채용정보 게시판은 추후 Firebase 연동으로 실시간 공고가 제공될 예정입니다.
          </p>
        </div>
      </main>
    </>
  )
}
