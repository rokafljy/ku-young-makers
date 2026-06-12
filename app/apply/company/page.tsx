import type { Metadata } from 'next'
import PageHero from '@/components/PageHero'
import CompanyApplyForm from '@/components/forms/CompanyApplyForm'

export const metadata: Metadata = { title: '기업 참여 신청 | KU YOUNG MAKERS' }

export default function CompanyApplyPage() {
  return (
    <>
      <PageHero
        eyebrow="For Company"
        title="기업 참여 신청"
        desc="실전 과제를 제안해 주세요. 8주간 청년 팀이 리서치부터 실행·결과 보고까지 수행합니다. 참여기업 상시 모집."
      />
      <main id="content" className="page-main">
        <div className="wrap">
          <CompanyApplyForm />
        </div>
      </main>
    </>
  )
}
