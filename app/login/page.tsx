import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import PageHero from '@/components/PageHero'
import LoginForm from '@/components/forms/LoginForm'
import { getUserProfile } from '@/lib/supabase/server'

export const metadata: Metadata = { title: '로그인 | KU YOUNG MAKERS' }

export default async function LoginPage() {
  const { user } = await getUserProfile()
  if (user) redirect('/mypage')

  return (
    <>
      <PageHero eyebrow="Login" title="로그인" desc="마이페이지에서 지원 현황과 질문 답변을 확인하세요." />
      <main id="content" className="page-main">
        <div className="wrap">
          <LoginForm />
        </div>
      </main>
    </>
  )
}
