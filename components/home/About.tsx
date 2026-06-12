export default function About() {
  return (
    <section id="about">
      <div className="wrap">
        <div className="reveal">
          <span className="eyebrow">About</span>
          <h2 className="sec-title">스펙이 아니라,<br />실전 경험을 만듭니다</h2>
          <p className="sec-desc">
            KU YOUNG MAKERS는 청년과 기업을 프로젝트로 연결하는 건국대학교의 일경험 프로그램입니다.
            기업이 실제로 고민하는 과제를 받아 8주간 팀으로 해결합니다.
          </p>
        </div>
        <div className="stats reveal">
          <div className="stat"><b>5년 연속</b><small>미래내일 일경험 운영기관</small></div>
          <div className="stat"><b>5개사+</b><small>2026 파트너 기업</small></div>
          <div className="stat"><b>000명</b><small>누적 수료 청년 (수치 업데이트)</small></div>
        </div>
        <div className="bento reveal">
          <div className="card feature">
            <div className="icon">🚀</div>
            <h3>기업 실전 프로젝트</h3>
            <p>가상의 과제가 아닌, 기업이 지금 풀고 있는 진짜 문제를 수행합니다. 결과물은 그대로 포트폴리오가 됩니다.</p>
          </div>
          <div className="card">
            <div className="icon">🧭</div>
            <h3>현직자 멘토링</h3>
            <p>기업 실무자가 멘토로 함께하며 일하는 방식을 배웁니다.</p>
          </div>
          <div className="card">
            <div className="icon">🎓</div>
            <h3>직무 사전교육</h3>
            <p>프로젝트 투입 전 직무별 맞춤 교육으로 기본기를 다집니다.</p>
          </div>
          <div className="card">
            <div className="icon">📄</div>
            <h3>수료증 &amp; 경력기술</h3>
            <p>수료증 발급과 경력기술서 작성까지 코칭합니다.</p>
          </div>
          <div className="card">
            <div className="icon">💬</div>
            <h3>개별 피드백 리포트</h3>
            <p>평가위원의 강점·보완점 피드백을 개인별로 제공합니다.</p>
          </div>
          <div className="card">
            <div className="icon">🤝</div>
            <h3>네트워킹</h3>
            <p>다양한 전공의 동료, 기업 실무자와의 연결이 남습니다.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
