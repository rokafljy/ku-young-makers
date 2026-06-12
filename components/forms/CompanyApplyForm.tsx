'use client'

import { useActionState } from 'react'
import { submitCompanyApplication } from '@/app/actions'

export default function CompanyApplyForm() {
  const [result, formAction, pending] = useActionState(submitCompanyApplication, null)

  if (result?.ok) {
    return <div className="form-done">✅ {result.message}</div>
  }

  return (
    <form className="form" action={formAction}>
      <div className="form-grid2">
        <div className="field">
          <label htmlFor="c-company">기업명 *</label>
          <input id="c-company" name="company" required placeholder="(주)회사명" />
        </div>
        <div className="field">
          <label htmlFor="c-industry">업종 *</label>
          <input id="c-industry" name="industry" required placeholder="예: 유통 · 라이브커머스" />
        </div>
      </div>
      <div className="form-grid2">
        <div className="field">
          <label htmlFor="c-manager">담당자명 *</label>
          <input id="c-manager" name="manager" required placeholder="김담당" />
        </div>
        <div className="field">
          <label htmlFor="c-phone">연락처 *</label>
          <input id="c-phone" name="phone" type="tel" required placeholder="02-000-0000" />
        </div>
      </div>
      <div className="field">
        <label htmlFor="c-email">이메일 *</label>
        <input id="c-email" name="email" type="email" required placeholder="contact@company.com" />
      </div>
      <div className="field">
        <label htmlFor="c-project">제안 과제 개요 *</label>
        <textarea
          id="c-project"
          name="project"
          required
          placeholder="청년 팀이 8주간 수행할 과제를 간단히 소개해 주세요. (과제 배경, 기대 결과물 등)"
        />
      </div>
      <p className="form-note">* 참여기업은 상시 모집하며, 신청 후 운영사무국에서 과제 정의 상담을 진행합니다.</p>
      {result && !result.ok && <p className="form-note" role="alert">⚠️ {result.message}</p>}
      <button type="submit" className="btn btn-dark" disabled={pending}>
        {pending ? '신청 중…' : '기업 참여 신청하기 →'}
      </button>
    </form>
  )
}
