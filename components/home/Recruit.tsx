'use client'

import Link from 'next/link'
import { useState } from 'react'

const STEPS = {
  youth: [
    { ico: '📝', label: '온라인 지원서 제출' },
    { ico: '✅', label: '참여자격 확인' },
    { ico: '🎤', label: '면접 평가' },
    { ico: '🎉', label: '최종 합격 · 팀 배정' },
    { ico: '🎓', label: '직무 사전교육' },
    { ico: '🚀', label: '8주 프로젝트 수행' },
    { ico: '📜', label: '수료 · 피드백 리포트' },
  ],
  corp: [
    { ico: '📨', label: '참여 신청 · 상담' },
    { ico: '🎯', label: '과제 정의 협의' },
    { ico: '🤝', label: '협약 체결' },
    { ico: '👥', label: '청년 팀 매칭' },
    { ico: '🧭', label: '멘토링 · 프로젝트' },
    { ico: '📊', label: '중간 모니터링' },
    { ico: '🏆', label: '최종 발표 · 결과보고' },
  ],
}

export default function Recruit() {
  const [tab, setTab] = useState<'youth' | 'corp'>('youth')

  return (
    <section id="recruit" style={{ background: '#fff' }}>
      <div className="wrap">
        <div className="reveal">
          <span className="eyebrow">Recruit</span>
          <h2 className="sec-title">청년과 기업,<br />모두를 기다립니다</h2>
        </div>
        <div className="dual reveal">
          <div className="track youth">
            <span className="t-label">FOR YOUTH</span>
            <h3>일경험으로 커리어를<br />시작하고 싶은 청년</h3>
            <p>만 15~34세 미취업 청년 (재학·휴학·졸업 무관) · 모집기간 2026. 00. 00. ~ 00. 00. (일정 업데이트)</p>
            <div className="t-btns">
              <Link href="/apply" className="btn btn-primary">청년 지원하기 →</Link>
              <Link href="/qna" className="btn btn-outline-white">자격 확인</Link>
            </div>
            <span className="t-deco">YOUTH</span>
          </div>
          <div className="track corp">
            <span className="t-label">FOR COMPANY</span>
            <h3>청년의 시선으로 과제를<br />풀고 싶은 기업</h3>
            <p>실전 과제를 제안해 주세요. 8주간 청년 팀이 리서치부터 실행·결과 보고까지 수행합니다. 참여기업 상시 모집.</p>
            <div className="t-btns">
              <Link href="/apply/company" className="btn btn-dark">기업 참여 신청 →</Link>
              <Link href="/qna" className="btn btn-outline-dark">참여 안내</Link>
            </div>
            <span className="t-deco">CORP</span>
          </div>
        </div>

        <div className="reveal">
          <div className="tabs" role="tablist" aria-label="참여절차 선택">
            <button role="tab" aria-selected={tab === 'youth'} onClick={() => setTab('youth')}>
              청년 참여절차
            </button>
            <button role="tab" aria-selected={tab === 'corp'} onClick={() => setTab('corp')}>
              기업 참여절차
            </button>
          </div>
          <div className={`proc ${tab === 'youth' ? 'active' : ''}`} id="proc-youth" role="tabpanel">
            {STEPS.youth.map((s, i) => (
              <div className="p-step" key={i}>
                <b>STEP {String(i + 1).padStart(2, '0')}</b>
                <div className="p-ico">{s.ico}</div>
                <span>{s.label}</span>
              </div>
            ))}
          </div>
          <div className={`proc ${tab === 'corp' ? 'active' : ''}`} id="proc-corp" role="tabpanel">
            {STEPS.corp.map((s, i) => (
              <div className="p-step" key={i}>
                <b>STEP {String(i + 1).padStart(2, '0')}</b>
                <div className="p-ico">{s.ico}</div>
                <span>{s.label}</span>
              </div>
            ))}
          </div>
          <div className="manuals">
            <a href="#" className="manual">📘 청년 참여 매뉴얼 다운로드 (준비 중)</a>
            <a href="#" className="manual">📗 기업 참여 매뉴얼 다운로드 (준비 중)</a>
          </div>
        </div>
      </div>
    </section>
  )
}
