import type { Metadata } from 'next'
import PageHero from '@/components/PageHero'
import StatusForm from '@/components/forms/StatusForm'

export const metadata: Metadata = { title: '지원현황 조회 | KU YOUNG MAKERS' }

export default function StatusPage() {
  return (
    <>
      <PageHero
        eyebrow="My Application"
        title="지원현황 조회"
        desc="지원 시 입력한 정보로 서류·면접·최종 결과를 확인할 수 있습니다."
      />
      <main id="content" className="page-main">
        <div className="wrap">
          <StatusForm />
        </div>
      </main>
    </>
  )
}
