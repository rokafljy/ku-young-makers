import Link from 'next/link'

export default function Footer() {
  return (
    <>
      <div className="partner-strip">
        <div className="wrap">
          <span>고용노동부</span>
          <span>한국산업인력공단</span>
          <span>청년일경험 포털</span>
          <span>건국대학교</span>
          <span>KU-KISM</span>
        </div>
      </div>
      <footer>
        <div className="wrap">
          <div className="f-top">
            <div>
              <Link href="/" className="logo">
                KU <span className="y" style={{ color: 'var(--lime)' }}>YOUNG</span> MAKERS
              </Link>
              <p style={{ marginTop: 16, maxWidth: 300 }}>
                건국대학교 한국지속가능경영연구원<br />
                2026 미래내일 일경험 지원사업 운영기관
              </p>
            </div>
            <div className="f-links">
              <div>
                <b>프로그램</b>
                <Link href="/#about">사업소개</Link>
                <Link href="/#journey">8주 여정</Link>
                <Link href="/#recruit">모집안내</Link>
              </div>
              <div>
                <b>콘텐츠</b>
                <Link href="/#insight">교육·인사이트</Link>
                <Link href="/careers">채용정보</Link>
                <Link href="/gallery">갤러리</Link>
              </div>
              <div>
                <b>지원</b>
                <Link href="/notice">공지사항</Link>
                <Link href="/qna">Q&A</Link>
                <Link href="/status">지원현황 조회</Link>
              </div>
            </div>
          </div>
          <div className="f-bottom">
            <span>© 2026 Konkuk University KU-KISM. All rights reserved.</span>
            <span>고용노동부 · 한국산업인력공단 미래내일 일경험 지원사업</span>
          </div>
        </div>
      </footer>
    </>
  )
}
