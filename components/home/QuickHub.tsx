import Link from 'next/link'

export default function QuickHub() {
  return (
    <div className="hub">
      <div className="wrap hub-grid">
        <Link href="/apply" className="hot">
          <span className="h-ico">🚀</span>
          <b><em>청년 지원하기</em></b>
          <small>2026 참여자 모집</small>
        </Link>
        <Link href="/apply/company">
          <span className="h-ico">🏢</span>
          <b>기업 참여 신청</b>
          <small>실전 과제 제안</small>
        </Link>
        <Link href="/status">
          <span className="h-ico">📋</span>
          <b>지원현황 조회</b>
          <small>나의 지원 결과 확인</small>
        </Link>
        <a href="#recruit">
          <span className="h-ico">📘</span>
          <b>참여 매뉴얼</b>
          <small>청년·기업 가이드</small>
        </a>
        <a href="#insight">
          <span className="h-ico">▶️</span>
          <b>유튜브 채널</b>
          <small>교육·인사이트 영상</small>
        </a>
        <Link href="/notice">
          <span className="h-ico">📢</span>
          <b>공지사항</b>
          <small>최신 소식 확인</small>
        </Link>
      </div>
    </div>
  )
}
