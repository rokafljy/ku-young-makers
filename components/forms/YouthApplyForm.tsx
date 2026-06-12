'use client'

import Link from 'next/link'
import { useActionState } from 'react'
import { submitYouthApplication } from '@/app/actions'

type Defaults = { name: string; phone: string; email: string; school: string }

export default function YouthApplyForm({ defaults }: { defaults: Defaults }) {
  const [result, formAction, pending] = useActionState(submitYouthApplication, null)

  if (result?.ok) {
    return (
      <div className="form-done">
        ✅ {result.message}
        <p style={{ marginTop: 12 }}>
          <Link href="/mypage" className="more-link">마이페이지에서 확인하기 →</Link>
        </p>
      </div>
    )
  }

  return (
    <form className="form" action={formAction}>
      <div className="form-grid2">
        <div className="field">
          <label htmlFor="y-name">이름 *</label>
          <input id="y-name" name="name" required defaultValue={defaults.name} />
        </div>
        <div className="field">
          <label htmlFor="y-birth">생년월일 *</label>
          <input id="y-birth" name="birth" type="date" required />
        </div>
      </div>
      <div className="form-grid2">
        <div className="field">
          <label htmlFor="y-phone">연락처 *</label>
          <input id="y-phone" name="phone" type="tel" required defaultValue={defaults.phone} />
        </div>
        <div className="field">
          <label htmlFor="y-email">이메일 *</label>
          <input id="y-email" name="email" type="email" required defaultValue={defaults.email} />
        </div>
      </div>
      <div className="form-grid2">
        <div className="field">
          <label htmlFor="y-school">학교 / 전공</label>
          <input id="y-school" name="school" defaultValue={defaults.school} />
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
      <label className="check-row">
        <input type="checkbox" name="consent" required />
        <span>
          (필수) 개인정보 수집·이용에 동의합니다.{' '}
          <Link href="/privacy" className="more-link" target="_blank">내용 보기</Link>
        </span>
      </label>
      <p className="form-note">
        * 만 15~34세 미취업 청년(재학·휴학·졸업 무관)이 지원 대상입니다.
      </p>
      {result && !result.ok && <p className="form-note" role="alert">⚠️ {result.message}</p>}
      <button type="submit" className="btn btn-primary" disabled={pending}>
        {pending ? '제출 중…' : '지원서 제출하기 →'}
      </button>
    </form>
  )
}
