import type { Metadata } from 'next'
import Link from 'next/link'
import PageHero from '@/components/PageHero'
import QnaForm from '@/components/forms/QnaForm'
import { faqs } from '@/lib/data'
import { getSetting } from '@/lib/content'
import { getUserProfile } from '@/lib/supabase/server'

export const metadata: Metadata = { title: 'Q&A | KU YOUNG MAKERS' }

export default async function QnaPage() {
  const { user } = await getUserProfile()
  const [phone, email] = await Promise.all([
    getSetting('contact_phone', '02-000-0000'),
    getSetting('contact_email', 'kym@konkuk.ac.kr (업데이트)'),
  ])

  return (
    <>
      <PageHero
        eyebrow="Q&A"
        title="자주 묻는 질문"
        desc="궁금한 점을 먼저 확인하고, 답을 찾지 못했다면 질문을 남겨 주세요."
      />
      <main id="content" className="page-main">
        <div className="wrap">
          <div className="acc" style={{ maxWidth: 760 }}>
            {faqs.map(f => (
              <details key={f.q}>
                <summary><span className="q">Q.</span>{f.q}</summary>
                <div className="a">{f.a}</div>
              </details>
            ))}
          </div>
          <h2 className="sec-title" style={{ marginTop: 72, fontSize: 'clamp(24px,3vw,34px)' }}>
            질문 남기기
          </h2>
          {user ? (
            <QnaForm />
          ) : (
            <div className="form-done">
              질문 작성은 <b>로그인 후</b> 가능하며, 답변은 마이페이지에서 확인할 수 있습니다.
              <div style={{ display: 'flex', gap: 12, marginTop: 18, flexWrap: 'wrap' }}>
                <Link href="/login" className="btn btn-primary">로그인 →</Link>
                <Link href="/signup" className="btn btn-outline-dark">회원가입</Link>
              </div>
            </div>
          )}
          <div className="contact-strip">
            <p>📞 문의처 — 건국대학교 한국지속가능경영연구원</p>
            <div className="c-info">
              <span><b>전화</b> {phone}</span>
              <span><b>이메일</b> {email}</span>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
