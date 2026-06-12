import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import PageHero from '@/components/PageHero'
import SignupForm from '@/components/forms/SignupForm'
import { getUserProfile } from '@/lib/supabase/server'

export const metadata: Metadata = { title: '회원가입 | KU YOUNG MAKERS' }

export default async function SignupPage() {
  const { user } = await getUserProfile()
  if (user) redirect('/mypage')

  return (
    <>
      <PageHero
        eyebrow="Join"
        title="회원가입"
        desc="회원가입 후 운영자 승인을 거쳐 일경험 프로그램에 지원할 수 있습니다."
      />
      <main id="content" className="page-main">
        <div className="wrap">
          <SignupForm />
        </div>
      </main>
    </>
  )
}
