import Link from 'next/link'
import { faqs, notices } from '@/lib/data'

export default function NoticeFaq() {
  return (
    <section id="notice" style={{ background: '#fff' }}>
      <div className="wrap">
        <div className="reveal">
          <span className="eyebrow">Notice &amp; Q&amp;A</span>
          <h2 className="sec-title">공지사항 &amp; 자주 묻는 질문</h2>
        </div>
        <div className="nf-grid reveal">
          <div>
            <div className="notice-list">
              {notices.map(n => (
                <Link href={`/notice/${n.id}`} key={n.id}>
                  <span>
                    {n.pinned && <span className="pin">★</span>}
                    {n.title}
                  </span>
                  <span className="n-date">{n.date}</span>
                </Link>
              ))}
            </div>
            <p style={{ marginTop: 18 }}>
              <Link href="/notice" className="more-link">공지사항 더보기 →</Link>
            </p>
          </div>
          <div>
            <div className="acc">
              {faqs.map(f => (
                <details key={f.q}>
                  <summary><span className="q">Q.</span>{f.q}</summary>
                  <div className="a">{f.a}</div>
                </details>
              ))}
            </div>
            <p style={{ marginTop: 18 }}>
              <Link href="/qna" className="more-link">Q&amp;A 게시판에 질문 남기기 →</Link>
            </p>
          </div>
        </div>
        <div className="contact-strip reveal">
          <p>📞 문의처 — 건국대학교 한국지속가능경영연구원</p>
          <div className="c-info">
            <span><b>전화</b> 02-000-0000</span>
            <span><b>이메일</b> kym@konkuk.ac.kr (업데이트)</span>
          </div>
        </div>
      </div>
    </section>
  )
}
