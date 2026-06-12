import type { Metadata } from 'next'
import PageHero from '@/components/PageHero'
import QnaForm from '@/components/forms/QnaForm'
import { faqs } from '@/lib/data'

export const metadata: Metadata = { title: 'Q&A | KU YOUNG MAKERS' }

export default function QnaPage() {
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
          <QnaForm />
          <div className="contact-strip">
            <p>📞 문의처 — 건국대학교 한국지속가능경영연구원</p>
            <div className="c-info">
              <span><b>전화</b> 02-000-0000</span>
              <span><b>이메일</b> kym@konkuk.ac.kr (업데이트)</span>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
