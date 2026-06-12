'use client'

import { FormEvent, useState } from 'react'

// TODO: Firebase(Firestore) 연동 시 onSubmit에서 실제 접수 처리
export default function YouthApplyForm() {
  const [done, setDone] = useState(false)

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setDone(true)
  }

  if (done) {
    return (
      <div className="form-done">
        ✅ 입력 내용이 확인되었습니다.<br />
        현재는 프로토타입 단계로, 실제 접수는 Firebase 연동 후 제공됩니다. 모집 시작 시 공지사항을 확인해 주세요.
      </div>
    )
  }

  return (
    <form className="form" onSubmit={onSubmit}>
      <div className="form-grid2">
        <div className="field">
          <label htmlFor="y-name">이름 *</label>
          <input id="y-name" name="name" required placeholder="홍길동" />
        </div>
        <div className="field">
          <label htmlFor="y-birth">생년월일 *</label>
          <input id="y-birth" name="birth" type="date" required />
        </div>
      </div>
      <div className="form-grid2">
        <div className="field">
          <label htmlFor="y-phone">연락처 *</label>
          <input id="y-phone" name="phone" type="tel" required placeholder="010-0000-0000" />
        </div>
        <div className="field">
          <label htmlFor="y-email">이메일 *</label>
          <input id="y-email" name="email" type="email" required placeholder="you@example.com" />
        </div>
      </div>
      <div className="form-grid2">
        <div className="field">
          <label htmlFor="y-school">학교 / 전공</label>
          <input id="y-school" name="school" placeholder="건국대학교 / 경영학과" />
        </div>
        <div className="field">
          <label htmlFor="y-state">현재 상태 *</label>
          <select id="y-state" name="state" required defaultValue="">
            <option value="" disabled>선택해 주세요</option>
            <option>재학</option>
            <option>휴학</option>
            <option>졸업</option>
            <option>기타</option>
          </select>
        </div>
      </div>
      <div className="field">
        <label htmlFor="y-track">희망 프로젝트 / 직무 *</label>
        <select id="y-track" name="track" required defaultValue="">
          <option value="" disabled>선택해 주세요</option>
          <option>라이브커머스 기획·운영</option>
          <option>브랜드 마케팅 콘텐츠</option>
          <option>디지털 웹/UX · AI 마케팅</option>
          <option>SNS 캠페인 기획·운영</option>
          <option>IT 서비스 기획 · 그로스</option>
        </select>
      </div>
      <div className="field">
        <label htmlFor="y-motive">지원 동기 및 수행 계획 *</label>
        <textarea
          id="y-motive"
          name="motive"
          required
          placeholder="선정 이유, 수행 방법, 기대 성과를 자유롭게 작성해 주세요."
        />
      </div>
      <p className="form-note">
        * 만 15~34세 미취업 청년(재학·휴학·졸업 무관)이 지원 대상입니다. 제출 전 자격을 확인해 주세요.
      </p>
      <button type="submit" className="btn btn-primary">지원서 제출하기 →</button>
    </form>
  )
}
