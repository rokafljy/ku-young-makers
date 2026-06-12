import type { Metadata } from 'next'
import PageHero from '@/components/PageHero'
import YouthApplyForm from '@/components/forms/YouthApplyForm'

export const metadata: Metadata = { title: '청년 지원하기 | KU YOUNG MAKERS' }

export default function ApplyPage() {
  return (
    <>
      <PageHero
        eyebrow="Apply"
        title="청년 지원하기"
        desc="만 15~34세 미취업 청년 (재학·휴학·졸업 무관) · 모집기간 2026. 00. 00. ~ 00. 00. (일정 업데이트)"
      />
      <main id="content" className="page-main">
        <div className="wrap">
          <YouthApplyForm />
        </div>
      </main>
    </>
  )
}
