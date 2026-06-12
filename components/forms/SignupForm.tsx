'use client'

import Link from 'next/link'
import { useActionState } from 'react'
import { signUp } from '@/app/actions'

export default function SignupForm() {
  const [result, formAction, pending] = useActionState(signUp, null)

  return (
    <form className="form" action={formAction}>
      <div className="form-grid2">
        <div className="field">
          <label htmlFor="su-name">이름 *</label>
          <input id="su-name" name="name" required placeholder="홍길동" />
        </div>
        <div className="field">
          <label htmlFor="su-phone">연락처 *</label>
          <input id="su-phone" name="phone" type="tel" required placeholder="010-0000-0000" />
        </div>
      </div>
      <div className="field">
        <label htmlFor="su-email">이메일 *</label>
        <input id="su-email" name="email" type="email" required placeholder="you@example.com" />
      </div>
      <div className="field">
        <label htmlFor="su-password">비밀번호 * (8자 이상)</label>
        <input id="su-password" name="password" type="password" required minLength={8} />
      </div>
      <div className="field">
        <label htmlFor="su-school">학교 / 전공</label>
        <input id="su-school" name="school" placeholder="건국대학교 / 경영학과" />
      </div>
      <label className="check-row">
        <input type="checkbox" name="consent" required />
        <span>
          (필수) 개인정보 수집·이용에 동의합니다.{' '}
          <Link href="/privacy" className="more-link" target="_blank">내용 보기</Link>
        </span>
      </label>
      <p className="form-note">가입 후 운영자 승인이 완료되면 지원서를 제출할 수 있습니다.</p>
      {result && !result.ok && <p className="form-note" role="alert">⚠️ {result.message}</p>}
      <button type="submit" className="btn btn-primary" disabled={pending}>
        {pending ? '가입 중…' : '회원가입 →'}
      </button>
      <p className="form-note">
        이미 회원이신가요? <Link href="/login" className="more-link">로그인</Link>
      </p>
    </form>
  )
}
