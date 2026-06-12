import type { Metadata } from 'next'
import Link from 'next/link'
import PageHero from '@/components/PageHero'
import YouthApplyForm from '@/components/forms/YouthApplyForm'
import { getUserProfile } from '@/lib/supabase/server'

export const metadata: Metadata = { title: '청년 지원하기 | KU YOUNG MAKERS' }

export default async function ApplyPage() {
  const { user, profile } = await getUserProfile()

  return (
    <>
      <PageHero
        eyebrow="Apply"
        title="청년 지원하기"
        desc="만 15~34세 미취업 청년 (재학·휴학·졸업 무관) · 모집기간 2026. 00. 00. ~ 00. 00. (일정 업데이트)"
      />
      <main id="content" className="page-main">
        <div className="wrap">
          {!user || !profile ? (
            <div className="form-done">
              지원서 제출은 <b>회원 전용</b>입니다. 로그인 후 이용해 주세요.
              <div style={{ display: 'flex', gap: 12, marginTop: 18, flexWrap: 'wrap' }}>
                <Link href="/login" className="btn btn-primary">로그인 →</Link>
                <Link href="/signup" className="btn btn-outline-dark">회원가입</Link>
              </div>
            </div>
          ) : profile.status === 'pending' ? (
            <div className="form-done">
              ⏳ 회원 승인 대기 중입니다. 운영자 승인이 완료되면 지원서를 제출할 수 있습니다.
              <p style={{ marginTop: 12 }}>
                <Link href="/mypage" className="more-link">마이페이지에서 상태 확인 →</Link>
              </p>
            </div>
          ) : profile.status !== 'approved' ? (
            <div className="form-done">
              현재 회원 상태로는 지원할 수 없습니다. 문의가 필요하시면 운영사무국에 연락해 주세요.
            </div>
          ) : (
            <YouthApplyForm
              defaults={{
                name: profile.name,
                phone: profile.phone,
                email: profile.email,
                school: profile.school ?? '',
              }}
            />
          )}
        </div>
      </main>
    </>
  )
}
